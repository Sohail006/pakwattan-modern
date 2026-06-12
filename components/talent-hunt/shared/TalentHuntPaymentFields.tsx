'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, Building2, Copy, CreditCard, Info, Wallet } from 'lucide-react'
import { getActiveAdmissionSetting, type AdmissionSetting } from '@/lib/api/admissionSettings'
import ReceiptUpload from '@/components/ui/ReceiptUpload'
import FormField from '@/components/ui/FormField'

type Props = {
  feeAmount: number
  paymentMethod: number
  onPaymentMethodChange: (value: number) => void
  transactionReceiptUrl: string | null
  onReceiptChange: (url: string | null) => void
  allowedMethods?: number[]
  byHandDescription?: string
  disabled?: boolean
  receiptError?: string
}

const METHOD_LABELS: Record<number, string> = {
  0: 'EasyPaisa',
  1: 'Bank Account',
  2: 'By Hand on Event Date',
}

export default function TalentHuntPaymentFields({
  feeAmount,
  paymentMethod,
  onPaymentMethodChange,
  transactionReceiptUrl,
  onReceiptChange,
  allowedMethods = [0, 1, 2],
  byHandDescription,
  disabled = false,
  receiptError,
}: Props) {
  const [activeSetting, setActiveSetting] = useState<AdmissionSetting | null>(null)
  const [loadingSettings, setLoadingSettings] = useState(true)

  useEffect(() => {
    getActiveAdmissionSetting()
      .then(setActiveSetting)
      .catch(() => setActiveSetting(null))
      .finally(() => setLoadingSettings(false))
  }, [])

  const formatFee = () => `PKR ${feeAmount}/-`
  const needsReceipt = paymentMethod === 0 || paymentMethod === 1

  return (
    <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50/80 p-4 sm:p-6">
      <h4 className="text-base sm:text-lg font-semibold text-gray-900">Payment Information</h4>
      <p className="text-sm text-gray-600">
        Registration fee: <span className="font-semibold text-primary-700">{formatFee()}</span> (non-refundable)
      </p>

      <FormField label="Payment Method" required htmlFor="th-payment-method">
        <select
          id="th-payment-method"
          value={paymentMethod}
          onChange={(e) => onPaymentMethodChange(Number(e.target.value))}
          disabled={disabled || allowedMethods.length === 1}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[44px]"
          required
        >
          {allowedMethods.map((m) => (
            <option key={m} value={m}>
              {METHOD_LABELS[m] ?? `Method ${m}`}
            </option>
          ))}
        </select>
      </FormField>

      {!loadingSettings && activeSetting && paymentMethod === 0 && activeSetting.easyPaisaAccountNumber && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex gap-3">
            <Wallet className="h-5 w-5 shrink-0 text-green-600" />
            <div className="min-w-0 text-sm">
              <p className="font-semibold text-green-900">EasyPaisa Payment Details</p>
              {activeSetting.easyPaisaAccountName && (
                <p className="mt-1 break-words">Account Name: {activeSetting.easyPaisaAccountName}</p>
              )}
              <p className="mt-1 flex flex-wrap items-center gap-2 break-all font-mono">
                {activeSetting.easyPaisaAccountNumber}
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(activeSetting.easyPaisaAccountNumber || '')}
                  className="rounded p-1 text-green-700 hover:bg-green-100"
                  aria-label="Copy EasyPaisa number"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {!loadingSettings && activeSetting && paymentMethod === 1 && activeSetting.bankAccountNumber && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="flex gap-3">
            <Building2 className="h-5 w-5 shrink-0 text-blue-600" />
            <div className="min-w-0 space-y-1 text-sm">
              <p className="font-semibold text-blue-900">Bank Account Payment Details</p>
              {activeSetting.bankName && <p>Bank: {activeSetting.bankName}</p>}
              {activeSetting.bankAccountTitle && <p>Title: {activeSetting.bankAccountTitle}</p>}
              <p className="flex flex-wrap items-center gap-2 break-all font-mono">
                {activeSetting.bankAccountNumber}
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(activeSetting.bankAccountNumber || '')}
                  className="rounded p-1 text-blue-700 hover:bg-blue-100"
                  aria-label="Copy account number"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </p>
              {activeSetting.bankIBAN && <p className="break-all">IBAN: {activeSetting.bankIBAN}</p>}
              {activeSetting.bankBranch && <p>Branch: {activeSetting.bankBranch}</p>}
            </div>
          </div>
        </div>
      )}

      {paymentMethod === 2 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="flex gap-3">
            <CreditCard className="h-5 w-5 shrink-0 text-amber-600" />
            <p className="text-sm text-amber-900">
              {byHandDescription ??
                `Pay ${formatFee()} in cash at the event venue on the day of your competition.`}
            </p>
          </div>
        </div>
      )}

      {!loadingSettings && paymentMethod !== 2 && !activeSetting && (
        <p className="flex items-start gap-2 text-sm text-amber-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          Payment account details are not configured. Please contact the administration.
        </p>
      )}

      {needsReceipt && (
        <FormField label="Transaction Receipt Photo" required htmlFor="th-receipt">
          <ReceiptUpload
            value={transactionReceiptUrl}
            onChange={onReceiptChange}
            disabled={disabled}
            required
            showInstructions
          />
          {receiptError && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              {receiptError}
            </p>
          )}
          <p className="mt-2 flex items-start gap-1 text-xs text-gray-500">
            <Info className="mt-0.5 h-3 w-3 shrink-0" />
            Upload a clear photo of your payment receipt. Admin will verify before confirming registration.
          </p>
        </FormField>
      )}
    </div>
  )
}
