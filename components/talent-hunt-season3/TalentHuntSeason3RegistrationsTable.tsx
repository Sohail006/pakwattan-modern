'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Loader2, RefreshCw, Trash2 } from 'lucide-react'
import {
  deleteTalentHuntSeason3Registration,
  getAllTalentHuntSeason3Registrations,
  verifyTalentHuntSeason3Receipt,
  type TalentHuntSeason3RegistrationResponse,
} from '@/lib/api/talentHuntSeason3'
import { getPaymentStatusDisplay, getReceiptStatusDisplay } from '@/lib/utils/paymentHelpers'
import { getApiBaseUrl } from '@/lib/config'
import { formatDate } from '@/lib/utils'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'
import { toastService } from '@/lib/utils/toast'

function displayName(row: TalentHuntSeason3RegistrationResponse): string {
  if (row.registrationType === 'Institution') return row.institutionName || '—'
  return row.studentName || '—'
}

export default function TalentHuntSeason3RegistrationsTable() {
  const [rows, setRows] = useState<TalentHuntSeason3RegistrationResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<'all' | 'Participant' | 'Institution'>('all')
  const [viewingReceipt, setViewingReceipt] = useState<TalentHuntSeason3RegistrationResponse | null>(null)
  const [verifyNotes, setVerifyNotes] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<TalentHuntSeason3RegistrationResponse | null>(null)

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

  const filtered = rows.filter((r) => filterType === 'all' || r.registrationType === filterType)

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

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
        <p>{error}</p>
        <button type="button" onClick={load} className="mt-3 text-sm font-semibold underline">
          Retry
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as typeof filterType)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm min-h-[44px]"
        >
          <option value="all">All types</option>
          <option value="Participant">Participants</option>
          <option value="Institution">Institutions</option>
        </select>
        <button type="button" onClick={load} className="inline-flex items-center gap-2 text-sm font-medium text-primary-700">
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Contest / Focal</th>
              <th className="px-4 py-3">Fee</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Receipt</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                  No registrations yet.
                </td>
              </tr>
            ) : (
              filtered.map((row) => {
                const receiptLabel = getReceiptStatusDisplay(
                  row.transactionReceiptUrl,
                  row.receiptVerificationStatus,
                  row.paymentMethod
                )
                const paymentLabel = getPaymentStatusDisplay(row.paymentStatus, row.paymentMethod)

                return (
                  <tr key={row.id} className="hover:bg-gray-50/80">
                    <td className="px-4 py-3 font-medium">{row.registrationType}</td>
                    <td className="px-4 py-3">{displayName(row)}</td>
                    <td className="px-4 py-3">{row.phone || row.focalPersonMobile || row.email || '—'}</td>
                    <td className="px-4 py-3 max-w-[12rem] truncate">
                      {row.contestCategory || row.focalPersonName || '—'}
                    </td>
                    <td className="px-4 py-3 tabular-nums">{row.registrationFee ? `PKR ${row.registrationFee}` : '—'}</td>
                    <td className="px-4 py-3">{paymentLabel}</td>
                    <td className="px-4 py-3">
                      {row.transactionReceiptUrl ? (
                        <button
                          type="button"
                          onClick={() => setViewingReceipt(row)}
                          className="font-medium text-primary-700 hover:underline"
                        >
                          {receiptLabel}
                        </button>
                      ) : (
                        receiptLabel
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(row.registrationDate)}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(row)}
                        className="text-red-600 hover:text-red-800"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {viewingReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold mb-2">Verify payment receipt</h3>
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
        message="This cannot be undone."
        type="danger"
        confirmText="Delete"
      />
    </>
  )
}
