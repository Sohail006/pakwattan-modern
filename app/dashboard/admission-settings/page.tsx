'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Settings, Loader2, AlertCircle, CheckCircle, Save, Calendar, GraduationCap, Award, CreditCard, FileText, Edit, Trash2, Phone } from 'lucide-react'
import { getUserRoles, isAuthenticated } from '@/lib/api/auth'
import { 
  getActiveAdmissionSetting, 
  createAdmissionSetting, 
  updateAdmissionSetting,
  activateAdmissionSetting,
  getAllAdmissionCriteria,
  createAdmissionCriteria,
  updateAdmissionCriteria,
  deleteAdmissionCriteria,
  getAllScholarshipTypes,
  createScholarshipType,
  updateScholarshipType,
  deleteScholarshipType,
  toggleScholarshipTypeActive,
  type AdmissionSetting,
  type AdmissionSettingCreateDto,
  type AdmissionSettingUpdateDto,
  type AdmissionCriteria,
  type AdmissionCriteriaCreateDto,
  type AdmissionCriteriaUpdateDto,
  type ScholarshipType,
  type ScholarshipTypeCreateDto,
  type ScholarshipTypeUpdateDto
} from '@/lib/api/admissionSettings'
import { getSessions, type Session } from '@/lib/api/sessions'
import { getGrades, type Grade } from '@/lib/api/grades'
import FormField from '@/components/ui/FormField'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'

type TabType = 'general' | 'test-dates' | 'passing-marks' | 'scholarships' | 'payment' | 'instructions'

type AdmissionSettingChangeHandler = <K extends keyof AdmissionSetting>(field: K, value: AdmissionSetting[K]) => void
type AdmissionCriteriaChangeHandler = <K extends keyof AdmissionCriteria>(field: K, value: AdmissionCriteria[K]) => void
type ScholarshipTypeChangeHandler = <K extends keyof ScholarshipType>(field: K, value: ScholarshipType[K]) => void

