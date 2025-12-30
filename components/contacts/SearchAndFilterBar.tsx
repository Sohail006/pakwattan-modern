'use client'

import { Search, RefreshCw, Table, Grid, X } from 'lucide-react'
import { useRef, useEffect } from 'react'
import ExportButton from './ExportButton'
import { ITSupport } from '@/lib/api/itSupport'
import { Coordinator } from '@/lib/api/coordinators'
import { ContactPerson } from '@/lib/api/contactPersons'
import { Campus } from '@/lib/api/campuses'

interface SearchAndFilterBarProps {
	searchTerm: string
	onSearchChange: (term: string) => void
	statusFilter: 'all' | 'active' | 'inactive'
	onStatusFilterChange: (filter: 'all' | 'active' | 'inactive') => void
	typeFilter: string
	onTypeFilterChange: (filter: string) => void
	viewMode: 'table' | 'cards'
	onViewModeChange: (mode: 'table' | 'cards') => void
	onRefresh: () => void
	itSupport: ITSupport[]
	coordinators: Coordinator[]
	contactPersons: ContactPerson[]
	campuses: Campus[]
	filteredCount?: number
	onSearchFocus?: (ref: { focus: () => void }) => void
}

export default function SearchAndFilterBar({
	searchTerm,
	onSearchChange,
	statusFilter,
	onStatusFilterChange,
	typeFilter,
	onTypeFilterChange,
	viewMode,
	onViewModeChange,
	onRefresh,
	itSupport,
	coordinators,
	contactPersons,
	campuses,
	filteredCount,
	onSearchFocus
}: SearchAndFilterBarProps) {
	const searchInputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (onSearchFocus) {
			// Expose focus function to parent
			onSearchFocus({
				focus: () => {
					searchInputRef.current?.focus()
				}
			})
		}
	}, [onSearchFocus])

	const clearFilters = () => {
		onSearchChange('')
		onStatusFilterChange('all')
		onTypeFilterChange('all')
	}

	const hasActiveFilters = searchTerm || statusFilter !== 'all' || typeFilter !== 'all'

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
			<div className="flex flex-col md:flex-row gap-4 items-center">
				{/* Search Input */}
				<div className="flex-1 w-full md:w-auto">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
						<input
							ref={searchInputRef}
							type="text"
							placeholder="Search contacts by name, email, phone, department... (Press / to focus)"
							value={searchTerm}
							onChange={(e) => onSearchChange(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
						{searchTerm && (
							<button
								onClick={() => onSearchChange('')}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
							>
								<X className="w-4 h-4" />
							</button>
						)}
					</div>
				</div>

				{/* Quick Filters */}
				<div className="flex items-center gap-2 flex-wrap">
					{/* Status Filter */}
					<select
						value={statusFilter}
						onChange={(e) => onStatusFilterChange(e.target.value as 'all' | 'active' | 'inactive')}
						className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
					>
						<option value="all">All Status</option>
						<option value="active">Active</option>
						<option value="inactive">Inactive</option>
					</select>

					{/* View Mode Toggle */}
					<div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
						<button
							onClick={() => onViewModeChange('table')}
							className={`px-3 py-2 ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
							title="Table View"
						>
							<Table className="w-4 h-4" />
						</button>
						<button
							onClick={() => onViewModeChange('cards')}
							className={`px-3 py-2 ${viewMode === 'cards' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
							title="Card View"
						>
							<Grid className="w-4 h-4" />
						</button>
					</div>

					{/* Refresh Button */}
					<button
						onClick={onRefresh}
						className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
						title="Refresh"
					>
						<RefreshCw className="w-4 h-4" />
					</button>

					{/* Export Button */}
					<ExportButton
						itSupport={itSupport}
						coordinators={coordinators}
						contactPersons={contactPersons}
						campuses={campuses}
						filteredCount={filteredCount}
					/>

					{/* Clear Filters */}
					{hasActiveFilters && (
						<button
							onClick={clearFilters}
							className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm flex items-center gap-1"
						>
							<X className="w-4 h-4" />
							Clear Filters
						</button>
					)}
				</div>
			</div>

			{/* Active Filter Chips */}
			{hasActiveFilters && (
				<div className="mt-3 flex flex-wrap gap-2">
					{searchTerm && (
						<span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
							Search: &quot;{searchTerm}&quot;
							<button onClick={() => onSearchChange('')} className="hover:text-blue-900">
								<X className="w-3 h-3" />
							</button>
						</span>
					)}
					{statusFilter !== 'all' && (
						<span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
							Status: {statusFilter}
							<button onClick={() => onStatusFilterChange('all')} className="hover:text-green-900">
								<X className="w-3 h-3" />
							</button>
						</span>
					)}
					{typeFilter !== 'all' && (
						<span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">
							Type: {typeFilter}
							<button onClick={() => onTypeFilterChange('all')} className="hover:text-purple-900">
								<X className="w-3 h-3" />
							</button>
						</span>
					)}
				</div>
			)}
		</div>
	)
}
