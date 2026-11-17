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
import { pickDashboardPath, userHasAnyNormalizedRole } from '@/lib/roles'
import { useAttendanceEnrollment } from '@/lib/hooks/useAttendanceEnrollment'

interface DashboardHeaderProps {
  user: Record<string, unknown> | null
  onMenuClick: () => void
  mobileNavOpen?: boolean
}

export default function DashboardHeader({
  user,
  onMenuClick,
  mobileNavOpen = false,
}: DashboardHeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { loading: enrollmentLoading, enrolled } = useAttendanceEnrollment()

  // Get user details
  const firstName = (user?.firstName as string) || 'User'
  const lastName = (user?.lastName as string) || ''
  const email = (user?.email as string) || ''
  const roles = (user?.roles as string[]) || []
  const profileImageUrl = user?.profileImageUrl as string | undefined
  const fullName = `${firstName} ${lastName}`.trim()
  const userInitials = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase()
  const homePath = pickDashboardPath(roles)

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

  const primaryRole = userHasAnyNormalizedRole(roles, 'admin')
    ? 'Admin'
    : userHasAnyNormalizedRole(roles, 'staff', 'managerialstaff')
      ? userHasAnyNormalizedRole(roles, 'managerialstaff') && !userHasAnyNormalizedRole(roles, 'staff')
        ? 'Managerial Staff'
        : 'Staff'
      : userHasAnyNormalizedRole(roles, 'teacher')
        ? 'Teacher'
        : userHasAnyNormalizedRole(roles, 'student')
          ? 'Student'
          : userHasAnyNormalizedRole(roles, 'parent')
            ? 'Parent'
            : roles[0] || 'User'
  const roleColors: Record<string, string> = {
    Admin: 'bg-primary-100 text-primary-800',
    Staff: 'bg-amber-100 text-amber-900',
    'Managerial Staff': 'bg-amber-100 text-amber-900',
    Teacher: 'bg-sky-100 text-sky-900',
    Student: 'bg-emerald-100 text-emerald-800',
    Parent: 'bg-slate-100 text-slate-800',
  }
  const roleColor = roleColors[primaryRole] || 'bg-gray-100 text-gray-700'

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-300 shadow-sm">
      <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 lg:px-6">
        {/* Left Side - Menu & Title */}
        <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
          <button
            type="button"
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 lg:hidden touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileNavOpen}
            aria-controls="dashboard-mobile-nav"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>

          <div className="hidden sm:block min-w-0">
            <Link
              href={homePath}
              className="font-josefin text-base font-semibold text-gray-900 truncate hover:text-primary-700 sm:text-lg"
            >
              Pak Wattan workspace
            </Link>
          </div>
        </div>

        {/* Right Side - Notifications, User Menu */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link
            href="/dashboard/notifications"
            className="relative flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 transition-all hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4 text-gray-700 sm:h-5 sm:w-5" />
          </Link>

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

                <div className="py-2">
                  {!enrollmentLoading && enrolled && (
                    <Link
                      href="/dashboard/attendance?tab=me"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex min-h-[44px] items-center space-x-2 px-3 py-2 text-xs text-gray-700 transition-colors hover:bg-gray-50 sm:space-x-3 sm:px-4 sm:text-sm"
                    >
                      <User className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">My Attendance</span>
                    </Link>
                  )}
                  <Link
                    href="/dashboard/notifications"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex min-h-[44px] items-center space-x-2 px-3 py-2 text-xs text-gray-700 transition-colors hover:bg-gray-50 sm:space-x-3 sm:px-4 sm:text-sm"
                  >
                    <Settings className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">Notifications</span>
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