export default function AdmissionSettingsPage() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('general')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activating, setActivating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  const [sessions, setSessions] = useState<Session[]>([])
  const [settings, setSettings] = useState<AdmissionSetting | null>(null)
  
  // Form state
  const [formData, setFormData] = useState<Partial<AdmissionSetting>>({
    academicYear: new Date().getFullYear().toString(),
    sessionId: 0,
    isTestScheduled: false,
    testDurationMinutes: 120,
    registrationFee: 0,
    isRegistrationOpen: false,
  })

  useEffect(() => {
    const checkAuth = () => {
      setCheckingAuth(true)
      
      if (!isAuthenticated()) {
        setAuthError('You must be logged in to access this page.')
        setCheckingAuth(false)
        setTimeout(() => {
          router.push('/login')
        }, 2000)
        return
      }

      const userRoles = getUserRoles()
      const canManage = userRoles.includes('Admin') || userRoles.includes('ManagerialStaff')
      
      if (!canManage) {
        setAuthError('You do not have permission to access this page. Only Administrators and Managerial Staff can manage admission settings.')
        setCheckingAuth(false)
        setTimeout(() => {
          router.push('/dashboard')
        }, 3000)
        return
      }

      setCheckingAuth(false)
      setAuthError(null)
    }

    checkAuth()
  }, [router])

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Load sessions and settings in parallel for better performance
      const [sessionsData, activeSetting] = await Promise.all([
        getSessions(true),
        getActiveAdmissionSetting().catch(() => null) // Don't fail if no active setting
      ])
      
      setSessions(sessionsData)
      
      if (activeSetting) {
        setSettings(activeSetting)
        setFormData({
          ...activeSetting,
        })
      } else {
        // Set default session if available
        const currentSession = sessionsData.find(s => s.isCurrent) || sessionsData[0]
        if (currentSession) {
          setFormData(prev => ({
            ...prev,
            sessionId: currentSession.id,
            academicYear: `${currentSession.startYear}-${currentSession.endYear}`,
          }))
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to load admission settings.'
      setError(errorMessage || 'Failed to load admission settings. Please refresh the page and try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!checkingAuth && !authError) {
      loadData()
    }
  }, [checkingAuth, authError, loadData])

  const handleInputChange = useCallback(
    <K extends keyof AdmissionSetting>(field: K, value: AdmissionSetting[K]) => {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }))
      setError(null)
      setSuccess(null)
    },
    []
  ) satisfies AdmissionSettingChangeHandler

  const handleSave = useCallback(async () => {
    try {
      setSaving(true)
      setError(null)
      setSuccess(null)

      // Client-side validation
      if (!formData.sessionId || formData.sessionId === 0) {
        setError('Please select a session from the dropdown to continue.')
        setSaving(false)
        return
      }

      if (!formData.academicYear || formData.academicYear.trim() === '') {
        setError('Academic year is required. Please enter the academic year in the format YYYY or YYYY-YYYY (e.g., 2024 or 2024-2025).')
        setSaving(false)
        return
      }

      // Validate academic year format
      const yearPattern = /^\d{4}(-\d{4})?$/
      if (!yearPattern.test(formData.academicYear)) {
        setError('Academic year must be in the format YYYY or YYYY-YYYY (e.g., 2024 or 2024-2025).')
        setSaving(false)
        return
      }

      let savedSetting: AdmissionSetting
      const payloadData: Partial<AdmissionSetting> = { ...formData }
      delete payloadData.id
      delete payloadData.sessionName
      delete payloadData.createdAt
      delete payloadData.updatedAt
      delete payloadData.createdByUserId
      delete payloadData.updatedByUserId

      if (settings?.id) {
        // Update existing
        const updatePayload: AdmissionSettingUpdateDto = {
          id: settings.id,
          ...(payloadData as Partial<AdmissionSettingCreateDto>),
        }
        savedSetting = await updateAdmissionSetting(settings.id, updatePayload)
      } else {
        // Create new
        const createPayload = payloadData as AdmissionSettingCreateDto
        savedSetting = await createAdmissionSetting(createPayload)
      }

      setSettings(savedSetting)
      setFormData(savedSetting)
      setSuccess(settings?.id 
        ? 'Admission settings updated successfully! Your changes have been saved.' 
        : 'Admission settings created successfully! You can now configure test dates, passing marks, and other settings.')
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to save admission settings.'
      setError(errorMessage || 'Failed to save admission settings. Please check your internet connection and try again.')
    } finally {
      setSaving(false)
    }
  }, [formData, settings])

  const handleActivate = useCallback(async () => {
    if (!settings?.id) {
      setError('Please save the admission settings before activating.')
      return
    }

    try {
      setActivating(true)
      setError(null)
      setSuccess(null)

      const activated = await activateAdmissionSetting(settings.id)
      setSettings(activated)
      setFormData(activated)
      setSuccess('Admission settings activated successfully!')
      setTimeout(() => setSuccess(null), 5000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to activate admission settings.'
      setError(errorMessage || 'Failed to activate admission settings. Please try again.')
    } finally {
      setActivating(false)
    }
  }, [settings])

  const tabs = useMemo(() => [
    { id: 'general' as TabType, label: 'General', icon: Settings },
    { id: 'test-dates' as TabType, label: 'Test Dates', icon: Calendar },
    { id: 'passing-marks' as TabType, label: 'Passing Marks', icon: GraduationCap },
    { id: 'scholarships' as TabType, label: 'Scholarships', icon: Award },
    { id: 'payment' as TabType, label: 'Payment', icon: CreditCard },
    { id: 'instructions' as TabType, label: 'Instructions', icon: FileText },
  ], [])

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Checking authentication...</p>
          <p className="text-gray-500 text-sm mt-2">Please wait while we verify your access.</p>
        </div>
      </div>
    )
  }

  if (authError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">{authError}</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Loading admission settings...</p>
            <p className="text-gray-500 text-sm mt-2">Please wait while we fetch your configuration.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-100 rounded-xl">
              <Settings className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admission Settings</h1>
              <p className="text-gray-600 mt-1">
                Configure admission test dates, passing marks, scholarships, and payment information
              </p>
              {settings && (
                <p className="text-sm mt-2">
                  <span className={`font-semibold ${settings.isActive ? 'text-green-600' : 'text-amber-600'}`}>
                    {settings.isActive ? 'Active' : 'Inactive'}
                  </span>{' '}
                  configuration
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save Settings</span>
                </>
              )}
            </button>
            {settings?.id && (
              <button
                onClick={handleActivate}
                disabled={activating || saving || settings.isActive}
                className={`flex items-center space-x-2 px-5 py-3 border rounded-lg transition-all shadow-sm ${
                  settings.isActive
                    ? 'border-green-200 text-green-600 bg-green-50 cursor-not-allowed'
                    : 'border-amber-300 text-amber-700 bg-white hover:bg-amber-50 disabled:opacity-50'
                }`}
              >
                {activating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Activating...</span>
                  </>
                ) : (
                  <>
                    <Settings className="w-5 h-5" />
                    <span>{settings.isActive ? 'Active' : 'Activate'}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-lg flex items-start space-x-3 animate-in slide-in-from-top-2">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-800 font-medium">{success}</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg flex items-start space-x-3 animate-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {/* Status Badge */}
        {settings && (
          <div
            className={`mt-4 inline-flex items-center space-x-2 px-4 py-2 rounded-lg border ${
              settings.isActive
                ? 'bg-green-50 border-green-200'
                : 'bg-amber-50 border-amber-200'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                settings.isActive ? 'bg-green-500' : 'bg-amber-500'
              } animate-pulse`}
            ></div>
            <span
              className={`text-sm font-medium ${
                settings.isActive ? 'text-green-800' : 'text-amber-800'
              }`}
            >
              {settings.isActive ? 'Active settings configured' : 'Draft settings (activate to make live)'}
            </span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50">
          <nav className="flex overflow-x-auto scrollbar-hide" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActiveTab(tab.id)
                    }
                  }}
                  className={`
                    flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap
                    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                    ${
                      isActive
                        ? 'border-primary-600 text-primary-600 bg-white'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 hover:border-gray-300'
                    }
                  `}
                  aria-selected={isActive}
                  role="tab"
                  aria-label={`${tab.label} tab`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : ''}`} aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'general' && (
            <GeneralSettingsTab
              formData={formData}
              sessions={sessions}
              onChange={handleInputChange}
            />
          )}
          {activeTab === 'test-dates' && (
            <TestDatesTab
              formData={formData}
              onChange={handleInputChange}
            />
          )}
          {activeTab === 'passing-marks' && (
            <PassingMarksTab
              settings={settings}
              formData={formData}
            />
          )}
          {activeTab === 'scholarships' && (
            <ScholarshipsTab />
          )}
          {activeTab === 'payment' && (
            <PaymentTab
              formData={formData}
              onChange={handleInputChange}
            />
          )}
          {activeTab === 'instructions' && (
            <InstructionsTab
              formData={formData}
              onChange={handleInputChange}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// General Settings Tab
function GeneralSettingsTab({
  formData,
  sessions,
  onChange,
}: {
  formData: Partial<AdmissionSetting>
  sessions: Session[]
  onChange: AdmissionSettingChangeHandler
}) {
  return (
    <div className="space-y-8">
      {/* Basic Information Section */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-2 mb-6">
          <Settings className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Academic Year" required>
            <input
              type="text"
              value={formData.academicYear || ''}
              onChange={(e) => onChange('academicYear', e.target.value)}
              placeholder="e.g., 2024-2025"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </FormField>

          <FormField label="Session" required>
            <select
              value={formData.sessionId || 0}
              onChange={(e) => onChange('sessionId', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value={0}>Select a session</option>
              {sessions.map((session) => (
                <option key={session.id} value={session.id}>
                  {session.name} ({session.startYear}-{session.endYear})
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Registration Fee (PKR)" required>
            <input
              type="number"
              value={formData.registrationFee || 0}
              onChange={(e) => onChange('registrationFee', parseFloat(e.target.value) || 0)}
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </FormField>

          <FormField label="Registration Start Date">
            <input
              type="date"
              value={formData.registrationStartDate ? formData.registrationStartDate.split('T')[0] : ''}
              onChange={(e) => onChange('registrationStartDate', e.target.value ? `${e.target.value}T00:00:00` : undefined)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </FormField>

          <FormField label="Registration End Date">
            <input
              type="date"
              value={formData.registrationEndDate ? formData.registrationEndDate.split('T')[0] : ''}
              onChange={(e) => onChange('registrationEndDate', e.target.value ? `${e.target.value}T00:00:00` : undefined)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </FormField>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isRegistrationOpen || false}
                onChange={(e) => onChange('isRegistrationOpen', e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-700">Registration Open</span>
            </label>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-2 mb-6">
          <Phone className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Contact Email">
            <input
              type="email"
              value={formData.contactEmail || ''}
              onChange={(e) => onChange('contactEmail', e.target.value)}
              placeholder="admissions@school.edu.pk"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </FormField>

          <FormField label="Contact Phone">
            <input
              type="tel"
              value={formData.contactPhone || ''}
              onChange={(e) => onChange('contactPhone', e.target.value)}
              placeholder="+92 300 1234567"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </FormField>

          <FormField label="WhatsApp Number">
            <input
              type="tel"
              value={formData.contactWhatsApp || ''}
              onChange={(e) => onChange('contactWhatsApp', e.target.value)}
              placeholder="+92 300 1234567"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </FormField>
        </div>
      </div>
    </div>
  )
}

// Test Dates Tab
function TestDatesTab({
  formData,
  onChange,
}: {
  formData: Partial<AdmissionSetting>
  onChange: AdmissionSettingChangeHandler
}) {
  return (
    <div className="space-y-6">
      {/* Enable Test Scheduling */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <label className="flex items-center space-x-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={formData.isTestScheduled || false}
            onChange={(e) => onChange('isTestScheduled', e.target.checked)}
            className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-2 cursor-pointer"
          />
          <div>
            <span className="text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              Enable Test Scheduling
            </span>
            <p className="text-sm text-gray-500 mt-1">
              When enabled, you can configure test dates and venues for admission tests
            </p>
          </div>
        </label>
      </div>

      {formData.isTestScheduled && (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">Test Schedule Configuration</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Test Start Date">
              <input
                type="date"
                value={formData.testStartDate ? formData.testStartDate.split('T')[0] : ''}
                onChange={(e) => onChange('testStartDate', e.target.value ? `${e.target.value}T00:00:00` : undefined)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Test End Date">
              <input
                type="date"
                value={formData.testEndDate ? formData.testEndDate.split('T')[0] : ''}
                onChange={(e) => onChange('testEndDate', e.target.value ? `${e.target.value}T00:00:00` : undefined)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Default Test Venue">
              <input
                type="text"
                value={formData.defaultTestVenue || ''}
                onChange={(e) => onChange('defaultTestVenue', e.target.value)}
                placeholder="Main Campus Auditorium"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Default Test Time">
              <input
                type="time"
                value={formData.defaultTestTime || ''}
                onChange={(e) => onChange('defaultTestTime', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Test Duration (Minutes)" required>
              <input
                type="number"
                value={formData.testDurationMinutes || 120}
                onChange={(e) => onChange('testDurationMinutes', parseInt(e.target.value) || 120)}
                min="30"
                step="15"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>
          </div>
        </div>
      )}
    </div>
  )
}

// Passing Marks Tab
function PassingMarksTab({
  settings,
  formData,
}: {
  settings: AdmissionSetting | null
  formData: Partial<AdmissionSetting>
}) {
  const [criteria, setCriteria] = useState<AdmissionCriteria[]>([])
  const [grades, setGrades] = useState<Grade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [editingCriteria, setEditingCriteria] = useState<AdmissionCriteria | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    type: 'danger' | 'warning' | 'info'
    title: string
    message: string
    confirmText: string
    onConfirm: () => void
  } | null>(null)

  const [formDataCriteria, setFormDataCriteria] = useState<Partial<AdmissionCriteria>>({
    gradeId: 0,
    minimumPassingMarks: 50,
    minimumMarksForScholarship: 80,
    totalTestMarks: 100,
    hasSeparateTest: false,
    academicYear: formData.academicYear || new Date().getFullYear().toString(),
    sessionId: formData.sessionId || 0,
  })

  const loadData = useCallback(async () => {
    if (!settings || !formData.sessionId) return
    
    try {
      setLoading(true)
      setError(null)

      // Load in parallel for better performance
      const [criteriaData, gradesData] = await Promise.all([
        getAllAdmissionCriteria(),
        getGrades(true),
      ])

      // Filter criteria for current session if available
      const filteredCriteria = formData.sessionId
        ? criteriaData.filter(c => c.sessionId === formData.sessionId)
        : criteriaData

      setCriteria(filteredCriteria)
      setGrades(gradesData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to load admission criteria.'
      setError(errorMessage || 'Failed to load admission criteria. Please refresh the page and try again.')
    } finally {
      setLoading(false)
    }
  }, [settings, formData.sessionId])

  useEffect(() => {
    if (settings && formData.sessionId) {
      loadData()
    }
  }, [settings, formData.sessionId, loadData])

  const handleCriteriaInputChange = useCallback(
    <K extends keyof AdmissionCriteria>(field: K, value: AdmissionCriteria[K]) => {
      setFormDataCriteria(prev => ({
        ...prev,
        [field]: value,
      }))
    },
    []
  ) satisfies AdmissionCriteriaChangeHandler

  // Memoize available grades to avoid recalculating on every render
  const availableGrades = useMemo(() => {
    return grades.filter(g => !criteria.find(c => c.gradeId === g.id && c.id !== editingCriteria?.id))
  }, [grades, criteria, editingCriteria?.id])

  const handleSave = useCallback(async () => {
    // Client-side validation
    if (!formDataCriteria.gradeId || formDataCriteria.gradeId === 0) {
      setError('Please select a grade from the dropdown to configure passing marks.')
      return
    }

    if (!formDataCriteria.sessionId || formDataCriteria.sessionId === 0) {
      setError('Session is required. Please go to the General Settings tab and save the session information first.')
      return
    }

    if (!formDataCriteria.academicYear || formDataCriteria.academicYear.trim() === '') {
      setError('Academic year is required. Please save general settings first.')
      return
    }

    // Validate marks
    if (formDataCriteria.minimumPassingMarks && formDataCriteria.totalTestMarks) {
      if (formDataCriteria.minimumPassingMarks > formDataCriteria.totalTestMarks) {
        setError(`Minimum passing marks (${formDataCriteria.minimumPassingMarks}) cannot be greater than total test marks (${formDataCriteria.totalTestMarks}).`)
        return
      }
    }

    if (formDataCriteria.minimumMarksForScholarship && formDataCriteria.totalTestMarks) {
      if (formDataCriteria.minimumMarksForScholarship > formDataCriteria.totalTestMarks) {
        setError(`Minimum marks for scholarship (${formDataCriteria.minimumMarksForScholarship}) cannot be greater than total test marks (${formDataCriteria.totalTestMarks}).`)
        return
      }
    }

    if (formDataCriteria.minimumPassingMarks && formDataCriteria.minimumMarksForScholarship) {
      if (formDataCriteria.minimumMarksForScholarship < formDataCriteria.minimumPassingMarks) {
        setError(`Minimum marks for scholarship (${formDataCriteria.minimumMarksForScholarship}) should be equal to or greater than minimum passing marks (${formDataCriteria.minimumPassingMarks}).`)
        return
      }
    }

    try {
      setSaving(true)
      setError(null)

      const criteriaPayload: Partial<AdmissionCriteria> = { ...formDataCriteria }
      delete criteriaPayload.id
      delete criteriaPayload.gradeName
      delete criteriaPayload.sessionName
      delete criteriaPayload.createdAt
      delete criteriaPayload.updatedAt
      delete criteriaPayload.isActive

      if (editingCriteria) {
        const updatePayload: AdmissionCriteriaUpdateDto = {
          id: editingCriteria.id,
          ...(criteriaPayload as Partial<AdmissionCriteriaCreateDto>),
        }
        await updateAdmissionCriteria(editingCriteria.id, updatePayload)
      } else {
        const createPayload = criteriaPayload as AdmissionCriteriaCreateDto
        await createAdmissionCriteria(createPayload)
      }

      const gradeName = grades.find(g => g.id === formDataCriteria.gradeId)?.name || 'the selected grade'
      setSuccess(editingCriteria 
        ? `Admission criteria for ${gradeName} updated successfully!` 
        : `Admission criteria for ${gradeName} created successfully!`)
      setShowForm(false)
      setEditingCriteria(null)
      setFormDataCriteria({
        gradeId: 0,
        minimumPassingMarks: 50,
        minimumMarksForScholarship: 80,
        totalTestMarks: 100,
        hasSeparateTest: false,
        academicYear: formData.academicYear || new Date().getFullYear().toString(),
        sessionId: formData.sessionId || 0,
      })
      
      await loadData()
      setTimeout(() => setSuccess(null), 5000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to save admission criteria.'
      setError(errorMessage || 'Failed to save admission criteria. Please check all fields and try again.')
    } finally {
      setSaving(false)
    }
  }, [formDataCriteria, editingCriteria, formData, loadData, grades])

  const handleEdit = useCallback((criterion: AdmissionCriteria) => {
    setEditingCriteria(criterion)
    setFormDataCriteria(criterion)
    setShowForm(true)
  }, [])

  const handleDelete = useCallback((id: number) => {
    const criterion = criteria.find(c => c.id === id)
    setConfirmDialog({
      isOpen: true,
      type: 'danger',
      title: 'Delete Admission Criteria',
      message: `Are you sure you want to delete the admission criteria for ${criterion?.gradeName || 'this grade'}? This action cannot be undone.`,
      confirmText: 'Delete',
      onConfirm: async () => {
        try {
          await deleteAdmissionCriteria(id)
          const gradeName = criterion?.gradeName || 'the selected grade'
          setSuccess(`Admission criteria for ${gradeName} deleted successfully!`)
          setConfirmDialog(null)
          await loadData()
          setTimeout(() => setSuccess(null), 5000)
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Unable to delete admission criteria.'
          setError(errorMessage || 'Failed to delete admission criteria. Please try again.')
          setConfirmDialog(null)
        }
      },
    })
  }, [criteria, loadData])

  const handleCancel = useCallback(() => {
    setShowForm(false)
    setEditingCriteria(null)
    setFormDataCriteria({
      gradeId: 0,
      minimumPassingMarks: 50,
      minimumMarksForScholarship: 80,
      totalTestMarks: 100,
      hasSeparateTest: false,
      academicYear: formData.academicYear || new Date().getFullYear().toString(),
      sessionId: formData.sessionId || 0,
    })
  }, [formData.academicYear, formData.sessionId])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        <p className="text-gray-600 text-sm">Loading admission criteria...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg flex items-start space-x-3 animate-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-lg flex items-start space-x-3 animate-in slide-in-from-top-2">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-green-800 font-medium">{success}</p>
          </div>
        </div>
      )}

      {!settings && (
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-yellow-800 font-medium">
              Please save the general settings first to configure passing marks for each grade.
            </p>
            <p className="text-yellow-700 text-sm mt-1">
              Go to the General Settings tab, select a session and academic year, then click &quot;Save Settings&quot;.
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Passing Marks by Grade</h3>
          <p className="text-sm text-gray-600 mt-1">
            Configure minimum passing marks and scholarship eligibility for each grade
          </p>
        </div>
        {settings && (
          <button
            onClick={() => {
              setShowForm(true)
              setEditingCriteria(null)
              setFormDataCriteria({
                gradeId: 0,
                minimumPassingMarks: 50,
                minimumMarksForScholarship: 80,
                totalTestMarks: 100,
                hasSeparateTest: false,
                academicYear: formData.academicYear || new Date().getFullYear().toString(),
                sessionId: formData.sessionId || 0,
              })
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all shadow-sm hover:shadow-md"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Add Criteria</span>
          </button>
        )}
      </div>

      {showForm && settings && (
        <div className="bg-white rounded-lg p-6 border-2 border-primary-200 shadow-sm">
          <div className="flex items-center space-x-2 mb-6">
            <GraduationCap className="w-5 h-5 text-primary-600" />
            <h4 className="text-lg font-semibold text-gray-900">
              {editingCriteria ? 'Edit' : 'Add'} Admission Criteria
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Grade" required>
              <select
                value={formDataCriteria.gradeId || 0}
                onChange={(e) => handleCriteriaInputChange('gradeId', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={!!editingCriteria}
                aria-label="Select grade"
              >
                <option value={0}>Select a grade</option>
                {availableGrades.map((grade) => (
                  <option key={grade.id} value={grade.id}>
                    {grade.name}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Total Test Marks" required>
              <input
                type="number"
                value={formDataCriteria.totalTestMarks || 100}
                onChange={(e) => handleCriteriaInputChange('totalTestMarks', parseInt(e.target.value) || 100)}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Minimum Passing Marks" required>
              <input
                type="number"
                value={formDataCriteria.minimumPassingMarks || 50}
                onChange={(e) => handleCriteriaInputChange('minimumPassingMarks', parseInt(e.target.value) || 50)}
                min="0"
                max={formDataCriteria.totalTestMarks || 100}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Minimum Marks for Scholarship" required>
              <input
                type="number"
                value={formDataCriteria.minimumMarksForScholarship || 80}
                onChange={(e) => handleCriteriaInputChange('minimumMarksForScholarship', parseInt(e.target.value) || 80)}
                min="0"
                max={formDataCriteria.totalTestMarks || 100}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Maximum Seats">
              <input
                type="number"
                value={formDataCriteria.maximumSeats || ''}
                onChange={(e) => handleCriteriaInputChange('maximumSeats', e.target.value ? parseInt(e.target.value) : undefined)}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Scholarship Seats">
              <input
                type="number"
                value={formDataCriteria.scholarshipSeats || ''}
                onChange={(e) => handleCriteriaInputChange('scholarshipSeats', e.target.value ? parseInt(e.target.value) : undefined)}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>

            <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formDataCriteria.hasSeparateTest || false}
                    onChange={(e) => handleCriteriaInputChange('hasSeparateTest', e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">Has Separate Test</span>
              </label>
            </div>

            {formDataCriteria.hasSeparateTest && (
              <>
                <FormField label="Grade-Specific Test Date">
                  <input
                    type="date"
                    value={formDataCriteria.gradeSpecificTestDate ? formDataCriteria.gradeSpecificTestDate.split('T')[0] : ''}
                    onChange={(e) => handleCriteriaInputChange('gradeSpecificTestDate', e.target.value ? `${e.target.value}T00:00:00` : undefined)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </FormField>

                <FormField label="Grade-Specific Test Venue">
                  <input
                    type="text"
                    value={formDataCriteria.gradeSpecificTestVenue || ''}
                    onChange={(e) => handleCriteriaInputChange('gradeSpecificTestVenue', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </FormField>

                <FormField label="Grade-Specific Test Time">
                  <input
                    type="time"
                    value={formDataCriteria.gradeSpecificTestTime || ''}
                    onChange={(e) => handleCriteriaInputChange('gradeSpecificTestTime', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </FormField>
              </>
            )}
          </div>

          <div className="flex items-center justify-end space-x-3 mt-6">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
            >
              {saving ? 'Saving...' : editingCriteria ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      )}

      {criteria.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">No admission criteria configured yet.</p>
          {settings && (
            <p className="text-sm text-gray-500 mt-2">Click &quot;Add Criteria&quot; to get started.</p>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total Marks</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Passing Marks</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Scholarship Marks</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Max Seats</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Separate Test</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {criteria.map((criterion) => (
                <tr key={criterion.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {criterion.gradeName || `Grade ${criterion.gradeId}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {criterion.totalTestMarks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {criterion.minimumPassingMarks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {criterion.minimumMarksForScholarship}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {criterion.maximumSeats || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {criterion.hasSeparateTest ? 'Yes' : 'No'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(criterion)}
                        className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-all"
                        title="Edit"
                        aria-label="Edit criteria"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(criterion.id)}
                        className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all"
                        title="Delete"
                        aria-label="Delete criteria"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {confirmDialog && (
        <ConfirmationDialog
          isOpen={confirmDialog.isOpen}
          type={confirmDialog.type}
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmText={confirmDialog.confirmText}
          onConfirm={confirmDialog.onConfirm}
          onClose={() => setConfirmDialog(null)}
        />
      )}
    </div>
  )
}

// Scholarships Tab
function ScholarshipsTab() {
  const [scholarships, setScholarships] = useState<ScholarshipType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [editingScholarship, setEditingScholarship] = useState<ScholarshipType | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    type: 'danger' | 'warning' | 'info'
    title: string
    message: string
    confirmText: string
    onConfirm: () => void
  } | null>(null)

  const [formDataScholarship, setFormDataScholarship] = useState<Partial<ScholarshipType>>({
    name: '',
    description: '',
    minimumAmount: undefined,
    maximumAmount: undefined,
    amountRange: '',
    criteria: '',
    minimumMarksRequired: undefined,
    requiredDocuments: '',
    requiresVerification: false,
    displayOrder: 0,
  })

  const loadScholarships = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllScholarshipTypes()
      setScholarships(data.sort((a, b) => a.displayOrder - b.displayOrder))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to load scholarship types.'
      setError(errorMessage || 'Failed to load scholarship types. Please refresh the page and try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadScholarships()
  }, [loadScholarships])

  const handleScholarshipInputChange = useCallback(
    <K extends keyof ScholarshipType>(field: K, value: ScholarshipType[K]) => {
      setFormDataScholarship(prev => ({
        ...prev,
        [field]: value,
      }))
    },
    []
  ) satisfies ScholarshipTypeChangeHandler

  const handleSave = useCallback(async () => {
    // Client-side validation
    if (!formDataScholarship.name?.trim()) {
      setError('Scholarship name is required. Please enter a name for the scholarship type.')
      return
    }

    // Validate amount ranges if provided
    if (formDataScholarship.minimumAmount !== undefined && formDataScholarship.maximumAmount !== undefined) {
      if (formDataScholarship.minimumAmount < 0 || formDataScholarship.maximumAmount < 0) {
        setError('Scholarship amounts cannot be negative. Please enter valid amounts.')
        return
      }
      if (formDataScholarship.minimumAmount > formDataScholarship.maximumAmount) {
        setError(`Minimum amount (${formDataScholarship.minimumAmount}) cannot be greater than maximum amount (${formDataScholarship.maximumAmount}).`)
        return
      }
    }

    if (formDataScholarship.minimumMarksRequired !== undefined) {
      if (formDataScholarship.minimumMarksRequired < 0 || formDataScholarship.minimumMarksRequired > 100) {
        setError('Minimum marks required must be between 0 and 100.')
        return
      }
    }

    try {
      setSaving(true)
      setError(null)

      const scholarshipPayload: Partial<ScholarshipType> = { ...formDataScholarship }
      delete scholarshipPayload.id
      delete scholarshipPayload.isActive
      delete scholarshipPayload.createdAt
      delete scholarshipPayload.updatedAt

      if (editingScholarship) {
        const updatePayload: ScholarshipTypeUpdateDto = {
          id: editingScholarship.id,
          ...(scholarshipPayload as Partial<ScholarshipTypeCreateDto>),
        }
        await updateScholarshipType(editingScholarship.id, updatePayload)
      } else {
        const createPayload = scholarshipPayload as ScholarshipTypeCreateDto
        await createScholarshipType(createPayload)
      }

      const scholarshipName = formDataScholarship.name || 'Scholarship'
      setSuccess(editingScholarship 
        ? `"${scholarshipName}" scholarship type updated successfully!` 
        : `"${scholarshipName}" scholarship type created successfully!`)
      setShowForm(false)
      setEditingScholarship(null)
      setFormDataScholarship({
        name: '',
        description: '',
        minimumAmount: undefined,
        maximumAmount: undefined,
        amountRange: '',
        criteria: '',
        minimumMarksRequired: undefined,
        requiredDocuments: '',
        requiresVerification: false,
        displayOrder: scholarships.length,
      })
      
      await loadScholarships()
      setTimeout(() => setSuccess(null), 5000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to save scholarship type.'
      setError(errorMessage || 'Failed to save scholarship type. Please check all fields and try again.')
    } finally {
      setSaving(false)
    }
  }, [formDataScholarship, editingScholarship, scholarships.length, loadScholarships])

  const handleEdit = useCallback((scholarship: ScholarshipType) => {
    setEditingScholarship(scholarship)
    setFormDataScholarship(scholarship)
    setShowForm(true)
  }, [])

  const handleDelete = useCallback((id: number) => {
    const scholarship = scholarships.find(s => s.id === id)
    setConfirmDialog({
      isOpen: true,
      type: 'danger',
      title: 'Delete Scholarship Type',
      message: `Are you sure you want to delete "${scholarship?.name}"? This action cannot be undone.`,
      confirmText: 'Delete',
      onConfirm: async () => {
        try {
          await deleteScholarshipType(id)
          const scholarshipName = scholarship?.name || 'Scholarship'
          setSuccess(`"${scholarshipName}" scholarship type deleted successfully!`)
          setConfirmDialog(null)
          await loadScholarships()
          setTimeout(() => setSuccess(null), 5000)
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Unable to delete scholarship type.'
          setError(errorMessage || 'Failed to delete scholarship type. Please try again.')
          setConfirmDialog(null)
        }
      },
    })
  }, [scholarships, loadScholarships])

  const handleToggleActive = useCallback(async (id: number) => {
    try {
      setError(null)
      await toggleScholarshipTypeActive(id)
      const scholarship = scholarships.find(s => s.id === id)
      const scholarshipName = scholarship?.name || 'Scholarship'
      const newStatus = scholarship?.isActive ? 'deactivated' : 'activated'
      setSuccess(`"${scholarshipName}" scholarship type ${newStatus} successfully!`)
      await loadScholarships()
      setTimeout(() => setSuccess(null), 5000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to toggle scholarship type status.'
      setError(errorMessage || 'Failed to change scholarship status. Please try again.')
    }
  }, [loadScholarships, scholarships])

  const handleCancel = useCallback(() => {
    setShowForm(false)
    setEditingScholarship(null)
    setFormDataScholarship({
      name: '',
      description: '',
      minimumAmount: undefined,
      maximumAmount: undefined,
      amountRange: '',
      criteria: '',
      minimumMarksRequired: undefined,
      requiredDocuments: '',
      requiresVerification: false,
      displayOrder: scholarships.length,
    })
  }, [scholarships.length])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        <p className="text-gray-600 text-sm">Loading scholarship types...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg flex items-start space-x-3 animate-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-lg flex items-start space-x-3 animate-in slide-in-from-top-2">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-green-800 font-medium">{success}</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Scholarship Types</h3>
          <p className="text-sm text-gray-600 mt-1">
            Manage scholarship types available for admission applicants
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true)
            setEditingScholarship(null)
            setFormDataScholarship({
              name: '',
              description: '',
              minimumAmount: undefined,
              maximumAmount: undefined,
              amountRange: '',
              criteria: '',
              minimumMarksRequired: undefined,
              requiredDocuments: '',
              requiresVerification: false,
              displayOrder: scholarships.length,
            })
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all shadow-sm hover:shadow-md"
        >
          <Award className="w-4 h-4" />
          <span>Add Scholarship Type</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg p-6 border-2 border-primary-200 shadow-sm">
          <div className="flex items-center space-x-2 mb-6">
            <Award className="w-5 h-5 text-primary-600" />
            <h4 className="text-lg font-semibold text-gray-900">
              {editingScholarship ? 'Edit' : 'Add'} Scholarship Type
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Name" required>
            <input
              type="text"
              value={formDataScholarship.name || ''}
              onChange={(e) => handleScholarshipInputChange('name', e.target.value)}
                placeholder="e.g., Merit Scholarship"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Display Order">
            <input
              type="number"
              value={formDataScholarship.displayOrder || 0}
              onChange={(e) => handleScholarshipInputChange('displayOrder', parseInt(e.target.value) || 0)}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Description" className="md:col-span-2">
            <textarea
              value={formDataScholarship.description || ''}
              onChange={(e) => handleScholarshipInputChange('description', e.target.value)}
                placeholder="Enter scholarship description..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Minimum Amount (PKR)">
              <input
                type="number"
                value={formDataScholarship.minimumAmount || ''}
                onChange={(e) => handleScholarshipInputChange('minimumAmount', e.target.value ? parseFloat(e.target.value) : undefined)}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Maximum Amount (PKR)">
              <input
                type="number"
                value={formDataScholarship.maximumAmount || ''}
                onChange={(e) => handleScholarshipInputChange('maximumAmount', e.target.value ? parseFloat(e.target.value) : undefined)}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Amount Range (Text)">
              <input
                type="text"
                value={formDataScholarship.amountRange || ''}
                onChange={(e) => handleScholarshipInputChange('amountRange', e.target.value)}
                placeholder="e.g., 25% - 50% of tuition fee"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Minimum Marks Required">
            <input
              type="number"
              value={formDataScholarship.minimumMarksRequired || ''}
              onChange={(e) => handleScholarshipInputChange('minimumMarksRequired', e.target.value ? parseInt(e.target.value) : undefined)}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Criteria" className="md:col-span-2">
              <textarea
                value={formDataScholarship.criteria || ''}
                onChange={(e) => handleScholarshipInputChange('criteria', e.target.value)}
                placeholder="Enter scholarship criteria..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>

            <FormField label="Required Documents" className="md:col-span-2">
              <textarea
                value={formDataScholarship.requiredDocuments || ''}
                onChange={(e) => handleScholarshipInputChange('requiredDocuments', e.target.value)}
                placeholder="List required documents (comma-separated or multiline)"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </FormField>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formDataScholarship.requiresVerification || false}
                  onChange={(e) => handleScholarshipInputChange('requiresVerification', e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">Requires Verification</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 mt-6">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
            >
              {saving ? 'Saving...' : editingScholarship ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      )}

      {scholarships.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">No scholarship types configured yet.</p>
          <p className="text-sm text-gray-500 mt-2">Click &quot;Add Scholarship Type&quot; to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount Range</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Min Marks</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scholarships.map((scholarship) => (
                <tr key={scholarship.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {scholarship.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {scholarship.description || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {scholarship.amountRange || 
                      (scholarship.minimumAmount && scholarship.maximumAmount 
                        ? `PKR ${scholarship.minimumAmount} - ${scholarship.maximumAmount}`
                        : scholarship.minimumAmount 
                          ? `PKR ${scholarship.minimumAmount}+`
                          : '—')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {scholarship.minimumMarksRequired || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleActive(scholarship.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        scholarship.isActive
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {scholarship.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(scholarship)}
                        className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-all"
                        title="Edit"
                        aria-label="Edit scholarship"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(scholarship.id)}
                        className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all"
                        title="Delete"
                        aria-label="Delete scholarship"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {confirmDialog && (
        <ConfirmationDialog
          isOpen={confirmDialog.isOpen}
          type={confirmDialog.type}
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmText={confirmDialog.confirmText}
          onConfirm={confirmDialog.onConfirm}
          onClose={() => setConfirmDialog(null)}
        />
      )}
    </div>
  )
}

// Payment Tab
function PaymentTab({
  formData,
  onChange,
}: {
  formData: Partial<AdmissionSetting>
  onChange: AdmissionSettingChangeHandler
}) {
  return (
    <div className="space-y-8">
      {/* EasyPaisa Account Section */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-2 mb-6">
          <CreditCard className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">EasyPaisa Account</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Account Number">
            <input
              type="text"
              value={formData.easyPaisaAccountNumber || ''}
              onChange={(e) => onChange('easyPaisaAccountNumber', e.target.value)}
              placeholder="03XX-XXXXXXX"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </FormField>

          <FormField label="Account Name">
            <input
              type="text"
              value={formData.easyPaisaAccountName || ''}
              onChange={(e) => onChange('easyPaisaAccountName', e.target.value)}
              placeholder="School Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </FormField>
        </div>
      </div>

      {/* Bank Account Section */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-2 mb-6">
          <CreditCard className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Bank Account</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Account Number">
            <input
              type="text"
              value={formData.bankAccountNumber || ''}
              onChange={(e) => onChange('bankAccountNumber', e.target.value)}
              placeholder="Account Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </FormField>

          <FormField label="Account Title">
            <input
              type="text"
              value={formData.bankAccountTitle || ''}
              onChange={(e) => onChange('bankAccountTitle', e.target.value)}
              placeholder="Account Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </FormField>

          <FormField label="Bank Name">
            <input
              type="text"
              value={formData.bankName || ''}
              onChange={(e) => onChange('bankName', e.target.value)}
              placeholder="Bank Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </FormField>

          <FormField label="IBAN">
            <input
              type="text"
              value={formData.bankIBAN || ''}
              onChange={(e) => onChange('bankIBAN', e.target.value)}
              placeholder="PK00XXXX0000000000000000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </FormField>

          <FormField label="Branch">
            <input
              type="text"
              value={formData.bankBranch || ''}
              onChange={(e) => onChange('bankBranch', e.target.value)}
              placeholder="Branch Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </FormField>
        </div>
      </div>
    </div>
  )
}

// Instructions Tab
function InstructionsTab({
  formData,
  onChange,
}: {
  formData: Partial<AdmissionSetting>
  onChange: AdmissionSettingChangeHandler
}) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-2 mb-6">
          <FileText className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Admission Instructions</h3>
        </div>
        <FormField label="Instructions for Applicants" hint="These instructions will be displayed to applicants during the registration process">
          <textarea
            value={formData.admissionInstructions || ''}
            onChange={(e) => onChange('admissionInstructions', e.target.value)}
            placeholder="Enter admission instructions that will be displayed to applicants..."
            rows={10}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y"
          />
        </FormField>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-2 mb-6">
          <FileText className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Test Instructions</h3>
        </div>
        <FormField label="Instructions for Test Day" hint="These instructions will be displayed to applicants before and during the test">
          <textarea
            value={formData.testInstructions || ''}
            onChange={(e) => onChange('testInstructions', e.target.value)}
            placeholder="Enter test instructions that will be displayed to applicants..."
            rows={10}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y"
          />
        </FormField>
      </div>
    </div>
  )
}

