'use client'

import { useState } from 'react'
import { Upload, FileSpreadsheet, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import * as XLSX from 'xlsx'
import { bulkImportJobApplications, JobOpportunityCreateRequest } from '@/lib/api/jobs'

interface JobsExcelImportProps {
	isOpen: boolean
	onClose: () => void
	onSuccess: () => void
}

type PreviewRow = Record<string, string | number | null | undefined>

export default function JobsExcelImport({ isOpen, onClose, onSuccess }: JobsExcelImportProps) {
	const [file, setFile] = useState<File | null>(null)
	const [isUploading, setIsUploading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [preview, setPreview] = useState<PreviewRow[]>([])
	const [importResult, setImportResult] = useState<{
		successCount: number
		failedCount: number
		errors: string[]
	} | null>(null)

	if (!isOpen) return null

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0]
		if (!selectedFile) return

		// Validate file type
		const validExtensions = ['.xlsx', '.xls']
		const fileExtension = selectedFile.name.toLowerCase().substring(selectedFile.name.lastIndexOf('.'))
		
		if (!validExtensions.includes(fileExtension)) {
			setError('Please select a valid Excel file (.xlsx or .xls)')
			return
		}

		setFile(selectedFile)
		setError(null)
		setPreview([])
		setImportResult(null)

		// Read and preview the file
		const reader = new FileReader()
		reader.onload = (e) => {
			try {
				const data = new Uint8Array(e.target?.result as ArrayBuffer)
				const workbook = XLSX.read(data, { type: 'array' })
				const firstSheetName = workbook.SheetNames[0]
				const worksheet = workbook.Sheets[firstSheetName]
				const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

				// Convert to preview format (first 5 rows)
				const headers = jsonData[0] as string[]
				const rows: PreviewRow[] = jsonData.slice(1, 6).map((row: unknown) => {
					const obj: PreviewRow = {}
					const rowArray = row as (string | number | null | undefined)[]
					headers.forEach((header, index) => {
						obj[header] = rowArray[index] || ''
					})
					return obj
				})

				setPreview(rows)
			} catch (err) {
				setError('Failed to read Excel file. Please ensure it is a valid Excel file.')
				console.error('Error reading Excel:', err)
			}
		}
		reader.readAsArrayBuffer(selectedFile)
	}

	const parseExcelToJobs = (file: File): Promise<JobOpportunityCreateRequest[]> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.onload = (e) => {
				try {
					const data = new Uint8Array(e.target?.result as ArrayBuffer)
					const workbook = XLSX.read(data, { type: 'array' })
					const firstSheetName = workbook.SheetNames[0]
					const worksheet = workbook.Sheets[firstSheetName]
					const jsonData = XLSX.utils.sheet_to_json(worksheet) as Record<string, unknown>[]

					// Map Excel columns to job fields
					// Expected columns: Name, FatherName, Gender, MobileNumber, WhatsAppNumber, 
					// FieldExperiencedInYears, SubjectTought, PackageDemand, DOB
					const jobs: JobOpportunityCreateRequest[] = jsonData.map((row: Record<string, unknown>) => {
						// Normalize column names (case-insensitive, handle spaces)
						const normalizeKey = (key: string) => key?.toString().toLowerCase().trim().replace(/\s+/g, '')

						const getValue = (keys: string[]) => {
							for (const key of keys) {
								const normalizedKey = normalizeKey(key)
								for (const rowKey in row) {
									if (normalizeKey(rowKey) === normalizedKey) {
										return row[rowKey]
									}
								}
							}
							return null
						}

						// Parse gender (Male/Female/Other or 0/1/2)
						const genderValue = getValue(['Gender', 'gender', 'GENDER'])
						let gender: number | undefined = undefined
						if (genderValue !== null && genderValue !== undefined && genderValue !== '') {
							const genderStr = String(genderValue).toLowerCase().trim()
							if (genderStr === 'male' || genderStr === '0' || genderStr === 'm') {
								gender = 0
							} else if (genderStr === 'female' || genderStr === '1' || genderStr === 'f') {
								gender = 1
							} else if (genderStr === 'other' || genderStr === '2' || genderStr === 'o') {
								gender = 2
							} else {
								const numGender = parseInt(genderStr)
								if (!isNaN(numGender) && numGender >= 0 && numGender <= 2) {
									gender = numGender
								}
							}
						}

						// Parse DOB
						let dob: Date | undefined = undefined
						const dobValue = getValue(['DOB', 'dob', 'DateOfBirth', 'dateofbirth', 'BirthDate', 'birthdate'])
						if (dobValue) {
							// Try to parse as date
							const dobDate = XLSX.SSF.parse_date_code(dobValue as number)
							if (dobDate) {
								dob = new Date(dobDate.y, dobDate.m - 1, dobDate.d)
							} else {
								// Try parsing as string
								const parsedDate = new Date(dobValue as string)
								if (!isNaN(parsedDate.getTime())) {
									dob = parsedDate
								}
							}
						}

						// Parse experience years
						const experienceValue = getValue(['FieldExperiencedInYears', 'Experience', 'experience', 'Years', 'years'])
						let experience: number | undefined = undefined
						if (experienceValue !== null && experienceValue !== undefined && experienceValue !== '') {
							const expNum = Number(experienceValue)
							if (!isNaN(expNum) && expNum >= 0 && expNum <= 50) {
								experience = expNum
							}
						}

						return {
							name: String(getValue(['Name', 'name', 'NAME']) || '').trim(),
							fatherName: String(getValue(['FatherName', 'Father Name', 'fathername', 'father name']) || '').trim(),
							gender: gender,
							mobileNumber: String(getValue(['MobileNumber', 'Mobile', 'mobile', 'Phone', 'phone']) || '').trim(),
							address: (() => {
								const v = getValue(['Address', 'address', 'ADDRESS', 'ResidentialAddress', 'residential address'])
								return v != null && String(v).trim() !== '' ? String(v).trim() : undefined
							})(),
							whatsAppNumber: getValue(['WhatsAppNumber', 'WhatsApp', 'whatsapp', 'WhatsApp Number']) 
								? String(getValue(['WhatsAppNumber', 'WhatsApp', 'whatsapp', 'WhatsApp Number'])).trim() 
								: undefined,
							fieldExperiencedInYears: experience,
							subjectTought: getValue(['SubjectTought', 'Subject', 'subject', 'Subject Taught']) 
								? String(getValue(['SubjectTought', 'Subject', 'subject', 'Subject Taught'])).trim() 
								: undefined,
							packageDemand: getValue(['PackageDemand', 'Package', 'package', 'Salary', 'salary']) 
								? String(getValue(['PackageDemand', 'Package', 'package', 'Salary', 'salary'])).trim() 
								: undefined,
							dob: dob,
						}
					}).filter((job) => {
						// Filter out rows with missing required fields
						return job.name && job.fatherName && job.mobileNumber
					})

					resolve(jobs)
				} catch (err) {
					reject(err)
				}
			}
			reader.readAsArrayBuffer(file)
		})
	}

	const handleUpload = async () => {
		if (!file) {
			setError('Please select a file first')
			return
		}

		setIsUploading(true)
		setError(null)
		setImportResult(null)

		try {
			const jobs = await parseExcelToJobs(file)
			
			if (jobs.length === 0) {
				setError('No valid job applications found in the Excel file. Please ensure the file contains Name, FatherName, and MobileNumber columns.')
				setIsUploading(false)
				return
			}

			const result = await bulkImportJobApplications(jobs)
			setImportResult(result)

			if (result.successCount > 0) {
				// Refresh the jobs list after a short delay
				setTimeout(() => {
					onSuccess()
				}, 1500)
			}
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Failed to import jobs from Excel file.'
			setError(message)
			console.error('Error importing jobs:', err)
		} finally {
			setIsUploading(false)
		}
	}

	const handleClose = () => {
		setFile(null)
		setPreview([])
		setError(null)
		setImportResult(null)
		onClose()
	}

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			<div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
				{/* Background overlay */}
				<div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={handleClose}></div>

				{/* Modal panel */}
				<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
					<div className="bg-white px-4 pt-5 pb-4 sm:p-6">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-blue-100">
									<FileSpreadsheet className="w-6 h-6 text-blue-600" />
								</div>
								<h3 className="text-2xl font-bold text-gray-900">Import Jobs from Excel</h3>
							</div>
							<button
								onClick={handleClose}
								className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
								disabled={isUploading}
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						{/* Instructions */}
						<div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
							<h4 className="font-semibold text-blue-900 mb-2">Excel File Format:</h4>
							<p className="text-sm text-blue-800 mb-2">Your Excel file should have the following columns (first row is header):</p>
							<ul className="text-sm text-blue-800 list-disc list-inside space-y-1">
								<li><strong>Name</strong> (Required)</li>
								<li><strong>FatherName</strong> or <strong>Father Name</strong> (Required)</li>
								<li><strong>MobileNumber</strong> or <strong>Mobile</strong> (Required)</li>
								<li><strong>Address</strong> or <strong>ResidentialAddress</strong> (Optional)</li>
								<li><strong>Gender</strong> (Optional: Male/Female/Other or 0/1/2)</li>
								<li><strong>WhatsAppNumber</strong> or <strong>WhatsApp</strong> (Optional)</li>
								<li><strong>FieldExperiencedInYears</strong> or <strong>Experience</strong> (Optional)</li>
								<li><strong>SubjectTought</strong> or <strong>Subject</strong> (Optional)</li>
								<li><strong>PackageDemand</strong> or <strong>Package</strong> (Optional)</li>
								<li><strong>DOB</strong> or <strong>DateOfBirth</strong> (Optional)</li>
							</ul>
						</div>

						{/* File Upload */}
						<div className="mb-6">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Select Excel File (.xlsx or .xls)
							</label>
							<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
								<div className="space-y-1 text-center">
									<Upload className="mx-auto h-12 w-12 text-gray-400" />
									<div className="flex text-sm text-gray-600">
										<label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
											<span>Upload a file</span>
											<input
												id="file-upload"
												name="file-upload"
												type="file"
												className="sr-only"
												accept=".xlsx,.xls"
												onChange={handleFileSelect}
												disabled={isUploading}
											/>
										</label>
										<p className="pl-1">or drag and drop</p>
									</div>
									<p className="text-xs text-gray-500">Excel files only (.xlsx, .xls)</p>
									{file && (
										<p className="text-sm text-gray-700 mt-2">
											Selected: <span className="font-medium">{file.name}</span>
										</p>
									)}
								</div>
							</div>
						</div>

						{/* Preview */}
						{preview.length > 0 && (
							<div className="mb-6">
								<h4 className="text-sm font-medium text-gray-700 mb-2">Preview (first 5 rows):</h4>
								<div className="overflow-x-auto border rounded-lg">
									<table className="min-w-full divide-y divide-gray-200">
										<thead className="bg-gray-50">
											<tr>
												{Object.keys(preview[0] || {}).map((key) => (
													<th key={key} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
														{key}
													</th>
												))}
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{preview.map((row, idx) => (
												<tr key={idx}>
													{Object.values(row).map((value: string | number | null | undefined, valIdx) => (
														<td key={valIdx} className="px-3 py-2 text-sm text-gray-900">
															{value?.toString() || ''}
														</td>
													))}
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						)}

						{/* Error Message */}
						{error && (
							<div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
								<AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
								<p className="text-sm text-red-800">{error}</p>
							</div>
						)}

						{/* Import Result */}
						{importResult && (
							<div className={`mb-4 p-4 rounded-lg border ${
								importResult.failedCount === 0 
									? 'bg-green-50 border-green-200' 
									: 'bg-yellow-50 border-yellow-200'
							}`}>
								<div className="flex items-start gap-3">
									{importResult.failedCount === 0 ? (
										<CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
									) : (
										<AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
									)}
									<div className="flex-1">
										<p className={`text-sm font-medium ${
											importResult.failedCount === 0 ? 'text-green-800' : 'text-yellow-800'
										}`}>
											Import completed: {importResult.successCount} successful, {importResult.failedCount} failed
										</p>
										{importResult.errors.length > 0 && (
											<ul className="mt-2 text-xs text-yellow-700 list-disc list-inside space-y-1">
												{importResult.errors.slice(0, 10).map((err, idx) => (
													<li key={idx}>{err}</li>
												))}
												{importResult.errors.length > 10 && (
													<li>... and {importResult.errors.length - 10} more errors</li>
												)}
											</ul>
										)}
									</div>
								</div>
							</div>
						)}

						{/* Actions */}
						<div className="flex items-center justify-end gap-3 pt-4 border-t">
							<button
								onClick={handleClose}
								disabled={isUploading}
								className="px-4 py-2 text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Cancel
							</button>
							<button
								onClick={handleUpload}
								disabled={!file || isUploading}
								className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
							>
								{isUploading ? (
									<>
										<Loader2 className="w-4 h-4 animate-spin" />
										<span>Importing...</span>
									</>
								) : (
									<>
										<Upload className="w-4 h-4" />
										<span>Import Jobs</span>
									</>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
