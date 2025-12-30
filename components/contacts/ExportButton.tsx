'use client'

import { FileSpreadsheet } from 'lucide-react'
import { toastService } from '@/lib/utils/toast'
import { ITSupport } from '@/lib/api/itSupport'
import { Coordinator } from '@/lib/api/coordinators'
import { ContactPerson } from '@/lib/api/contactPersons'
import { Campus } from '@/lib/api/campuses'

interface ExportButtonProps {
	itSupport: ITSupport[]
	coordinators: Coordinator[]
	contactPersons: ContactPerson[]
	campuses: Campus[]
	filteredCount?: number
}

export default function ExportButton({
	itSupport,
	coordinators,
	contactPersons,
	campuses,
	filteredCount
}: ExportButtonProps) {
	const handleExport = () => {
		try {
			// Prepare all contacts data
			const allContacts: Array<{
				type: string
				name: string
				email: string
				phone: string
				mobile: string
				whatsApp: string
				department: string
				campus: string
				officeHours: string
				status: string
			}> = []

			// IT Support
			itSupport.forEach(item => {
				allContacts.push({
					type: 'IT Support',
					name: item.title,
					email: item.email || '',
					phone: item.phone || '',
					mobile: item.mobileNumber || '',
					whatsApp: item.whatsAppNumber || '',
					department: item.department || '',
					campus: '',
					officeHours: item.officeHours || '',
					status: item.isActive ? 'Active' : 'Inactive'
				})
			})

			// Coordinators
			coordinators.forEach(item => {
				allContacts.push({
					type: 'Coordinator',
					name: `${item.firstName} ${item.lastName}`,
					email: item.email || '',
					phone: item.phone || '',
					mobile: item.mobileNumber || '',
					whatsApp: item.whatsAppNumber || '',
					department: item.department || '',
					campus: item.campus?.name || '',
					officeHours: item.officeHours || '',
					status: item.isActive ? 'Active' : 'Inactive'
				})
			})

			// Contact Persons
			contactPersons.forEach(item => {
				allContacts.push({
					type: item.contactType,
					name: item.name,
					email: item.email || '',
					phone: item.phone || '',
					mobile: item.mobileNumber || '',
					whatsApp: item.whatsAppNumber || '',
					department: item.department || '',
					campus: '',
					officeHours: item.officeHours || '',
					status: item.isActive ? 'Active' : 'Inactive'
				})
			})

			// Campuses
			campuses.forEach(item => {
				allContacts.push({
					type: 'Campus',
					name: item.name,
					email: item.email || '',
					phone: item.phone || '',
					mobile: item.mobileNumber || '',
					whatsApp: item.whatsAppNumber || '',
					department: '',
					campus: '',
					officeHours: item.officeHours || '',
					status: item.isActive ? 'Active' : 'Inactive'
				})
			})

			// Create CSV
			const headers = ['Type', 'Name', 'Email', 'Phone', 'Mobile', 'WhatsApp', 'Department', 'Campus', 'Office Hours', 'Status']
			const rows = allContacts.map(contact => [
				contact.type,
				contact.name,
				contact.email,
				contact.phone,
				contact.mobile,
				contact.whatsApp,
				contact.department,
				contact.campus,
				contact.officeHours,
				contact.status
			])

			const csvContent = [
				headers.map(h => `"${h}"`).join(','),
				...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
			].join('\n')

			// Add BOM for Excel compatibility
			const BOM = '\uFEFF'
			const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
			const link = document.createElement('a')
			const url = URL.createObjectURL(blob)
			link.setAttribute('href', url)
			link.setAttribute('download', `contacts-export-${new Date().toISOString().split('T')[0]}.csv`)
			link.style.visibility = 'hidden'
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
			URL.revokeObjectURL(url)

			const count = filteredCount || allContacts.length
			toastService.success(`Exported ${count} contact(s) to CSV`)
		} catch (err) {
			toastService.error('Unable to export contacts. Please try again.')
			if (process.env.NODE_ENV === 'development') {
				console.error('[ExportButton] Export error:', err)
			}
		}
	}

	return (
		<button
			onClick={handleExport}
			className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm"
			title="Export all contacts to CSV"
		>
			<FileSpreadsheet className="w-4 h-4" />
			<span className="hidden sm:inline">Export CSV</span>
			<span className="sm:hidden">Export</span>
		</button>
	)
}
