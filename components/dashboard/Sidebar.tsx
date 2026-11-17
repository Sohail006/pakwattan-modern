'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  LayoutDashboard,
  Users,
  UserCircle,
  FileText,
  ClipboardList,
  Mail,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  GraduationCap,
  BarChart3,
  Sliders,
  Settings,
  Newspaper,
  Calendar,
  Briefcase,
  Shield,
  Video,
  X,
  ClipboardCheck,
  Inbox,
} from 'lucide-react'
import { SCHOOL_INFO } from '@/lib/constants'
import { TALENT_HUNT_SEASON3_TITLE } from '@/lib/talent-hunt-season3-data'
import { logout, canPerform } from '@/lib/api/auth'
import { userHasMenuRole, pickDashboardPath, userHasAnyNormalizedRole } from '@/lib/roles'
import { PERMISSIONS } from '@/lib/types/permissions'
import { useAttendanceEnrollment } from '@/lib/hooks/useAttendanceEnrollment'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  mobileOpen: boolean
  onMobileClose: () => void
  userRoles: string[]
  currentPath: string
}

interface MenuItem {
  name: string
  href: string
  icon: React.ReactNode
  roles: string[]
  matchPrefix?: string
}

interface MenuGroup {
  id: string
  label: string
  items: MenuItem[]
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
  const { loading: enrollmentLoading, enrolled } = useAttendanceEnrollment()
  const canManageAttendance =
    canPerform(PERMISSIONS.ATTENDANCE_MANAGE, ['Admin', 'Staff', 'ManagerialStaff']) ||
    canPerform(PERMISSIONS.ATTENDANCE_VERIFY, ['Admin', 'Staff', 'ManagerialStaff']) ||
    userHasAnyNormalizedRole(userRoles, 'admin', 'staff', 'managerialstaff')
  /** Personal check-in nav: only enrolled users. Managers always see the hub. */
  const showAttendanceNav = canManageAttendance || (!enrollmentLoading && enrolled)

