import { api, ApiError } from './client';
import { formatDate } from '@/lib/utils';

// ============================================
// Admission Settings Types
// ============================================

export interface AdmissionSetting {
  id: number;
  academicYear: string;
  sessionId: number;
  sessionName?: string;
  
  // Test Configuration
  isTestScheduled: boolean;
  testStartDate?: string;
  testEndDate?: string;
  defaultTestVenue?: string;
  defaultTestTime?: string;
  testDurationMinutes: number;
  
  // Registration Configuration
  registrationStartDate?: string;
  registrationEndDate?: string;
  registrationFee: number;
  isRegistrationOpen: boolean;
  
  // Payment Configuration
  easyPaisaAccountNumber?: string;
  easyPaisaAccountName?: string;
  bankAccountNumber?: string;
  bankAccountTitle?: string;
  bankName?: string;
  bankIBAN?: string;
  bankBranch?: string;
  
  // General Settings
  contactEmail?: string;
  contactPhone?: string;
  contactWhatsApp?: string;
  admissionInstructions?: string;
  testInstructions?: string;
  
  // Audit
  createdAt: string;
  updatedAt?: string;
  createdByUserId?: string;
  updatedByUserId?: string;
  isActive: boolean;
}

export interface AdmissionSettingCreateDto {
  academicYear: string;
  sessionId: number;
  isTestScheduled: boolean;
  testStartDate?: string;
  testEndDate?: string;
  defaultTestVenue?: string;
  defaultTestTime?: string;
  testDurationMinutes: number;
  registrationStartDate?: string;
  registrationEndDate?: string;
  registrationFee: number;
  isRegistrationOpen: boolean;
  easyPaisaAccountNumber?: string;
  easyPaisaAccountName?: string;
  bankAccountNumber?: string;
  bankAccountTitle?: string;
  bankName?: string;
  bankIBAN?: string;
  bankBranch?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactWhatsApp?: string;
  admissionInstructions?: string;
  testInstructions?: string;
}

export interface AdmissionSettingUpdateDto extends Partial<AdmissionSettingCreateDto> {
  id: number;
}

// ============================================
// Admission Criteria Types
// ============================================

export interface AdmissionCriteria {
  id: number;
  gradeId: number;
  gradeName?: string;
  minimumPassingMarks: number;
  minimumMarksForScholarship: number;
  totalTestMarks: number;
  hasSeparateTest: boolean;
  gradeSpecificTestDate?: string;
  gradeSpecificTestVenue?: string;
  gradeSpecificTestTime?: string;
  academicYear: string;
  sessionId: number;
  sessionName?: string;
  maximumSeats?: number;
  scholarshipSeats?: number;
  createdAt: string;
  updatedAt?: string;
  isActive: boolean;
}

export interface AdmissionCriteriaCreateDto {
  gradeId: number;
  minimumPassingMarks: number;
  minimumMarksForScholarship: number;
  totalTestMarks: number;
  hasSeparateTest: boolean;
  gradeSpecificTestDate?: string;
  gradeSpecificTestVenue?: string;
  gradeSpecificTestTime?: string;
  academicYear: string;
  sessionId: number;
  maximumSeats?: number;
  scholarshipSeats?: number;
}

export interface AdmissionCriteriaUpdateDto extends Partial<AdmissionCriteriaCreateDto> {
  id: number;
}

// ============================================
// Scholarship Type Types
// ============================================

export interface ScholarshipType {
  id: number;
  name: string;
  description?: string;
  minimumAmount?: number;
  maximumAmount?: number;
  amountRange?: string;
  criteria?: string;
  minimumMarksRequired?: number;
  requiredDocuments?: string;
  requiresVerification: boolean;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt?: string;
}

export interface ScholarshipTypeCreateDto {
  name: string;
  description?: string;
  minimumAmount?: number;
  maximumAmount?: number;
  amountRange?: string;
  criteria?: string;
  minimumMarksRequired?: number;
  requiredDocuments?: string;
  requiresVerification: boolean;
  displayOrder: number;
}

export interface ScholarshipTypeUpdateDto extends Partial<ScholarshipTypeCreateDto> {
  id: number;
}

