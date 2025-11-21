// Contact API endpoints
import { api, ApiError } from './client';

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  response?: string;
  createdAt: string;
  readAt?: string;
  respondedAt?: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  response: string;
}

/**
 * Get all contacts (admin only)
 */
export async function getContacts(isRead?: boolean): Promise<Contact[]> {
  try {
    const query = isRead !== undefined ? `?isRead=${isRead}` : '';
    return await api.get<Contact[]>(`/api/contacts${query}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load contacts. Please refresh the page and try again.');
  }
}

/**
 * Get contact by ID (admin only)
 */
export async function getContactById(id: number): Promise<Contact> {
  try {
    return await api.get<Contact>(`/api/contacts/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load contact information. Please try again.');
  }
}

/**
 * Create contact message (public endpoint)
 */
export async function createContact(data: ContactRequest): Promise<Contact> {
  try {
    return await api.post<Contact>('/api/contacts', data);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to send your message. Please check your connection and try again.');
  }
}

/**
 * Mark contact as read (admin only)
 */
export async function markContactAsRead(id: number): Promise<void> {
  try {
    await api.put<void>(`/api/contacts/${id}/read`, {});
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to mark contact as read. Please try again.');
  }
}

/**
 * Add response to contact (admin only)
 */
export async function addContactResponse(id: number, response: string): Promise<void> {
  try {
    await api.put<void>(`/api/contacts/${id}/response`, { response });
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to add response to contact. Please try again.');
  }
}

/**
 * Delete contact (admin only)
 */
export async function deleteContact(id: number): Promise<void> {
  try {
    await api.delete<void>(`/api/contacts/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to delete contact. Please try again.');
  }
}

