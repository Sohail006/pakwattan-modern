'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Trash2, Download, X, Loader2 } from 'lucide-react'
import { toastService } from '@/lib/utils/toast'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'

interface BulkActionsToolbarProps {
	selectedIds: Set<number>
	selectedContacts: Array<{ id: number; type: string; name: string }>
	onClearSelection: () => void
	onRefresh: () => void
}

export default function BulkActionsToolbar({
	selectedIds,
	selectedContacts,
	onClearSelection,
	onRefresh
}: BulkActionsToolbarProps) {
	const [loading, setLoading] = useState<string | null>(null)
	const [confirmDialog, setConfirmDialog] = useState<{
		isOpen: boolean
		type: 'danger' | 'warning' | 'info'
		title: string
		message: string
		confirmText: string
		onConfirm: () => void
	} | null>(null)

	const handleBulkActivate = async () => {
		if (selectedIds.size === 0) return

		setConfirmDialog({
			isOpen: true,
			type: 'info',
			title: 'Activate Contacts',
			message: `Are you sure you want to activate ${selectedIds.size} contact(s)?`,
			confirmText: 'Activate',
			onConfirm: async () => {
				setConfirmDialog(null)
				setLoading('activate')
				try {
					// Activate contacts individually (can be optimized with bulk API endpoint in future)
					for (const contact of selectedContacts) {
						try {
							switch (contact.type) {
								case 'it-support':
									const { updateITSupport } = await import('@/lib/api/itSupport')
									await updateITSupport({ id: contact.id, isActive: true })
									break
								case 'coordinator':
									const { updateCoordinator } = await import('@/lib/api/coordinators')
									await updateCoordinator({ id: contact.id, isActive: true })
									break
								case 'contact-person':
									const { updateContactPerson } = await import('@/lib/api/contactPersons')
									await updateContactPerson({ id: contact.id, isActive: true })
									break
								case 'campus':
									const { updateCampus } = await import('@/lib/api/campuses')
									await updateCampus({ id: contact.id, isActive: true })
									break
							}
						} catch (err) {
							if (process.env.NODE_ENV === 'development') {
								console.error(`[BulkActions] Error activating ${contact.name}:`, err)
							}
						}
					}

					toastService.success(`${selectedIds.size} contact(s) activated successfully`)
					onClearSelection()
					onRefresh()
				} catch {
					toastService.error('Unable to activate contacts. Please try again.')
				} finally {
					setLoading(null)
				}
			}
		})
	}

	const handleBulkDeactivate = async () => {
		if (selectedIds.size === 0) return

		setConfirmDialog({
			isOpen: true,
			type: 'warning',
			title: 'Deactivate Contacts',
			message: `Are you sure you want to deactivate ${selectedIds.size} contact(s)? They will not be visible until reactivated.`,
			confirmText: 'Deactivate',
			onConfirm: async () => {
				setConfirmDialog(null)
				setLoading('deactivate')
				try {
					// Deactivate individually
					for (const contact of selectedContacts) {
						try {
							switch (contact.type) {
								case 'it-support':
									const { updateITSupport } = await import('@/lib/api/itSupport')
									await updateITSupport({ id: contact.id, isActive: false })
									break
								case 'coordinator':
									const { updateCoordinator } = await import('@/lib/api/coordinators')
									await updateCoordinator({ id: contact.id, isActive: false })
									break
								case 'contact-person':
									const { updateContactPerson } = await import('@/lib/api/contactPersons')
									await updateContactPerson({ id: contact.id, isActive: false })
									break
								case 'campus':
									const { updateCampus } = await import('@/lib/api/campuses')
									await updateCampus({ id: contact.id, isActive: false })
									break
							}
						} catch (err) {
							if (process.env.NODE_ENV === 'development') {
								console.error(`[BulkActions] Error deactivating ${contact.name}:`, err)
							}
						}
					}

					toastService.success(`${selectedIds.size} contact(s) deactivated successfully`)
					onClearSelection()
					onRefresh()
				} catch {
					toastService.error('Unable to deactivate contacts. Please try again.')
				} finally {
					setLoading(null)
				}
			}
		})
	}

	const handleBulkDelete = async () => {
		if (selectedIds.size === 0) return

		setConfirmDialog({
			isOpen: true,
			type: 'danger',
			title: 'Delete Contacts',
			message: `Are you sure you want to permanently delete ${selectedIds.size} contact(s)? This action cannot be undone.`,
			confirmText: 'Delete',
			onConfirm: async () => {
				setConfirmDialog(null)
				setLoading('delete')
				try {
					// Delete individually
					for (const contact of selectedContacts) {
						try {
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
						} catch (err) {
							if (process.env.NODE_ENV === 'development') {
								console.error(`[BulkActions] Error deleting ${contact.name}:`, err)
							}
						}
					}

					toastService.success(`${selectedIds.size} contact(s) deleted successfully`)
					onClearSelection()
					onRefresh()
				} catch {
					toastService.error('Unable to delete contacts. Please try again.')
				} finally {
					setLoading(null)
				}
			}
		})
	}

	const handleExport = () => {
		if (selectedIds.size === 0) {
			toastService.warning('Please select contacts to export')
			return
		}

		try {
			// Prepare CSV data
			const headers = ['Type', 'Name', 'Email', 'Phone', 'Mobile', 'WhatsApp', 'Department', 'Campus', 'Status']
			const rows = selectedContacts.map(contact => {
				// This is a simplified export - in a real scenario, you'd fetch full contact details
				return [
					contact.type,
					contact.name,
					'', // Email would come from full contact data
					'', // Phone
					'', // Mobile
					'', // WhatsApp
					'', // Department
					'', // Campus
					'' // Status
				]
			})

			const csvContent = [
				headers.join(','),
				...rows.map(row => row.map(cell => `"${cell}"`).join(','))
			].join('\n')

			const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
			const link = document.createElement('a')
			const url = URL.createObjectURL(blob)
			link.setAttribute('href', url)
			link.setAttribute('download', `contacts-export-${new Date().toISOString().split('T')[0]}.csv`)
			link.style.visibility = 'hidden'
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)

			toastService.success(`Exported ${selectedIds.size} contact(s) to CSV`)
			onClearSelection()
		} catch {
			toastService.error('Unable to export contacts. Please try again.')
		}
	}

	if (selectedIds.size === 0) return null

	return (
		<>
			<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
				<div className="flex items-center justify-between flex-wrap gap-4">
					<div className="flex items-center gap-3">
						<span className="text-sm font-medium text-blue-900">
							{selectedIds.size} contact(s) selected
						</span>
						<button
							onClick={onClearSelection}
							className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
						>
							<X className="w-4 h-4" />
							Clear
						</button>
					</div>

					<div className="flex items-center gap-2 flex-wrap">
						<button
							onClick={handleBulkActivate}
							disabled={loading !== null}
							className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center gap-2 text-sm"
						>
							{loading === 'activate' ? (
								<Loader2 className="w-4 h-4 animate-spin" />
							) : (
								<CheckCircle className="w-4 h-4" />
							)}
							Activate
						</button>

						<button
							onClick={handleBulkDeactivate}
							disabled={loading !== null}
							className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 transition-colors flex items-center gap-2 text-sm"
						>
							{loading === 'deactivate' ? (
								<Loader2 className="w-4 h-4 animate-spin" />
							) : (
								<XCircle className="w-4 h-4" />
							)}
							Deactivate
						</button>

						<button
							onClick={handleBulkDelete}
							disabled={loading !== null}
							className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center gap-2 text-sm"
						>
							{loading === 'delete' ? (
								<Loader2 className="w-4 h-4 animate-spin" />
							) : (
								<Trash2 className="w-4 h-4" />
							)}
							Delete
						</button>

						<button
							onClick={handleExport}
							disabled={loading !== null}
							className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2 text-sm"
						>
							<Download className="w-4 h-4" />
							Export CSV
						</button>
					</div>
				</div>
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