  const groups: MenuGroup[] = useMemo(
    () => [
      {
        id: 'overview',
        label: 'Overview',
        items: [
          {
            name: 'Dashboard',
            href: dashboardHref,
            icon: <LayoutDashboard className="w-5 h-5" />,
            roles: ['Admin', 'Staff', 'Teacher', 'Student', 'Parent', 'ManagerialStaff'],
          },
        ],
      },
      {
        id: 'people',
        label: 'People',
        items: [
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
            name: 'Guardians',
            href: '/dashboard/guardians',
            icon: <UserCircle className="w-5 h-5" />,
            roles: ['Admin', 'Staff'],
          },
          {
            name: 'Users',
            href: '/dashboard/users',
            icon: <Users className="w-5 h-5" />,
            roles: ['Admin', 'Staff'],
          },
        ],
      },
      {
        id: 'admissions',
        label: 'Admissions & HR',
        items: [
          {
            name: 'New Registrations',
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
            name: 'Job Applications',
            href: '/dashboard/jobs',
            icon: <Briefcase className="w-5 h-5" />,
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
        ],
      },
      ...(showAttendanceNav
        ? [
            {
              id: 'attendance',
              label: 'Attendance',
              items: [
                {
                  name: canManageAttendance ? 'Attendance hub' : 'My Attendance',
                  href: canManageAttendance
                    ? '/dashboard/attendance'
                    : '/dashboard/attendance?tab=me',
                  icon: <ClipboardCheck className="w-5 h-5" />,
                  roles: ['Admin', 'Staff', 'ManagerialStaff', 'Teacher'],
                  matchPrefix: '/dashboard/attendance',
                },
              ],
            } satisfies MenuGroup,
          ]
        : []),
      {
        id: 'ops',
        label: 'School ops',
        items: [
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
            name: 'Contact Messages',
            href: '/dashboard/contact-messages',
            icon: <Inbox className="w-5 h-5" />,
            roles: ['Admin', 'Staff'],
          },
          {
            name: 'Contacts directory',
            href: '/dashboard/contacts',
            icon: <Mail className="w-5 h-5" />,
            roles: ['Admin', 'Staff'],
          },
        ],
      },
      {
        id: 'content',
        label: 'Content',
        items: [
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
        ],
      },
      {
        id: 'insights',
        label: 'Insights',
        items: [
          {
            name: 'Reports',
            href: '/dashboard/reports',
            icon: <BarChart3 className="w-5 h-5" />,
            roles: ['Admin', 'Staff', 'ManagerialStaff'],
          },
          {
            name: 'Notifications',
            href: '/dashboard/notifications',
            icon: <Bell className="w-5 h-5" />,
            roles: ['Admin', 'Teacher', 'Student', 'Parent'],
          },
        ],
      },
      {
        id: 'admin',
        label: 'Administration',
        items: [
          {
            name: 'Settings',
            href: '/dashboard/settings',
            icon: <Settings className="w-5 h-5" />,
            roles: ['Admin', 'Staff', 'ManagerialStaff'],
          },
          {
            name: 'Permissions',
            href: '/dashboard/admin/permissions',
            icon: <Shield className="w-5 h-5" />,
            roles: ['Admin'],
          },
        ],
      },
    ],
    [dashboardHref, showAttendanceNav, canManageAttendance]
  )

  const visibleGroups = useMemo(
    () =>
      groups
        .map((g) => ({
          ...g,
          items: g.items.filter((item) =>
            item.roles.some((role) => userHasMenuRole(userRoles, role))
          ),
        }))
        .filter((g) => g.items.length > 0),
    [groups, userRoles]
  )

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setOpenGroups((prev) => {
      const next = { ...prev }
      for (const g of visibleGroups) {
        if (next[g.id] === undefined) next[g.id] = true
        const hasActive = g.items.some((item) => {
          const prefix = item.matchPrefix || item.href
          return currentPath === item.href || currentPath.startsWith(prefix + '/')
        })
        if (hasActive) next[g.id] = true
      }
      return next
    })
  }, [visibleGroups, currentPath])

  const handleLogout = () => logout()

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

  useEffect(() => {
    onMobileClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only react to path changes
  }, [currentPath])

  function isItemActive(item: MenuItem) {
    if (item.href === dashboardHref) {
      return currentPath === item.href
    }
    const prefix = item.matchPrefix || item.href
    return currentPath === item.href || currentPath.startsWith(prefix + '/') || currentPath.startsWith(prefix + '?')
  }

  function renderSidebarContent(mode: 'desktop' | 'mobile') {
    const showLabels = mode === 'mobile' || isOpen

    return (
      <div className="flex h-full flex-col bg-gradient-to-b from-white via-white to-primary-50/40">
        <div className="flex items-center justify-between border-b border-gray-200 p-3 sm:p-4">
          <Link
            href={dashboardHref}
            onClick={mode === 'mobile' ? onMobileClose : undefined}
            className="flex min-w-0 flex-1 items-center space-x-2 sm:space-x-3"
          >
            <div className="relative flex-shrink-0">
              <Image
                src={SCHOOL_INFO.logo}
                alt={SCHOOL_INFO.name}
                width={40}
                height={40}
                className="h-8 w-8 rounded-lg sm:h-10 sm:w-10"
                priority
              />
            </div>
            {showLabels && (
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-josefin text-xs font-bold text-gray-900 sm:text-sm">
                  {SCHOOL_INFO.name}
                </span>
                <span className="truncate text-xs text-primary-700/80">Workspace</span>
              </div>
            )}
          </Link>
          {mode === 'mobile' && (
            <button
              type="button"
              onClick={onMobileClose}
              className="touch-target flex min-h-[44px] min-w-[44px] flex-shrink-0 items-center justify-center rounded-lg hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3 sm:py-4" aria-label="Dashboard navigation">
          <div className="space-y-3">
            {visibleGroups.map((group) => {
              const open = openGroups[group.id] !== false
              return (
                <div key={group.id}>
                  {showLabels && (
                    <button
                      type="button"
                      onClick={() =>
                        setOpenGroups((prev) => ({ ...prev, [group.id]: !open }))
                      }
                      className="mb-1 flex w-full items-center justify-between px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500"
                    >
                      <span>{group.label}</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition ${open ? 'rotate-0' : '-rotate-90'}`}
                      />
                    </button>
                  )}
                  {(open || !showLabels) && (
                    <ul className="space-y-1">
                      {group.items.map((item) => {
                        const active = isItemActive(item)
                        return (
                          <li key={`${group.id}-${item.name}`}>
                            <Link
                              href={item.href}
                              onClick={mode === 'mobile' ? onMobileClose : undefined}
                              title={!showLabels ? item.name : undefined}
                              className={`touch-target group flex min-h-[44px] items-center space-x-2 rounded-lg px-2 py-2 transition-all duration-200 sm:space-x-3 sm:px-3 sm:py-2.5 ${
                                active
                                  ? 'bg-primary-50 font-semibold text-primary-700'
                                  : 'text-gray-700 hover:bg-white hover:text-primary-700'
                              }`}
                              aria-label={item.name}
                              aria-current={active ? 'page' : undefined}
                            >
                              <span
                                className={`flex-shrink-0 ${
                                  active
                                    ? 'text-primary-600'
                                    : 'text-gray-500 group-hover:text-primary-600'
                                }`}
                              >
                                {item.icon}
                              </span>
                              {showLabels && (
                                <span className="min-w-0 flex-1 truncate text-sm sm:text-base">
                                  {item.name}
                                </span>
                              )}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>
        </nav>

        <div className="border-t border-gray-200 p-3 sm:p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="touch-target group flex min-h-[44px] w-full items-center space-x-2 rounded-lg px-2 py-2 text-red-600 transition-all hover:bg-red-50 sm:space-x-3 sm:px-3 sm:py-2.5"
            aria-label="Logout"
          >
            <LogOut className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
            {showLabels && <span className="text-sm font-medium sm:text-base">Logout</span>}
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-30 hidden border-r border-gray-200 bg-white shadow-lg transition-all duration-300 ease-in-out lg:flex lg:flex-col ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        {renderSidebarContent('desktop')}
        <button
          type="button"
          onClick={onToggle}
          className="touch-target absolute -right-3 top-20 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-gray-200 bg-white p-1.5 shadow-md hover:bg-gray-50 sm:p-2"
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isOpen ? (
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-600" />
          )}
        </button>
      </aside>

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
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
