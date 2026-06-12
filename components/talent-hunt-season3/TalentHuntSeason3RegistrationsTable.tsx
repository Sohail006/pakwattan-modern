'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import {
  AlertCircle,
  Building2,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Loader2,
  RefreshCw,
  Search,
  Trash2,
  Trophy,
  Users,
  X,
} from 'lucide-react'
import {
  deleteTalentHuntSeason3Registration,
  getAllTalentHuntSeason3Registrations,
  verifyTalentHuntSeason3Receipt,
  type TalentHuntSeason3RegistrationResponse,
} from '@/lib/api/talentHuntSeason3'
import { TALENT_HUNT_SEASON3_REGISTRATION_CONTEST_VALUES } from '@/lib/talent-hunt-season3-data'
import { getPaymentStatusDisplay, getReceiptStatusDisplay } from '@/lib/utils/paymentHelpers'
import { exportTalentHuntSeason3ToExcel } from '@/lib/utils/excelExportTalentHuntSeason3'
import { getApiBaseUrl } from '@/lib/config'
import { debounce, formatDate } from '@/lib/utils'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { toastService } from '@/lib/utils/toast'

const ITEMS_PER_PAGE = 20

type TypeFilter = 'all' | 'Participant' | 'Institution'

function displayName(row: TalentHuntSeason3RegistrationResponse): string {
  if (row.registrationType === 'Institution') return row.institutionName || '—'
  return row.studentName || '—'
}

function isByHandPayment(paymentMethod?: string): boolean {
  return paymentMethod === 'ByHandOnTestDate' || paymentMethod === '2'
}

function receiptStatusKey(row: TalentHuntSeason3RegistrationResponse): string {
  if (isByHandPayment(row.paymentMethod)) return 'not-required'
  if (row.receiptVerificationStatus?.toLowerCase() === 'verified') return 'verified'
  if (row.receiptVerificationStatus?.toLowerCase() === 'rejected') return 'rejected'
  if (row.transactionReceiptUrl) return 'pending'
  return 'missing'
}

