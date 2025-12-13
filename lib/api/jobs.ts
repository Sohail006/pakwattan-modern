import { api, ApiError } from './client';

export interface JobOpportunity {
	id: number;
	name: string;
	fatherName: string;
	gender?: string;
	mobileNumber: string;
	whatsAppNumber?: string;
	fieldExperiencedInYears?: number;
	subjectTought?: string;
	packageDemand?: string;
	dob?: string;
	creationDate: string;
	modificationDate?: string;
	isActive: boolean;
}

export interface JobOpportunityCreateRequest {
	name: string;
	fatherName: string;
	gender?: number; // 0 = Male, 1 = Female, 2 = Other
	mobileNumber: string;
	whatsAppNumber?: string;
	fieldExperiencedInYears?: number;
	subjectTought?: string;
	packageDemand?: string;
	dob?: string | Date;
}

export async function submitJobApplication(data: JobOpportunityCreateRequest): Promise<JobOpportunity> {
	try {
		const payload = {
			name: data.name,
			fatherName: data.fatherName,
			gender: data.gender,
			mobileNumber: data.mobileNumber,
			whatsAppNumber: data.whatsAppNumber,
			fieldExperiencedInYears: data.fieldExperiencedInYears,
			subjectTought: data.subjectTought,
			packageDemand: data.packageDemand,
			dob: data.dob ? (data.dob instanceof Date ? data.dob : new Date(data.dob)).toISOString() : null,
		};

		const response = await api.post<JobOpportunity>('/api/jobs', payload);
		return response as JobOpportunity;
	} catch (error) {
		const apiError = error as ApiError;
		throw new Error(apiError.message || 'Unable to submit job application. Please check your information and try again.');
	}
}

export async function getAllJobApplications(): Promise<JobOpportunity[]> {
	try {
		const response = await api.get<JobOpportunity[]>('/api/jobs');
		return response as JobOpportunity[];
	} catch (error) {
		const apiError = error as ApiError;
		throw new Error(apiError.message || 'Unable to fetch job applications.');
	}
}

export async function getJobApplicationById(id: number): Promise<JobOpportunity> {
	try {
		const response = await api.get<JobOpportunity>(`/api/jobs/${id}`);
		return response as JobOpportunity;
	} catch (error) {
		const apiError = error as ApiError;
		throw new Error(apiError.message || 'Unable to fetch job application.');
	}
}

export async function deleteJobApplication(id: number): Promise<void> {
	try {
		await api.delete(`/api/jobs/${id}`);
	} catch (error) {
		const apiError = error as ApiError;
		throw new Error(apiError.message || 'Unable to delete job application.');
	}
}

export interface BulkImportResponse {
	successCount: number;
	failedCount: number;
	errors: string[];
}

export async function bulkImportJobApplications(
	jobs: JobOpportunityCreateRequest[]
): Promise<BulkImportResponse> {
	try {
		// Prepare payload - convert Date objects to ISO strings
		const payload = jobs.map((job) => ({
			name: job.name,
			fatherName: job.fatherName,
			gender: job.gender,
			mobileNumber: job.mobileNumber,
			whatsAppNumber: job.whatsAppNumber,
			fieldExperiencedInYears: job.fieldExperiencedInYears,
			subjectTought: job.subjectTought,
			packageDemand: job.packageDemand,
			dob: job.dob ? (job.dob instanceof Date ? job.dob : new Date(job.dob)).toISOString() : null,
		}));

		const response = await api.post<BulkImportResponse>('/api/jobs/bulk-import', payload);
		return response as BulkImportResponse;
	} catch (error) {
		const apiError = error as ApiError;
		throw new Error(apiError.message || 'Unable to import job applications.');
	}
}

