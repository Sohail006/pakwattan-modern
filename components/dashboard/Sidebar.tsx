'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  LayoutDashboard,
  Users,
  UserCircle,
  BookOpen,
  FileText,
  ClipboardList,
  Mail,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  CreditCard,
  BarChart3,
  Sliders,
} from 'lucide-react'
import { SCHOOL_INFO } from '@/lib/constants'
import { logout } from '@/lib/api/auth'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  userRole: string
  currentPath: string
}

interface MenuItem {
  name: string
  href: string
  icon: React.ReactNode
  roles: string[]
  badge?: number
}

export default function Sidebar({ isOpen, onToggle, userRole, currentPath }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Get dashboard route based on role
  const getDashboardRoute = (role: string): string => {
    const roleLower = role.toLowerCase()
    if (roleLower === 'admin') return '/dashboard/admin'
    if (roleLower === 'staff') return '/dashboard/admin' // Staff uses admin dashboard
    if (roleLower === 'teacher') return '/dashboard/teacher'
    if (roleLower === 'student') return '/dashboard/student'
    if (roleLower === 'parent') return '/dashboard/parent'
    return '/dashboard/admin' // Default fallback
  }

  // Define menu items based on roles
  const menuItems: MenuItem[] = [
    {
      name: 'Dashboard',
      href: getDashboardRoute(userRole),
      icon: <LayoutDashboard className="w-5 h-5" />,
      roles: ['Admin', 'Staff', 'Teacher', 'Student', 'Parent'],
    },
    {
      name: 'Students',
      href: '/dashboard/students',
      icon: <Users className="w-5 h-5" />,
      roles: ['Admin', 'Teacher', 'Parent'],
    },
    {
      name: 'Teachers',
      href: '/dashboard/teachers',
      icon: <UserCircle className="w-5 h-5" />,
      roles: ['Admin', 'Staff'],
    },
    {
      name: 'Registrations',
      href: '/dashboard/registrations',
      icon: <ClipboardList className="w-5 h-5" />,
      roles: ['Admin', 'Staff'],
    },
    {
      name: 'Admissions',
      href: '/dashboard/admissions',
      icon: <FileText className="w-5 h-5" />,
      roles: ['Admin', 'Staff'],
    },
    {
      name: 'Admission Settings',
      href: '/dashboard/admission-settings',
      icon: <Sliders className="w-5 h-5" />,
      roles: ['Admin', 'ManagerialStaff'],
    },
    {
      name: 'Courses & Grades',
      href: '/dashboard/courses',
      icon: <BookOpen className="w-5 h-5" />,
      roles: ['Admin', 'Teacher'],
    },
    {
      name: 'Sections',
      href: '/dashboard/sections',
      icon: <GraduationCap className="w-5 h-5" />,
      roles: ['Admin', 'Staff'],
    },
    {
      name: 'Fees & Payments',
      href: '/dashboard/payments',
      icon: <CreditCard className="w-5 h-5" />,
      roles: ['Admin', 'Staff'],
    },
    {
      name: 'Contacts',
      href: '/dashboard/contacts',
      icon: <Mail className="w-5 h-5" />,
      roles: ['Admin', 'Staff'],
    },
    {
      name: 'User Management',
      href: '/dashboard/users',
      icon: <Users className="w-5 h-5" />,
      roles: ['Admin', 'Staff'],
    },
    {
      name: 'Guardians',
      href: '/dashboard/guardians',
      icon: <UserCircle className="w-5 h-5" />,
      roles: ['Admin', 'Staff'],
    },
    {
      name: 'Notifications',
      href: '/dashboard/notifications',
      icon: <Bell className="w-5 h-5" />,
      roles: ['Admin', 'Teacher', 'Student', 'Parent'],
    },
    {
      name: 'Reports',
      href: '/dashboard/reports',
      icon: <BarChart3 className="w-5 h-5" />,
      roles: ['Admin', 'Staff'],
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: <Settings className="w-5 h-5" />,
      roles: ['Admin'],
    },
  ]

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item =>
    item.roles.some(role => role.toLowerCase() === userRole.toLowerCase())
  )

  const handleLogout = () => {
    logout()
  }

  // Mobile backdrop
  if (isMobileMenuOpen && !isOpen) {
    return (
      <>
        {/* Mobile Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Mobile Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:hidden">
          {renderSidebarContent(true)}
        </aside>
      </>
    )
  }

  function renderSidebarContent(isMobile: boolean) {
    return (
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link href={getDashboardRoute(userRole)} className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={SCHOOL_INFO.logo}
                alt={SCHOOL_INFO.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-lg"
                priority
              />
            </div>
            {isOpen && (
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 font-josefin">
                  {SCHOOL_INFO.name}
                </span>
                <span className="text-xs text-gray-500">Dashboard</span>
              </div>
            )}
          </Link>
          {isMobile && (
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="space-y-1">
            {filteredMenuItems.map((item) => {
              const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/')
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => isMobile && setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center space-x-3 px-3 py-2.5 rounded-lg
                      transition-all duration-200 group
                      ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                      }
                    `}
                  >
                    <span className={`${isActive ? 'text-primary-600' : 'text-gray-500 group-hover:text-primary-600'}`}>
                      {item.icon}
                    </span>
                    {isOpen && (
                      <span className="flex-1">{item.name}</span>
                    )}
                    {item.badge && item.badge > 0 && (
                      <span className="bg-primary-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                        {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Logout Section */}
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5" />
            {isOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 bg-white shadow-lg border-r border-gray-200
          transition-all duration-300 ease-in-out
          hidden lg:flex lg:flex-col
          ${isOpen ? 'w-64' : 'w-16'}
        `}
      >
        {renderSidebarContent(false)}
        
        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:bg-gray-50 transition-colors"
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isOpen ? (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-40 lg:hidden bg-white border border-gray-200 rounded-lg p-2 shadow-md"
        aria-label="Open menu"
      >
        <LayoutDashboard className="w-5 h-5 text-gray-700" />
      </button>
    </>
  )
}

