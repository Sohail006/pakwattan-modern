'use client'

import { useState, useMemo } from 'react'
import { Phone, Mail, MessageCircle, Copy, Edit, Trash2, Loader2, CheckCircle, XCircle, Monitor, School, UserCheck, Users } from 'lucide-react'
import { ITSupport } from '@/lib/api/itSupport'
import { Coordinator } from '@/lib/api/coordinators'
import { ContactPerson } from '@/lib/api/contactPersons'
import { Campus } from '@/lib/api/campuses'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'
import BulkActionsToolbar from './BulkActionsToolbar'
import { toastService } from '@/lib/utils/toast'

interface UnifiedContactsTableProps {
	itSupport: ITSupport[]
	coordinators: Coordinator[]
	contactPersons: ContactPerson[]
	campuses: Campus[]
	viewMode: 'table' | 'cards'
	searchTerm: string
	statusFilter: 'all' | 'active' | 'inactive'
	typeFilter: string
	onRefresh: () => void
	onEdit?: (contact: ITSupport | Coordinator | ContactPerson | Campus, type: string) => void
}

type UnifiedContact = {
	id: number
	type: 'it-support' | 'campus' | 'coordinator' | 'contact-person'
	name: string
	email: string
	phone?: string
	mobileNumber?: string
	whatsAppNumber?: string
	department?: string
	campus?: string
	isActive: boolean
	original: ITSupport | Coordinator | ContactPerson | Campus
}

