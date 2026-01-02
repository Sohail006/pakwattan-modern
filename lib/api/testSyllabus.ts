// Model Papers API endpoints
import { api, ApiError } from './client';

export interface TestSyllabus {
	id: number;
	title: string;
	gradeId: number;
	gradeName?: string;
	academicYear?: number;
	contentType: 'PDF' | 'Text' | 'Both';
	contentTypeValue: 0 | 1 | 2; // 0 = PDF, 1 = Text, 2 = Both
	pdfUrl?: string;
	textContent?: string;
	description?: string;
	isActive: boolean;
	displayOrder: number;
	createdAt: string;
	updatedAt: string;
	createdByUserId?: number;
	updatedByUserId?: number;
}

export interface TestSyllabusCreate {
	title: string;
	gradeId: number;
	academicYear?: number;
	contentType: 0 | 1 | 2; // 0 = PDF, 1 = Text, 2 = Both
	pdfUrl?: string;
	textContent?: string;
	description?: string;
	displayOrder?: number;
	isActive?: boolean;
}

export interface TestSyllabusUpdate extends Partial<TestSyllabusCreate> {
	id: number;
}

export interface TestSyllabusQueryParams {
	gradeId?: number;
	academicYear?: number;
	isActive?: boolean;
}

/**
 * Get all model papers (admin only)
 */
export async function getTestSyllabi(params?: TestSyllabusQueryParams): Promise<TestSyllabus[]> {
	try {
		const queryParams = new URLSearchParams();
		if (params?.gradeId !== undefined) queryParams.append('gradeId', params.gradeId.toString());
		if (params?.academicYear !== undefined) queryParams.append('academicYear', params.academicYear.toString());
		if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
		
		const query = queryParams.toString();
		const endpoint = `/api/test-syllabus${query ? `?${query}` : ''}`;
		return await api.get<TestSyllabus[]>(endpoint);
	} catch (error) {
		const apiError = error as ApiError;
		throw new Error(apiError.message || 'Unable to load model papers. Please refresh the page and try again.');
	}
}

/**
 * Get model paper by ID (admin only)
 */
export async function getTestSyllabusById(id: number): Promise<TestSyllabus> {
	try {
		return await api.get<TestSyllabus>(`/api/test-syllabus/${id}`);
	} catch (error) {
		const apiError = error as ApiError;
		throw new Error(apiError.message || 'Unable to load model paper. Please try again.');
	}
}

/**
 * Get public model papers (no authentication required)
 */
export async function getTestSyllabiPublic(params?: {
	gradeId?: number;
}): Promise<TestSyllabus[]> {
	try {
		const queryParams = new URLSearchParams();
		if (params?.gradeId !== undefined) queryParams.append('gradeId', params.gradeId.toString());
		
		const query = queryParams.toString();
		const endpoint = `/api/test-syllabus/public${query ? `?${query}` : ''}`;
		return await api.get<TestSyllabus[]>(endpoint);
	} catch (error) {
		const apiError = error as ApiError;
		// Return empty array on error for public endpoint (graceful degradation)
		console.warn('[getTestSyllabiPublic] Failed to load model papers:', apiError.message);
		return [];
	}
}

/**
 * Create new model paper
 */
export async function createTestSyllabus(
	data: TestSyllabusCreate,
	pdfFile?: File
): Promise<TestSyllabus> {
	try {
		if (pdfFile) {
			// Upload PDF first
			const pdfUrl = await uploadSyllabusPdf(pdfFile);
			data.pdfUrl = pdfUrl.url;
		}
		
		return await api.post<TestSyllabus>('/api/test-syllabus', data);
	} catch (error) {
		const apiError = error as ApiError;
		throw new Error(apiError.message || 'Unable to create model paper. Please check your input and try again.');
	}
}

/**
 * Update model paper
 */
export async function updateTestSyllabus(
	id: number,
	data: Partial<TestSyllabusCreate>,
	pdfFile?: File
): Promise<TestSyllabus> {
	try {
		if (pdfFile) {
			// Upload PDF first
			const pdfUrl = await uploadSyllabusPdf(pdfFile);
			data.pdfUrl = pdfUrl.url;
		}
		
		return await api.put<TestSyllabus>(`/api/test-syllabus/${id}`, data);
	} catch (error) {
		const apiError = error as ApiError;
		throw new Error(apiError.message || 'Unable to update model paper. Please check your input and try again.');
	}
}

/**
 * Delete model paper
 */
export async function deleteTestSyllabus(id: number): Promise<void> {
	try {
		await api.delete<void>(`/api/test-syllabus/${id}`);
	} catch (error) {
		const apiError = error as ApiError;
		throw new Error(apiError.message || 'Unable to delete test syllabus. Please try again.');
	}
}

/**
 * Upload PDF file for model paper
 */
export async function uploadSyllabusPdf(file: File): Promise<{ url: string }> {
	try {
		// Validate file type
		if (file.type !== 'application/pdf') {
			throw new Error('Only PDF files are allowed.');
		}
		
		// Validate file size (max 10MB)
		const MAX_SIZE = 10 * 1024 * 1024; // 10MB
		if (file.size > MAX_SIZE) {
			throw new Error('PDF file size must be less than 10MB.');
		}
		
		const formData = new FormData();
		formData.append('file', file);
		
		return await api.postFormData<{ url: string }>('/api/test-syllabus/upload-pdf', formData);
	} catch (error) {
		const apiError = error as ApiError;
		throw new Error(apiError.message || 'Unable to upload PDF file. Please ensure the file is a valid PDF and try again.');
	}
}

