'use client'

import { useState, useEffect, useRef } from 'react'
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import QuickStatsCards from './QuickStatsCards'
import SearchAndFilterBar from './SearchAndFilterBar'
import ContactsTabs from './ContactsTabs'
import KeyboardShortcuts from './KeyboardShortcuts'
import { ITSupport } from '@/lib/api/itSupport'
import { Coordinator } from '@/lib/api/coordinators'
import { ContactPerson } from '@/lib/api/contactPersons'
import { Campus } from '@/lib/api/campuses'

export default function ContactsDashboard() {
	const [activeTab, setActiveTab] = useState<'all' | 'it-support' | 'campuses' | 'coordinators' | 'other'>('all')
	const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
	const [searchTerm, setSearchTerm] = useState('')
	const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
	const [typeFilter, setTypeFilter] = useState<string>('all')
	
	// Data states
	const [itSupport, setITSupport] = useState<ITSupport[]>([])
	const [coordinators, setCoordinators] = useState<Coordinator[]>([])
	const [contactPersons, setContactPersons] = useState<ContactPerson[]>([])
	const [campuses, setCampuses] = useState<Campus[]>([])
	
	// Loading and error states
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)
	const [refreshKey, setRefreshKey] = useState(0)
	const searchFocusRef = useRef<{ focus: () => void } | null>(null)
	const addContactRef = useRef<(() => void) | null>(null)

	// Load all contact data
	useEffect(() => {
		loadAllContacts()
	}, [refreshKey])

	const loadAllContacts = async () => {
		try {
			setLoading(true)
			setError(null)
			
			// Load all data in parallel (with error handling for missing APIs)
			const [itSupportData, coordinatorsData, contactPersonsData, campusesData] = await Promise.allSettled([
				import('@/lib/api/itSupport').then(m => m.getITSupport()).catch(() => []),
				import('@/lib/api/coordinators').then(m => m.getCoordinators()).catch(() => []),
				import('@/lib/api/contactPersons').then(m => m.getContactPersons()).catch(() => []),
				import('@/lib/api/campuses').then(m => m.getCampuses(true)).catch(() => [])
			])

			if (itSupportData.status === 'fulfilled') {
				setITSupport(itSupportData.value)
			}
			if (coordinatorsData.status === 'fulfilled') {
				setCoordinators(coordinatorsData.value)
			}
			if (contactPersonsData.status === 'fulfilled') {
				setContactPersons(contactPersonsData.value)
			}
			if (campusesData.status === 'fulfilled') {
				setCampuses(campusesData.value)
			}
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Unable to load contact information.'
			setError(message)
			if (process.env.NODE_ENV === 'development') {
				console.error('[ContactsDashboard] Error loading contacts:', err)
			}
		} finally {
			setLoading(false)
		}
	}

	const handleRefresh = () => {
		setRefreshKey(prev => prev + 1)
		setSuccess('Contact information refreshed successfully')
		setTimeout(() => setSuccess(null), 3000)
	}

	const handleAddContact = () => {
		// Open the first available tab's add form
		// This is a placeholder - in a real scenario, you'd determine which tab is active
		if (addContactRef.current) {
			addContactRef.current()
		}
	}

	const handleClearFilters = () => {
		setSearchTerm('')
		setStatusFilter('all')
		setTypeFilter('all')
	}

	if (loading && refreshKey === 0) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-center">
					<Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
					<p className="text-gray-600">Loading contact information...</p>
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			{/* Keyboard Shortcuts */}
			<KeyboardShortcuts
				onAdd={handleAddContact}
				onRefresh={handleRefresh}
				onSearchFocus={() => searchFocusRef.current?.focus()}
				onClearFilters={handleClearFilters}
				enabled={true}
			/>

			{/* Success Message */}
			{success && (
				<div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
					<CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
					<p className="text-green-700 text-sm">{success}</p>
				</div>
			)}

			{/* Error Message */}
			{error && (
				<div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
					<AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
					<p className="text-red-700 text-sm">{error}</p>
				</div>
			)}

			{/* Quick Stats Cards */}
			<QuickStatsCards
				itSupport={itSupport}
				coordinators={coordinators}
				contactPersons={contactPersons}
				campuses={campuses}
			/>

			{/* Search and Filter Bar */}
			<SearchAndFilterBar
				searchTerm={searchTerm}
				onSearchChange={setSearchTerm}
				statusFilter={statusFilter}
				onStatusFilterChange={setStatusFilter}
				typeFilter={typeFilter}
				onTypeFilterChange={setTypeFilter}
				viewMode={viewMode}
				onViewModeChange={setViewMode}
				onRefresh={handleRefresh}
				itSupport={itSupport}
				coordinators={coordinators}
				contactPersons={contactPersons}
				campuses={campuses}
				onSearchFocus={(ref: { focus: () => void }) => { searchFocusRef.current = ref }}
			/>

			{/* Contacts Tabs */}
			<ContactsTabs
				activeTab={activeTab}
				onTabChange={setActiveTab}
				viewMode={viewMode}
				searchTerm={searchTerm}
				statusFilter={statusFilter}
				typeFilter={typeFilter}
				itSupport={itSupport}
				coordinators={coordinators}
				contactPersons={contactPersons}
				campuses={campuses}
				onRefresh={handleRefresh}
			/>
		</div>
	)
}