// ============================================
// Admission Settings API Functions
// ============================================

export async function getAllAdmissionSettings(): Promise<AdmissionSetting[]> {
  try {
    const response = await api.get<AdmissionSetting[]>('/api/admission-settings');
    return response as AdmissionSetting[];
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to fetch admission settings.');
  }
}

export async function getAdmissionSettingById(id: number): Promise<AdmissionSetting> {
  try {
    const response = await api.get<AdmissionSetting>(`/api/admission-settings/${id}`);
    return response as AdmissionSetting;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to fetch admission setting.');
  }
}

export async function getActiveAdmissionSetting(): Promise<AdmissionSetting | null> {
  try {
    const response = await api.get<AdmissionSetting>('/api/admission-settings/active');
    return response as AdmissionSetting;
  } catch (error) {
    const apiError = error as ApiError;
    // If no active setting found, return null instead of throwing
    if (apiError.statusCode === 404) {
      return null;
    }
    throw new Error(apiError.message || 'Unable to fetch active admission setting.');
  }
}

export interface AdmissionSettingSummary {
  academicYear: string;
  sessionId: number;
  sessionName?: string;
  registrationStartDate?: string;
  registrationEndDate?: string;
  isRegistrationOpen: boolean;
}

export function deriveRegistrationStatus(setting: AdmissionSetting | null): {
  isOpen: boolean;
  message: string;
  reason?: 'not-configured' | 'not-started' | 'ended' | 'closed';
  window?: { start?: string; end?: string };
} {
  if (!setting) {
    return {
      isOpen: false,
      message: 'Registration window is not configured yet.',
      reason: 'not-configured',
    }
  }

  if (!setting.registrationStartDate || !setting.registrationEndDate) {
    return {
      isOpen: setting.isRegistrationOpen,
      message: setting.isRegistrationOpen
        ? 'Registrations are manually open, but no date range is configured.'
        : 'Registrations are currently closed.',
      reason: setting.isRegistrationOpen ? undefined : 'closed',
      window: {
        start: setting.registrationStartDate ?? undefined,
        end: setting.registrationEndDate ?? undefined,
      },
    }
  }

  const now = new Date()
  const start = new Date(setting.registrationStartDate)
  const end = new Date(setting.registrationEndDate)

  if (now < start) {
    return {
      isOpen: false,
      message: `Registrations will open on ${formatDate(start)}.`,
      reason: 'not-started',
      window: { start: start.toISOString(), end: end.toISOString() },
    }
  }

  if (now > end) {
    return {
      isOpen: false,
      message: `Registrations closed on ${formatDate(end)}.`,
      reason: 'ended',
      window: { start: start.toISOString(), end: end.toISOString() },
    }
  }

  return {
    isOpen: setting.isRegistrationOpen,
    message: setting.isRegistrationOpen
      ? 'Registrations are currently open.'
      : 'Registrations are currently closed.',
    reason: setting.isRegistrationOpen ? undefined : 'closed',
    window: { start: start.toISOString(), end: end.toISOString() },
  }
}

export async function createAdmissionSetting(data: AdmissionSettingCreateDto): Promise<AdmissionSetting> {
  try {
    const response = await api.post<AdmissionSetting>('/api/admission-settings', data);
    return response as AdmissionSetting;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to create admission setting.');
  }
}

export async function updateAdmissionSetting(id: number, data: AdmissionSettingUpdateDto): Promise<AdmissionSetting> {
  try {
    const response = await api.put<AdmissionSetting>(`/api/admission-settings/${id}`, data);
    return response as AdmissionSetting;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to update admission setting.');
  }
}

