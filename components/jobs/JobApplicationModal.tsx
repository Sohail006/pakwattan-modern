'use client'

import { X, User, Phone, Calendar, Briefcase, BookOpen, Coins } from 'lucide-react'
import { JobOpportunity } from '@/lib/api/jobs'
import { formatDate } from '@/lib/utils'

interface JobApplicationModalProps {
	job: JobOpportunity
	onClose: () => void
}

export default function JobApplicationModal({ job, onClose }: JobApplicationModalProps) {
	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			<div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
				{/* Background overlay */}
				<div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

				{/* Modal panel */}
				<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
					<div className="bg-white px-4 pt-5 pb-4 sm:p-6">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-2xl font-bold text-gray-900">Job Application Details</h3>
							<button
								onClick={onClose}
								className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
							>
								<X className="w-6 h-6" />
							</button>
						</div>

						<div className="space-y-6">
							{/* Personal Information */}
							<div>
								<h4 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">Personal Information</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
										<div className="flex items-center text-gray-900">
											<User className="w-4 h-4 text-gray-400 mr-2" />
											<span className="font-medium">{job.name}</span>
										</div>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-500 mb-1">Father Name</label>
										<div className="flex items-center text-gray-900">
											<User className="w-4 h-4 text-gray-400 mr-2" />
											<span>{job.fatherName}</span>
										</div>
									</div>
									{job.gender && (
										<div>
											<label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
											<span className="text-gray-900 capitalize">{job.gender}</span>
										</div>
									)}
									{job.dob && (
										<div>
											<label className="block text-sm font-medium text-gray-500 mb-1">Date of Birth</label>
											<div className="flex items-center text-gray-900">
												<Calendar className="w-4 h-4 text-gray-400 mr-2" />
												<span>{formatDate(job.dob)}</span>
											</div>
										</div>
									)}
								</div>
							</div>

							{/* Contact Information */}
							<div>
								<h4 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">Contact Information</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-500 mb-1">Mobile Number</label>
										<div className="flex items-center text-gray-900">
											<Phone className="w-4 h-4 text-gray-400 mr-2" />
											<span>{job.mobileNumber}</span>
										</div>
									</div>
									{job.whatsAppNumber && (
										<div>
											<label className="block text-sm font-medium text-gray-500 mb-1">WhatsApp Number</label>
											<div className="flex items-center text-gray-900">
												<Phone className="w-4 h-4 text-gray-400 mr-2" />
												<span>{job.whatsAppNumber}</span>
											</div>
										</div>
									)}
								</div>
							</div>

							{/* Professional Information */}
							<div>
								<h4 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">Professional Information</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{job.fieldExperiencedInYears !== undefined && (
										<div>
											<label className="block text-sm font-medium text-gray-500 mb-1">Teaching Experience</label>
											<div className="flex items-center text-gray-900">
												<Briefcase className="w-4 h-4 text-gray-400 mr-2" />
												<span>
													{job.fieldExperiencedInYears} {job.fieldExperiencedInYears === 1 ? 'year' : 'years'}
												</span>
											</div>
										</div>
									)}
									{job.subjectTought && (
										<div>
											<label className="block text-sm font-medium text-gray-500 mb-1">Subject Taught</label>
											<div className="flex items-center text-gray-900">
												<BookOpen className="w-4 h-4 text-gray-400 mr-2" />
												<span>{job.subjectTought}</span>
											</div>
										</div>
									)}
									{job.packageDemand && (
										<div className="md:col-span-2">
											<label className="block text-sm font-medium text-gray-500 mb-1">Package Demand</label>
											<div className="flex items-center text-gray-900">
												<Coins className="w-4 h-4 text-gray-400 mr-2" />
												<span>{job.packageDemand}</span>
											</div>
										</div>
									)}
								</div>
							</div>

							{/* Application Details */}
							<div>
								<h4 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">Application Details</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-500 mb-1">Application Date</label>
										<div className="flex items-center text-gray-900">
											<Calendar className="w-4 h-4 text-gray-400 mr-2" />
											<span>{formatDate(job.creationDate)}</span>
										</div>
									</div>
									{job.modificationDate && (
										<div>
											<label className="block text-sm font-medium text-gray-500 mb-1">Last Modified</label>
											<div className="flex items-center text-gray-900">
												<Calendar className="w-4 h-4 text-gray-400 mr-2" />
												<span>{formatDate(job.modificationDate)}</span>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>

					<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
						<button
							type="button"
							onClick={onClose}
							className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

