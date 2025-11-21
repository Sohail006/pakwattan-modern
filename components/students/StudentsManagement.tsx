'use client'

import { useState, useEffect } from 'react'
import { Plus, Users, CheckCircle } from 'lucide-react'
import { Student } from '@/lib/api/students'
import StudentsTable from './StudentsTable'
import StudentForm from './StudentForm'

export default function StudentsManagement() {
  const [success, setSuccess] = useState<string | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [refreshKey, setRefreshKey] = useState(0)
  const [pendingSuccessMessage, setPendingSuccessMessage] = useState<string | null>(null)

  const handleEdit = (student: Student) => {
    setSelectedStudent(student)
    setFormMode('edit')
    setIsFormOpen(true)
  }

  const handleCreate = () => {
    setSelectedStudent(null)
    setFormMode('create')
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setSelectedStudent(null)
    setRefreshKey(prev => prev + 1) // Trigger table refresh
  }

  // Handle pending success message
  useEffect(() => {
    if (pendingSuccessMessage && !isFormOpen) {
      // Form is closed, now set the success message
      setSuccess(pendingSuccessMessage)
      setPendingSuccessMessage(null)
      // Clear message after 5 seconds
      setTimeout(() => setSuccess(null), 5000)
      // Trigger table refresh
      setTimeout(() => {
        setRefreshKey(prev => prev + 1)
      }, 100)
    }
  }, [pendingSuccessMessage, isFormOpen])

  const handleFormSuccess = (message?: string) => {
    if (message) {
      // Store message to be set after form closes
      setPendingSuccessMessage(message)
    }
    
    // Close form and clear selection first
    setIsFormOpen(false)
    setSelectedStudent(null)
  }

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-3 rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
            aria-label="Add new student"
          >
            <Plus className="w-5 h-5" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          <p className="text-green-700 text-sm">{success}</p>
        </div>
      )}

      {/* Students Table */}
      <StudentsTable 
        key={refreshKey}
        onEdit={handleEdit} 
        onRefresh={handleRefresh}
      />

      {/* Student Form Modal */}
      {isFormOpen && (
        <StudentForm
          student={selectedStudent}
          mode={formMode}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  )
}

