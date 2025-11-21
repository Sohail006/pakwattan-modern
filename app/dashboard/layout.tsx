'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { isAuthenticated, getCurrentUser, getUserRoles } from '@/lib/api/auth'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<Record<string, unknown> | null>(null)
  const [roles, setRoles] = useState<string[]>([])
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    
    // Check authentication
    if (!isAuthenticated()) {
      window.location.href = '/login'
      return
    }

    // Get user info
    const currentUser = getCurrentUser()
    const userRoles = getUserRoles()
    
    if (!currentUser || userRoles.length === 0) {
      // User data not available, redirect to login
      window.location.href = '/login'
      return
    }
    
    setUser(currentUser)
    setRoles(userRoles)

    // Role-based route validation
    // Only protect against accessing other role's main dashboard pages
    // Allow access to shared routes like /dashboard/students, /dashboard/courses, etc.
    const primaryRole = userRoles[0]?.toLowerCase() || ''
    const roleDashboardRoutes = ['admin', 'staff', 'teacher', 'student', 'parent']
    
    if (pathname) {
      const pathSegments = pathname.split('/').filter(Boolean)
      
      // Check if accessing a role-specific dashboard page (e.g., /dashboard/teacher)
      if (pathSegments.length >= 2 && pathSegments[0] === 'dashboard') {
        const accessedRole = pathSegments[1]?.toLowerCase()
        
        // If accessing another role's main dashboard, redirect to their own
        // Staff uses admin dashboard, so treat staff as admin for routing
        const normalizedPrimaryRole = primaryRole === 'staff' ? 'admin' : primaryRole
        const normalizedAccessedRole = accessedRole === 'staff' ? 'admin' : accessedRole
        
        if (accessedRole && roleDashboardRoutes.includes(accessedRole) && normalizedAccessedRole !== normalizedPrimaryRole) {
          const roleRoutes: Record<string, string> = {
            admin: '/dashboard/admin',
            staff: '/dashboard/admin', // Staff uses admin dashboard
            teacher: '/dashboard/teacher',
            student: '/dashboard/student',
            parent: '/dashboard/parent',
          }
          const expectedRoute = roleRoutes[primaryRole] || roleRoutes[normalizedPrimaryRole] || '/dashboard/admin'
          window.location.href = expectedRoute
          return
        }
      }
    }
  }, [pathname])

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  // Redirect if not authenticated
  if (!isAuthenticated() || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        userRole={roles[0] || ''}
        currentPath={pathname || ''}
      />
      
      {/* Main Content Area */}
      <div className={`
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}
        ml-0
      `}>
        {/* Top Header */}
        <DashboardHeader 
          user={user}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        
        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

