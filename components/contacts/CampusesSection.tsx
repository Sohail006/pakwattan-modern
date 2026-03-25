'use client'

import { useState } from 'react'
import { Plus, School } from 'lucide-react'
import { ITSupport } from '@/lib/api/itSupport'
import { Coordinator } from '@/lib/api/coordinators'
import { ContactPerson } from '@/lib/api/contactPersons'
import { Campus } from '@/lib/api/campuses'
import UnifiedContactsTable from './UnifiedContactsTable'
import CampusForm from './CampusForm'

interface CampusesSectionProps {
	campuses: Campus[]
	viewMode: 'table' | 'cards'
	searchTerm: string
	statusFilter: 'all' | 'active' | 'inactive'
	onRefresh: () => void
}

export default function CampusesSection({
	campuses,
	viewMode,
	searchTerm,
	statusFilter,
	onRefresh
}: CampusesSectionProps) {
	const [isFormOpen, setIsFormOpen] = useState(false)
	const [editingCampus, setEditingCampus] = useState<Campus | null>(null)

	const handleAdd = () => {
		setEditingCampus(null)
		setIsFormOpen(true)
	}

	const handleEdit = (contact: ITSupport | Coordinator | ContactPerson | Campus, type: string) => {
		if (type === 'campus' && contact) {
			setEditingCampus(contact as Campus)
			setIsFormOpen(true)
		}
	}

	const handleFormClose = () => {
		setIsFormOpen(false)
		setEditingCampus(null)
	}

	const handleFormSuccess = () => {
		handleFormClose()
		onRefresh()
	}

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold text-gray-900">Campuses</h3>
				<button
					onClick={handleAdd}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
				>
					<Plus className="w-4 h-4" />
					Add campus
				</button>
			</div>

			{campuses.length === 0 ? (
				<div className="text-center py-12 bg-gray-50 rounded-lg">
					<School className="w-12 h-12 text-gray-400 mx-auto mb-4" />
					<p className="text-gray-600 mb-2">No campuses available</p>
					<p className="text-sm text-gray-500 mb-4">Add campus information to get started</p>
					<button
						onClick={handleAdd}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						Add campus
					</button>
				</div>
			) : (
				<UnifiedContactsTable
					itSupport={[]}
					coordinators={[]}
					contactPersons={[]}
					campuses={campuses}
					viewMode={viewMode}
					searchTerm={searchTerm}
					statusFilter={statusFilter}
					typeFilter="campus"
					onRefresh={onRefresh}
					onEdit={handleEdit}
				/>
			)}

			{isFormOpen && (
				<CampusForm
					campus={editingCampus}
					mode={editingCampus ? 'edit' : 'create'}
					onClose={handleFormClose}
					onSuccess={handleFormSuccess}
				/>
			)}
		</div>
	)
}
