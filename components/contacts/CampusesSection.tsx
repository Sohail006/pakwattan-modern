'use client'

import { School } from 'lucide-react'
import { Campus } from '@/lib/api/campuses'
import UnifiedContactsTable from './UnifiedContactsTable'

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
	return (
		<div className="space-y-4">
			{campuses.length === 0 ? (
				<div className="text-center py-12 bg-gray-50 rounded-lg">
					<School className="w-12 h-12 text-gray-400 mx-auto mb-4" />
					<p className="text-gray-600 mb-2">No campuses available</p>
					<p className="text-sm text-gray-500">Add campus information to get started</p>
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
				/>
			)}
		</div>
	)
}
