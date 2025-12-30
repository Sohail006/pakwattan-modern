'use client'

import { Phone, Monitor, School, UserCheck, Users } from 'lucide-react'
import { ITSupport } from '@/lib/api/itSupport'
import { Coordinator } from '@/lib/api/coordinators'
import { ContactPerson } from '@/lib/api/contactPersons'
import { Campus } from '@/lib/api/campuses'
import UnifiedContactsTable from './UnifiedContactsTable'
import ITSupportSection from './ITSupportSection'
import CampusesSection from './CampusesSection'
import CoordinatorsSection from './CoordinatorsSection'
import ContactPersonsSection from './ContactPersonsSection'

interface ContactsTabsProps {
	activeTab: 'all' | 'it-support' | 'campuses' | 'coordinators' | 'other'
	onTabChange: (tab: 'all' | 'it-support' | 'campuses' | 'coordinators' | 'other') => void
	viewMode: 'table' | 'cards'
	searchTerm: string
	statusFilter: 'all' | 'active' | 'inactive'
	typeFilter: string
	itSupport: ITSupport[]
	coordinators: Coordinator[]
	contactPersons: ContactPerson[]
	campuses: Campus[]
	onRefresh: () => void
}

export default function ContactsTabs({
	activeTab,
	onTabChange,
	viewMode,
	searchTerm,
	statusFilter,
	typeFilter,
	itSupport,
	coordinators,
	contactPersons,
	campuses,
	onRefresh
}: ContactsTabsProps) {
	const tabs = [
		{ id: 'all', label: 'All Contacts', icon: Users, count: itSupport.length + coordinators.length + contactPersons.length + campuses.length },
		{ id: 'it-support', label: 'IT Support', icon: Monitor, count: itSupport.length },
		{ id: 'campuses', label: 'Campuses', icon: School, count: campuses.length },
		{ id: 'coordinators', label: 'Coordinators', icon: UserCheck, count: coordinators.length },
		{ id: 'other', label: 'Other Contacts', icon: Phone, count: contactPersons.length }
	]

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200">
			{/* Tab Navigation */}
			<div className="border-b border-gray-200">
				<div className="flex overflow-x-auto">
					{tabs.map((tab) => {
						const Icon = tab.icon
						return (
							<button
								key={tab.id}
								onClick={() => onTabChange(tab.id as 'all' | 'it-support' | 'campuses' | 'coordinators' | 'other')}
								className={`
									flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap
									${activeTab === tab.id
										? 'border-blue-600 text-blue-600 font-semibold bg-blue-50'
										: 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
									}
								`}
							>
								<Icon className="w-4 h-4" />
								<span>{tab.label}</span>
								{tab.count > 0 && (
									<span className={`
										px-2 py-0.5 rounded-full text-xs font-medium
										${activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}
									`}>
										{tab.count}
									</span>
								)}
							</button>
						)
					})}
				</div>
			</div>

			{/* Tab Content */}
			<div className="p-4 md:p-6">
				{activeTab === 'all' && (
					<UnifiedContactsTable
						itSupport={itSupport}
						coordinators={coordinators}
						contactPersons={contactPersons}
						campuses={campuses}
						viewMode={viewMode}
						searchTerm={searchTerm}
						statusFilter={statusFilter}
						typeFilter={typeFilter}
						onRefresh={onRefresh}
					/>
				)}
				{activeTab === 'it-support' && (
					<ITSupportSection
						itSupport={itSupport}
						viewMode={viewMode}
						searchTerm={searchTerm}
						statusFilter={statusFilter}
						onRefresh={onRefresh}
					/>
				)}
				{activeTab === 'campuses' && (
					<CampusesSection
						campuses={campuses}
						viewMode={viewMode}
						searchTerm={searchTerm}
						statusFilter={statusFilter}
						onRefresh={onRefresh}
					/>
				)}
				{activeTab === 'coordinators' && (
					<CoordinatorsSection
						coordinators={coordinators}
						campuses={campuses}
						viewMode={viewMode}
						searchTerm={searchTerm}
						statusFilter={statusFilter}
						onRefresh={onRefresh}
					/>
				)}
				{activeTab === 'other' && (
					<ContactPersonsSection
						contactPersons={contactPersons}
						viewMode={viewMode}
						searchTerm={searchTerm}
						statusFilter={statusFilter}
						typeFilter={typeFilter}
						onRefresh={onRefresh}
					/>
				)}
			</div>
		</div>
	)
}
