'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  AlertCircle,
  ClipboardCheck,
  Loader2,
  Shield,
  Sliders,
} from 'lucide-react'
import { isAuthenticated, getUserRoles, canPerform } from '@/lib/api/auth'
import { PERMISSIONS } from '@/lib/types/permissions'
import { userHasAnyNormalizedRole } from '@/lib/roles'
import DashboardHero from '@/components/dashboard/DashboardHero'

export default function SettingsPage() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [denied, setDenied] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')
      return
    }
    const roles = getUserRoles()
    const ok =
      userHasAnyNormalizedRole(roles, 'admin', 'staff', 'managerialstaff') ||
      canPerform(PERMISSIONS.SETTINGS_VIEW, ['Admin'])
    if (!ok) {
      setDenied(true)
      setChecking(false)
      return
    }
    setChecking(false)
  }, [router])

  if (checking) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (denied) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-4">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm">
          <AlertCircle className="mx-auto mb-3 h-10 w-10 text-red-500" />
          <p className="text-gray-700">You do not have access to settings.</p>
        </div>
      </div>
    )
  }

  const links = [
    {
      href: '/dashboard/attendance?tab=settings',
      title: 'Attendance settings',
      description: 'Campuses, GPS radius, staff groups, roster, and academic calendar.',
      icon: <ClipboardCheck className="h-5 w-5" />,
    },
    {
      href: '/dashboard/admission-settings',
      title: 'Admission settings',
      description: 'Control admission windows and related school admission options.',
      icon: <Sliders className="h-5 w-5" />,
    },
    {
      href: '/dashboard/admin/permissions',
      title: 'Permissions',
      description: 'Assign module access for roles and individual users.',
      icon: <Shield className="h-5 w-5" />,
      adminOnly: true,
    },
  ]

  const roles = getUserRoles()
  const isAdmin = userHasAnyNormalizedRole(roles, 'admin')

  return (
    <div className="space-y-6">
      <DashboardHero
        title="Settings"
        subtitle="Jump straight into the settings you already use — no empty “coming soon” page."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links
          .filter((l) => !l.adminOnly || isAdmin)
          .map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-primary-300 hover:shadow-md"
            >
              <div className="mb-3 inline-flex rounded-xl bg-primary-50 p-2.5 text-primary-700">
                {link.icon}
              </div>
              <h2 className="font-josefin text-lg font-bold text-gray-900">{link.title}</h2>
              <p className="mt-1 text-sm text-gray-600">{link.description}</p>
            </Link>
          ))}
      </div>
    </div>
  )
}
