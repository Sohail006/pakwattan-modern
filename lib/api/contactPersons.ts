// Contact Persons API endpoints
import { api, ApiError } from './client';

export interface ContactPerson {
  id: number;
  contactType: string;
  name: string;
  title?: string;
  email: string;
  phone?: string;
  mobileNumber?: string;
  whatsAppNumber?: string;
  department?: string;
  officeLocation?: string;
  officeHours?: string;
  description?: string;
  priority?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateContactPersonRequest {
  contactType: string;
  name: string;
  title?: string;
  email: string;
  phone?: string;
  mobileNumber?: string;
  whatsAppNumber?: string;
  department?: string;
  officeLocation?: string;
  officeHours?: string;
  description?: string;
  priority?: number;
  isActive?: boolean;
}

export interface UpdateContactPersonRequest extends Partial<CreateContactPersonRequest> {
  id: number;
}

/**
 * Get all contact persons
 */
export async function getContactPersons(type?: string): Promise<ContactPerson[]> {
  try {
    const query = type ? `?type=${encodeURIComponent(type)}` : '';
    return await api.get<ContactPerson[]>(`/api/contact-persons${query}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load contact persons. Please refresh the page and try again.');
  }
}

/**
 * Get contact person by ID
 */
export async function getContactPersonById(id: number): Promise<ContactPerson> {
  try {
    return await api.get<ContactPerson>(`/api/contact-persons/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load contact person information. Please try again.');
  }
}

/**
 * Create contact person
 */
export async function createContactPerson(data: CreateContactPersonRequest): Promise<ContactPerson> {
  try {
    return await api.post<ContactPerson>('/api/contact-persons', data);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to create contact person. Please review all fields and try again.');
  }
}

/**
 * Update contact person
 */
export async function updateContactPerson(data: UpdateContactPersonRequest): Promise<void> {
  try {
    const { id, ...updateData } = data;
    await api.put<void>(`/api/contact-persons/${id}`, updateData);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to update contact person information. Please review all fields and try again.');
  }
}

/**
 * Delete contact person
 */
export async function deleteContactPerson(id: number): Promise<void> {
  try {
    await api.delete<void>(`/api/contact-persons/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to delete contact person. Please try again or contact support if the problem persists.');
  }
}
