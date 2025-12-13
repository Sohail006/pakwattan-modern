'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Users, BookOpen, ClipboardList, TrendingUp } from 'lucide-react'
import { getCurrentUser } from '@/lib/api/auth'
import { getCourses } from '@/lib/api/courses'
import { getStudents } from '@/lib/api/students'
import type { Course } from '@/lib/api/courses'
import type { Student } from '@/lib/api/students'

type Kpi = {
  label: string
  value: number
  icon: React.ReactNode
}

export default function TeacherDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [kpis, setKpis] = useState<Kpi[]>([
    {
      label: 'My Classes',
      value: 0,
      icon: <BookOpen className="w-5 h-5 text-blue-600" />,
    },
    {
      label: 'My Students',
      value: 0,
      icon: <Users className="w-5 h-5 text-green-600" />,
    },
    {
      label: 'Pending Tasks',
      value: 0,
      icon: <ClipboardList className="w-5 h-5 text-amber-600" />,
    },
  ])

  useEffect(() => {
    async function loadTeacherData() {
      setLoading(true)
      try {
        // Get current user
        const user = getCurrentUser()
        if (!user || !user.id) {
          console.error('User not found or missing ID')
          setLoading(false)
          return
        }

        // Fetch courses and students in parallel
        const [courses, students] = await Promise.all([
          getCourses(undefined, true), // Get active courses only
          getStudents(),
        ])

        // Note: User.id is a string (GUID), Course.teacherId is a number
        // We need to match courses to the current teacher
        // Try multiple matching strategies:
        // 1. If user.id can be parsed as number, try direct match with course.teacherId
        // 2. If course has teacher object, try matching teacher.id (if it's numeric)
        // 3. Log warning if no matches found for debugging
        
        const userIdStr = String(user.id)
        // Ensure userIdNum is always a number or NaN
        let userIdNum: number
        if (typeof user.id === 'string') {
          userIdNum = parseInt(user.id, 10)
        } else if (typeof user.id === 'number') {
          userIdNum = user.id
        } else {
          userIdNum = NaN
        }
        const userEmail = user.email as string | undefined
        
        // Filter courses by teacherId
        // Try multiple matching strategies
        const myCourses = courses.filter((course: Course) => {
          // Strategy 1: Try numeric match with course.teacherId
          if (!isNaN(userIdNum) && course.teacherId === userIdNum) {
            return true
          }
          
          // Strategy 2: If course has teacher object, try matching teacher.id
          if (course.teacher && course.teacher.id) {
            let teacherIdNum: number
            if (typeof course.teacher.id === 'string') {
              teacherIdNum = parseInt(course.teacher.id, 10)
            } else if (typeof course.teacher.id === 'number') {
              teacherIdNum = course.teacher.id
            } else {
              teacherIdNum = NaN
            }
            
            if (!isNaN(teacherIdNum) && teacherIdNum === userIdNum) {
              return true
            }
            
            // If teacher.id is a string, try direct string match
            if (typeof course.teacher.id === 'string' && course.teacher.id === userIdStr) {
              return true
            }
          }
          
          return false
        })
        
        // If no courses found, log for debugging
        if (myCourses.length === 0 && courses.length > 0) {
          console.warn('No courses found for teacher.', {
            userId: userIdStr,
            userIdNum: isNaN(userIdNum) ? 'N/A' : userIdNum,
            userEmail: userEmail || 'N/A',
            totalCourses: courses.length,
            sampleCourse: courses[0] ? {
              id: courses[0].id,
              teacherId: courses[0].teacherId,
              teacher: courses[0].teacher
            } : null
          })
        }
        
        // Get grade IDs from teacher's courses
        const myGradeIds = new Set(myCourses.map((course: Course) => course.gradeId))
        
        // Filter students by grades in teacher's courses
        const myStudents = students.filter((student: Student) => 
          myGradeIds.has(student.gradeId)
        )

        // Update KPIs with real data
        setKpis([
          {
            label: 'My Classes',
            value: myCourses.length,
            icon: <BookOpen className="w-5 h-5 text-blue-600" />,
          },
          {
            label: 'My Students',
            value: myStudents.length,
            icon: <Users className="w-5 h-5 text-green-600" />,
          },
          {
            label: 'Pending Tasks',
            value: 0, // No API available for tasks yet
            icon: <ClipboardList className="w-5 h-5 text-amber-600" />,
          },
        ])
      } catch (error) {
        console.error('Failed to load teacher data:', error)
        // Keep default values on error
      } finally {
        setLoading(false)
      }
    }

    loadTeacherData()
  }, [])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Manage your classes and students.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => {
          const bgColors = ['bg-blue-50', 'bg-green-50', 'bg-amber-50']
          return (
            <div key={kpi.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                  {loading ? (
                    <div className="h-8 w-20 bg-gray-200 rounded animate-pulse mt-2" />
                  ) : (
                    <p className="text-3xl font-bold text-gray-900 mt-2">{kpi.value.toLocaleString()}</p>
                  )}
                </div>
                <div className={`p-3 ${bgColors[index]} rounded-lg`}>
                  {kpi.icon}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/dashboard/students"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all group"
            >
              <Users className="w-6 h-6 text-gray-600 group-hover:text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">Students</span>
            </Link>
            <Link
              href="/dashboard/courses"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all group"
            >
              <BookOpen className="w-6 h-6 text-gray-600 group-hover:text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">Courses</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-primary-100 rounded-lg">
                <TrendingUp className="w-4 h-4 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Welcome to Teacher Dashboard</p>
                <p className="text-xs text-gray-500 mt-1">Manage your classes and students here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

