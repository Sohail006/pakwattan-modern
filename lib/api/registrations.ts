import { api, ApiError } from './client';

export interface RegistrationRequest {
	name: string;
	fatherName: string;
	dob: string | Date;
	gender: number; // 0 Male, 1 Female, 2 Other
	formBorCNIC?: string;
	mobile: string;
	whatsApp?: string;
	email?: string;
	address1?: string;
	previousSchoolName?: string;
	gradeId: number;
	motherName?: string;
	fatherOccupation?: string;
	phone?: string;
	profilePictureUrl?: string;
	applyForScholarship: boolean;
	scholarshipType?: number; // Only if applyForScholarship is true
	paymentMethod: number; // 0 EasyPaisa, 1 BankAccount, 2 ByHandOnTestDate
	transactionReceiptUrl?: string; // Receipt image URL (required for EasyPaisa/BankAccount)
}

export interface RegistrationResponse {
	id: number;
	name: string;
	fatherName: string;
	dob: string;
	gender: string;
	formBorCNIC?: string;
	mobile?: string;
	whatsApp?: string;
	email?: string;
	address1?: string;
	previousSchoolName?: string;
	gradeId: number;
	gradeName?: string;
	motherName?: string;
	fatherOccupation?: string;
	phone?: string;
	profilePictureUrl?: string;
	applyForScholarship: boolean;
	scholarshipType?: string;
	paymentMethod: string;
	paymentStatus?: string; // "Paid" | "Unpaid" | "Pending"
	transactionReceiptUrl?: string; // Receipt image URL
	receiptVerificationStatus?: string; // "Pending" | "Verified" | "Rejected"
	receiptVerifiedBy?: string;
	receiptVerifiedAt?: string;
	receiptVerificationNotes?: string;
	rollNumber?: string;
	testVenue?: string;
	testDate?: string;
	testTime?: string;
	/** Entry / written test marks (separate from interview marks). */
	testMarks?: number;
	interviewMarks?: number;
	interviewRemarks?: string;
	registrationDate: string;
	isActive: boolean;
}

function pickOptionalNumber(obj: Record<string, unknown>, ...keys: string[]): number | undefined {
	for (const key of keys) {
		const v = obj[key];
		if (v == null || v === '') continue;
		const n = Number(v);
		if (Number.isFinite(n)) return n;
	}
	return undefined;
}

function pickOptionalString(obj: Record<string, unknown>, ...keys: string[]): string | undefined {
	for (const key of keys) {
		const v = obj[key];
		if (v == null) continue;
		const s = String(v);
		if (s !== '') return s;
	}
	return undefined;
}

/**
 * Aligns API JSON with RegistrationResponse (camelCase / PascalCase from proxies or older clients).
 * Keeps testMarks, interviewMarks, interviewRemarks in sync with the database fields.
 */
export function normalizeRegistration(data: unknown): RegistrationResponse {
	const base = data as RegistrationResponse;
	const r = data as Record<string, unknown>;
	const testMarks = pickOptionalNumber(r, 'testMarks', 'TestMarks') ?? base.testMarks;
	const interviewMarks = pickOptionalNumber(r, 'interviewMarks', 'InterviewMarks') ?? base.interviewMarks;
	const interviewRemarks = pickOptionalString(r, 'interviewRemarks', 'InterviewRemarks') ?? base.interviewRemarks;
	return { ...base, testMarks, interviewMarks, interviewRemarks };
}

/** Interview marks for display/save; falls back to legacy data stored in testMarks when remarks exist. */
export function resolveInterviewMarks(reg: RegistrationResponse): number | undefined {
	if (reg.interviewMarks != null && !Number.isNaN(Number(reg.interviewMarks))) {
		return Number(reg.interviewMarks);
	}
	if (reg.interviewRemarks?.trim() && reg.testMarks != null && !Number.isNaN(Number(reg.testMarks))) {
		return Number(reg.testMarks);
	}
	return undefined;
}

