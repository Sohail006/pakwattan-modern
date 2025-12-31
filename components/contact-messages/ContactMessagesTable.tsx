'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { 
  Mail, 
  Phone, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Eye, 
  EyeOff,
  Search,
  Filter,
  RefreshCw,
  Loader2,
  Calendar,
  User,
  Send,
  AlertCircle
} from 'lucide-react'
import { 
  getContacts, 
  markContactAsRead, 
  addContactResponse, 
  deleteContact,
  Contact 
} from '@/lib/api/contact'
import { formatDate } from '@/lib/utils'
import { toastService } from '@/lib/utils/toast'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'

type FilterStatus = 'all' | 'read' | 'unread' | 'responded'

export default function ContactMessagesTable() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all')
  
  // Action states
  const [processingId, setProcessingId] = useState<number | null>(null)
  const [viewingMessage, setViewingMessage] = useState<Contact | null>(null)
  const [respondingTo, setRespondingTo] = useState<Contact | null>(null)
  const [responseText, setResponseText] = useState('')
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    type: 'danger' | 'warning' | 'info'
    title: string
    message: string
    confirmText: string
    onConfirm: () => void
  } | null>(null)

  // Load contacts
  const loadContacts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getContacts()
      // Sort by newest first
      const sorted = data.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      setContacts(sorted)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to load contact messages.'
      setError(message)
      toastService.error(message)
      if (process.env.NODE_ENV === 'development') {
        console.error('[ContactMessagesTable] Error loading contacts:', err)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadContacts()
  }, [loadContacts])

  // Filter contacts
  useEffect(() => {
    let filtered = [...contacts]

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(term) ||
        contact.email.toLowerCase().includes(term) ||
        contact.phone?.toLowerCase().includes(term) ||
        contact.subject.toLowerCase().includes(term) ||
        contact.message.toLowerCase().includes(term)
      )
    }

    // Apply status filter
    if (statusFilter === 'read') {
      filtered = filtered.filter(contact => contact.isRead)
    } else if (statusFilter === 'unread') {
      filtered = filtered.filter(contact => !contact.isRead)
    } else if (statusFilter === 'responded') {
      filtered = filtered.filter(contact => contact.response && contact.response.trim() !== '')
    }

    setFilteredContacts(filtered)
  }, [contacts, searchTerm, statusFilter])

  // Handle mark as read/unread
  const handleToggleRead = async (contact: Contact) => {
    if (processingId === contact.id) return

    try {
      setProcessingId(contact.id)
      await markContactAsRead(contact.id)
      toastService.success(`Message marked as ${contact.isRead ? 'unread' : 'read'}`)
      await loadContacts()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to update message status.'
      toastService.error(message)
    } finally {
      setProcessingId(null)
    }
  }

  // Handle add response
  const handleAddResponse = async () => {
    if (!respondingTo || !responseText.trim()) {
      toastService.error('Please enter a response message.')
      return
    }

    try {
      setProcessingId(respondingTo.id)
      await addContactResponse(respondingTo.id, responseText.trim())
      toastService.success('Response added successfully')
      setRespondingTo(null)
      setResponseText('')
      await loadContacts()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to add response.'
      toastService.error(message)
    } finally {
      setProcessingId(null)
    }
  }

  // Handle delete
  const handleDelete = (contact: Contact) => {
    setConfirmDialog({
      isOpen: true,
      type: 'danger',
      title: 'Delete Contact Message',
      message: `Are you sure you want to delete the message from ${contact.name}? This action cannot be undone.`,
      confirmText: 'Delete',
      onConfirm: async () => {
        try {
          setProcessingId(contact.id)
          await deleteContact(contact.id)
          toastService.success('Message deleted successfully')
          setConfirmDialog(null)
          await loadContacts()
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Unable to delete message.'
          toastService.error(message)
        } finally {
          setProcessingId(null)
        }
      }
    })
  }

  // Stats
  const stats = useMemo(() => {
    const total = contacts.length
    const unread = contacts.filter(c => !c.isRead).length
    const read = contacts.filter(c => c.isRead).length
    const responded = contacts.filter(c => c.response && c.response.trim() !== '').length
    return { total, unread, read, responded }
  }, [contacts])

  if (loading && contacts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading contact messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 border-b border-gray-200">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Messages</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">{stats.total}</p>
            </div>
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-600">Unread</p>
              <p className="text-2xl font-bold text-amber-900 mt-1">{stats.unread}</p>
            </div>
            <EyeOff className="w-8 h-8 text-amber-600" />
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Read</p>
              <p className="text-2xl font-bold text-green-900 mt-1">{stats.read}</p>
            </div>
            <Eye className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Responded</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">{stats.responded}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, subject, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="responded">Responded</option>
            </select>
          </div>

          {/* Refresh Button */}
          <button
            onClick={loadContacts}
            disabled={loading}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-6 border-b border-gray-200 bg-red-50">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">{error}</p>
              <button
                onClick={loadContacts}
                className="text-sm text-red-600 hover:text-red-800 underline mt-1"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages Table */}
      <div className="overflow-x-auto">
        {filteredContacts.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-medium">No contact messages found</p>
            <p className="text-gray-500 text-sm mt-2">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Contact messages from visitors will appear here.'}
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  From
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    !contact.isRead ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                          <Mail className="w-3 h-3" />
                          {contact.email}
                        </div>
                        {contact.phone && (
                          <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                            <Phone className="w-3 h-3" />
                            {contact.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{contact.subject}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-md">
                      <p className="line-clamp-2">{contact.message}</p>
                      {contact.message.length > 100 && (
                        <button
                          onClick={() => setViewingMessage(contact)}
                          className="text-primary-600 hover:text-primary-700 text-xs mt-1"
                        >
                          Read more
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(contact.createdAt)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      {contact.isRead ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Eye className="w-3 h-3 mr-1" />
                          Read
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          <EyeOff className="w-3 h-3 mr-1" />
                          Unread
                        </span>
                      )}
                      {contact.response && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Responded
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleRead(contact)}
                        disabled={processingId === contact.id}
                        className="text-blue-600 hover:text-blue-900 p-2 rounded hover:bg-blue-50 disabled:opacity-50 transition-colors"
                        title={contact.isRead ? 'Mark as unread' : 'Mark as read'}
                      >
                        {processingId === contact.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : contact.isRead ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => setRespondingTo(contact)}
                        className="text-green-600 hover:text-green-900 p-2 rounded hover:bg-green-50 transition-colors"
                        title="Add response"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(contact)}
                        disabled={processingId === contact.id}
                        className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50 disabled:opacity-50 transition-colors"
                        title="Delete message"
                      >
                        {processingId === contact.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* View Message Modal */}
      {viewingMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Message Details</h2>
                <button
                  onClick={() => setViewingMessage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{viewingMessage.name}</p>
                    <p className="text-sm text-gray-500">{viewingMessage.email}</p>
                    {viewingMessage.phone && (
                      <p className="text-sm text-gray-500">{viewingMessage.phone}</p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Subject</p>
                <p className="text-gray-900">{viewingMessage.subject}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Message</p>
                <p className="text-gray-900 whitespace-pre-wrap">{viewingMessage.message}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Date</p>
                <p className="text-gray-900">{formatDate(viewingMessage.createdAt)}</p>
              </div>
              {viewingMessage.response && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Response</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-gray-900 whitespace-pre-wrap">{viewingMessage.response}</p>
                    {viewingMessage.respondedAt && (
                      <p className="text-xs text-gray-500 mt-2">
                        Responded on {formatDate(viewingMessage.respondedAt)}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setViewingMessage(null)
                  setRespondingTo(viewingMessage)
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {viewingMessage.response ? 'Update Response' : 'Add Response'}
              </button>
              <button
                onClick={() => setViewingMessage(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Response Modal */}
      {respondingTo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {respondingTo.response ? 'Update Response' : 'Add Response'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Responding to: {respondingTo.name} ({respondingTo.email})
              </p>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Response Message
                </label>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Enter your response to this message..."
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              {respondingTo.response && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Current Response</p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-900 whitespace-pre-wrap">{respondingTo.response}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setRespondingTo(null)
                  setResponseText('')
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddResponse}
                disabled={!responseText.trim() || processingId === respondingTo.id}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {processingId === respondingTo.id ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Response
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
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

