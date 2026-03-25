'use client'

import { useState, useEffect } from 'react'
import { X, Loader2, School } from 'lucide-react'
import { Campus, createCampus, updateCampus, CreateCampusRequest, UpdateCampusRequest } from '@/lib/api/campuses'
import { maskPakistanPhoneNumber, validatePakistanPhoneNumber, cleanPhoneNumber } from '@/lib/utils'
import FormField from '@/components/ui/FormField'
import { toastService } from '@/lib/utils/toast'

interface CampusFormProps {
	campus?: Campus | null
	mode: 'create' | 'edit'
	onClose: () => void
	onSuccess: (message?: string) => void
}

export default function CampusForm({ campus, mode, onClose, onSuccess }: CampusFormProps) {
	const [formData, setFormData] = useState<CreateCampusRequest>({
		name: '',
		address: '',
		phone: '',
		email: '',
		mobileNumber: '',
		whatsAppNumber: '',
		officeHours: '',
		principalName: '',
		priority: 0,
		isActive: true
	})

	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState<Record<string, string>>({})

	useEffect(() => {
		if (campus && mode === 'edit') {
			setFormData({
				name: campus.name || '',
				address: campus.address || '',
				phone: campus.phone || '',
				email: campus.email || '',
				mobileNumber: campus.mobileNumber || '',
				whatsAppNumber: campus.whatsAppNumber || '',
				officeHours: campus.officeHours || '',
				principalName: campus.principalName || '',
				priority: campus.priority ?? 0,
				isActive: campus.isActive
			})
		}
	}, [campus, mode])

	const validateField = (name: string, value: string | number | boolean | undefined): string | null => {
		switch (name) {
			case 'name':
				if (!value || (value as string).trim() === '') return 'Campus name is required'
				return null
			case 'email':
				if (value && (value as string).trim() !== '') {
					const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
					if (!emailRegex.test(value as string)) return 'Please enter a valid email address'
				}
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
		if (errors[name]) {
			setErrors(prev => {
				const next = { ...prev }
				delete next[name]
				return next
			})
		}

		if ((name === 'mobileNumber' || name === 'whatsAppNumber') && typeof value === 'string') {
			const masked = maskPakistanPhoneNumber(value)
			setFormData(prev => ({ ...prev, [name]: masked }))
		} else {
			setFormData(prev => ({ ...prev, [name]: value }))
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const newErrors: Record<string, string> = {}
		;['name', 'email', 'mobileNumber', 'whatsAppNumber'].forEach(field => {
			const err = validateField(field, formData[field as keyof CreateCampusRequest] as string | number | boolean | undefined)
			if (err) newErrors[field] = err
		})

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			toastService.error('Please fix the errors in the form')
			return
		}

		const phoneTrim = formData.phone?.trim() || ''
		const mobileClean = formData.mobileNumber ? cleanPhoneNumber(formData.mobileNumber) : ''
		const waClean = formData.whatsAppNumber ? cleanPhoneNumber(formData.whatsAppNumber) : ''

		try {
			setLoading(true)

			if (mode === 'edit' && campus) {
				const updateData: UpdateCampusRequest = {
					id: campus.id,
					name: formData.name.trim(),
					address: formData.address?.trim() ?? '',
					phone: phoneTrim,
					email: formData.email?.trim() ?? '',
					principalName: formData.principalName?.trim() ?? '',
					mobileNumber: mobileClean,
					whatsAppNumber: waClean,
					officeHours: formData.officeHours?.trim() ?? '',
					priority: formData.priority,
					isActive: formData.isActive
				}
				await updateCampus(updateData)
				toastService.success('Campus updated successfully')
				onSuccess('Campus updated successfully')
			} else {
				const createData: CreateCampusRequest = {
					name: formData.name.trim(),
					address: formData.address?.trim() || undefined,
					phone: phoneTrim || undefined,
					email: formData.email?.trim() || undefined,
					principalName: formData.principalName?.trim() || undefined,
					mobileNumber: mobileClean || undefined,
					whatsAppNumber: waClean || undefined,
					officeHours: formData.officeHours?.trim() || undefined,
					priority: formData.priority,
					isActive: formData.isActive
				}
				await createCampus(createData)
				toastService.success('Campus created successfully')
				onSuccess('Campus created successfully')
			}
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Unable to save campus. Please try again.'
			toastService.error(message)
			setErrors({ submit: message })
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-blue-100 rounded-lg">
							<School className="w-5 h-5 text-blue-600" />
						</div>
						<div>
							<h2 className="text-xl font-bold text-gray-900">
								{mode === 'edit' ? 'Edit campus' : 'Add campus'}
							</h2>
							<p className="text-sm text-gray-500">Phone numbers here appear in the site header when this campus is the main (highest priority) active campus.</p>
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

				<form onSubmit={handleSubmit} className="p-6 space-y-6">
					<FormField label="Campus name" required error={errors.name}>
						<input
							type="text"
							value={formData.name}
							onChange={(e) => handleChange('name', e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							placeholder="Main campus"
						/>
					</FormField>

					<FormField label="Address">
						<input
							type="text"
							value={formData.address}
							onChange={(e) => handleChange('address', e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							placeholder="Street, city"
						/>
					</FormField>

					<FormField label="Principal name">
						<input
							type="text"
							value={formData.principalName}
							onChange={(e) => handleChange('principalName', e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</FormField>

					<FormField label="Email" error={errors.email}>
						<input
							type="email"
							value={formData.email}
							onChange={(e) => handleChange('email', e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							placeholder="campus@school.edu.pk"
						/>
					</FormField>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField label="Landline phone" hint="Shown in header if mobile is empty">
							<input
								type="text"
								value={formData.phone}
								onChange={(e) => handleChange('phone', e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="0992-811555"
							/>
						</FormField>

						<FormField label="Mobile number" error={errors.mobileNumber} hint="Preferred for header / click-to-call">
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

					<FormField label="WhatsApp number" error={errors.whatsAppNumber} hint="Optional">
						<input
							type="text"
							value={formData.whatsAppNumber}
							onChange={(e) => handleChange('whatsAppNumber', e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							placeholder="0318 0821377"
							maxLength={14}
						/>
					</FormField>

					<FormField label="Office hours" hint="e.g. Mon–Fri 8am–2pm">
						<input
							type="text"
							value={formData.officeHours}
							onChange={(e) => handleChange('officeHours', e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</FormField>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField label="Priority" hint="Higher number is shown first as main campus in the header">
							<input
								type="number"
								value={formData.priority}
								onChange={(e) => handleChange('priority', parseInt(e.target.value, 10) || 0)}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								min={0}
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

					{errors.submit && (
						<div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
							{errors.submit}
						</div>
					)}

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