export default function UnifiedContactsTable({
	itSupport,
	coordinators,
	contactPersons,
	campuses,
	viewMode,
	searchTerm,
	statusFilter,
	typeFilter,
	onRefresh,
	onEdit
}: UnifiedContactsTableProps) {
	const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
	const [deletingId, setDeletingId] = useState<number | null>(null)
	const [confirmDialog, setConfirmDialog] = useState<{
		isOpen: boolean
		type: 'danger' | 'warning' | 'info'
		title: string
		message: string
		confirmText: string
		onConfirm: () => void
	} | null>(null)

	// Transform all contacts into unified format
	const unifiedContacts: UnifiedContact[] = useMemo(() => {
		const contacts: UnifiedContact[] = []

		// IT Support
		itSupport.forEach(item => {
			contacts.push({
				id: item.id,
				type: 'it-support',
				name: item.title,
				email: item.email,
				phone: item.phone,
				mobileNumber: item.mobileNumber,
				whatsAppNumber: item.whatsAppNumber,
				department: item.department,
				isActive: item.isActive,
				original: item
			})
		})

		// Campuses
		campuses.forEach(item => {
			contacts.push({
				id: item.id,
				type: 'campus',
				name: item.name,
				email: item.email || '',
				phone: item.phone,
				mobileNumber: item.mobileNumber,
				whatsAppNumber: item.whatsAppNumber,
				isActive: item.isActive,
				original: item
			})
		})

		// Coordinators
		coordinators.forEach(item => {
			contacts.push({
				id: item.id,
				type: 'coordinator',
				name: `${item.firstName} ${item.lastName}`,
				email: item.email,
				phone: item.phone,
				mobileNumber: item.mobileNumber,
				whatsAppNumber: item.whatsAppNumber,
				department: item.department,
				campus: item.campus?.name,
				isActive: item.isActive,
				original: item
			})
		})

		// Contact Persons
		contactPersons.forEach(item => {
			contacts.push({
				id: item.id,
				type: 'contact-person',
				name: item.name,
				email: item.email,
				phone: item.phone,
				mobileNumber: item.mobileNumber,
				whatsAppNumber: item.whatsAppNumber,
				department: item.department,
				isActive: item.isActive,
				original: item
			})
		})

		return contacts
	}, [itSupport, coordinators, contactPersons, campuses])

	// Filter contacts
	const filteredContacts = useMemo(() => {
		let filtered = [...unifiedContacts]

		// Search filter
		if (searchTerm) {
			const term = searchTerm.toLowerCase()
			filtered = filtered.filter(contact =>
				contact.name.toLowerCase().includes(term) ||
				contact.email.toLowerCase().includes(term) ||
				contact.phone?.toLowerCase().includes(term) ||
				contact.mobileNumber?.toLowerCase().includes(term) ||
				contact.department?.toLowerCase().includes(term) ||
				contact.campus?.toLowerCase().includes(term)
			)
		}

		// Status filter
		if (statusFilter !== 'all') {
			filtered = filtered.filter(contact => 
				statusFilter === 'active' ? contact.isActive : !contact.isActive
			)
		}

		// Type filter
		if (typeFilter !== 'all') {
			filtered = filtered.filter(contact => contact.type === typeFilter)
		}

		return filtered
	}, [unifiedContacts, searchTerm, statusFilter, typeFilter])

	// Get selected contacts for bulk operations
	const selectedContacts = useMemo(() => {
		return filteredContacts
			.filter(contact => selectedIds.has(contact.id))
			.map(contact => ({
				id: contact.id,
				type: contact.type,
				name: contact.name
			}))
	}, [filteredContacts, selectedIds])

	const getTypeIcon = (type: string) => {
		switch (type) {
			case 'it-support': return Monitor
			case 'campus': return School
			case 'coordinator': return UserCheck
			case 'contact-person': return Users
			default: return Users
		}
	}

	const getTypeLabel = (type: string) => {
		switch (type) {
			case 'it-support': return 'IT Support'
			case 'campus': return 'Campus'
			case 'coordinator': return 'Coordinator'
			case 'contact-person': return 'Other'
			default: return 'Contact'
		}
	}

	const handleQuickAction = (action: 'call' | 'email' | 'whatsapp' | 'copy', contact: UnifiedContact) => {
		const phone = contact.mobileNumber || contact.phone || ''
		const email = contact.email

		switch (action) {
			case 'call':
				if (phone) {
					window.open(`tel:${phone.replace(/\s/g, '')}`, '_blank')
				} else {
					toastService.error('Phone number not available')
				}
				break
			case 'email':
				if (email) {
					window.open(`mailto:${email}`, '_blank')
				} else {
					toastService.error('Email not available')
				}
				break
			case 'whatsapp':
				if (contact.whatsAppNumber) {
					window.open(`https://wa.me/${contact.whatsAppNumber.replace(/\s/g, '').replace(/^\+/, '')}`, '_blank')
				} else if (phone) {
					window.open(`https://wa.me/${phone.replace(/\s/g, '').replace(/^\+/, '')}`, '_blank')
				} else {
					toastService.error('WhatsApp number not available')
				}
				break
			case 'copy':
				const text = `${contact.name}\nEmail: ${email}\nPhone: ${phone}`
				navigator.clipboard.writeText(text)
				toastService.success('Contact information copied to clipboard')
				break
		}
	}

	const handleDelete = async (contact: UnifiedContact) => {
		setConfirmDialog({
			isOpen: true,
			type: 'danger',
			title: 'Delete Contact',
			message: `Are you sure you want to delete "${contact.name}"? This action cannot be undone.`,
			confirmText: 'Delete',
			onConfirm: async () => {
				setConfirmDialog(null)
				try {
					setDeletingId(contact.id)
					
					// Import and call appropriate delete function
					switch (contact.type) {
						case 'it-support':
							const { deleteITSupport } = await import('@/lib/api/itSupport')
							await deleteITSupport(contact.id)
							break
						case 'coordinator':
							const { deleteCoordinator } = await import('@/lib/api/coordinators')
							await deleteCoordinator(contact.id)
							break
						case 'contact-person':
							const { deleteContactPerson } = await import('@/lib/api/contactPersons')
							await deleteContactPerson(contact.id)
							break
						case 'campus':
							const { deleteCampus } = await import('@/lib/api/campuses')
							await deleteCampus(contact.id)
							break
					}
					
					toastService.success('Contact deleted successfully')
					onRefresh()
				} catch (err) {
					const message = err instanceof Error ? err.message : 'Unable to delete contact.'
					toastService.error(message)
				} finally {
					setDeletingId(null)
				}
			}
		})
	}

	const toggleSelect = (id: number) => {
		setSelectedIds(prev => {
			const newSet = new Set(prev)
			if (newSet.has(id)) {
				newSet.delete(id)
			} else {
				newSet.add(id)
			}
			return newSet
		})
	}

	const toggleSelectAll = () => {
		if (selectedIds.size === filteredContacts.length) {
			setSelectedIds(new Set())
		} else {
			setSelectedIds(new Set(filteredContacts.map(c => c.id)))
		}
	}

	if (viewMode === 'cards') {
		return (
			<>
				{/* Bulk Actions Toolbar */}
				<BulkActionsToolbar
					selectedIds={selectedIds}
					selectedContacts={selectedContacts}
					onClearSelection={() => setSelectedIds(new Set())}
					onRefresh={onRefresh}
				/>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{filteredContacts.map(contact => {
					const TypeIcon = getTypeIcon(contact.type)
					const isSelected = selectedIds.has(contact.id)
					return (
						<div 
							key={`${contact.type}-${contact.id}`} 
							className={`bg-white border rounded-lg p-4 hover:shadow-md transition-shadow ${
								isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
							}`}
						>
							<div className="flex items-start justify-between mb-3">
								<div className="flex items-center gap-2 flex-1">
									<input
										type="checkbox"
										checked={isSelected}
										onChange={() => toggleSelect(contact.id)}
										className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
									/>
									<TypeIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
									<div className="min-w-0 flex-1">
										<h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
										<p className="text-xs text-gray-500">{getTypeLabel(contact.type)}</p>
									</div>
								</div>
								{contact.isActive ? (
									<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
								) : (
									<XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
								)}
							</div>
							<div className="space-y-2 text-sm text-gray-600 mb-4">
								{contact.email && <p className="truncate" title={contact.email}>📧 {contact.email}</p>}
								{contact.mobileNumber && <p>📱 {contact.mobileNumber}</p>}
								{contact.department && <p className="truncate" title={contact.department}>🏢 {contact.department}</p>}
								{contact.campus && <p className="truncate" title={contact.campus}>🏫 {contact.campus}</p>}
							</div>
							<div className="flex items-center gap-2 flex-wrap">
								{onEdit && (
									<button
										onClick={() => onEdit(contact.original, contact.type)}
										className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
										title="Edit"
									>
										<Edit className="w-4 h-4" />
									</button>
								)}
								{contact.mobileNumber && (
									<button
										onClick={() => handleQuickAction('call', contact)}
										className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
										title="Call"
									>
										<Phone className="w-4 h-4" />
									</button>
								)}
								{contact.email && (
									<button
										onClick={() => handleQuickAction('email', contact)}
										className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
										title="Email"
									>
										<Mail className="w-4 h-4" />
									</button>
								)}
								{(contact.whatsAppNumber || contact.mobileNumber) && (
									<button
										onClick={() => handleQuickAction('whatsapp', contact)}
										className="p-2 text-green-500 hover:bg-green-50 rounded transition-colors"
										title="WhatsApp"
									>
										<MessageCircle className="w-4 h-4" />
									</button>
								)}
								<button
									onClick={() => handleQuickAction('copy', contact)}
									className="p-2 text-gray-600 hover:bg-gray-50 rounded transition-colors"
									title="Copy"
								>
									<Copy className="w-4 h-4" />
								</button>
								<button
									onClick={() => handleDelete(contact)}
									className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
									title="Delete"
								>
									<Trash2 className="w-4 h-4" />
								</button>
							</div>
						</div>
					)
				})}
				</div>
			</>
		)
	}

	return (
		<>
			{/* Bulk Actions Toolbar */}
			<BulkActionsToolbar
				selectedIds={selectedIds}
				selectedContacts={selectedContacts}
				onClearSelection={() => setSelectedIds(new Set())}
				onRefresh={onRefresh}
			/>

			<div className="overflow-x-auto -mx-4 md:mx-0">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="sticky left-0 px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 z-10 border-r border-gray-200">
								<input
									type="checkbox"
									checked={selectedIds.size === filteredContacts.length && filteredContacts.length > 0}
									onChange={toggleSelectAll}
									className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
									aria-label="Select all contacts"
								/>
							</th>
							<th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Type</th>
							<th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
							<th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Email</th>
							<th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Phone</th>
							<th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
							<th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Department</th>
							<th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Campus</th>
							<th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Status</th>
							<th className="sticky right-0 px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 z-10 border-l border-gray-200">Actions</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{filteredContacts.length === 0 ? (
							<tr>
								<td colSpan={10} className="px-6 py-12 text-center text-gray-500">
									No contacts found. Try adjusting your search or filters.
								</td>
							</tr>
						) : (
							filteredContacts.map(contact => {
								const TypeIcon = getTypeIcon(contact.type)
								const isSelected = selectedIds.has(contact.id)
								return (
									<tr key={`${contact.type}-${contact.id}`} className={`hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}>
										<td className="sticky left-0 px-3 md:px-6 py-4 whitespace-nowrap bg-white group-hover:bg-gray-50 z-10 border-r border-gray-200">
											<input
												type="checkbox"
												checked={isSelected}
												onChange={() => toggleSelect(contact.id)}
												className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
												aria-label={`Select ${contact.name}`}
											/>
										</td>
										<td className="px-3 md:px-6 py-4 whitespace-nowrap hidden md:table-cell">
											<div className="flex items-center gap-2">
												<TypeIcon className="w-4 h-4 text-blue-600" />
												<span className="text-sm text-gray-900">{getTypeLabel(contact.type)}</span>
											</div>
										</td>
										<td className="px-3 md:px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
												<TypeIcon className="w-4 h-4 text-blue-600 md:hidden" />
												<div>
													<div className="text-sm font-medium text-gray-900">{contact.name}</div>
													<div className="text-xs text-gray-500 md:hidden">{getTypeLabel(contact.type)}</div>
												</div>
											</div>
										</td>
										<td className="px-3 md:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
											<div className="text-sm text-gray-500 truncate max-w-[200px]" title={contact.email}>{contact.email}</div>
										</td>
										<td className="px-3 md:px-6 py-4 whitespace-nowrap hidden xl:table-cell">
											<div className="text-sm text-gray-500">{contact.phone || '-'}</div>
										</td>
										<td className="px-3 md:px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-500">{contact.mobileNumber || '-'}</div>
										</td>
										<td className="px-3 md:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
											<div className="text-sm text-gray-500 truncate max-w-[150px]" title={contact.department || ''}>{contact.department || '-'}</div>
										</td>
										<td className="px-3 md:px-6 py-4 whitespace-nowrap hidden xl:table-cell">
											<div className="text-sm text-gray-500 truncate max-w-[150px]" title={contact.campus || ''}>{contact.campus || '-'}</div>
										</td>
										<td className="px-3 md:px-6 py-4 whitespace-nowrap hidden md:table-cell">
											{contact.isActive ? (
												<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
													<CheckCircle className="w-3 h-3 mr-1" />
													<span className="hidden sm:inline">Active</span>
												</span>
											) : (
												<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
													<XCircle className="w-3 h-3 mr-1" />
													<span className="hidden sm:inline">Inactive</span>
												</span>
											)}
										</td>
										<td className="sticky right-0 px-3 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium bg-white group-hover:bg-gray-50 z-10 border-l border-gray-200">
											<div className="flex items-center justify-end gap-2">
												{contact.mobileNumber && (
													<button
														onClick={() => handleQuickAction('call', contact)}
														className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
														title="Call"
														aria-label={`Call ${contact.name}`}
													>
														<Phone className="w-4 h-4" />
													</button>
												)}
												{contact.email && (
													<button
														onClick={() => handleQuickAction('email', contact)}
														className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
														title="Email"
														aria-label={`Email ${contact.name}`}
													>
														<Mail className="w-4 h-4" />
													</button>
												)}
												{(contact.whatsAppNumber || contact.mobileNumber) && (
													<button
														onClick={() => handleQuickAction('whatsapp', contact)}
														className="text-green-500 hover:text-green-700 p-1 rounded hover:bg-green-50 transition-colors"
														title="WhatsApp"
														aria-label={`WhatsApp ${contact.name}`}
													>
														<MessageCircle className="w-4 h-4" />
													</button>
												)}
												<button
													onClick={() => handleQuickAction('copy', contact)}
													className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors"
													title="Copy"
													aria-label={`Copy ${contact.name} information`}
												>
													<Copy className="w-4 h-4" />
												</button>
												{onEdit && (
													<button
														onClick={() => onEdit(contact.original, contact.type)}
														className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
														title="Edit"
														aria-label={`Edit ${contact.name}`}
													>
														<Edit className="w-4 h-4" />
													</button>
												)}
												<button
													onClick={() => handleDelete(contact)}
													disabled={deletingId === contact.id}
													className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 disabled:opacity-50 transition-colors"
													title="Delete"
													aria-label={`Delete ${contact.name}`}
												>
													{deletingId === contact.id ? (
														<Loader2 className="w-4 h-4 animate-spin" />
													) : (
														<Trash2 className="w-4 h-4" />
													)}
												</button>
											</div>
										</td>
									</tr>
								)
							})
						)}
					</tbody>
				</table>
			</div>

			{confirmDialog && (
				<ConfirmationDialog
					isOpen={confirmDialog.isOpen}
					type={confirmDialog.type}
					title={confirmDialog.title}
					message={confirmDialog.message}
					confirmText={confirmDialog.confirmText}
					onConfirm={confirmDialog.onConfirm}
					onClose={() => setConfirmDialog(null)}
				/>
			)}
		</>
	)
}
