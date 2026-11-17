'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Users, BookOpen, MapPin, ArrowUpRight } from 'lucide-react'
import { getCurrentUser } from '@/lib/api/auth'
import { getCourses } from '@/lib/api/courses'
import { getStudents } from '@/lib/api/students'
import type { Course } from '@/lib/api/courses'
import type { Student } from '@/lib/api/students'
import CheckInPanel from '@/components/attendance/CheckInPanel'
import DashboardHero from '@/components/dashboard/DashboardHero'
import DashboardKpiGrid, { type DashboardKpi } from '@/components/dashboard/DashboardKpiGrid'
import { useAttendanceEnrollment } from '@/lib/hooks/useAttendanceEnrollment'

export default function TeacherDashboardPage() {
  const { loading: enrollmentLoading, enrolled } = useAttendanceEnrollment()
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('Teacher')
  const [courses, setCourses] = useState<Course[]>([])
  const [studentCount, setStudentCount] = useState(0)
  const [kpis, setKpis] = useState<DashboardKpi[]>([
    { label: 'My classes', value: 0, href: '/dashboard/students', icon: <BookOpen className="h-5 w-5" />, loading: true },
    { label: 'My students', value: 0, href: '/dashboard/students', icon: <Users className="h-5 w-5" />, loading: true },
  ])

  useEffect(() => {
    async function loadTeacherData() {
      setLoading(true)
      try {
        const user = getCurrentUser()
        if (!user?.id) {
          setLoading(false)
          return
        }

        const first = String(user.firstName ?? '').trim()
        const last = String(user.lastName ?? '').trim()
        const email = String(user.email ?? '').trim()
        setUserName([first, last].filter(Boolean).join(' ') || email || 'Teacher')

        const [allCourses, students] = await Promise.all([
          getCourses(undefined, true),
          getStudents(),
        ])

        const userIdStr = String(user.id)
        const userIdNum = typeof user.id === 'string' ? parseInt(user.id, 10) : Number(user.id)

        const myCourses = allCourses.filter((course: Course) => {
          if (!isNaN(userIdNum) && course.teacherId === userIdNum) return true
          if (course.teacher?.id) {
            const tid =
              typeof course.teacher.id === 'string'
                ? parseInt(course.teacher.id, 10)
                : Number(course.teacher.id)
            if (!isNaN(tid) && tid === userIdNum) return true
            if (String(course.teacher.id) === userIdStr) return true
          }
          return false
        })

        const myGradeIds = new Set(myCourses.map((c) => c.gradeId))
        const myStudents = students.filter((s: Student) => myGradeIds.has(s.gradeId))

        setCourses(myCourses)
        setStudentCount(myStudents.length)
        setKpis([
          {
            label: 'My classes',
            value: myCourses.length,
            href: '/dashboard/students',
            icon: <BookOpen className="h-5 w-5" />,
            hint: 'Active courses assigned to you',
          },
          {
            label: 'My students',
            value: myStudents.length,
            href: '/dashboard/students',
            icon: <Users className="h-5 w-5" />,
            hint: 'Students in your grades',
          },
        ])
      } catch (error) {
        console.error('Failed to load teacher data:', error)
        setKpis((prev) => prev.map((k) => ({ ...k, loading: false, error: true })))
      } finally {
        setLoading(false)
      }
    }

    loadTeacherData()
  }, [])

  return (
    <div className="space-y-6">
      <DashboardHero
        title={`Welcome, ${userName}`}
        subtitle={
          enrolled
            ? 'Check in for today, then jump straight to your students — no extra pages required.'
            : 'Jump straight to your students and classes. My Attendance appears after you are enrolled in the staff roster.'
        }
      >
        {!enrollmentLoading && enrolled && (
          <Link
            href="/dashboard/attendance?tab=me"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary-700 px-3.5 py-2 text-sm font-semibold text-white shadow-sm"
          >
            <MapPin className="h-4 w-4" />
            My Attendance
          </Link>
        )}
      </DashboardHero>

      {!enrollmentLoading && enrolled && (
        <section aria-label="My attendance" className="space-y-3">
          <h2 className="font-josefin text-lg font-bold text-gray-900">My Attendance</h2>
          <div className="mx-auto max-w-3xl">
            <CheckInPanel />
          </div>
        </section>
      )}

      <section aria-label="Teaching overview" className="space-y-3">
        <h2 className="font-josefin text-lg font-bold text-gray-900">Teaching overview</h2>
        <DashboardKpiGrid items={kpis} columns="grid-cols-1 sm:grid-cols-2" />
      </section>

      <section aria-label="My classes" className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-josefin text-lg font-bold text-gray-900">My classes</h2>
          <Link
            href="/dashboard/students"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700"
          >
            All students
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 animate-pulse rounded-2xl bg-gray-100" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white/80 p-6 text-sm text-gray-600">
            No courses are linked to your account yet. Contact admin if this looks wrong. You can still
            browse students from the sidebar.
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {courses.slice(0, 6).map((course) => (
              <Link
                key={course.id}
                href="/dashboard/students"
                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-primary-300 hover:shadow-md"
              >
                <p className="font-semibold text-gray-900">
                  {course.name || `Course #${course.id}`}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {course.grade?.name || `Grade ${course.gradeId}`}
                  {course.code ? ` · ${course.code}` : ''}
                </p>
              </Link>
            ))}
          </div>
        )}

        {!loading && studentCount > 0 && (
          <p className="text-sm text-gray-600">
            {studentCount.toLocaleString()} student{studentCount === 1 ? '' : 's'} across your classes.
          </p>
        )}
      </section>
    </div>
  )
}
