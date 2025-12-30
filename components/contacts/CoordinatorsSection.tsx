'use client'

import { useState } from 'react'
import { Plus, UserCheck } from 'lucide-react'
import { Coordinator } from '@/lib/api/coordinators'
import { Campus } from '@/lib/api/campuses'
import { ContactPerson } from '@/lib/api/contactPersons'
import { ITSupport } from '@/lib/api/itSupport'
import UnifiedContactsTable from './UnifiedContactsTable'
import CoordinatorForm from './CoordinatorForm'

interface CoordinatorsSectionProps {
	coordinators: Coordinator[]
	campuses: Campus[]
	viewMode: 'table' | 'cards'
	searchTerm: string
	statusFilter: 'all' | 'active' | 'inactive'
	onRefresh: () => void
}

export default function CoordinatorsSection({
	coordinators,
	campuses,
	viewMode,
	searchTerm,
	statusFilter,
	onRefresh
}: CoordinatorsSectionProps) {
	const [isFormOpen, setIsFormOpen] = useState(false)
	const [editingCoordinator, setEditingCoordinator] = useState<Coordinator | null>(null)

	const handleAdd = () => {
		setEditingCoordinator(null)
		setIsFormOpen(true)
	}

	const handleEdit = (contact: Coordinator | ContactPerson | ITSupport | Campus, type: string) => {
		if (type === 'coordinator' && contact) {
			setEditingCoordinator(contact as Coordinator)
			setIsFormOpen(true)
		}
	}

	const handleFormClose = () => {
		setIsFormOpen(false)
		setEditingCoordinator(null)
	}

	const handleFormSuccess = () => {
		handleFormClose()
		onRefresh()
	}

	return (
		<div className="space-y-4">
			{/* Header with Add Button */}
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold text-gray-900">Coordinators</h3>
				<button
					onClick={handleAdd}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
				>
					<Plus className="w-4 h-4" />
					Add Coordinator
				</button>
			</div>

			{coordinators.length === 0 ? (
				<div className="text-center py-12 bg-gray-50 rounded-lg">
					<UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
					<p className="text-gray-600 mb-2">No coordinators available</p>
					<p className="text-sm text-gray-500 mb-4">Add coordinator information to get started</p>
					<button
						onClick={handleAdd}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						Add Coordinator
					</button>
				</div>
			) : (
				<UnifiedContactsTable
					itSupport={[]}
					coordinators={coordinators}
					contactPersons={[]}
					campuses={campuses}
					viewMode={viewMode}
					searchTerm={searchTerm}
					statusFilter={statusFilter}
					typeFilter="coordinator"
					onRefresh={onRefresh}
					onEdit={handleEdit}
				/>
			)}

			{/* Form Modal */}
			{isFormOpen && (
				<CoordinatorForm
					coordinator={editingCoordinator}
					mode={editingCoordinator ? 'edit' : 'create'}
					onClose={handleFormClose}
					onSuccess={handleFormSuccess}
				/>
			)}
		</div>
	)
}
