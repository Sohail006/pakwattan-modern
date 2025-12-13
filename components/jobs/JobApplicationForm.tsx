'use client'

import { useState } from 'react'
import { submitJobApplication, JobOpportunityCreateRequest } from '@/lib/api/jobs'
import { CheckCircle, AlertCircle, Loader2, User, Phone, Calendar, Briefcase, DollarSign, BookOpen } from 'lucide-react'
import { validatePakistanPhoneNumber } from '@/lib/utils'

interface JobApplicationFormProps {
	onSuccess?: (data: { id: number; name: string }) => void
}

export default function JobApplicationForm({ onSuccess }: JobApplicationFormProps) {
	const [formData, setFormData] = useState<JobOpportunityCreateRequest>({
		name: '',
		fatherName: '',
		gender: undefined,
		mobileNumber: '',
		whatsAppNumber: '',
		fieldExperiencedInYears: undefined,
		subjectTought: '',
		packageDemand: '',
		dob: undefined,
	})

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

	const clearFieldError = (fieldName: string) => {
		setFieldErrors(prev => {
			const newErrors = { ...prev }
			delete newErrors[fieldName]
			return newErrors
		})
	}

	const validateField = (name: string, value: string | number | Date | undefined): string | null => {
		// Convert Date to string if needed
		const stringValue = value instanceof Date ? value.toISOString() : value
		
		switch (name) {
			case 'name':
				if (!stringValue || (stringValue as string).trim() === '') return 'Name is required'
				if ((stringValue as string).trim().length < 2) return 'Name must be at least 2 characters'
				return null
			case 'fatherName':
				if (!stringValue || (stringValue as string).trim() === '') return 'Father name is required'
				if ((stringValue as string).trim().length < 2) return 'Father name must be at least 2 characters'
				return null
			case 'mobileNumber':
				const mobileValidation = validatePakistanPhoneNumber(stringValue as string, true)
				if (mobileValidation.error) return mobileValidation.error
				return null
			case 'whatsAppNumber':
				if (stringValue && (stringValue as string).trim()) {
					const whatsAppValidation = validatePakistanPhoneNumber(stringValue as string, false)
					if (whatsAppValidation.error) return whatsAppValidation.error
				}
				return null
			case 'fieldExperiencedInYears':
				if (stringValue !== undefined && stringValue !== null && stringValue !== '') {
					const years = Number(stringValue)
					if (isNaN(years) || years < 0 || years > 50) {
						return 'Experience must be between 0 and 50 years'
					}
				}
				return null
			default:
				return null
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target

		clearFieldError(name)

		if (type === 'number') {
			setFormData(prev => ({
				...prev,
				[name]: value === '' ? undefined : Number(value),
			}))
		} else if (name === 'gender') {
			setFormData(prev => ({
				...prev,
				[name]: value === '' ? undefined : Number(value),
			}))
		} else {
			setFormData(prev => ({
				...prev,
				[name]: value,
			}))
		}
	}

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		clearFieldError('dob')
		setFormData(prev => ({
			...prev,
			dob: value ? new Date(value) : undefined,
		}))
	}

	const validateForm = (): boolean => {
		const errors: Record<string, string> = {}

		const requiredFields: (keyof JobOpportunityCreateRequest)[] = ['name', 'fatherName', 'mobileNumber']
		requiredFields.forEach(field => {
			const error = validateField(field, formData[field])
			if (error) {
				errors[field] = error
			}
		})

		// Validate optional fields if they have values
		if (formData.whatsAppNumber) {
			const error = validateField('whatsAppNumber', formData.whatsAppNumber)
			if (error) errors.whatsAppNumber = error
		}

		if (formData.fieldExperiencedInYears !== undefined) {
			const error = validateField('fieldExperiencedInYears', formData.fieldExperiencedInYears)
			if (error) errors.fieldExperiencedInYears = error
		}

		setFieldErrors(errors)
		return Object.keys(errors).length === 0
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)
		setSuccess(false)

		if (!validateForm()) {
			setError('Please fix the errors in the form')
			return
		}

		setIsSubmitting(true)

		try {
			const response = await submitJobApplication(formData)
			setSuccess(true)
			if (onSuccess) {
				onSuccess(response)
			}
			// Reset form after successful submission
			setTimeout(() => {
				setFormData({
					name: '',
					fatherName: '',
					gender: undefined,
					mobileNumber: '',
					whatsAppNumber: '',
					fieldExperiencedInYears: undefined,
					subjectTought: '',
					packageDemand: '',
					dob: undefined,
				})
				setSuccess(false)
			}, 5000)
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Unable to submit job application. Please try again.'
			setError(errorMessage)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="max-w-4xl mx-auto">
			<div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
				<div className="mb-6">
					<h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Job Application Form</h2>
					<p className="text-gray-600">Please fill out the form below to apply for a teaching position at Pak Wattan School.</p>
				</div>

				{error && (
					<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
						<AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
						<div>
							<h3 className="font-semibold text-red-900 mb-1">Error</h3>
							<p className="text-red-700 text-sm">{error}</p>
						</div>
					</div>
				)}

				{success && (
					<div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
						<CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
						<div>
							<h3 className="font-semibold text-green-900 mb-1">Application Submitted Successfully!</h3>
							<p className="text-green-700 text-sm">
								Thank you for becoming a part of Pak Wattan. Your registration was successful. The School Administration will get in touch with you shortly to schedule an interview.
							</p>
						</div>
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Personal Information */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
									Full Name <span className="text-red-500">*</span>
								</label>
								<div className="relative">
									<User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
											fieldErrors.name ? 'border-red-500' : 'border-gray-300'
										}`}
										placeholder="Enter your full name"
									/>
								</div>
								{fieldErrors.name && <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>}
							</div>

							<div>
								<label htmlFor="fatherName" className="block text-sm font-medium text-gray-700 mb-1">
									Father Name <span className="text-red-500">*</span>
								</label>
								<div className="relative">
									<User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
									<input
										type="text"
										id="fatherName"
										name="fatherName"
										value={formData.fatherName}
										onChange={handleInputChange}
										className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
											fieldErrors.fatherName ? 'border-red-500' : 'border-gray-300'
										}`}
										placeholder="Enter father's name"
									/>
								</div>
								{fieldErrors.fatherName && <p className="mt-1 text-sm text-red-600">{fieldErrors.fatherName}</p>}
							</div>

							<div>
								<label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
									Gender
								</label>
								<select
									id="gender"
									name="gender"
									value={formData.gender ?? ''}
									onChange={handleInputChange}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								>
									<option value="">Select Gender</option>
									<option value="0">Male</option>
									<option value="1">Female</option>
									<option value="2">Other</option>
								</select>
							</div>

							<div>
								<label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
									Date of Birth
								</label>
								<div className="relative">
									<Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
									<input
										type="date"
										id="dob"
										name="dob"
										value={formData.dob instanceof Date ? formData.dob.toISOString().split('T')[0] : formData.dob || ''}
										onChange={handleDateChange}
										className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Contact Information */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Contact Information</h3>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
									Mobile Number <span className="text-red-500">*</span>
								</label>
								<div className="relative">
									<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
									<input
										type="tel"
										id="mobileNumber"
										name="mobileNumber"
										value={formData.mobileNumber}
										onChange={handleInputChange}
										className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
											fieldErrors.mobileNumber ? 'border-red-500' : 'border-gray-300'
										}`}
										placeholder="03XX-XXXXXXX"
									/>
								</div>
								{fieldErrors.mobileNumber && <p className="mt-1 text-sm text-red-600">{fieldErrors.mobileNumber}</p>}
							</div>

							<div>
								<label htmlFor="whatsAppNumber" className="block text-sm font-medium text-gray-700 mb-1">
									WhatsApp Number
								</label>
								<div className="relative">
									<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
									<input
										type="tel"
										id="whatsAppNumber"
										name="whatsAppNumber"
										value={formData.whatsAppNumber}
										onChange={handleInputChange}
										className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
											fieldErrors.whatsAppNumber ? 'border-red-500' : 'border-gray-300'
										}`}
										placeholder="03XX-XXXXXXX"
									/>
								</div>
								{fieldErrors.whatsAppNumber && <p className="mt-1 text-sm text-red-600">{fieldErrors.whatsAppNumber}</p>}
							</div>
						</div>
					</div>

					{/* Professional Information */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Professional Information</h3>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="fieldExperiencedInYears" className="block text-sm font-medium text-gray-700 mb-1">
									Teaching Experience (Years)
								</label>
								<div className="relative">
									<Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
									<input
										type="number"
										id="fieldExperiencedInYears"
										name="fieldExperiencedInYears"
										value={formData.fieldExperiencedInYears ?? ''}
										onChange={handleInputChange}
										min="0"
										max="50"
										className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
											fieldErrors.fieldExperiencedInYears ? 'border-red-500' : 'border-gray-300'
										}`}
										placeholder="0"
									/>
								</div>
								{fieldErrors.fieldExperiencedInYears && <p className="mt-1 text-sm text-red-600">{fieldErrors.fieldExperiencedInYears}</p>}
							</div>

							<div>
								<label htmlFor="subjectTought" className="block text-sm font-medium text-gray-700 mb-1">
									Subject Taught
								</label>
								<div className="relative">
									<BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
									<input
										type="text"
										id="subjectTought"
										name="subjectTought"
										value={formData.subjectTought}
										onChange={handleInputChange}
										className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="e.g., Mathematics, English, Science"
									/>
								</div>
							</div>

							<div className="md:col-span-2">
								<label htmlFor="packageDemand" className="block text-sm font-medium text-gray-700 mb-1">
									Package Demand
								</label>
								<div className="relative">
									<DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
									<input
										type="text"
										id="packageDemand"
										name="packageDemand"
										value={formData.packageDemand}
										onChange={handleInputChange}
										className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="Expected salary package"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Submit Button */}
					<div className="pt-4">
						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
						>
							{isSubmitting ? (
								<>
									<Loader2 className="w-5 h-5 animate-spin" />
									Submitting...
								</>
							) : (
								'Submit Application'
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

