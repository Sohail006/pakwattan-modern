import * as XLSX from 'xlsx'
import type { TalentHuntSeason3RegistrationResponse } from '@/lib/api/talentHuntSeason3'
import { formatDate } from '@/lib/utils'
import { formatPaymentMethod, getPaymentStatusDisplay, getReceiptStatusDisplay } from '@/lib/utils/paymentHelpers'

export function exportTalentHuntSeason3ToExcel(
  registrations: TalentHuntSeason3RegistrationResponse[],
  filename?: string
): void {
  if (!registrations?.length) {
    throw new Error('No registrations to export')
  }

  if (!XLSX?.utils) {
    throw new Error('Excel library not loaded. Please refresh the page and try again.')
  }

  const excelData = registrations.map((row) => {
    const isParticipant = row.registrationType === 'Participant'
    const paymentMethodDisplay = formatPaymentMethod(row.paymentMethod)
    const paymentStatusDisplay = getPaymentStatusDisplay(row.paymentStatus, row.paymentMethod)
    const receiptStatusDisplay = getReceiptStatusDisplay(
      row.transactionReceiptUrl,
      row.receiptVerificationStatus,
      row.paymentMethod
    )

    return {
      ID: row.id,
      Type: row.registrationType,
      'Student / Institution Name': isParticipant ? row.studentName || '' : row.institutionName || '',
      "Father's Name": isParticipant ? row.fatherName || '' : '',
      Gender: isParticipant ? row.gender || '' : '',
      Grade: isParticipant ? row.grade || '' : '',
      School: isParticipant ? row.school || '' : '',
      'Contest Category': isParticipant ? row.contestCategory || '' : '',
      Address: isParticipant ? row.address || '' : '',
      Phone: isParticipant ? row.phone || '' : '',
      'Emergency Contact': isParticipant ? row.emergencyContact || '' : '',
      'Focal Person': !isParticipant ? row.focalPersonName || '' : '',
      'Focal Mobile': !isParticipant ? row.focalPersonMobile || '' : '',
      'Registration Fee (PKR)': row.registrationFee ?? '',
      'Payment Method': paymentMethodDisplay,
      'Payment Status': paymentStatusDisplay,
      'Receipt Status': receiptStatusDisplay,
      'Receipt Verified By': row.receiptVerifiedBy || '',
      'Receipt Verified At': row.receiptVerifiedAt ? formatDate(row.receiptVerifiedAt) : '',
      'Verification Notes': row.receiptVerificationNotes || '',
      'Registration Date': row.registrationDate ? formatDate(row.registrationDate) : '',
    }
  })

  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(excelData)

  worksheet['!cols'] = [
    { wch: 6 },
    { wch: 14 },
    { wch: 28 },
    { wch: 20 },
    { wch: 10 },
    { wch: 10 },
    { wch: 24 },
    { wch: 32 },
    { wch: 30 },
    { wch: 14 },
    { wch: 16 },
    { wch: 20 },
    { wch: 14 },
    { wch: 12 },
    { wch: 16 },
    { wch: 14 },
    { wch: 14 },
    { wch: 18 },
    { wch: 22 },
    { wch: 30 },
    { wch: 16 },
  ]

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Talent Hunt S3')

  const timestamp = new Date().toISOString().split('T')[0]
  const finalFilename = filename?.trim()
    ? `${filename.replace(/[<>:"/\\|?*]/g, '_')}.xlsx`
    : `TalentHunt_Season3_${timestamp}.xlsx`

  XLSX.writeFile(workbook, finalFilename)
}
