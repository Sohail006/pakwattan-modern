import { api, ApiError } from './client'

export type PakiansFacultyStaffCategory = 'Teaching' | 'NonTeaching'
export type PakiansFacultyRoleType = 'Teacher' | 'WingIncharge'
export type PakiansFacultyVerificationStatus = 'Pending' | 'Verified' | 'Rejected'

export interface PakiansFacultySubmitRequest {
  name: string
  fatherName: string
  profileImageUrl: string
  mobileNumber: string
  whatsAppNumber: string
  staffCategory: PakiansFacultyStaffCategory
  roleType?: PakiansFacultyRoleType | null
  wing?: string | null
  subjectTaught?: string | null
  roleName?: string | null
  highestQualification: string
  experienceYears: number
}

export interface PakiansFacultyRegistrationResponse {
  id: number
  name: string
  fatherName: string
  profileImageUrl: string
  mobileNumber: string
  whatsAppNumber: string
  staffCategory: PakiansFacultyStaffCategory
  roleType?: string | null
  wing?: string | null
  subjectTaught?: string | null
  roleName?: string | null
  highestQualification: string
  experienceYears: number
  verificationStatus: PakiansFacultyVerificationStatus
  verifiedBy?: string | null
  verifiedAt?: string | null
  verificationNotes?: string | null
  isActive: boolean
  registrationDate: string
}

function normalizeRow(data: unknown): PakiansFacultyRegistrationResponse {
  const r = data as Record<string, unknown>
  return {
    id: Number(r.id ?? r.Id),
    name: String(r.name ?? r.Name ?? ''),
    fatherName: String(r.fatherName ?? r.FatherName ?? ''),
    profileImageUrl: String(r.profileImageUrl ?? r.ProfileImageUrl ?? ''),
    mobileNumber: String(r.mobileNumber ?? r.MobileNumber ?? ''),
    whatsAppNumber: String(r.whatsAppNumber ?? r.WhatsAppNumber ?? ''),
    staffCategory: String(r.staffCategory ?? r.StaffCategory ?? '') as PakiansFacultyStaffCategory,
    roleType: (r.roleType ?? r.RoleType) as string | null | undefined,
    wing: (r.wing ?? r.Wing) as string | null | undefined,
    subjectTaught: (r.subjectTaught ?? r.SubjectTaught) as string | null | undefined,
    roleName: (r.roleName ?? r.RoleName) as string | null | undefined,
    highestQualification: String(r.highestQualification ?? r.HighestQualification ?? ''),
    experienceYears: Number(r.experienceYears ?? r.ExperienceYears ?? 0),
    verificationStatus: String(
      r.verificationStatus ?? r.VerificationStatus ?? 'Pending'
    ) as PakiansFacultyVerificationStatus,
    verifiedBy: (r.verifiedBy ?? r.VerifiedBy) as string | null | undefined,
    verifiedAt: (r.verifiedAt ?? r.VerifiedAt) as string | null | undefined,
    verificationNotes: (r.verificationNotes ?? r.VerificationNotes) as string | null | undefined,
    isActive: Boolean(r.isActive ?? r.IsActive ?? true),
    registrationDate: String(r.registrationDate ?? r.RegistrationDate ?? ''),
  }
}

function extractErrorMessage(error: unknown): string {
  const apiError = error as ApiError
  return apiError.message || 'Something went wrong. Please try again.'
}

export async function submitPakiansFacultyRegistration(
  payload: PakiansFacultySubmitRequest
): Promise<PakiansFacultyRegistrationResponse> {
  try {
    const response = await api.post<unknown>('/api/pakians-faculty', payload)
    return normalizeRow(response)
  } catch (error) {
    throw new Error(extractErrorMessage(error))
  }
}

export async function getAllPakiansFacultyRegistrations(): Promise<PakiansFacultyRegistrationResponse[]> {
  try {
    const response = await api.get<unknown[]>('/api/pakians-faculty')
    return (response ?? []).map(normalizeRow)
  } catch (error) {
    throw new Error(extractErrorMessage(error))
  }
}

export async function updatePakiansFacultyVerification(
  id: number,
  verificationStatus: PakiansFacultyVerificationStatus,
  verificationNotes?: string
): Promise<PakiansFacultyRegistrationResponse> {
  try {
    const response = await api.post<unknown>(`/api/pakians-faculty/${id}/verification`, {
      verificationStatus,
      verificationNotes: verificationNotes ?? null,
    })
    return normalizeRow(response)
  } catch (error) {
    throw new Error(extractErrorMessage(error))
  }
}

export async function updatePakiansFacultyActiveStatus(
  id: number,
  isActive: boolean
): Promise<PakiansFacultyRegistrationResponse> {
  try {
    const response = await api.put<unknown>(`/api/pakians-faculty/${id}/active-status`, { isActive })
    return normalizeRow(response)
  } catch (error) {
    throw new Error(extractErrorMessage(error))
  }
}

export async function deletePakiansFacultyRegistration(id: number): Promise<void> {
  try {
    await api.delete(`/api/pakians-faculty/${id}`)
  } catch (error) {
    throw new Error(extractErrorMessage(error))
  }
}
