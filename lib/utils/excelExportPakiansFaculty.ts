import * as XLSX from 'xlsx'
import type { PakiansFacultyRegistrationResponse } from '@/lib/api/pakiansFaculty'
import { formatDate } from '@/lib/utils'

function staffCategoryLabel(value: string): string {
  return value === 'NonTeaching' ? 'Non-Teaching' : 'Teaching'
}

function roleTypeLabel(value?: string | null): string {
  if (!value) return ''
  return value === 'WingIncharge' ? 'Wing Incharge' : value
}

function verificationLabel(value: string): string {
  if (value === 'Verified') return 'School Faculty (Verified)'
  if (value === 'Rejected') return 'Not School Faculty (Rejected)'
  return 'Pending Review'
}

export function exportPakiansFacultyToExcel(
  registrations: PakiansFacultyRegistrationResponse[],
  filename?: string
): void {
  if (!registrations?.length) {
    throw new Error('No faculty registrations to export')
  }

  if (!XLSX?.utils) {
    throw new Error('Excel library not loaded. Please refresh the page and try again.')
  }

  const excelData = registrations.map((row) => ({
    ID: row.id,
    Name: row.name,
    "Father's Name": row.fatherName,
    'Staff Category': staffCategoryLabel(row.staffCategory),
    'Role Type': roleTypeLabel(row.roleType),
    Wing: row.wing || '',
    'Subject Taught': row.subjectTaught || '',
    'Role Name': row.roleName || '',
    'Highest Qualification': row.highestQualification,
    'Experience (Years)': row.experienceYears,
    Mobile: row.mobileNumber,
    WhatsApp: row.whatsAppNumber,
    'Verification Status': verificationLabel(row.verificationStatus),
    Active: row.isActive ? 'Yes' : 'No',
    'Registration Date': row.registrationDate ? formatDate(row.registrationDate) : '',
    'Verified At': row.verifiedAt ? formatDate(row.verifiedAt) : '',
    Notes: row.verificationNotes || '',
  }))

  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(excelData)

  worksheet['!cols'] = [
    { wch: 6 },
    { wch: 24 },
    { wch: 22 },
    { wch: 14 },
    { wch: 14 },
    { wch: 36 },
    { wch: 30 },
    { wch: 22 },
    { wch: 24 },
    { wch: 12 },
    { wch: 14 },
    { wch: 14 },
    { wch: 28 },
    { wch: 8 },
    { wch: 16 },
    { wch: 16 },
    { wch: 30 },
  ]

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Pakians Faculty')

  const dateStamp = new Date().toISOString().slice(0, 10)
  const outputName = filename || `pakians-faculty-registrations-${dateStamp}.xlsx`
  XLSX.writeFile(workbook, outputName)
}
