'use client'

import { useState } from 'react'
import { Plus, Monitor } from 'lucide-react'
import { ITSupport } from '@/lib/api/itSupport'
import { Coordinator } from '@/lib/api/coordinators'
import { ContactPerson } from '@/lib/api/contactPersons'
import { Campus } from '@/lib/api/campuses'
import UnifiedContactsTable from './UnifiedContactsTable'
import ITSupportForm from './ITSupportForm'

interface ITSupportSectionProps {
	itSupport: ITSupport[]
	viewMode: 'table' | 'cards'
	searchTerm: string
	statusFilter: 'all' | 'active' | 'inactive'
	onRefresh: () => void
}

export default function ITSupportSection({
	itSupport,
	viewMode,
	searchTerm,
	statusFilter,
	onRefresh
}: ITSupportSectionProps) {
	const [isFormOpen, setIsFormOpen] = useState(false)
	const [editingITSupport, setEditingITSupport] = useState<ITSupport | null>(null)

	const handleAdd = () => {
		setEditingITSupport(null)
		setIsFormOpen(true)
	}

	const handleEdit = (contact: ITSupport | Coordinator | ContactPerson | Campus, type: string) => {
		if (type === 'it-support' && contact) {
			setEditingITSupport(contact as ITSupport)
			setIsFormOpen(true)
		}
	}

	const handleFormClose = () => {
		setIsFormOpen(false)
		setEditingITSupport(null)
	}

	const handleFormSuccess = () => {
		handleFormClose()
		onRefresh()
	}

	return (
		<div className="space-y-4">
			{/* Header with Add Button */}
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold text-gray-900">IT Support Team</h3>
				<button
					onClick={handleAdd}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
				>
					<Plus className="w-4 h-4" />
					Add IT Support
				</button>
			</div>

			{itSupport.length === 0 ? (
				<div className="text-center py-12 bg-gray-50 rounded-lg">
					<Monitor className="w-12 h-12 text-gray-400 mx-auto mb-4" />
					<p className="text-gray-600 mb-2">No IT Support information available</p>
					<p className="text-sm text-gray-500 mb-4">Add IT Support contact information to get started</p>
					<button
						onClick={handleAdd}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						Add IT Support
					</button>
				</div>
			) : (
				<UnifiedContactsTable
					itSupport={itSupport}
					coordinators={[]}
					contactPersons={[]}
					campuses={[]}
					viewMode={viewMode}
					searchTerm={searchTerm}
					statusFilter={statusFilter}
					typeFilter="it-support"
					onRefresh={onRefresh}
					onEdit={handleEdit}
				/>
			)}

			{/* Form Modal */}
			{isFormOpen && (
				<ITSupportForm
					itSupport={editingITSupport}
					mode={editingITSupport ? 'edit' : 'create'}
					onClose={handleFormClose}
					onSuccess={handleFormSuccess}
				/>
			)}
		</div>
	)
}
