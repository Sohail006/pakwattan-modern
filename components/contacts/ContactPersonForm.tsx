'use client'

import { useState, useEffect } from 'react'
import { X, Loader2, Users } from 'lucide-react'
import { ContactPerson, createContactPerson, updateContactPerson, CreateContactPersonRequest, UpdateContactPersonRequest } from '@/lib/api/contactPersons'
import { maskPakistanPhoneNumber, validatePakistanPhoneNumber, cleanPhoneNumber } from '@/lib/utils'
import FormField from '@/components/ui/FormField'
import { toastService } from '@/lib/utils/toast'

interface ContactPersonFormProps {
	contactPerson?: ContactPerson | null
	mode: 'create' | 'edit'
	onClose: () => void
	onSuccess: (message?: string) => void
}

const CONTACT_TYPES = [
	'Administration',
	'Finance',
	'Admissions',
	'Academic',
	'Human Resources',
	'Maintenance',
	'Security',
	'Other'
]

export default function ContactPersonForm({ contactPerson, mode, onClose, onSuccess }: ContactPersonFormProps) {
	const [formData, setFormData] = useState<CreateContactPersonRequest>({
		contactType: '',
		name: '',
		title: '',
		email: '',
		phone: '',
		mobileNumber: '',
		whatsAppNumber: '',
		department: '',
		officeLocation: '',
		officeHours: '',
		description: '',
		priority: 0,
		isActive: true
	})

	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState<Record<string, string>>({})

	useEffect(() => {
		if (contactPerson && mode === 'edit') {
			setFormData({
				contactType: contactPerson.contactType || '',
				name: contactPerson.name || '',
				title: contactPerson.title || '',
				email: contactPerson.email || '',
				phone: contactPerson.phone || '',
				mobileNumber: contactPerson.mobileNumber || '',
				whatsAppNumber: contactPerson.whatsAppNumber || '',
				department: contactPerson.department || '',
				officeLocation: contactPerson.officeLocation || '',
				officeHours: contactPerson.officeHours || '',
				description: contactPerson.description || '',
				priority: contactPerson.priority || 0,
				isActive: contactPerson.isActive
			})
		}
	}, [contactPerson, mode])

	const validateField = (name: string, value: string | number | boolean | undefined): string | null => {
		switch (name) {
			case 'contactType':
				if (!value || (value as string).trim() === '') return 'Contact type is required'
				return null
			case 'name':
				if (!value || (value as string).trim() === '') return 'Name is required'
				return null
			case 'email':
				if (!value || (value as string).trim() === '') return 'Email is required'
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
				if (!emailRegex.test(value as string)) return 'Please enter a valid email address'
				return null
			case 'mobileNumber':
				if (value && (value as string).trim() !== '') {
					const validation = validatePakistanPhoneNumber(value as string, true)
					if (!validation.valid) return validation.error || 'Invalid mobile number'
				}
				return null
			case 'whatsAppNumber':
				if (value && (value as string).trim() !== '') {
					const validation = validatePakistanPhoneNumber(value as string, false)
					if (!validation.valid) return validation.error || 'Invalid WhatsApp number'
				}
				return null
			default:
				return null
		}
	}

	const handleChange = (name: string, value: string | number | boolean) => {
		// Clear error for this field
		if (errors[name]) {
			setErrors(prev => {
				const newErrors = { ...prev }
				delete newErrors[name]
				return newErrors
			})
		}

		// Auto-format phone numbers
		if ((name === 'mobileNumber' || name === 'whatsAppNumber') && typeof value === 'string') {
			const masked = maskPakistanPhoneNumber(value)
			setFormData(prev => ({ ...prev, [name]: masked }))
		} else {
			setFormData(prev => ({ ...prev, [name]: value }))
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		
		// Validate all fields
		const newErrors: Record<string, string> = {}
		const fieldsToValidate = ['contactType', 'name', 'email', 'mobileNumber', 'whatsAppNumber']
		
		fieldsToValidate.forEach(field => {
			const error = validateField(field, formData[field as keyof CreateContactPersonRequest])
			if (error) newErrors[field] = error
		})

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			toastService.error('Please fix the errors in the form')
			return
		}

		try {
			setLoading(true)
			
			if (mode === 'edit' && contactPerson) {
				const updateData: UpdateContactPersonRequest = {
					id: contactPerson.id,
					...formData,
					mobileNumber: formData.mobileNumber ? cleanPhoneNumber(formData.mobileNumber) : undefined,
					whatsAppNumber: formData.whatsAppNumber ? cleanPhoneNumber(formData.whatsAppNumber) : undefined
				}
				await updateContactPerson(updateData)
				toastService.success('Contact person updated successfully')
				onSuccess('Contact person updated successfully')
			} else {
				const createData: CreateContactPersonRequest = {
					...formData,
					mobileNumber: formData.mobileNumber ? cleanPhoneNumber(formData.mobileNumber) : undefined,
					whatsAppNumber: formData.whatsAppNumber ? cleanPhoneNumber(formData.whatsAppNumber) : undefined
				}
				await createContactPerson(createData)
				toastService.success('Contact person created successfully')
				onSuccess('Contact person created successfully')
			}
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Unable to save contact person. Please try again.'
			toastService.error(message)
			setErrors({ submit: message })
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-purple-100 rounded-lg">
							<Users className="w-5 h-5 text-purple-600" />
						</div>
						<div>
							<h2 className="text-xl font-bold text-gray-900">
								{mode === 'edit' ? 'Edit Contact Person' : 'Add Contact Person'}
							</h2>
							<p className="text-sm text-gray-500">Manage contact person information</p>
						</div>
					</div>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 transition-colors"
						aria-label="Close"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="p-6 space-y-6">
					{/* Contact Type and Name */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField label="Contact Type" required error={errors.contactType}>
							<select
								value={formData.contactType}
								onChange={(e) => handleChange('contactType', e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							>
								<option value="">Select Type</option>
								{CONTACT_TYPES.map(type => (
									<option key={type} value={type}>{type}</option>
								))}
							</select>
						</FormField>

						<FormField label="Name" required error={errors.name}>
							<input
								type="text"
								value={formData.name}
								onChange={(e) => handleChange('name', e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="Full Name"
							/>
						</FormField>
					</div>

					{/* Title and Email */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField label="Title" hint="e.g., Manager, Director">
							<input
								type="text"
								value={formData.title}
								onChange={(e) => handleChange('title', e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="Manager"
							/>
						</FormField>

						<FormField label="Email Address" required error={errors.email}>
							<input
								type="email"
								value={formData.email}
								onChange={(e) => handleChange('email', e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="contact@pakwattan.edu.pk"
							/>
						</FormField>
					</div>

					{/* Phone Numbers */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField label="Phone Number" error={errors.phone}>
							<input
								type="text"
								value={formData.phone}
								onChange={(e) => handleChange('phone', e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="0318 0821377"
							/>
						</FormField>

						<FormField label="Mobile Number" required error={errors.mobileNumber}>
							<input
								type="text"
								value={formData.mobileNumber}
								onChange={(e) => handleChange('mobileNumber', e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="0318 0821377"
								maxLength={14}
							/>
						</FormField>
					</div>

					{/* WhatsApp */}
					<FormField label="WhatsApp Number" error={errors.whatsAppNumber} hint="Optional">
						<input
							type="text"
							value={formData.whatsAppNumber}
							onChange={(e) => handleChange('whatsAppNumber', e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							placeholder="0318 0821377"
							maxLength={14}
						/>
					</FormField>

					{/* Department and Office Location */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField label="Department">
							<input
								type="text"
								value={formData.department}
								onChange={(e) => handleChange('department', e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="Department Name"
							/>
						</FormField>

						<FormField label="Office Location">
							<input
								type="text"
								value={formData.officeLocation}
								onChange={(e) => handleChange('officeLocation', e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="Room 101, Building A"
							/>
						</FormField>
					</div>

					{/* Office Hours */}
					<FormField label="Office Hours" hint="e.g., Monday-Friday: 9AM-5PM">
						<input
							type="text"
							value={formData.officeHours}
							onChange={(e) => handleChange('officeHours', e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							placeholder="Monday-Friday: 9AM-5PM"
						/>
					</FormField>

					{/* Description */}
					<FormField label="Description" hint="Optional description">
						<textarea
							value={formData.description}
							onChange={(e) => handleChange('description', e.target.value)}
							rows={3}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							placeholder="Additional information..."
						/>
					</FormField>

					{/* Priority and Status */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField label="Priority" hint="Lower number = higher priority">
							<input
								type="number"
								value={formData.priority}
								onChange={(e) => handleChange('priority', parseInt(e.target.value) || 0)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								min="0"
							/>
						</FormField>

						<FormField label="Status">
							<select
								value={formData.isActive ? 'active' : 'inactive'}
								onChange={(e) => handleChange('isActive', e.target.value === 'active')}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							>
								<option value="active">Active</option>
								<option value="inactive">Inactive</option>
							</select>
						</FormField>
					</div>

					{/* Submit Error */}
					{errors.submit && (
						<div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
							{errors.submit}
						</div>
					)}

					{/* Actions */}
					<div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={loading}
							className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
						>
							{loading && <Loader2 className="w-4 h-4 animate-spin" />}
							{mode === 'edit' ? 'Update' : 'Create'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
