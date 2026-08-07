'use client'

import { BookOpen, GraduationCap, Users } from 'lucide-react'
import Accordion from '@/components/ui/Accordion'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { FACULTY_CARDS, FACULTY_STATS } from '@/lib/about-data'

const FacultyTab = () => {
  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="max-w-3xl">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary-600 mb-2">
          Educators
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold font-josefin text-secondary-900 mb-3">
          Faculty Who Mentor & Inspire
        </h3>
        <p className="text-secondary-600 leading-relaxed">
          Experienced teachers focused on board excellence, character, and every learner&apos;s potential.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {FACULTY_STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-gradient-to-br from-primary-700 to-primary-800 text-white p-4 sm:p-5 text-center shadow-lg"
          >
            <div className="text-2xl sm:text-3xl font-bold font-josefin mb-1 tabular-nums">
              {'displayOverride' in stat && stat.displayOverride ? (
                stat.displayOverride
              ) : (
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              )}
            </div>
            <p className="text-xs sm:text-sm text-white/85">{stat.label}</p>
          </div>
        ))}
      </div>

      <div>
        <h4 className="text-lg sm:text-xl font-bold font-josefin text-secondary-900 mb-4">
          Academic Departments
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FACULTY_CARDS.map((card) => (
            <article
              key={card.name}
              className="rounded-2xl border border-secondary-100 bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center mb-3">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h5 className="font-bold text-secondary-900 mb-1">{card.name}</h5>
              <p className="text-xs sm:text-sm font-medium text-primary-700 mb-2">{card.role}</p>
              <p className="text-sm text-secondary-600 leading-relaxed">{card.focus}</p>
            </article>
          ))}
        </div>
      </div>

      <div id="staff-test">
        <h4 className="text-lg sm:text-xl font-bold font-josefin text-secondary-900 mb-3">
          Staff Entrance Test
        </h4>
        <Accordion
          defaultOpenId="criteria"
          items={[
            {
              id: 'criteria',
              title: 'What we assess',
              content: (
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <BookOpen className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
                    Written test based on education and subject expertise
                  </li>
                  <li className="flex gap-2">
                    <Users className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
                    Communication skills and classroom presence
                  </li>
                  <li>Passion for teaching and student development</li>
                </ul>
              ),
            },
            {
              id: 'process',
              title: 'Hiring process',
              content: (
                <ol className="list-decimal pl-5 space-y-1.5">
                  <li>Application & document review</li>
                  <li>Written examination</li>
                  <li>Interview and teaching demo</li>
                  <li>Final selection</li>
                </ol>
              ),
            },
          ]}
        />
      </div>
    </div>
  )
}

export default FacultyTab