export async function submitRegistration(data: RegistrationRequest): Promise<RegistrationResponse> {
	try {
        const payload = {
            name: data.name,
            fatherName: data.fatherName,
            dob: (data.dob instanceof Date ? data.dob : new Date(data.dob)).toISOString(),
            gender: data.gender,
            formBorCNIC: data.formBorCNIC,
            mobile: data.mobile,
            whatsApp: data.whatsApp,
            email: data.email,
            address1: data.address1,
            previousSchoolName: data.previousSchoolName,
            gradeId: data.gradeId,
            motherName: data.motherName,
            fatherOccupation: data.fatherOccupation,
            phone: data.phone,
            profilePictureUrl: data.profilePictureUrl,
            applyForScholarship: data.applyForScholarship,
            scholarshipType: data.applyForScholarship && data.scholarshipType !== undefined ? data.scholarshipType : null,
            paymentMethod: data.paymentMethod,
            transactionReceiptUrl: data.transactionReceiptUrl,
        };

        const response = await api.post<RegistrationResponse>('/api/registrations', payload);
        return normalizeRegistration(response);
	} catch (error) {
		const apiError = error as ApiError;
		throw new Error(apiError.message || 'Unable to submit registration. Please check your information and try again.');
	}
}

export async function getAllRegistrations(): Promise<RegistrationResponse[]> {
	try {
		const response = await api.get<RegistrationResponse[]>('/api/registrations');
		return (response as unknown[]).map((row) => normalizeRegistration(row));
	} catch (error) {
		const apiError = error as ApiError;
		throw new Error(apiError.message || 'Unable to fetch registrations.');
	}
}

export async function getRegistrationById(id: number): Promise<RegistrationResponse> {
	try {
		const response = await api.get<RegistrationResponse>(`/api/registrations/${id}`);
		return normalizeRegistration(response);
	} catch (error) {
		const apiError = error as ApiError;
		throw new Error(apiError.message || 'Unable to fetch registration.');
	}
}

export async function deleteRegistration(id: number): Promise<void> {
	try {
		await api.delete(`/api/registrations/${id}`);
	} catch (error) {
		const apiError = error as ApiError;
		throw new Error(apiError.message || 'Unable to delete registration.');
	}
}

/**
 * Upload receipt image (images only - JPG, JPEG, PNG)
 */
export async function uploadReceiptImage(file: File): Promise<string> {
	try {
		const formData = new FormData()
		formData.append('file', file)
		
		const response = await api.postFormData<{ receiptUrl: string }>(
			'/api/registrations/upload-receipt',
			formData
		)
		
		return response.receiptUrl
	} catch (error) {
		const apiError = error as ApiError
		throw new Error(apiError.message || 'Unable to upload receipt. Please ensure the file is a valid image and try again.')
	}
}

/**
 * Verify receipt (Admin only)
 */
export async function verifyReceipt(
	registrationId: number,
	verificationStatus: 'Verified' | 'Rejected',
	verificationNotes?: string
): Promise<RegistrationResponse> {
	try {
		const response = await api.post<RegistrationResponse>(
			`/api/registrations/${registrationId}/verify-receipt`,
			{
				verificationStatus,
				verificationNotes,
			}
		)
		return normalizeRegistration(response)
	} catch (error) {
		const apiError = error as ApiError
		throw new Error(apiError.message || 'Unable to verify receipt.')
	}
}

/**
 * Save interview assessment details (Admin/Staff only).
 *
 * Calls PUT /api/registrations/{id} on the backend (RegistrationUpdateDto: testMarks, interviewMarks, interviewRemarks).
 * Do not use fetch('/api/.../interview-assessment'): next.config.js rewrites all /api/* to the ASP.NET host,
 * so that URL hits the API directly — and there is no interview-assessment route there (404).
 * The shared api client uses NEXT_PUBLIC_BACKEND_BASE_URL and bypasses the rewrite.
 */
export async function saveInterviewAssessment(
	registrationId: number,
	interviewMarks: number,
	interviewRemarks: string
): Promise<RegistrationResponse> {
	try {
		const response = await api.put<RegistrationResponse>(`/api/registrations/${registrationId}`, {
			interviewMarks,
			// Same value as InterviewMarks column so TestMarks stays aligned with DB (API mirrors both).
			testMarks: interviewMarks,
			interviewRemarks,
		})
		return normalizeRegistration(response)
	} catch (error) {
		const apiError = error as ApiError
		throw new Error(apiError.message || 'Unable to save interview assessment.')
	}
}
