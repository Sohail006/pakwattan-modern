'use client'

import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'

interface VideoSearchProps {
  onSearch: (query: string) => void
  onCategoryChange: (category: string) => void
  categories: string[]
  activeCategory: string
}

const VideoSearch = ({ onSearch, onCategoryChange, categories, activeCategory }: VideoSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    onSearch('')
  }

  const categoryIcons: { [key: string]: string } = {
    all: '🎬',
    events: '🎉',
    academic: '📚',
    sports: '⚽',
    cultural: '🎭',
    achievements: '🏆',
    announcements: '📢',
    ceremonies: '🎓'
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search videos by title, description, or keywords..."
            className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Search Videos</span>
          </button>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </form>

      {/* Category Filters */}
      {showFilters && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700'
                }`}
              >
                <span className="text-lg">{categoryIcons[category] || '📹'}</span>
                <span className="capitalize">{category}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Tips */}
      <div className="mt-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-4">
        <h4 className="font-semibold text-primary-800 mb-2">💡 Search Tips</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Try searching for &ldquo;graduation&rdquo;, &ldquo;sports&rdquo;, &ldquo;competition&rdquo;, or &ldquo;ceremony&rdquo;</li>
          <li>• Use specific years like &ldquo;2024&rdquo; or &ldquo;2023&rdquo; to find recent videos</li>
          <li>• Search by event type: &ldquo;debate&rdquo;, &ldquo;science fair&rdquo;, &ldquo;cultural day&rdquo;</li>
          <li>• Use category filters to narrow down results</li>
        </ul>
      </div>
    </div>
  )
}

export default VideoSearch
