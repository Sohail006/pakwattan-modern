'use client'

import { useEffect } from 'react'
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
  Newspaper,
  Calendar,
  Briefcase,
  Shield,
  Video,
  X,
} from 'lucide-react'
import { SCHOOL_INFO } from '@/lib/constants'
import { TALENT_HUNT_SEASON3_TITLE } from '@/lib/talent-hunt-season3-data'
import { logout } from '@/lib/api/auth'
import { userHasMenuRole, pickDashboardPath } from '@/lib/roles'

interface SidebarProps {
  /** Desktop collapse/expand state */
  isOpen: boolean
  onToggle: () => void
  /** Mobile drawer open state */
  mobileOpen: boolean
  onMobileClose: () => void
  /** All roles from the token / user_info — not only the first (order varies on server). */
  userRoles: string[]
  currentPath: string
}

interface MenuItem {
  name: string
  href: string
  icon: React.ReactNode
  roles: string[]
  badge?: number
}

export default function Sidebar({
  isOpen,
  onToggle,
  mobileOpen,
  onMobileClose,
  userRoles,
  currentPath,
}: SidebarProps) {
  const dashboardHref = pickDashboardPath(userRoles)

  const menuItems: MenuItem[] = [
    {
      name: 'Dashboard',
      href: dashboardHref,
      icon: <LayoutDashboard className="w-5 h-5" />,
      roles: ['Admin', 'Staff', 'Teacher', 'Student', 'Parent', 'ManagerialStaff'],
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
      name: 'New Registrations',
      href: '/dashboard/registrations',
      icon: <ClipboardList className="w-5 h-5" />,
      roles: ['Admin', 'Staff'],
    },
    {
      name: TALENT_HUNT_SEASON3_TITLE,
      href: '/dashboard/talent-hunt-season-3',
      icon: <GraduationCap className="w-5 h-5" />,
      roles: ['Admin', 'Staff'],
    },
    {
      name: 'Pakians Faculty',
      href: '/dashboard/pakians-faculty',
      icon: <Users className="w-5 h-5" />,
      roles: ['Admin', 'Staff'],
    },
    {
      name: 'Admissions',
      href: '/dashboard/admissions',
      icon: <FileText className="w-5 h-5" />,
      roles: ['Admin', 'Staff'],
    },
    {
      name: 'Job Applications',
      href: '/dashboard/jobs',
      icon: <Briefcase className="w-5 h-5" />,
      roles: ['Admin', 'Staff'],
    },
    {
      name: 'Admission Settings',
      href: '/dashboard/admission-settings',
      icon: <Sliders className="w-5 h-5" />,
      roles: ['Admin', 'ManagerialStaff'],
    },
    {
      name: 'Model Papers',
      href: '/dashboard/test-syllabus',
      icon: <FileText className="w-5 h-5" />,
      roles: ['Admin', 'Staff', 'ManagerialStaff'],
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
      name: 'News',
      href: '/dashboard/news',
      icon: <Newspaper className="w-5 h-5" />,
      roles: ['Admin', 'Staff', 'ManagerialStaff'],
    },
    {
      name: 'Video Gallery',
      href: '/dashboard/video-gallery',
      icon: <Video className="w-5 h-5" />,
      roles: ['Admin', 'Staff', 'ManagerialStaff'],
    },
    {
      name: 'Events',
      href: '/dashboard/events',
      icon: <Calendar className="w-5 h-5" />,
      roles: ['Admin', 'Staff', 'ManagerialStaff'],
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
    {
      name: 'Permissions',
      href: '/dashboard/admin/permissions',
      icon: <Shield className="w-5 h-5" />,
      roles: ['Admin'],
    },
  ]

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.some((menuRole) => userHasMenuRole(userRoles, menuRole))
  )

  const handleLogout = () => {
    logout()
  }

  // Close drawer on Escape + lock body scroll while open
  useEffect(() => {
    if (!mobileOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onMobileClose()
    }

    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [mobileOpen, onMobileClose])

  // Close mobile drawer when route changes
  useEffect(() => {
    onMobileClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only react to path changes
  }, [currentPath])

  function renderSidebarContent(mode: 'desktop' | 'mobile') {
    const showLabels = mode === 'mobile' || isOpen

    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
          <Link
            href={dashboardHref}
            onClick={mode === 'mobile' ? onMobileClose : undefined}
            className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1"
          >
            <div className="relative flex-shrink-0">
              <Image
                src={SCHOOL_INFO.logo}
                alt={SCHOOL_INFO.name}
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg"
                priority
              />
            </div>
            {showLabels && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-sm font-bold text-gray-900 font-josefin truncate">
                  {SCHOOL_INFO.name}
                </span>
                <span className="text-xs text-gray-500 truncate">Dashboard</span>
              </div>
            )}
          </Link>
          {mode === 'mobile' && (
            <button
              type="button"
              onClick={onMobileClose}
              className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3 sm:py-4" aria-label="Dashboard navigation">
          <ul className="space-y-1">
            {filteredMenuItems.map((item) => {
              const isActive =
                currentPath === item.href || currentPath.startsWith(item.href + '/')
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={mode === 'mobile' ? onMobileClose : undefined}
                    title={!showLabels ? item.name : undefined}
                    className={`
                      flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg
                      transition-all duration-200 group touch-target min-h-[44px]
                      ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 font-semibold active:bg-primary-100'
                          : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200 hover:text-primary-600'
                      }
                    `}
                    aria-label={item.name}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span
                      className={`flex-shrink-0 ${
                        isActive ? 'text-primary-600' : 'text-gray-500 group-hover:text-primary-600'
                      }`}
                    >
                      {item.icon}
                    </span>
                    {showLabels && (
                      <span className="flex-1 text-sm sm:text-base truncate min-w-0">{item.name}</span>
                    )}
                    {item.badge && item.badge > 0 && showLabels && (
                      <span className="bg-primary-600 text-white text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full flex-shrink-0">
                        {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-gray-200 p-3 sm:p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-red-600 hover:bg-red-50 active:bg-red-100 transition-all duration-200 group touch-target min-h-[44px]"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            {showLabels && <span className="font-medium text-sm sm:text-base">Logout</span>}
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
        {renderSidebarContent('desktop')}

        <button
          type="button"
          onClick={onToggle}
          className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1.5 sm:p-2 shadow-md hover:bg-gray-50 active:bg-gray-100 transition-colors touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isOpen ? (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </aside>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={onMobileClose}
          aria-label="Close menu backdrop"
        />
        <aside
          id="dashboard-mobile-nav"
          className={`absolute inset-y-0 left-0 w-[min(20rem,85vw)] max-w-full bg-white shadow-xl transition-transform duration-300 ease-in-out ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {renderSidebarContent('mobile')}
        </aside>
      </div>
    </>
  )
}
