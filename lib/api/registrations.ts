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
	testMarks?: number;
	interviewRemarks?: string;
	registrationDate: string;
	isActive: boolean;
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
        return response as RegistrationResponse;
	} catch (error) {
		const apiError = error as ApiError;
		throw new Error(apiError.message || 'Unable to submit registration. Please check your information and try again.');
	}
}

export async function getAllRegistrations(): Promise<RegistrationResponse[]> {
	try {
		const response = await api.get<RegistrationResponse[]>('/api/registrations');
		return response as RegistrationResponse[];
	} catch (error) {
		const apiError = error as ApiError;
		throw new Error(apiError.message || 'Unable to fetch registrations.');
	}
}

export async function getRegistrationById(id: number): Promise<RegistrationResponse> {
	try {
		const response = await api.get<RegistrationResponse>(`/api/registrations/${id}`);
		return response as RegistrationResponse;
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
		return response
	} catch (error) {
		const apiError = error as ApiError
		throw new Error(apiError.message || 'Unable to verify receipt.')
	}
}

/**
 * Save interview assessment details (Admin/Staff only)
 */
export async function saveInterviewAssessment(
	registrationId: number,
	testMarks: number,
	interviewRemarks: string
): Promise<RegistrationResponse> {
	try {
		const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
		const response = await fetch(`/api/registrations/${registrationId}/interview-assessment`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			body: JSON.stringify({
				testMarks,
				interviewRemarks,
			}),
		})

		let data: unknown = null
		try {
			data = await response.json()
		} catch {
			data = null
		}

		if (!response.ok) {
			const err = data as { error?: string; message?: string } | null
			throw new Error(err?.error || err?.message || 'Unable to save interview assessment.')
		}

		return data as RegistrationResponse
	} catch (error) {
		const apiError = error as ApiError
		throw new Error(apiError.message || 'Unable to save interview assessment.')
	}
}
