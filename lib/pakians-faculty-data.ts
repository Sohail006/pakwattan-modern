export const PAKIANS_FACULTY_PAGE_TITLE = 'Pakians Faculty Registration'

export const PAKIANS_FACULTY_WINGS = [
  'Montessori wing',
  'Primary wing (1st to 7th)',
  'Boys wing Middle section (5th to 7th Boys)',
  'Boys wing senior section (8th to 2nd year)',
  'Girls wing (8th to second year)',
] as const

export type PakiansFacultyWing = (typeof PAKIANS_FACULTY_WINGS)[number]

export type PakiansFacultyStaffCategory = 'Teaching' | 'NonTeaching'
export type PakiansFacultyRoleType = 'Teacher' | 'WingIncharge'
export type PakiansFacultyVerificationStatus = 'Pending' | 'Verified' | 'Rejected'

export const PAKIANS_FACULTY_STAFF_CATEGORY_OPTIONS: {
  value: PakiansFacultyStaffCategory
  label: string
  description: string
}[] = [
  {
    value: 'Teaching',
    label: 'Teaching',
    description: 'Classroom teachers, subject specialists, wing incharges',
  },
  {
    value: 'NonTeaching',
    label: 'Non-Teaching',
    description: 'Administrative, support, and operational staff',
  },
]

export const PAKIANS_FACULTY_ROLE_TYPE_OPTIONS: {
  value: PakiansFacultyRoleType
  label: string
}[] = [
  { value: 'Teacher', label: 'Teacher' },
  { value: 'WingIncharge', label: 'Wing Incharge' },
]
