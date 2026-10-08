'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, X, Trash2, Download, Loader2, AlertCircle, Eye, Phone, User, Briefcase, Upload, MapPin } from 'lucide-react'
import { JobOpportunity, getAllJobApplications, deleteJobApplication } from '@/lib/api/jobs'
import { formatDate } from '@/lib/utils'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'
import JobApplicationModal from './JobApplicationModal'
import JobsExcelImport from './JobsExcelImport'

export default function JobsTable() {
	const [jobs, setJobs] = useState<JobOpportunity[]>([])
	const [filteredJobs, setFilteredJobs] = useState<JobOpportunity[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [searchTerm, setSearchTerm] = useState('')
	const [deletingId, setDeletingId] = useState<number | null>(null)
	const [viewingJob, setViewingJob] = useState<JobOpportunity | null>(null)
	const [isImportModalOpen, setIsImportModalOpen] = useState(false)
	const [confirmDialog, setConfirmDialog] = useState<{
		isOpen: boolean
		type: 'danger' | 'warning' | 'info'
		title: string
		message: string
		confirmText: string
		onConfirm: () => void
	} | null>(null)

	const sortByApplyDateDesc = (list: JobOpportunity[]) =>
		[...list].sort((a, b) => {
			const aTime = new Date(a.creationDate).getTime()
			const bTime = new Date(b.creationDate).getTime()
			const aValid = Number.isFinite(aTime) ? aTime : 0
			const bValid = Number.isFinite(bTime) ? bTime : 0
			if (bValid !== aValid) return bValid - aValid
			return b.id - a.id
		})

	const loadJobs = useCallback(async () => {
		try {
			setLoading(true)
			setError(null)
			const data = await getAllJobApplications()
			setJobs(sortByApplyDateDesc(Array.isArray(data) ? data : []))
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Unable to load job applications.'
			setError(message)
			console.error('Error loading job applications:', err)
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		loadJobs()
	}, [loadJobs])

	useEffect(() => {
		let filtered = [...jobs]

		if (searchTerm) {
			const term = searchTerm.toLowerCase()
			filtered = filtered.filter(
				job =>
					job.name.toLowerCase().includes(term) ||
					job.fatherName.toLowerCase().includes(term) ||
					job.mobileNumber.toLowerCase().includes(term) ||
					job.address?.toLowerCase().includes(term) ||
					job.subjectTought?.toLowerCase().includes(term) ||
					job.packageDemand?.toLowerCase().includes(term)
			)
		}

		setFilteredJobs(sortByApplyDateDesc(filtered))
	}, [jobs, searchTerm])

	const handleDelete = async (id: number) => {
		setConfirmDialog({
			isOpen: true,
			type: 'danger',
			title: 'Delete Job Application',
			message: 'Are you sure you want to delete this job application? This action cannot be undone.',
			confirmText: 'Delete',
			onConfirm: async () => {
				try {
					setDeletingId(id)
					await deleteJobApplication(id)
					await loadJobs()
					setConfirmDialog(null)
				} catch (err) {
					const message = err instanceof Error ? err.message : 'Unable to delete job application.'
					alert(message)
				} finally {
					setDeletingId(null)
				}
			},
		})
	}

	const handleExport = () => {
		// Simple CSV export
		const headers = ['Name', 'Father Name', 'Gender', 'Mobile', 'Address', 'WhatsApp', 'Experience (Years)', 'Subject', 'Package', 'DOB', 'Applied Date']
		const rows = filteredJobs.map(job => [
			job.name,
			job.fatherName,
			job.gender || '',
			job.mobileNumber,
			job.address || '',
			job.whatsAppNumber || '',
			job.fieldExperiencedInYears?.toString() || '',
			job.subjectTought || '',
			job.packageDemand || '',
			job.dob ? formatDate(job.dob) : '',
			formatDate(job.creationDate),
		])

		const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
		const link = document.createElement('a')
		const url = URL.createObjectURL(blob)
		link.setAttribute('href', url)
		link.setAttribute('download', `job-applications-${new Date().toISOString().split('T')[0]}.csv`)
		link.style.visibility = 'hidden'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center py-12">
				<Loader2 className="w-8 h-8 animate-spin text-blue-600" />
			</div>
		)
	}

	if (error) {
		return (
			<div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
				<AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
				<div>
					<h3 className="font-semibold text-red-900 mb-1">Error</h3>
					<p className="text-red-700 text-sm">{error}</p>
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-4">
			{/* Header with Search and Actions */}
			<div className="flex flex-col gap-3 sm:gap-4">
				<div className="relative w-full">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
					<input
						type="text"
						placeholder="Search by name, mobile, address, subject..."
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						className="w-full pl-10 pr-11 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base min-h-[44px]"
					/>
					{searchTerm && (
						<button
							type="button"
							onClick={() => setSearchTerm('')}
							className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
							aria-label="Clear search"
						>
							<X className="w-4 h-4" />
						</button>
					)}
				</div>
				<div className="flex flex-wrap gap-2">
					<button
						type="button"
						onClick={() => setIsImportModalOpen(true)}
						className="flex-1 sm:flex-none px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2 min-h-[44px]"
					>
						<Upload className="w-4 h-4" />
						<span className="sm:inline">Import Excel</span>
					</button>
					<button
						type="button"
						onClick={handleExport}
						className="flex-1 sm:flex-none px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center gap-2 min-h-[44px]"
					>
						<Download className="w-4 h-4" />
						<span className="sm:inline">Export CSV</span>
					</button>
				</div>
			</div>

			{/* Stats */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
					<div className="text-sm text-blue-600 font-medium">Total Applications</div>
					<div className="text-2xl font-bold text-blue-900">{jobs.length}</div>
				</div>
				<div className="bg-green-50 border border-green-200 rounded-lg p-4">
					<div className="text-sm text-green-600 font-medium">Filtered Results</div>
					<div className="text-2xl font-bold text-green-900">{filteredJobs.length}</div>
				</div>
				<div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
					<div className="text-sm text-purple-600 font-medium">This Month</div>
					<div className="text-2xl font-bold text-purple-900">
						{jobs.filter(job => {
							const jobDate = new Date(job.creationDate)
							const now = new Date()
							return jobDate.getMonth() === now.getMonth() && jobDate.getFullYear() === now.getFullYear()
						}).length}
					</div>
				</div>
			</div>

			{/* Desktop table */}
			<div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Father Name</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell max-w-[200px]">Address</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
								<th className="sticky right-0 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 z-10 border-l border-gray-200 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)]">Actions</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{filteredJobs.length === 0 ? (
								<tr>
									<td colSpan={8} className="px-6 py-12 text-center text-gray-500">
										No job applications found.
									</td>
								</tr>
							) : (
								filteredJobs.map(job => (
									<tr key={job.id} className="hover:bg-gray-50 group">
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<User className="w-4 h-4 text-gray-400 mr-2" />
												<div className="text-sm font-medium text-gray-900">{job.name}</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.fatherName}</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center text-sm text-gray-900">
												<Phone className="w-4 h-4 text-gray-400 mr-2" />
												{job.mobileNumber}
											</div>
										</td>
										<td className="px-6 py-4 text-sm text-gray-600 hidden xl:table-cell max-w-[220px]">
											{job.address ? (
												<div className="flex items-start gap-1.5" title={job.address}>
													<MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
													<span className="line-clamp-2">{job.address}</span>
												</div>
											) : (
												<span className="text-gray-400">—</span>
											)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{job.fieldExperiencedInYears !== undefined ? (
												<div className="flex items-center text-sm text-gray-900">
													<Briefcase className="w-4 h-4 text-gray-400 mr-2" />
													{job.fieldExperiencedInYears} {job.fieldExperiencedInYears === 1 ? 'year' : 'years'}
												</div>
											) : (
												<span className="text-sm text-gray-400">-</span>
											)}
										</td>
										<td className="px-6 py-4 text-sm text-gray-500">{job.subjectTought || '-'}</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(job.creationDate)}</td>
										<td className="sticky right-0 px-6 py-4 whitespace-nowrap text-right text-sm font-medium bg-white group-hover:bg-gray-50 z-10 border-l border-gray-200 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)] transition-colors">
											<div className="flex items-center justify-end gap-2">
												<button
													type="button"
													onClick={() => setViewingJob(job)}
													className="no-touch-target text-blue-600 hover:text-blue-900 p-2 rounded hover:bg-blue-50 transition-colors"
													title="View Details"
													aria-label={`View ${job.name} details`}
												>
													<Eye className="w-4 h-4" />
												</button>
												<button
													type="button"
													onClick={() => handleDelete(job.id)}
													disabled={deletingId === job.id}
													className="no-touch-target text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50 disabled:opacity-50 transition-colors"
													title="Delete"
													aria-label={`Delete ${job.name}`}
												>
													{deletingId === job.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
												</button>
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* Mobile cards */}
			<div className="lg:hidden space-y-3">
				{filteredJobs.length === 0 ? (
					<div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500">
						No job applications found.
					</div>
				) : (
					filteredJobs.map(job => (
						<div key={job.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
							<div className="flex items-start justify-between gap-3">
								<div className="min-w-0">
									<p className="font-semibold text-gray-900 truncate">{job.name}</p>
									<p className="text-sm text-gray-500 truncate">S/O {job.fatherName}</p>
								</div>
								<span className="shrink-0 text-xs font-medium text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-2.5 py-1">
									{formatDate(job.creationDate)}
								</span>
							</div>
							<div className="mt-3 grid grid-cols-1 gap-1.5 text-sm text-gray-600">
								<p className="flex items-center gap-2">
									<Phone className="w-4 h-4 text-gray-400 shrink-0" />
									<a href={`tel:${job.mobileNumber}`} className="text-blue-700 font-medium">
										{job.mobileNumber}
									</a>
								</p>
								{job.subjectTought && (
									<p className="flex items-center gap-2">
										<Briefcase className="w-4 h-4 text-gray-400 shrink-0" />
										<span>{job.subjectTought}</span>
										{job.fieldExperiencedInYears !== undefined && (
											<span className="text-gray-400">
												· {job.fieldExperiencedInYears}{' '}
												{job.fieldExperiencedInYears === 1 ? 'yr' : 'yrs'}
											</span>
										)}
									</p>
								)}
								{job.address && (
									<p className="flex items-start gap-2">
										<MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
										<span className="line-clamp-2">{job.address}</span>
									</p>
								)}
							</div>
							<div className="mt-4 flex gap-2">
								<button
									type="button"
									onClick={() => setViewingJob(job)}
									className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 text-sm font-semibold text-blue-800 min-h-[44px]"
								>
									<Eye className="w-4 h-4" />
									View
								</button>
								<button
									type="button"
									onClick={() => handleDelete(job.id)}
									disabled={deletingId === job.id}
									className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-800 min-h-[44px] disabled:opacity-50"
								>
									{deletingId === job.id ? (
										<Loader2 className="w-4 h-4 animate-spin" />
									) : (
										<Trash2 className="w-4 h-4" />
									)}
									Delete
								</button>
							</div>
						</div>
					))
				)}
			</div>

			{/* Confirmation Dialog */}
			{confirmDialog && (
				<ConfirmationDialog
					isOpen={confirmDialog.isOpen}
					type={confirmDialog.type}
					title={confirmDialog.title}
					message={confirmDialog.message}
					confirmText={confirmDialog.confirmText}
					cancelText="Cancel"
					onConfirm={confirmDialog.onConfirm}
					onClose={() => setConfirmDialog(null)}
				/>
			)}

			{/* View Details Modal */}
			{viewingJob && <JobApplicationModal job={viewingJob} onClose={() => setViewingJob(null)} />}

			{/* Excel Import Modal */}
			<JobsExcelImport
				isOpen={isImportModalOpen}
				onClose={() => setIsImportModalOpen(false)}
				onSuccess={loadJobs}
			/>
		</div>
	)
}

