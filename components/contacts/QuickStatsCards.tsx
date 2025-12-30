'use client'

import { Phone, Users, School, UserCheck } from 'lucide-react'
import { ITSupport } from '@/lib/api/itSupport'
import { Coordinator } from '@/lib/api/coordinators'
import { ContactPerson } from '@/lib/api/contactPersons'
import { Campus } from '@/lib/api/campuses'

interface QuickStatsCardsProps {
	itSupport: ITSupport[]
	coordinators: Coordinator[]
	contactPersons: ContactPerson[]
	campuses: Campus[]
}

export default function QuickStatsCards({
	itSupport,
	coordinators,
	contactPersons,
	campuses
}: QuickStatsCardsProps) {
	const totalContacts = itSupport.length + coordinators.length + contactPersons.length + campuses.length
	const activeContacts = 
		itSupport.filter(c => c.isActive).length +
		coordinators.filter(c => c.isActive).length +
		contactPersons.filter(c => c.isActive).length +
		campuses.filter(c => c.isActive).length
	const activeCampuses = campuses.filter(c => c.isActive).length
	const activeCoordinators = coordinators.filter(c => c.isActive).length

	const stats = [
		{
			label: 'Total Contacts',
			value: totalContacts.toString(),
			icon: Phone,
			color: 'bg-blue-500',
			bgColor: 'bg-blue-50',
			textColor: 'text-blue-600'
		},
		{
			label: 'Active Contacts',
			value: activeContacts.toString(),
			icon: Users,
			color: 'bg-green-500',
			bgColor: 'bg-green-50',
			textColor: 'text-green-600'
		},
		{
			label: 'Active Campuses',
			value: activeCampuses.toString(),
			icon: School,
			color: 'bg-purple-500',
			bgColor: 'bg-purple-50',
			textColor: 'text-purple-600'
		},
		{
			label: 'Coordinators',
			value: activeCoordinators.toString(),
			icon: UserCheck,
			color: 'bg-orange-500',
			bgColor: 'bg-orange-50',
			textColor: 'text-orange-600'
		}
	]

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			{stats.map((stat, index) => {
				const Icon = stat.icon
				return (
					<div
						key={index}
						className={`${stat.bgColor} rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow`}
					>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
								<p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
							</div>
							<div className={`${stat.color} p-3 rounded-lg`}>
								<Icon className="w-6 h-6 text-white" />
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}
