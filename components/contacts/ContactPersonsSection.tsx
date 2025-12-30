'use client'

import { useState } from 'react'
import { Plus, Users } from 'lucide-react'
import { ContactPerson } from '@/lib/api/contactPersons'
import { Coordinator } from '@/lib/api/coordinators'
import { ITSupport } from '@/lib/api/itSupport'
import { Campus } from '@/lib/api/campuses'
import UnifiedContactsTable from './UnifiedContactsTable'
import ContactPersonForm from './ContactPersonForm'

interface ContactPersonsSectionProps {
	contactPersons: ContactPerson[]
	viewMode: 'table' | 'cards'
	searchTerm: string
	statusFilter: 'all' | 'active' | 'inactive'
	typeFilter: string
	onRefresh: () => void
}

export default function ContactPersonsSection({
	contactPersons,
	viewMode,
	searchTerm,
	statusFilter,
	typeFilter,
	onRefresh
}: ContactPersonsSectionProps) {
	const [isFormOpen, setIsFormOpen] = useState(false)
	const [editingContactPerson, setEditingContactPerson] = useState<ContactPerson | null>(null)

	const handleAdd = () => {
		setEditingContactPerson(null)
		setIsFormOpen(true)
	}

	const handleEdit = (contact: ContactPerson | Coordinator | ITSupport | Campus, type: string) => {
		if (type === 'contact-person' && contact) {
			setEditingContactPerson(contact as ContactPerson)
			setIsFormOpen(true)
		}
	}

	const handleFormClose = () => {
		setIsFormOpen(false)
		setEditingContactPerson(null)
	}

	const handleFormSuccess = () => {
		handleFormClose()
		onRefresh()
	}

	return (
		<div className="space-y-4">
			{/* Header with Add Button */}
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold text-gray-900">Other Contacts</h3>
				<button
					onClick={handleAdd}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
				>
					<Plus className="w-4 h-4" />
					Add Contact
				</button>
			</div>

			{contactPersons.length === 0 ? (
				<div className="text-center py-12 bg-gray-50 rounded-lg">
					<Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
					<p className="text-gray-600 mb-2">No contact persons available</p>
					<p className="text-sm text-gray-500 mb-4">Add contact person information to get started</p>
					<button
						onClick={handleAdd}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						Add Contact
					</button>
				</div>
			) : (
				<UnifiedContactsTable
					itSupport={[]}
					coordinators={[]}
					contactPersons={contactPersons}
					campuses={[]}
					viewMode={viewMode}
					searchTerm={searchTerm}
					statusFilter={statusFilter}
					typeFilter={typeFilter !== 'all' ? 'contact-person' : 'all'}
					onRefresh={onRefresh}
					onEdit={handleEdit}
				/>
			)}

			{/* Form Modal */}
			{isFormOpen && (
				<ContactPersonForm
					contactPerson={editingContactPerson}
					mode={editingContactPerson ? 'edit' : 'create'}
					onClose={handleFormClose}
					onSuccess={handleFormSuccess}
				/>
			)}
		</div>
	)
}
