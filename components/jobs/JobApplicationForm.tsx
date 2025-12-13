'use client'

import { useState } from 'react'
import { submitJobApplication, JobOpportunityCreateRequest } from '@/lib/api/jobs'
import { CheckCircle, AlertCircle, Loader2, User, Phone, Calendar, Briefcase, Coins, BookOpen } from 'lucide-react'
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
	const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})
	const [fieldValid, setFieldValid] = useState<Record<string, boolean>>({})

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
			case 'dob':
				if (value instanceof Date) {
					const today = new Date()
					const age = today.getFullYear() - value.getFullYear()
					const monthDiff = today.getMonth() - value.getMonth()
					const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < value.getDate()) ? age - 1 : age
					
					if (actualAge < 18) {
						return 'You must be at least 18 years old'
					}
					if (actualAge > 70) {
						return 'Please enter a valid date of birth'
					}
					if (value > today) {
						return 'Date of birth cannot be in the future'
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

		// Real-time validation for touched fields
		if (touchedFields[name]) {
			const error = validateField(name, type === 'number' ? (value === '' ? undefined : Number(value)) : value)
			if (error) {
				setFieldErrors(prev => ({ ...prev, [name]: error }))
				setFieldValid(prev => ({ ...prev, [name]: false }))
			} else {
				setFieldErrors(prev => {
					const newErrors = { ...prev }
					delete newErrors[name]
					return newErrors
				})
				setFieldValid(prev => ({ ...prev, [name]: true }))
			}
		}
	}

	const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target
		setTouchedFields(prev => ({ ...prev, [name]: true }))
		
		const fieldValue = type === 'number' ? (value === '' ? undefined : Number(value)) : value
		const error = validateField(name, fieldValue)
		
		if (error) {
			setFieldErrors(prev => ({ ...prev, [name]: error }))
			setFieldValid(prev => ({ ...prev, [name]: false }))
		} else {
			setFieldErrors(prev => {
				const newErrors = { ...prev }
				delete newErrors[name]
				return newErrors
			})
			setFieldValid(prev => ({ ...prev, [name]: true }))
		}
	}

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		clearFieldError('dob')
		setFormData(prev => ({
			...prev,
			dob: value ? new Date(value) : undefined,
		}))
		
		// Real-time validation for date field
		if (touchedFields.dob && value) {
			const error = validateField('dob', new Date(value))
			if (error) {
				setFieldErrors(prev => ({ ...prev, dob: error }))
				setFieldValid(prev => ({ ...prev, dob: false }))
			} else {
				setFieldErrors(prev => {
					const newErrors = { ...prev }
					delete newErrors.dob
					return newErrors
				})
				setFieldValid(prev => ({ ...prev, dob: true }))
			}
		}
	}

	const handleDateBlur = () => {
		setTouchedFields(prev => ({ ...prev, dob: true }))
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
		<div id="job-application-form" className="max-w-4xl mx-auto">
			<div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
				{/* Form Header */}
				<div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 md:px-8 py-6">
					<h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-josefin">Job Application Form</h2>
					<p className="text-white/90">Complete the form below to apply for a teaching position at Pak Wattan School for Session 2026-27.</p>
				</div>

				<div className="p-6 md:p-8">
					{error && (
					<div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3 animate-fade-in-up">
						<AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
						<div className="flex-1">
							<h3 className="font-semibold text-red-900 mb-1">Error</h3>
							<p className="text-red-700 text-sm">{error}</p>
						</div>
					</div>
					)}

					{success && (
					<div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg flex items-start gap-3 animate-fade-in-up">
						<CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
						<div className="flex-1">
							<h3 className="font-semibold text-green-900 mb-1">Application Submitted Successfully!</h3>
							<p className="text-green-700 text-sm">
								Thank you for becoming a part of Pak Wattan. Your registration was successful. The School Administration will get in touch with you shortly to schedule an interview.
							</p>
						</div>
					</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-8">
					{/* Personal Information */}
					<div className="space-y-6">
						<div className="flex items-center gap-3 pb-3 border-b-2 border-primary-200">
							<User className="w-6 h-6 text-primary-600" />
							<h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
									Full Name <span className="text-red-500">*</span>
								</label>
								<div className="relative">
									<User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
										fieldErrors.name ? 'text-red-500' : fieldValid.name ? 'text-green-500' : 'text-gray-400'
									}`} />
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										onBlur={handleBlur}
										className={`w-full pl-10 pr-10 py-3 border-2 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
											fieldErrors.name 
												? 'border-red-500 bg-red-50' 
												: fieldValid.name && touchedFields.name
												? 'border-green-500 bg-green-50'
												: 'border-gray-300 bg-white hover:border-gray-400'
										}`}
										placeholder="Enter your full name"
									/>
									{fieldValid.name && touchedFields.name && !fieldErrors.name && (
										<CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
									)}
								</div>
								{fieldErrors.name && (
									<p className="mt-2 text-sm text-red-600 flex items-center gap-1">
										<AlertCircle className="w-4 h-4" />
										{fieldErrors.name}
									</p>
								)}
							</div>

							<div>
								<label htmlFor="fatherName" className="block text-sm font-semibold text-gray-700 mb-2">
									Father Name <span className="text-red-500">*</span>
								</label>
								<div className="relative">
									<User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
										fieldErrors.fatherName ? 'text-red-500' : fieldValid.fatherName ? 'text-green-500' : 'text-gray-400'
									}`} />
									<input
										type="text"
										id="fatherName"
										name="fatherName"
										value={formData.fatherName}
										onChange={handleInputChange}
										onBlur={handleBlur}
										className={`w-full pl-10 pr-10 py-3 border-2 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
											fieldErrors.fatherName 
												? 'border-red-500 bg-red-50' 
												: fieldValid.fatherName && touchedFields.fatherName
												? 'border-green-500 bg-green-50'
												: 'border-gray-300 bg-white hover:border-gray-400'
										}`}
										placeholder="Enter father's name"
									/>
									{fieldValid.fatherName && touchedFields.fatherName && !fieldErrors.fatherName && (
										<CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
									)}
								</div>
								{fieldErrors.fatherName && (
									<p className="mt-2 text-sm text-red-600 flex items-center gap-1">
										<AlertCircle className="w-4 h-4" />
										{fieldErrors.fatherName}
									</p>
								)}
							</div>

							<div>
								<label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-2">
									Gender
								</label>
								<select
									id="gender"
									name="gender"
									value={formData.gender ?? ''}
									onChange={handleInputChange}
									onBlur={handleBlur}
									className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white hover:border-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
								>
									<option value="">Select Gender</option>
									<option value="0">Male</option>
									<option value="1">Female</option>
									<option value="2">Other</option>
								</select>
							</div>

							<div>
								<label htmlFor="dob" className="block text-sm font-semibold text-gray-700 mb-2">
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
										onBlur={handleDateBlur}
										className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl bg-white hover:border-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Contact Information */}
					<div className="space-y-6">
						<div className="flex items-center gap-3 pb-3 border-b-2 border-primary-200">
							<Phone className="w-6 h-6 text-primary-600" />
							<h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="mobileNumber" className="block text-sm font-semibold text-gray-700 mb-2">
									Mobile Number <span className="text-red-500">*</span>
								</label>
								<div className="relative">
									<Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
										fieldErrors.mobileNumber ? 'text-red-500' : fieldValid.mobileNumber ? 'text-green-500' : 'text-gray-400'
									}`} />
									<input
										type="tel"
										id="mobileNumber"
										name="mobileNumber"
										value={formData.mobileNumber}
										onChange={handleInputChange}
										onBlur={handleBlur}
										className={`w-full pl-10 pr-10 py-3 border-2 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
											fieldErrors.mobileNumber 
												? 'border-red-500 bg-red-50' 
												: fieldValid.mobileNumber && touchedFields.mobileNumber
												? 'border-green-500 bg-green-50'
												: 'border-gray-300 bg-white hover:border-gray-400'
										}`}
										placeholder="03XX-XXXXXXX"
									/>
									{fieldValid.mobileNumber && touchedFields.mobileNumber && !fieldErrors.mobileNumber && (
										<CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
									)}
								</div>
								{fieldErrors.mobileNumber && (
									<p className="mt-2 text-sm text-red-600 flex items-center gap-1">
										<AlertCircle className="w-4 h-4" />
										{fieldErrors.mobileNumber}
									</p>
								)}
								<p className="mt-1 text-xs text-gray-500">Format: 03XX-XXXXXXX (11 digits)</p>
							</div>

							<div>
								<label htmlFor="whatsAppNumber" className="block text-sm font-semibold text-gray-700 mb-2">
									WhatsApp Number
								</label>
								<div className="relative">
									<Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
										fieldErrors.whatsAppNumber ? 'text-red-500' : fieldValid.whatsAppNumber ? 'text-green-500' : 'text-gray-400'
									}`} />
									<input
										type="tel"
										id="whatsAppNumber"
										name="whatsAppNumber"
										value={formData.whatsAppNumber}
										onChange={handleInputChange}
										onBlur={handleBlur}
										className={`w-full pl-10 pr-10 py-3 border-2 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
											fieldErrors.whatsAppNumber 
												? 'border-red-500 bg-red-50' 
												: fieldValid.whatsAppNumber && touchedFields.whatsAppNumber
												? 'border-green-500 bg-green-50'
												: 'border-gray-300 bg-white hover:border-gray-400'
										}`}
										placeholder="03XX-XXXXXXX (Optional)"
									/>
									{fieldValid.whatsAppNumber && touchedFields.whatsAppNumber && !fieldErrors.whatsAppNumber && (
										<CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
									)}
								</div>
								{fieldErrors.whatsAppNumber && (
									<p className="mt-2 text-sm text-red-600 flex items-center gap-1">
										<AlertCircle className="w-4 h-4" />
										{fieldErrors.whatsAppNumber}
									</p>
								)}
							</div>
						</div>
					</div>

					{/* Professional Information */}
					<div className="space-y-6">
						<div className="flex items-center gap-3 pb-3 border-b-2 border-primary-200">
							<Briefcase className="w-6 h-6 text-primary-600" />
							<h3 className="text-xl font-bold text-gray-900">Professional Information</h3>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="fieldExperiencedInYears" className="block text-sm font-semibold text-gray-700 mb-2">
									Teaching Experience (Years)
								</label>
								<div className="relative">
									<Briefcase className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
										fieldErrors.fieldExperiencedInYears ? 'text-red-500' : fieldValid.fieldExperiencedInYears ? 'text-green-500' : 'text-gray-400'
									}`} />
									<input
										type="number"
										id="fieldExperiencedInYears"
										name="fieldExperiencedInYears"
										value={formData.fieldExperiencedInYears ?? ''}
										onChange={handleInputChange}
										onBlur={handleBlur}
										min="0"
										max="50"
										className={`w-full pl-10 pr-10 py-3 border-2 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
											fieldErrors.fieldExperiencedInYears 
												? 'border-red-500 bg-red-50' 
												: fieldValid.fieldExperiencedInYears && touchedFields.fieldExperiencedInYears
												? 'border-green-500 bg-green-50'
												: 'border-gray-300 bg-white hover:border-gray-400'
										}`}
										placeholder="0"
									/>
									{fieldValid.fieldExperiencedInYears && touchedFields.fieldExperiencedInYears && !fieldErrors.fieldExperiencedInYears && (
										<CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
									)}
								</div>
								{fieldErrors.fieldExperiencedInYears && (
									<p className="mt-2 text-sm text-red-600 flex items-center gap-1">
										<AlertCircle className="w-4 h-4" />
										{fieldErrors.fieldExperiencedInYears}
									</p>
								)}
								<p className="mt-1 text-xs text-gray-500">Enter number of years (0-50)</p>
							</div>

							<div>
								<label htmlFor="subjectTought" className="block text-sm font-semibold text-gray-700 mb-2">
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
										className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl bg-white hover:border-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
										placeholder="e.g., Mathematics, English, Science"
									/>
								</div>
							</div>

							<div className="md:col-span-2">
								<label htmlFor="packageDemand" className="block text-sm font-semibold text-gray-700 mb-2">
									Expected Salary Package (PKR)
								</label>
								<div className="relative">
									<Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
									<div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-sm">
										PKR
									</div>
									<input
										type="text"
										id="packageDemand"
										name="packageDemand"
										value={formData.packageDemand}
										onChange={handleInputChange}
										className="w-full pl-10 pr-16 py-3 border-2 border-gray-300 rounded-xl bg-white hover:border-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
										placeholder="e.g., 50,000 - 80,000"
									/>
								</div>
								<p className="mt-1 text-xs text-gray-500">Enter expected salary in Pakistani Rupees (PKR)</p>
							</div>
						</div>
					</div>

					{/* Submit Button */}
					<div className="pt-6 border-t-2 border-gray-100">
						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center gap-3"
						>
							{isSubmitting ? (
								<>
									<Loader2 className="w-6 h-6 animate-spin" />
									<span>Submitting Application...</span>
								</>
							) : (
								<>
									<Briefcase className="w-5 h-5" />
									<span>Submit Application</span>
								</>
							)}
						</button>
						<p className="mt-4 text-center text-sm text-gray-500">
							By submitting this form, you agree to our terms and conditions. We will contact you shortly.
						</p>
					</div>
					</form>
				</div>
			</div>
		</div>
	)
}