export async function deleteAdmissionSetting(id: number): Promise<void> {
  try {
    await api.delete(`/api/admission-settings/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to delete admission setting.');
  }
}

export async function activateAdmissionSetting(id: number): Promise<AdmissionSetting> {
  try {
    const response = await api.post<AdmissionSetting>(`/api/admission-settings/${id}/activate`, {});
    return response as AdmissionSetting;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to activate admission setting.');
  }
}

// ============================================
// Admission Criteria API Functions
// ============================================

export async function getAllAdmissionCriteria(): Promise<AdmissionCriteria[]> {
  try {
    const response = await api.get<AdmissionCriteria[]>('/api/admission-criteria');
    return response as AdmissionCriteria[];
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to fetch admission criteria.');
  }
}

export async function getAdmissionCriteriaById(id: number): Promise<AdmissionCriteria> {
  try {
    const response = await api.get<AdmissionCriteria>(`/api/admission-criteria/${id}`);
    return response as AdmissionCriteria;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to fetch admission criteria.');
  }
}

export async function getAdmissionCriteriaByGrade(gradeId: number): Promise<AdmissionCriteria | null> {
  try {
    const response = await api.get<AdmissionCriteria>(`/api/admission-criteria/grade/${gradeId}`);
    return response as AdmissionCriteria;
  } catch (error) {
    const apiError = error as ApiError;
    if (apiError.statusCode === 404) {
      return null;
    }
    throw new Error(apiError.message || 'Unable to fetch admission criteria for grade.');
  }
}

export async function getAdmissionCriteriaBySession(sessionId: number): Promise<AdmissionCriteria[]> {
  try {
    const response = await api.get<AdmissionCriteria[]>(`/api/admission-criteria/session/${sessionId}`);
    return response as AdmissionCriteria[];
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to fetch admission criteria for session.');
  }
}

export async function createAdmissionCriteria(data: AdmissionCriteriaCreateDto): Promise<AdmissionCriteria> {
  try {
    const response = await api.post<AdmissionCriteria>('/api/admission-criteria', data);
    return response as AdmissionCriteria;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to create admission criteria.');
  }
}

export async function updateAdmissionCriteria(id: number, data: AdmissionCriteriaUpdateDto): Promise<AdmissionCriteria> {
  try {
    const response = await api.put<AdmissionCriteria>(`/api/admission-criteria/${id}`, data);
    return response as AdmissionCriteria;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to update admission criteria.');
  }
}

export async function deleteAdmissionCriteria(id: number): Promise<void> {
  try {
    await api.delete(`/api/admission-criteria/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to delete admission criteria.');
  }
}

export async function bulkCreateAdmissionCriteria(data: AdmissionCriteriaCreateDto[]): Promise<AdmissionCriteria[]> {
  try {
    const response = await api.post<AdmissionCriteria[]>('/api/admission-criteria/bulk', data);
    return response as AdmissionCriteria[];
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to bulk create admission criteria.');
  }
}

// ============================================
// Scholarship Types API Functions
// ============================================

export async function getAllScholarshipTypes(): Promise<ScholarshipType[]> {
  try {
    const response = await api.get<ScholarshipType[]>('/api/scholarship-types');
    return response as ScholarshipType[];
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to fetch scholarship types.');
  }
}

export async function getScholarshipTypeById(id: number): Promise<ScholarshipType> {
  try {
    const response = await api.get<ScholarshipType>(`/api/scholarship-types/${id}`);
    return response as ScholarshipType;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to fetch scholarship type.');
  }
}

export async function createScholarshipType(data: ScholarshipTypeCreateDto): Promise<ScholarshipType> {
  try {
    const response = await api.post<ScholarshipType>('/api/scholarship-types', data);
    return response as ScholarshipType;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to create scholarship type.');
  }
}

export async function updateScholarshipType(id: number, data: ScholarshipTypeUpdateDto): Promise<ScholarshipType> {
  try {
    const response = await api.put<ScholarshipType>(`/api/scholarship-types/${id}`, data);
    return response as ScholarshipType;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to update scholarship type.');
  }
}

export async function deleteScholarshipType(id: number): Promise<void> {
  try {
    await api.delete(`/api/scholarship-types/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to delete scholarship type.');
  }
}

export async function toggleScholarshipTypeActive(id: number): Promise<ScholarshipType> {
  try {
    const response = await api.post<ScholarshipType>(`/api/scholarship-types/${id}/toggle-active`, {});
    return response as ScholarshipType;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to toggle scholarship type active status.');
  }
}

