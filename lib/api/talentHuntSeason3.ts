import { api, ApiError } from './client'
import { TALENT_HUNT_SEASON3_TITLE } from '@/lib/talent-hunt-season3-data'

export type TalentHuntSeason3RegistrationType = 'Participant' | 'Institution'

export interface TalentHuntSeason3ParticipantRequest {
  registrationType: 'Participant'
  studentName: string
  fatherName: string
  gender: string
  phone: string
  grade: string
  school: string
  contestCategory: string
  address: string
  emergencyContact: string
  /** Optional — for Pak Wattan students tracking inter-house participation */
  house?: string
  paymentMethod: number
  transactionReceiptUrl?: string | null
  registrationFee: number
}

export interface TalentHuntSeason3InstitutionRequest {
  registrationType: 'Institution'
  institutionName: string
  focalPersonName: string
  focalPersonMobile: string
  paymentMethod: 1
  transactionReceiptUrl: string
  registrationFee: number
}

export type TalentHuntSeason3SubmitRequest =
  | TalentHuntSeason3ParticipantRequest
  | TalentHuntSeason3InstitutionRequest

export interface TalentHuntSeason3RegistrationResponse {
  id: number
  registrationType: TalentHuntSeason3RegistrationType
  studentName?: string
  fatherName?: string
  gender?: string
  phone?: string
  grade?: string
  school?: string
  contestCategory?: string
  address?: string
  emergencyContact?: string
  house?: string
  institutionName?: string
  focalPersonName?: string
  focalPersonMobile?: string
  paymentMethod: string
  paymentStatus?: string
  transactionReceiptUrl?: string
  receiptVerificationStatus?: string
  receiptVerifiedBy?: string
  receiptVerifiedAt?: string
  receiptVerificationNotes?: string
  registrationFee?: number
  registrationDate: string
  isActive?: boolean
}

function normalizeRow(data: unknown): TalentHuntSeason3RegistrationResponse {
  const r = data as Record<string, unknown>
  const base = data as TalentHuntSeason3RegistrationResponse
  return {
    ...base,
    id: Number(r.id ?? r.Id),
    registrationType: String(r.registrationType ?? r.RegistrationType ?? '') as TalentHuntSeason3RegistrationType,
    studentName: String(r.studentName ?? r.StudentName ?? base.studentName ?? ''),
    gender: String(r.gender ?? r.Gender ?? base.gender ?? ''),
    institutionName: String(r.institutionName ?? r.InstitutionName ?? base.institutionName ?? ''),
    focalPersonName: String(r.focalPersonName ?? r.FocalPersonName ?? base.focalPersonName ?? ''),
    focalPersonMobile: String(r.focalPersonMobile ?? r.FocalPersonMobile ?? base.focalPersonMobile ?? ''),
    paymentMethod: String(r.paymentMethod ?? r.PaymentMethod ?? base.paymentMethod ?? ''),
    paymentStatus: String(r.paymentStatus ?? r.PaymentStatus ?? base.paymentStatus ?? ''),
    transactionReceiptUrl: String(r.transactionReceiptUrl ?? r.TransactionReceiptUrl ?? base.transactionReceiptUrl ?? ''),
    receiptVerificationStatus: String(
      r.receiptVerificationStatus ?? r.ReceiptVerificationStatus ?? base.receiptVerificationStatus ?? ''
    ),
    registrationDate: String(r.registrationDate ?? r.RegistrationDate ?? base.registrationDate ?? ''),
  }
}

export async function submitTalentHuntSeason3Registration(
  data: TalentHuntSeason3SubmitRequest
): Promise<TalentHuntSeason3RegistrationResponse> {
  try {
    const response = await api.post<TalentHuntSeason3RegistrationResponse>('/api/TalentHunt/season3', data)
    return normalizeRow(response)
  } catch (error) {
    const apiError = error as ApiError
    throw new Error(apiError.message || 'Unable to submit registration. Please check your information and try again.')
  }
}

export async function getAllTalentHuntSeason3Registrations(): Promise<TalentHuntSeason3RegistrationResponse[]> {
  try {
    const response = await api.get<TalentHuntSeason3RegistrationResponse[]>('/api/TalentHunt/season3')
    return (response as unknown[]).map((row) => normalizeRow(row))
  } catch (error) {
    const apiError = error as ApiError
    throw new Error(apiError.message || `Unable to fetch ${TALENT_HUNT_SEASON3_TITLE} registrations.`)
  }
}

export async function verifyTalentHuntSeason3Receipt(
  registrationId: number,
  verificationStatus: 'Verified' | 'Rejected',
  verificationNotes?: string
): Promise<TalentHuntSeason3RegistrationResponse> {
  try {
    const response = await api.post<TalentHuntSeason3RegistrationResponse>(
      `/api/TalentHunt/season3/${registrationId}/verify-receipt`,
      { verificationStatus, verificationNotes }
    )
    return normalizeRow(response)
  } catch (error) {
    const apiError = error as ApiError
    throw new Error(apiError.message || 'Unable to verify receipt.')
  }
}

export async function deleteTalentHuntSeason3Registration(id: number): Promise<void> {
  try {
    await api.delete(`/api/TalentHunt/season3/${id}`)
  } catch (error) {
    const apiError = error as ApiError
    throw new Error(apiError.message || 'Unable to delete registration.')
  }
}
