'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Menu,
  Bell,
  Settings,
  User,
  LogOut,
  ChevronDown,
  Mail,
  Shield,
} from 'lucide-react'
import { logout } from '@/lib/api/auth'

interface DashboardHeaderProps {
  user: Record<string, unknown> | null
  onMenuClick: () => void
}

export default function DashboardHeader({
  user,
  onMenuClick,
}: DashboardHeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [notifications] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)

  // Get user details
  const firstName = (user?.firstName as string) || 'User'
  const lastName = (user?.lastName as string) || ''
  const email = (user?.email as string) || ''
  const roles = (user?.roles as string[]) || []
  const profileImageUrl = user?.profileImageUrl as string | undefined
  const fullName = `${firstName} ${lastName}`.trim()
  const userInitials = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase()

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserMenuOpen])

  const handleLogout = () => {
    logout()
  }

  const primaryRole = roles[0] || 'User'
  const roleColors: Record<string, string> = {
    Admin: 'bg-red-100 text-red-700',
    Staff: 'bg-orange-100 text-orange-700',
    Teacher: 'bg-blue-100 text-blue-700',
    Student: 'bg-green-100 text-green-700',
    Parent: 'bg-purple-100 text-purple-700',
  }
  const roleColor = roleColors[primaryRole] || 'bg-gray-100 text-gray-700'

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-300 shadow-sm">
      <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 lg:px-6">
        {/* Left Side - Menu & Title */}
        <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 lg:hidden touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>

          <div className="hidden sm:block min-w-0">
            <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">Dashboard</h1>
          </div>
        </div>

        {/* Right Side - Search, Notifications, User Menu */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Search (Optional - can be added later) */}
          {/* <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm w-32 focus:w-48 transition-all"
            />
          </div> */}

          {/* Notifications */}
          <button
            className="relative p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            {notifications > 0 && (
              <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                {notifications > 9 ? '9+' : notifications}
              </span>
            )}
          </button>

          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 touch-target min-h-[44px]"
              aria-label="User menu"
              aria-expanded={isUserMenuOpen}
              aria-haspopup="true"
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                {profileImageUrl ? (
                  <Image
                    src={profileImageUrl}
                    alt={fullName}
                    width={32}
                    height={32}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                    {userInitials || <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  </div>
                )}
              </div>

              {/* User Info (Desktop) */}
              <div className="hidden md:flex flex-col items-start min-w-0">
                <span className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                  {fullName || 'User'}
                </span>
                <span className="text-xs text-gray-500 flex items-center space-x-1 truncate">
                  <Shield className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{primaryRole}</span>
                </span>
              </div>

              <ChevronDown
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 hidden md:block transition-transform flex-shrink-0 ${
                  isUserMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-xl shadow-lg border border-gray-300 py-2 z-50">
                {/* User Info Section */}
                <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    {profileImageUrl ? (
                      <Image
                        src={profileImageUrl}
                        alt={fullName}
                        width={40}
                        height={40}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {userInitials || <User className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                        {fullName || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate flex items-center space-x-1">
                        <Mail className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{email || 'No email'}</span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${roleColor}`}>
                      <Shield className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{primaryRole}</span>
                    </span>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors touch-target min-h-[44px]"
                  >
                    <User className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">Profile Settings</span>
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors touch-target min-h-[44px]"
                  >
                    <Settings className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">Account Settings</span>
                  </Link>
                </div>

                {/* Logout */}
                <div className="border-t border-gray-100 pt-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 active:bg-red-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg w-full text-left touch-target min-h-[44px]"
                    aria-label="Logout"
                  >
                    <LogOut className="w-4 h-4 flex-shrink-0" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

