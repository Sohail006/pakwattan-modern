'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated, canPerform } from '@/lib/api/auth'
import { PERMISSIONS } from '@/lib/types/permissions'
import { NEWS_ITEMS } from '@/lib/constants'
import { EVENTS_DATA } from '@/lib/constants'
import { NEWS_MARQUEE_ITEMS } from '@/lib/constants'
import { createNews, CreateNewsRequest } from '@/lib/api/news'
import { createEvent, CreateEventRequest } from '@/lib/api/events'
import { Loader2, AlertCircle, CheckCircle, Database, FileText, Calendar } from 'lucide-react'

// Helper function to parse date string and create ISO date
const parseDate = (dateStr: string): string => {
  const months: { [key: string]: string } = {
    'january': '01', 'february': '02', 'march': '03', 'april': '04',
    'may': '05', 'june': '06', 'july': '07', 'august': '08',
    'september': '09', 'october': '10', 'november': '11', 'december': '12'
  }
  
  // Parse dates like "27th September 2025 (Saturday)" or "1st May, 2025 (Thursday)"
  const dateMatch = dateStr.match(/(\d+)(?:st|nd|rd|th)?\s+(\w+)[,\s]+(\d{4})/i)
  if (dateMatch) {
    const day = dateMatch[1].padStart(2, '0')
    const monthName = dateMatch[2].toLowerCase()
    const year = dateMatch[3]
    const month = months[monthName] || '01'
    return `${year}-${month}-${day}T00:00:00.000Z`
  }
  
  // Fallback for dates like "On January, 2025"
  const monthYearMatch = dateStr.match(/(\w+)[,\s]+(\d{4})/i)
  if (monthYearMatch) {
    const monthName = monthYearMatch[1].toLowerCase()
    const year = monthYearMatch[2]
    const month = months[monthName] || '01'
    return `${year}-${month}-01T00:00:00.000Z`
  }
  
  // Default to current date if parsing fails
  return new Date().toISOString()
}

// Helper to parse event date from "26" and "June, 2024"
const parseEventDate = (day: string, monthYear: string): string => {
  const months: { [key: string]: string } = {
    'january': '01', 'february': '02', 'march': '03', 'april': '04',
    'may': '05', 'june': '06', 'july': '07', 'august': '08',
    'september': '09', 'october': '10', 'november': '11', 'december': '12'
  }
  
  const match = monthYear.match(/(\w+)[,\s]+(\d{4})/i)
  if (match) {
    const monthName = match[1].toLowerCase()
    const year = match[2]
    const month = months[monthName] || '01'
    const dayStr = day.padStart(2, '0')
    return `${year}-${month}-${dayStr}T00:00:00.000Z`
  }
  
  return new Date().toISOString()
}

