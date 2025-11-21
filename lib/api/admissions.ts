import { api, ApiError } from './client';

export interface AdmissionRequest {
	studentName: string;
	dateOfBirth: string | Date;
	classApplying?: string;
	previousSchool?: string;
	fatherName: string;
	address?: string;
	phone?: string;
	emergencyContact?: string;
	profilePictureUrl?: string;
}

export async function submitAdmission(data: AdmissionRequest) {
	try {
		const payload = {
			studentName: data.studentName,
			dateOfBirth: (data.dateOfBirth instanceof Date ? data.dateOfBirth : new Date(data.dateOfBirth)).toISOString(),
			classApplying: data.classApplying,
			previousSchool: data.previousSchool,
			fatherName: data.fatherName,
			address: data.address,
			phone: data.phone,
			emergencyContact: data.emergencyContact,
			profilePictureUrl: data.profilePictureUrl,
		};

		return await api.post('/api/admissions', payload);
	} catch (error) {
		const apiError = error as ApiError;
		throw new Error(apiError.message || 'Unable to submit admission application. Please check your information and try again.');
	}
}
