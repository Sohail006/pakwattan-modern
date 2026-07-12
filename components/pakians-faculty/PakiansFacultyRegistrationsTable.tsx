'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import {
  AlertCircle,
  BookOpen,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Loader2,
  RefreshCw,
  Search,
  ShieldCheck,
  ShieldX,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Users,
  X,
} from 'lucide-react'
import {
  deletePakiansFacultyRegistration,
  getAllPakiansFacultyRegistrations,
  updatePakiansFacultyActiveStatus,
  updatePakiansFacultyVerification,
  type PakiansFacultyRegistrationResponse,
} from '@/lib/api/pakiansFaculty'
import { PAKIANS_FACULTY_WINGS } from '@/lib/pakians-faculty-data'
import { exportPakiansFacultyToExcel } from '@/lib/utils/excelExportPakiansFaculty'
import { getApiBaseUrl } from '@/lib/config'
import { debounce, formatDate } from '@/lib/utils'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { toastService } from '@/lib/utils/toast'

const ITEMS_PER_PAGE = 20

type CategoryFilter = 'all' | 'Teaching' | 'NonTeaching'
type VerificationFilter = 'all' | 'Pending' | 'Verified' | 'Rejected'
type ActiveFilter = 'all' | 'active' | 'inactive'

function profileImageUrl(url?: string): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${getApiBaseUrl()}${url.startsWith('/') ? url : `/${url}`}`
}

function staffCategoryLabel(value: string): string {
  return value === 'NonTeaching' ? 'Non-Teaching' : 'Teaching'
}

function roleTypeLabel(value?: string | null): string {
  if (!value) return '—'
  return value === 'WingIncharge' ? 'Wing Incharge' : value
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

function verificationTone(status: string): 'green' | 'amber' | 'red' | 'gray' {
  if (status === 'Verified') return 'green'
  if (status === 'Rejected') return 'red'
  if (status === 'Pending') return 'amber'
  return 'gray'
}

function verificationLabel(status: string): string {
  if (status === 'Verified') return 'School Faculty'
  if (status === 'Rejected') return 'Not School Faculty'
  return 'Pending Review'
}

export default function PakiansFacultyRegistrationsTable() {
  const [rows, setRows] = useState<PakiansFacultyRegistrationResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [exporting, setExporting] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState<CategoryFilter>('all')
  const [filterVerification, setFilterVerification] = useState<VerificationFilter>('all')
  const [filterActive, setFilterActive] = useState<ActiveFilter>('all')
  const [filterWing, setFilterWing] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const [viewingDetails, setViewingDetails] = useState<PakiansFacultyRegistrationResponse | null>(null)
  const [verifyTarget, setVerifyTarget] = useState<PakiansFacultyRegistrationResponse | null>(null)
  const [verifyNotes, setVerifyNotes] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<PakiansFacultyRegistrationResponse | null>(null)
  const [togglingId, setTogglingId] = useState<number | null>(null)

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
      const data = await getAllPakiansFacultyRegistrations()
      setRows(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load faculty registrations')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const stats = useMemo(() => {
    const teaching = rows.filter((r) => r.staffCategory === 'Teaching').length
    const nonTeaching = rows.filter((r) => r.staffCategory === 'NonTeaching').length
    const pending = rows.filter((r) => r.verificationStatus === 'Pending').length
    const verified = rows.filter((r) => r.verificationStatus === 'Verified').length
    return { total: rows.length, teaching, nonTeaching, pending, verified }
  }, [rows])

  const filtered = useMemo(() => {
    let list = [...rows]

    if (filterCategory !== 'all') {
      list = list.filter((r) => r.staffCategory === filterCategory)
    }

    if (filterVerification !== 'all') {
      list = list.filter((r) => r.verificationStatus === filterVerification)
    }

    if (filterActive === 'active') {
      list = list.filter((r) => r.isActive)
    } else if (filterActive === 'inactive') {
      list = list.filter((r) => !r.isActive)
    }

    if (filterWing) {
      list = list.filter((r) => r.wing === filterWing)
    }

    if (debouncedSearch.trim()) {
      const term = debouncedSearch.toLowerCase().trim()
      list = list.filter((r) => {
        const haystack = [
          r.name,
          r.fatherName,
          r.mobileNumber,
          r.whatsAppNumber,
          r.wing,
          r.subjectTaught,
          r.roleName,
          r.highestQualification,
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
  }, [rows, filterCategory, filterVerification, filterActive, filterWing, debouncedSearch])

  useEffect(() => {
    setCurrentPage(1)
  }, [filterCategory, filterVerification, filterActive, filterWing, debouncedSearch])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const hasActiveFilters =
    Boolean(debouncedSearch) ||
    filterCategory !== 'all' ||
    filterVerification !== 'all' ||
    filterActive !== 'all' ||
    Boolean(filterWing)

  const clearFilters = () => {
    setSearchTerm('')
    setDebouncedSearch('')
    setFilterCategory('all')
    setFilterVerification('all')
    setFilterActive('all')
    setFilterWing('')
  }

  const handleVerify = async (status: 'Verified' | 'Rejected') => {
    if (!verifyTarget) return
    setVerifying(true)
    try {
      await updatePakiansFacultyVerification(verifyTarget.id, status, verifyNotes || undefined)
      toastService.success(
        status === 'Verified' ? 'Marked as school faculty' : 'Marked as not school faculty'
      )
      setVerifyTarget(null)
      setVerifyNotes('')
      await load()
    } catch (e) {
      toastService.error(e instanceof Error ? e.message : 'Verification failed')
    } finally {
      setVerifying(false)
    }
  }

  const handleToggleActive = async (row: PakiansFacultyRegistrationResponse) => {
    setTogglingId(row.id)
    try {
      await updatePakiansFacultyActiveStatus(row.id, !row.isActive)
      toastService.success(row.isActive ? 'Marked inactive' : 'Marked active')
      await load()
    } catch (e) {
      toastService.error(e instanceof Error ? e.message : 'Failed to update status')
    } finally {
      setTogglingId(null)
    }
  }

  const handleDelete = async () => {
    if (!confirmDelete) return
    try {
      await deletePakiansFacultyRegistration(confirmDelete.id)
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
      exportPakiansFacultyToExcel(filtered)
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
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
              <SkeletonLoader variant="text" width="50%" height="16px" />
              <SkeletonLoader variant="text" width="30%" height="32px" className="mt-2" />
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <SkeletonLoader variant="text" height="44px" />
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
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {[
            { label: 'Total', value: stats.total, icon: Users, color: 'text-primary-700 bg-primary-50' },
            { label: 'Teaching', value: stats.teaching, icon: BookOpen, color: 'text-indigo-700 bg-indigo-50' },
            { label: 'Non-Teaching', value: stats.nonTeaching, icon: Briefcase, color: 'text-amber-700 bg-amber-50' },
            { label: 'Pending', value: stats.pending, icon: AlertCircle, color: 'text-orange-700 bg-orange-50' },
            { label: 'Verified', value: stats.verified, icon: ShieldCheck, color: 'text-green-700 bg-green-50' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
                <div className={`rounded-lg p-2 ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, phone, wing, subject..."
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={load}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
              <button
                type="button"
                onClick={handleExportExcel}
                disabled={exporting || filtered.length === 0}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                Export Excel
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as CategoryFilter)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <option value="all">All categories</option>
              <option value="Teaching">Teaching</option>
              <option value="NonTeaching">Non-Teaching</option>
            </select>
            <select
              value={filterVerification}
              onChange={(e) => setFilterVerification(e.target.value as VerificationFilter)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <option value="all">All verification</option>
              <option value="Pending">Pending Review</option>
              <option value="Verified">School Faculty</option>
              <option value="Rejected">Not School Faculty</option>
            </select>
            <select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value as ActiveFilter)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <option value="all">All active status</option>
              <option value="active">Active only</option>
              <option value="inactive">Inactive only</option>
            </select>
            <select
              value={filterWing}
              onChange={(e) => setFilterWing(e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <option value="">All wings</option>
              {PAKIANS_FACULTY_WINGS.map((wing) => (
                <option key={wing} value={wing}>
                  {wing}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button type="button" onClick={clearFilters} className="text-sm font-semibold text-primary-700">
              Clear all filters
            </button>
          )}
        </div>

        <div className="hidden lg:block rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Staff</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Category</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Role / Wing</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Contact</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Verification</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-gray-500">
                      No faculty registrations found.
                    </td>
                  </tr>
                ) : (
                  paginated.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/80">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-gray-100 shrink-0">
                            {row.profileImageUrl ? (
                              <Image
                                src={profileImageUrl(row.profileImageUrl)}
                                alt={row.name}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-gray-400">
                                <Users className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{row.name}</p>
                            <p className="text-xs text-gray-500">{row.fatherName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          label={staffCategoryLabel(row.staffCategory)}
                          tone={row.staffCategory === 'Teaching' ? 'blue' : 'amber'}
                        />
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {row.staffCategory === 'Teaching' ? (
                          <>
                            <p>{roleTypeLabel(row.roleType)}</p>
                            <p className="text-xs text-gray-500">{row.wing || '—'}</p>
                          </>
                        ) : (
                          <p>{row.roleName || '—'}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        <p>{row.mobileNumber}</p>
                        <p className="text-xs text-gray-500">WA: {row.whatsAppNumber}</p>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          label={verificationLabel(row.verificationStatus)}
                          tone={verificationTone(row.verificationStatus)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          label={row.isActive ? 'Active' : 'Inactive'}
                          tone={row.isActive ? 'green' : 'gray'}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setViewingDetails(row)}
                            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-primary-700"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setVerifyTarget(row)
                              setVerifyNotes(row.verificationNotes || '')
                            }}
                            className="rounded-lg p-2 text-gray-500 hover:bg-green-50 hover:text-green-700"
                            title="Verify / reject"
                          >
                            <ShieldCheck className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleActive(row)}
                            disabled={togglingId === row.id}
                            className="rounded-lg p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-700 disabled:opacity-50"
                            title={row.isActive ? 'Mark inactive' : 'Mark active'}
                          >
                            {togglingId === row.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : row.isActive ? (
                              <ToggleRight className="h-4 w-4" />
                            ) : (
                              <ToggleLeft className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDelete(row)}
                            className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-700"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden space-y-3">
          {paginated.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500">
              No faculty registrations found.
            </div>
          ) : (
            paginated.map((row) => (
              <div key={row.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-gray-100 shrink-0">
                    {row.profileImageUrl && (
                      <Image
                        src={profileImageUrl(row.profileImageUrl)}
                        alt={row.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate">{row.name}</p>
                    <p className="text-sm text-gray-500">{row.fatherName}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <StatusBadge
                        label={staffCategoryLabel(row.staffCategory)}
                        tone={row.staffCategory === 'Teaching' ? 'blue' : 'amber'}
                      />
                      <StatusBadge
                        label={verificationLabel(row.verificationStatus)}
                        tone={verificationTone(row.verificationStatus)}
                      />
                      <StatusBadge
                        label={row.isActive ? 'Active' : 'Inactive'}
                        tone={row.isActive ? 'green' : 'gray'}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <p>Mobile: {row.mobileNumber}</p>
                  <p>WA: {row.whatsAppNumber}</p>
                  <p className="col-span-2">
                    {row.staffCategory === 'Teaching'
                      ? `${roleTypeLabel(row.roleType)} · ${row.wing || '—'}`
                      : row.roleName}
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setViewingDetails(row)}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setVerifyTarget(row)
                      setVerifyNotes(row.verificationNotes || '')
                    }}
                    className="rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-800"
                  >
                    Verify
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleActive(row)}
                    disabled={togglingId === row.id}
                    className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800"
                  >
                    {row.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(row)}
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {filtered.length > ITEMS_PER_PAGE && (
          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3">
            <p className="text-sm text-gray-600">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="rounded-lg border border-gray-200 p-2 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="rounded-lg border border-gray-200 p-2 disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {viewingDetails && (
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50">
          <div className="w-full sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
              <h3 className="text-lg font-bold text-gray-900">Faculty Details</h3>
              <button type="button" onClick={() => setViewingDetails(null)} className="rounded-lg p-2 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <div className="flex items-center gap-4">
                {viewingDetails.profileImageUrl && (
                  <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-gray-100">
                    <Image
                      src={profileImageUrl(viewingDetails.profileImageUrl)}
                      alt={viewingDetails.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                )}
                <div>
                  <p className="text-lg font-bold">{viewingDetails.name}</p>
                  <p className="text-gray-500">S/o {viewingDetails.fatherName}</p>
                </div>
              </div>
              {[
                ['Category', staffCategoryLabel(viewingDetails.staffCategory)],
                ['Role Type', roleTypeLabel(viewingDetails.roleType)],
                ['Wing', viewingDetails.wing || '—'],
                ['Subject', viewingDetails.subjectTaught || '—'],
                ['Role Name', viewingDetails.roleName || '—'],
                ['Qualification', viewingDetails.highestQualification],
                ['Experience', `${viewingDetails.experienceYears} year(s)`],
                ['Mobile', viewingDetails.mobileNumber],
                ['WhatsApp', viewingDetails.whatsAppNumber],
                ['Registered', formatDate(viewingDetails.registrationDate)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-b border-gray-50 pb-2">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-medium text-gray-900 text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {verifyTarget && (
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50">
          <div className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Verify Faculty</h3>
              <button type="button" onClick={() => setVerifyTarget(null)} className="rounded-lg p-2 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Review <strong>{verifyTarget.name}</strong> and confirm whether they are a Pak Wattan school faculty member.
            </p>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Notes (optional)</label>
            <textarea
              value={verifyNotes}
              onChange={(e) => setVerifyNotes(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm mb-4"
              placeholder="Internal notes for this decision..."
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                disabled={verifying}
                onClick={() => handleVerify('Verified')}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white hover:bg-green-700 disabled:opacity-50"
              >
                {verifying ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                School Faculty
              </button>
              <button
                type="button"
                disabled={verifying}
                onClick={() => handleVerify('Rejected')}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {verifying ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldX className="h-4 w-4" />}
                Not School Faculty
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmationDialog
        isOpen={Boolean(confirmDelete)}
        title="Delete Faculty Registration"
        message={`Are you sure you want to permanently delete the registration for ${confirmDelete?.name}? This cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onClose={() => setConfirmDelete(null)}
        type="danger"
      />
    </>
  )
}