function TypeBadge({ type }: { type: string }) {
  const isParticipant = type === 'Participant'
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        isParticipant ? 'bg-primary-100 text-primary-800' : 'bg-emerald-100 text-emerald-800'
      }`}
    >
      {isParticipant ? <Users className="h-3 w-3" /> : <Building2 className="h-3 w-3" />}
      {type}
    </span>
  )
}

function StatusBadge({ label, tone }: { label: string; tone: 'green' | 'amber' | 'red' | 'gray' | 'blue' }) {
  const tones = {
    green: 'bg-green-100 text-green-800',
    amber: 'bg-amber-100 text-amber-800',
    red: 'bg-red-100 text-red-800',
    gray: 'bg-gray-100 text-gray-700',
    blue: 'bg-blue-100 text-blue-800',
  }
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {label}
    </span>
  )
}

function receiptBadgeTone(key: string): 'green' | 'amber' | 'red' | 'gray' | 'blue' {
  if (key === 'verified') return 'green'
  if (key === 'pending') return 'amber'
  if (key === 'rejected' || key === 'missing') return 'red'
  return 'gray'
}

export default function TalentHuntSeason3RegistrationsTable() {
  const [rows, setRows] = useState<TalentHuntSeason3RegistrationResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [exporting, setExporting] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [filterType, setFilterType] = useState<TypeFilter>('all')
  const [filterContest, setFilterContest] = useState('')
  const [filterGrade, setFilterGrade] = useState('')
  const [filterPaymentMethod, setFilterPaymentMethod] = useState('')
  const [filterReceiptStatus, setFilterReceiptStatus] = useState('')
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const [viewingReceipt, setViewingReceipt] = useState<TalentHuntSeason3RegistrationResponse | null>(null)
  const [viewingDetails, setViewingDetails] = useState<TalentHuntSeason3RegistrationResponse | null>(null)
  const [verifyNotes, setVerifyNotes] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<TalentHuntSeason3RegistrationResponse | null>(null)

  const debouncedSetSearch = useRef(
    debounce((value: string) => setDebouncedSearch(value), 300)
  ).current

  useEffect(() => {
    debouncedSetSearch(searchTerm)
  }, [searchTerm, debouncedSetSearch])

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAllTalentHuntSeason3Registrations()
      setRows(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load registrations')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const gradeOptions = useMemo(() => {
    const grades = new Set(
      rows.filter((r) => r.registrationType === 'Participant' && r.grade).map((r) => r.grade as string)
    )
    return Array.from(grades).sort()
  }, [rows])

  const stats = useMemo(() => {
    const participants = rows.filter((r) => r.registrationType === 'Participant').length
    const institutions = rows.filter((r) => r.registrationType === 'Institution').length
    const pendingReceipts = rows.filter((r) => receiptStatusKey(r) === 'pending').length
    return { total: rows.length, participants, institutions, pendingReceipts }
  }, [rows])

  const filtered = useMemo(() => {
    let list = [...rows]

    if (filterType !== 'all') {
      list = list.filter((r) => r.registrationType === filterType)
    }

    if (filterContest) {
      list = list.filter((r) => r.contestCategory === filterContest)
    }

    if (filterGrade) {
      list = list.filter((r) => r.grade === filterGrade)
    }

    if (filterPaymentMethod) {
      list = list.filter((r) => r.paymentMethod === filterPaymentMethod)
    }

    if (filterReceiptStatus) {
      list = list.filter((r) => receiptStatusKey(r) === filterReceiptStatus)
    }

    if (filterPaymentStatus) {
      list = list.filter(
        (r) => (r.paymentStatus || 'Pending').toLowerCase() === filterPaymentStatus.toLowerCase()
      )
    }

    if (debouncedSearch.trim()) {
      const term = debouncedSearch.toLowerCase().trim()
      list = list.filter((r) => {
        const haystack = [
          r.studentName,
          r.fatherName,
          r.institutionName,
          r.focalPersonName,
          r.phone,
          r.focalPersonMobile,
          r.emergencyContact,
          r.school,
          r.contestCategory,
          r.grade,
          String(r.id),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return haystack.includes(term)
      })
    }

    return list.sort(
      (a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()
    )
  }, [
    rows,
    filterType,
    filterContest,
    filterGrade,
    filterPaymentMethod,
    filterReceiptStatus,
    filterPaymentStatus,
    debouncedSearch,
  ])

  useEffect(() => {
    setCurrentPage(1)
  }, [filterType, filterContest, filterGrade, filterPaymentMethod, filterReceiptStatus, filterPaymentStatus, debouncedSearch])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const hasActiveFilters =
    Boolean(debouncedSearch) ||
    filterType !== 'all' ||
    Boolean(filterContest) ||
    Boolean(filterGrade) ||
    Boolean(filterPaymentMethod) ||
    Boolean(filterReceiptStatus) ||
    Boolean(filterPaymentStatus)

  const clearFilters = () => {
    setSearchTerm('')
    setDebouncedSearch('')
    setFilterType('all')
    setFilterContest('')
    setFilterGrade('')
    setFilterPaymentMethod('')
    setFilterReceiptStatus('')
    setFilterPaymentStatus('')
  }

  const receiptUrl = (url?: string) => {
    if (!url) return ''
    if (url.startsWith('http')) return url
    return `${getApiBaseUrl()}${url.startsWith('/') ? url : `/${url}`}`
  }

  const handleVerify = async (status: 'Verified' | 'Rejected') => {
    if (!viewingReceipt) return
    setVerifying(true)
    try {
      await verifyTalentHuntSeason3Receipt(viewingReceipt.id, status, verifyNotes || undefined)
      toastService.success(status === 'Verified' ? 'Receipt verified' : 'Receipt rejected')
      setViewingReceipt(null)
      setVerifyNotes('')
      await load()
    } catch (e) {
      toastService.error(e instanceof Error ? e.message : 'Verification failed')
    } finally {
      setVerifying(false)
    }
  }

  const handleDelete = async () => {
    if (!confirmDelete) return
    try {
      await deleteTalentHuntSeason3Registration(confirmDelete.id)
      toastService.success('Registration deleted')
      setConfirmDelete(null)
      await load()
    } catch (e) {
      toastService.error(e instanceof Error ? e.message : 'Delete failed')
    }
  }

  const handleExportExcel = () => {
    if (filtered.length === 0) {
      toastService.error('No registrations match your filters to export.')
      return
    }
    setExporting(true)
    try {
      exportTalentHuntSeason3ToExcel(filtered)
      toastService.success(`Exported ${filtered.length} registration(s) to Excel.`)
    } catch (e) {
      toastService.error(e instanceof Error ? e.message : 'Failed to export to Excel.')
    } finally {
      setTimeout(() => setExporting(false), 800)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
              <SkeletonLoader variant="text" width="50%" height="16px" />
              <SkeletonLoader variant="text" width="30%" height="32px" className="mt-2" />
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <SkeletonLoader variant="text" height="44px" />
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <SkeletonLoader key={i} variant="text" height="48px" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3 text-red-800">
        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
        <div>
          <p>{error}</p>
          <button type="button" onClick={load} className="mt-2 text-sm font-semibold underline">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: 'Total', value: stats.total, icon: Trophy, color: 'primary' },
            { label: 'Participants', value: stats.participants, icon: Users, color: 'blue' },
            { label: 'Institutions', value: stats.institutions, icon: Building2, color: 'emerald' },
            { label: 'Receipts Pending', value: stats.pendingReceipts, icon: AlertCircle, color: 'amber' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">{label}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{value}</p>
                </div>
                <div
                  className={`rounded-lg p-2.5 ${
                    color === 'primary'
                      ? 'bg-primary-100 text-primary-600'
                      : color === 'blue'
                        ? 'bg-blue-100 text-blue-600'
                        : color === 'emerald'
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-amber-100 text-amber-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-gray-800">Search &amp; filters</h2>
            <div className="flex flex-wrap gap-2">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 min-h-[44px] hover:bg-gray-50"
                >
                  <X className="h-4 w-4" /> Clear filters
                </button>
              )}
              <button
                type="button"
                onClick={handleExportExcel}
                disabled={exporting || filtered.length === 0}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white min-h-[44px] hover:bg-emerald-700 disabled:opacity-50"
              >
                {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                Export Excel
              </button>
              <button
                type="button"
                onClick={load}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-primary-700 min-h-[44px] hover:bg-gray-50"
              >
                <RefreshCw className="h-4 w-4" /> Refresh
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
            <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                type="search"
                placeholder="Search name, school, phone, contest…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg min-h-[44px] text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as TypeFilter)}
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm min-h-[44px] bg-white"
            >
              <option value="all">All types</option>
              <option value="Participant">Participants</option>
              <option value="Institution">Institutions</option>
            </select>

            <select
              value={filterContest}
              onChange={(e) => setFilterContest(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm min-h-[44px] bg-white"
            >
              <option value="">All contests</option>
              {TALENT_HUNT_SEASON3_REGISTRATION_CONTEST_VALUES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm min-h-[44px] bg-white"
            >
              <option value="">All grades</option>
              {gradeOptions.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            <select
              value={filterPaymentMethod}
              onChange={(e) => setFilterPaymentMethod(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm min-h-[44px] bg-white"
            >
              <option value="">All payment methods</option>
              <option value="EasyPaisa">EasyPaisa</option>
              <option value="BankAccount">Bank Account</option>
              <option value="ByHandOnTestDate">By hand on event</option>
            </select>

            <select
              value={filterReceiptStatus}
              onChange={(e) => setFilterReceiptStatus(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm min-h-[44px] bg-white"
            >
              <option value="">All receipt status</option>
              <option value="pending">Pending verification</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
              <option value="missing">Missing receipt</option>
              <option value="not-required">Not required</option>
            </select>

            <select
              value={filterPaymentStatus}
              onChange={(e) => setFilterPaymentStatus(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm min-h-[44px] bg-white"
            >
              <option value="">All payment status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>

          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-800">{paginated.length}</span> of{' '}
            <span className="font-semibold text-gray-800">{filtered.length}</span> filtered
            {filtered.length !== rows.length && (
              <>
                {' '}
                (<span className="font-semibold text-gray-800">{rows.length}</span> total)
              </>
            )}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
              <tr>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Contest / Focal</th>
                <th className="px-4 py-3">Fee</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Receipt</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-gray-500">
                    {hasActiveFilters ? 'No registrations match your filters.' : 'No registrations yet.'}
                  </td>
                </tr>
              ) : (
                paginated.map((row) => {
                  const receiptLabel = getReceiptStatusDisplay(
                    row.transactionReceiptUrl,
                    row.receiptVerificationStatus,
                    row.paymentMethod
                  )
                  const paymentLabel = getPaymentStatusDisplay(row.paymentStatus, row.paymentMethod)
                  const rKey = receiptStatusKey(row)

                  return (
                    <tr key={row.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-4 py-3">
                        <TypeBadge type={row.registrationType} />
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">{displayName(row)}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {row.registrationType === 'Participant'
                          ? [row.phone, row.gender].filter(Boolean).join(' · ') || '—'
                          : row.focalPersonMobile || '—'}
                      </td>
                      <td className="px-4 py-3 max-w-[11rem] text-gray-600" title={row.contestCategory || row.focalPersonName}>
                        <span className="line-clamp-2">
                          {row.contestCategory || row.focalPersonName || '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3 tabular-nums whitespace-nowrap">
                        {row.registrationFee ? `PKR ${row.registrationFee}` : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          label={paymentLabel}
                          tone={
                            paymentLabel === 'Paid' || row.paymentStatus === 'Paid'
                              ? 'green'
                              : paymentLabel === 'Pending'
                                ? 'amber'
                                : 'gray'
                          }
                        />
                      </td>
                      <td className="px-4 py-3">
                        {row.transactionReceiptUrl ? (
                          <button
                            type="button"
                            onClick={() => setViewingReceipt(row)}
                            className="inline-flex"
                          >
                            <StatusBadge label={receiptLabel} tone={receiptBadgeTone(rKey)} />
                          </button>
                        ) : (
                          <StatusBadge label={receiptLabel} tone={receiptBadgeTone(rKey)} />
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                        {formatDate(row.registrationDate)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setViewingDetails(row)}
                            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-primary-700"
                            aria-label="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDelete(row)}
                            className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filtered.length > ITEMS_PER_PAGE && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm min-h-[44px] disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm min-h-[44px] disabled:opacity-40"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Details modal */}
      {viewingDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Registration details</h3>
                <p className="text-sm text-gray-500">ID #{viewingDetails.id}</p>
              </div>
              <button
                type="button"
                onClick={() => setViewingDetails(null)}
                className="rounded-lg p-2 hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <dl className="space-y-3 text-sm">
              {viewingDetails.registrationType === 'Participant' ? (
                <>
                  <DetailRow label="Student" value={viewingDetails.studentName} />
                  <DetailRow label="Father" value={viewingDetails.fatherName} />
                  <DetailRow label="Gender" value={viewingDetails.gender} />
                  <DetailRow label="Grade" value={viewingDetails.grade} />
                  <DetailRow label="School" value={viewingDetails.school} />
                  <DetailRow label="Contest" value={viewingDetails.contestCategory} />
                  <DetailRow label="Phone" value={viewingDetails.phone} />
                  <DetailRow label="Emergency" value={viewingDetails.emergencyContact} />
                  <DetailRow label="Address" value={viewingDetails.address} />
                </>
              ) : (
                <>
                  <DetailRow label="Institution" value={viewingDetails.institutionName} />
                  <DetailRow label="Focal person" value={viewingDetails.focalPersonName} />
                  <DetailRow label="Mobile" value={viewingDetails.focalPersonMobile} />
                </>
              )}
              <DetailRow label="Fee" value={viewingDetails.registrationFee ? `PKR ${viewingDetails.registrationFee}` : undefined} />
              <DetailRow label="Payment" value={getPaymentStatusDisplay(viewingDetails.paymentStatus, viewingDetails.paymentMethod)} />
              <DetailRow
                label="Receipt"
                value={getReceiptStatusDisplay(
                  viewingDetails.transactionReceiptUrl,
                  viewingDetails.receiptVerificationStatus,
                  viewingDetails.paymentMethod
                )}
              />
              <DetailRow label="Registered" value={formatDate(viewingDetails.registrationDate)} />
            </dl>
            {viewingDetails.transactionReceiptUrl && (
              <button
                type="button"
                onClick={() => {
                  setViewingDetails(null)
                  setViewingReceipt(viewingDetails)
                }}
                className="mt-4 w-full btn-primary min-h-[44px]"
              >
                View / verify receipt
              </button>
            )}
          </div>
        </div>
      )}

      {/* Receipt modal */}
      {viewingReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold mb-1">Verify payment receipt</h3>
            <p className="text-sm text-gray-600 mb-4">{displayName(viewingReceipt)}</p>
            {viewingReceipt.transactionReceiptUrl && (
              <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={receiptUrl(viewingReceipt.transactionReceiptUrl)}
                  alt="Payment receipt"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            )}
            <textarea
              value={verifyNotes}
              onChange={(e) => setVerifyNotes(e.target.value)}
              placeholder="Optional notes"
              rows={2}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm mb-4"
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={verifying}
                onClick={() => handleVerify('Verified')}
                className="btn-primary min-h-[44px] flex-1"
              >
                Mark Verified
              </button>
              <button
                type="button"
                disabled={verifying}
                onClick={() => handleVerify('Rejected')}
                className="rounded-lg border border-red-300 px-4 py-2 text-red-700 min-h-[44px] flex-1"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewingReceipt(null)
                  setVerifyNotes('')
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 min-h-[44px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmationDialog
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
        title="Delete registration?"
        message={
          confirmDelete?.transactionReceiptUrl
            ? 'This will permanently delete the registration and its payment receipt attachment.'
            : 'This cannot be undone.'
        }
        type="danger"
        confirmText="Delete"
      />
    </>
  )
}

function DetailRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div className="grid grid-cols-3 gap-2 border-b border-gray-100 pb-2">
      <dt className="font-medium text-gray-500">{label}</dt>
      <dd className="col-span-2 text-gray-900 break-words">{value}</dd>
    </div>
  )
}
