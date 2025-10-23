'use client'

import { useState } from 'react'
import { Clock, Sparkles } from 'lucide-react'
import Link from 'next/link'

const AcademicSchedule = () => {
  const [selectedTerm, setSelectedTerm] = useState('primary') // 'primary' or 'secondary'

  const primarySchedule = [
    { time: '8:00 AM - 8:30 AM', activity: 'Morning Assembly & Quran Recitation' },
    { time: '8:30 AM - 9:15 AM', activity: 'English Language Arts' },
    { time: '9:15 AM - 10:00 AM', activity: 'Mathematics' },
    { time: '10:00 AM - 10:30 AM', activity: 'Break Time' },
    { time: '10:30 AM - 11:15 AM', activity: 'Urdu Language' },
    { time: '11:15 AM - 12:00 PM', activity: 'Science / Social Studies' },
    { time: '12:00 PM - 12:45 PM', activity: 'Islamic Studies / Ethics' },
    { time: '12:45 PM - 1:30 PM', activity: 'Art & Craft / Physical Education' },
    { time: '1:30 PM', activity: 'Dismissal' },
  ]

  const secondarySchedule = [
    { time: '8:00 AM - 8:30 AM', activity: 'Morning Assembly & Quran Recitation' },
    { time: '8:30 AM - 9:20 AM', activity: 'Physics / Biology / Computer Science' },
    { time: '9:20 AM - 10:10 AM', activity: 'Chemistry / Economics' },
    { time: '10:10 AM - 10:40 AM', activity: 'Break Time' },
    { time: '10:40 AM - 11:30 AM', activity: 'Mathematics / Statistics' },
    { time: '11:30 AM - 12:20 PM', activity: 'English Language & Literature' },
    { time: '12:20 PM - 1:10 PM', activity: 'Urdu Language & Literature' },
    { time: '1:10 PM - 2:00 PM', activity: 'Islamic Studies / Pakistan Studies' },
    { time: '2:00 PM', activity: 'Dismissal' },
  ]

  const currentSchedule = selectedTerm === 'primary' ? primarySchedule : secondarySchedule

  const yearlySchedule = [
    { grade: 'Montessori', link: '/AcademicSchedule/Montessori' },
    { grade: '1st', link: '/AcademicSchedule/primary' },
    { grade: '2nd', link: '/AcademicSchedule/primary' },
    { grade: '3rd', link: '/AcademicSchedule/primary' },
    { grade: '4th', link: '/AcademicSchedule/primary' },
    { grade: '5th', link: '/AcademicSchedule/primary' },
    { grade: '6th', link: '/AcademicSchedule/primary' },
    { grade: '7th', link: '/AcademicSchedule/primary' },
    { grade: '8th', link: '/AcademicSchedule/primary' },
    { grade: '9th', link: '/AcademicSchedule/Matric' },
    { grade: '10th', link: '/AcademicSchedule/Matric' },
    { grade: '1st Year', link: '#' },
    { grade: '2nd Year', link: '#' },
  ]

  return (
    <section id="academic-schedule" className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">Yearly Academic Schedule</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Our well-structured daily schedule ensures a balanced approach to learning and development.
          </p>
        </div>

        {/* Yearly Academic Schedule - From Old Website */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-6">
            <h3 className="text-2xl font-bold text-white text-center">Yearly Academic Schedule</h3>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {yearlySchedule.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  className="btn-accent text-center focus-ring"
                >
                  {item.grade}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Schedule */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-4 sm:p-6 flex justify-center space-x-4">
            <button
              onClick={() => setSelectedTerm('primary')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 focus-ring ${
                selectedTerm === 'primary'
                  ? 'bg-white text-primary-700 shadow-md'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Primary Section
            </button>
            <button
              onClick={() => setSelectedTerm('secondary')}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 focus-ring ${
                selectedTerm === 'secondary'
                  ? 'bg-white text-primary-700 shadow-md'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Secondary Section
            </button>
          </div>

          <div className="p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Daily Schedule - {selectedTerm === 'primary' ? 'Primary Section' : 'Secondary Section'}
            </h3>
            <div className="space-y-4">
              {currentSchedule.map((item, index) => (
                <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover-lift">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary-100 text-primary-600 rounded-full flex-shrink-0 mr-4">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{item.time}</p>
                    <p className="text-base text-gray-700">{item.activity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <h4 className="text-xl font-bold text-secondary-800 mb-4">Special Activities & Events</h4>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Throughout the year, we organize various special activities, workshops, and events to enrich the learning experience and foster holistic development. Stay tuned for announcements!
              </p>
              <div className="mt-6">
                <Link href="/school-activities" className="btn-accent inline-flex items-center focus-ring">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Explore Activities
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AcademicSchedule