// Helper to parse time from "07:30 am – 02:10 pm" to "07:30:00"
const parseTime = (timeStr: string): string | undefined => {
  if (!timeStr) return undefined
  
  // Extract start time (first time in the string)
  const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(am|pm)/i)
  if (timeMatch) {
    let hours = parseInt(timeMatch[1])
    const minutes = timeMatch[2]
    const ampm = timeMatch[3].toLowerCase()
    
    if (ampm === 'pm' && hours !== 12) {
      hours += 12
    } else if (ampm === 'am' && hours === 12) {
      hours = 0
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes}:00`
  }
  
  return undefined
}

// Capitalize first letter of category
const capitalizeCategory = (category: string): string => {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

export default function MigrateNewsEventsPage() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const [migrating, setMigrating] = useState(false)
  const [progress, setProgress] = useState({
    news: { total: 0, completed: 0, failed: 0 },
    events: { total: 0, completed: 0, failed: 0 },
    marquee: { total: 0, completed: 0, failed: 0 }
  })
  const [results, setResults] = useState<{
    news: Array<{ title: string; status: 'success' | 'failed'; error?: string }>
    events: Array<{ title: string; status: 'success' | 'failed'; error?: string }>
    marquee: Array<{ title: string; status: 'success' | 'failed'; error?: string }>
  }>({
    news: [],
    events: [],
    marquee: []
  })
  const [completed, setCompleted] = useState(false)

  // Check authentication and authorization
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!isAuthenticated()) {
          router.push('/login')
          return
        }

        // Permission-based check (with role fallback for backward compatibility)
        const hasAccess = canPerform(PERMISSIONS.NEWS_VIEW, ['Admin', 'Staff', 'ManagerialStaff']) ||
                          canPerform(PERMISSIONS.EVENTS_VIEW, ['Admin', 'Staff', 'ManagerialStaff'])

        if (!hasAccess) {
          setAuthError('You do not have permission to access this page.')
          return
        }
      } catch {
        setAuthError('Unable to verify authentication. Please try again.')
      } finally {
        setCheckingAuth(false)
      }
    }

    checkAuth()
  }, [router])

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (authError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <h2 className="text-xl font-bold text-gray-900">Access Denied</h2>
          </div>
          <p className="text-gray-600 mb-6">{authError}</p>
          <button
            onClick={() => router.push('/dashboard/admin')}
            className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const migrateNews = async () => {
    const newsResults: Array<{ title: string; status: 'success' | 'failed'; error?: string }> = []
    let completed = 0
    let failed = 0

    for (const item of NEWS_ITEMS) {
      try {
        const newsData: CreateNewsRequest = {
          title: item.title,
          slug: item.slug || undefined,
          description: item.description,
          category: item.category ? capitalizeCategory(item.category) : 'General',
          date: parseDate(item.date),
          isPublished: true,
          isFeatured: item.featured || false,
          isInMarquee: false,
          displayOrder: 0
        }

        await createNews(newsData)
        completed++
        newsResults.push({ title: item.title, status: 'success' })
        setProgress(prev => ({
          ...prev,
          news: { total: NEWS_ITEMS.length, completed, failed }
        }))
      } catch (error) {
        failed++
        const errorMsg = error instanceof Error ? error.message : 'Unknown error'
        newsResults.push({ title: item.title, status: 'failed', error: errorMsg })
        setProgress(prev => ({
          ...prev,
          news: { total: NEWS_ITEMS.length, completed, failed }
        }))
      }
    }

    return newsResults
  }

  const migrateEvents = async () => {
    const eventResults: Array<{ title: string; status: 'success' | 'failed'; error?: string }> = []
    let completed = 0
    let failed = 0

    for (const item of EVENTS_DATA) {
      try {
        const eventData: CreateEventRequest = {
          title: item.title,
          description: item.description,
          date: parseEventDate(item.date, item.month),
          time: parseTime(item.time),
          category: 'General',
          isPublished: true,
          isFeatured: false,
          displayOrder: 0
        }

        await createEvent(eventData)
        completed++
        eventResults.push({ title: item.title, status: 'success' })
        setProgress(prev => ({
          ...prev,
          events: { total: EVENTS_DATA.length, completed, failed }
        }))
      } catch (error) {
        failed++
        const errorMsg = error instanceof Error ? error.message : 'Unknown error'
        eventResults.push({ title: item.title, status: 'failed', error: errorMsg })
        setProgress(prev => ({
          ...prev,
          events: { total: EVENTS_DATA.length, completed, failed }
        }))
      }
    }

    return eventResults
  }

  const migrateMarquee = async () => {
    const marqueeResults: Array<{ title: string; status: 'success' | 'failed'; error?: string }> = []
    let completed = 0
    let failed = 0

    for (const item of NEWS_MARQUEE_ITEMS) {
      try {
        // Convert marquee string to news item
        // Extract title (remove emoji and take first part)
        const title = item.replace(/^[^\w\s]+/, '').trim().substring(0, 500)
        const slug = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .substring(0, 500)

        const newsData: CreateNewsRequest = {
          title: title || 'Marquee News Item',
          slug: slug || `marquee-${Date.now()}`,
          description: item.substring(0, 2000),
          category: 'Announcements',
          date: new Date().toISOString(),
          isPublished: true,
          isFeatured: false,
          isInMarquee: true, // Mark as marquee news
          displayOrder: 0
        }

        await createNews(newsData)
        completed++
        marqueeResults.push({ title: title || 'Marquee Item', status: 'success' })
        setProgress(prev => ({
          ...prev,
          marquee: { total: NEWS_MARQUEE_ITEMS.length, completed, failed }
        }))
      } catch (error) {
        failed++
        const errorMsg = error instanceof Error ? error.message : 'Unknown error'
        marqueeResults.push({ title: item.substring(0, 50), status: 'failed', error: errorMsg })
        setProgress(prev => ({
          ...prev,
          marquee: { total: NEWS_MARQUEE_ITEMS.length, completed, failed }
        }))
      }
    }

    return marqueeResults
  }

  const handleMigrate = async () => {
    setMigrating(true)
    setProgress({
      news: { total: NEWS_ITEMS.length, completed: 0, failed: 0 },
      events: { total: EVENTS_DATA.length, completed: 0, failed: 0 },
      marquee: { total: NEWS_MARQUEE_ITEMS.length, completed: 0, failed: 0 }
    })
    setResults({ news: [], events: [], marquee: [] })
    setCompleted(false)

    try {
      // Migrate News Items
      const newsResults = await migrateNews()
      
      // Migrate Events
      const eventResults = await migrateEvents()
      
      // Migrate Marquee Items
      const marqueeResults = await migrateMarquee()

      setResults({
        news: newsResults,
        events: eventResults,
        marquee: marqueeResults
      })
      setCompleted(true)
    } catch (error) {
      console.error('Migration error:', error)
    } finally {
      setMigrating(false)
    }
  }

  const totalItems = NEWS_ITEMS.length + EVENTS_DATA.length + NEWS_MARQUEE_ITEMS.length
  const totalCompleted = progress.news.completed + progress.events.completed + progress.marquee.completed
  const totalFailed = progress.news.failed + progress.events.failed + progress.marquee.failed

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary-100 rounded-lg">
            <Database className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Migrate News & Events</h1>
            <p className="text-sm text-gray-500 mt-1">
              Import all news and events from constants file to database
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Migration Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">News Items</p>
              <p className="text-lg font-bold text-gray-900">{NEWS_ITEMS.length}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <Calendar className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Events</p>
              <p className="text-lg font-bold text-gray-900">{EVENTS_DATA.length}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
            <FileText className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Marquee Items</p>
              <p className="text-lg font-bold text-gray-900">{NEWS_MARQUEE_ITEMS.length}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Total items to migrate: <span className="font-semibold text-gray-900">{totalItems}</span>
          </p>
        </div>
      </div>

      {/* Progress */}
      {migrating && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Migration Progress</h2>
          
          <div className="space-y-4">
            {/* News Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">News Items</span>
                <span className="text-sm text-gray-600">
                  {progress.news.completed} / {progress.news.total} ({progress.news.failed} failed)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(progress.news.completed / progress.news.total) * 100}%` }}
                />
              </div>
            </div>

            {/* Events Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Events</span>
                <span className="text-sm text-gray-600">
                  {progress.events.completed} / {progress.events.total} ({progress.events.failed} failed)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(progress.events.completed / progress.events.total) * 100}%` }}
                />
              </div>
            </div>

            {/* Marquee Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Marquee Items</span>
                <span className="text-sm text-gray-600">
                  {progress.marquee.completed} / {progress.marquee.total} ({progress.marquee.failed} failed)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(progress.marquee.completed / progress.marquee.total) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm font-semibold text-gray-900">
                {totalCompleted} / {totalItems} completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
              <div
                className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(totalCompleted / totalItems) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {completed && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Migration Results</h2>
          
          <div className="space-y-6">
            {/* News Results */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                News Items ({progress.news.completed} successful, {progress.news.failed} failed)
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {results.news.map((result, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-2 rounded ${
                      result.status === 'success' ? 'bg-green-50' : 'bg-red-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {result.status === 'success' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className="text-sm text-gray-700">{result.title}</span>
                    </div>
                    {result.error && (
                      <span className="text-xs text-red-600">{result.error}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Events Results */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Events ({progress.events.completed} successful, {progress.events.failed} failed)
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {results.events.map((result, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-2 rounded ${
                      result.status === 'success' ? 'bg-green-50' : 'bg-red-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {result.status === 'success' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className="text-sm text-gray-700">{result.title}</span>
                    </div>
                    {result.error && (
                      <span className="text-xs text-red-600">{result.error}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Marquee Results */}
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Marquee Items ({progress.marquee.completed} successful, {progress.marquee.failed} failed)
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {results.marquee.map((result, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-2 rounded ${
                      result.status === 'success' ? 'bg-green-50' : 'bg-red-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {result.status === 'success' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className="text-sm text-gray-700">{result.title}</span>
                    </div>
                    {result.error && (
                      <span className="text-xs text-red-600">{result.error}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">
                  {totalCompleted} successful
                </p>
                {totalFailed > 0 && (
                  <p className="text-sm text-red-600">{totalFailed} failed</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Ready to Migrate?</h3>
            <p className="text-sm text-gray-600 mt-1">
              This will import all {totalItems} items from constants file to database.
            </p>
          </div>
          <button
            onClick={handleMigrate}
            disabled={migrating}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {migrating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Migrating...</span>
              </>
            ) : (
              <>
                <Database className="w-5 h-5" />
                <span>Start Migration</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-yellow-800 mb-1">Important Notes</h4>
            <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
              <li>This migration will create new records in the database</li>
              <li>If items with the same slug already exist, the migration may fail for those items</li>
              <li>All items will be marked as published by default</li>
              <li>Featured news items will be marked as featured</li>
              <li>Marquee items will be created as news with isInMarquee flag set to true</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

