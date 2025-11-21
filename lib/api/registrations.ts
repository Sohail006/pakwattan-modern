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
	boarderDayScholar: number; // 0 Boarder, 1 DayScholar
	paymentMethod: number; // 0 EasyPaisa, 1 BankAccount, 2 ByHandOnTestDate
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
	boarderDayScholar: string;
	paymentMethod: string;
	rollNumber?: string;
	testVenue?: string;
	testDate?: string;
	testTime?: string;
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
            boarderDayScholar: data.boarderDayScholar,
            paymentMethod: data.paymentMethod,
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
