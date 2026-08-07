'use client'

import Image from 'next/image'
import { Quote } from 'lucide-react'
import Accordion from '@/components/ui/Accordion'

const LeadershipTab = () => {
  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="max-w-3xl">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary-600 mb-2">
          Leadership
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold font-josefin text-secondary-900 mb-3">
          Messages from Our Leaders
        </h3>
        <p className="text-secondary-600 leading-relaxed">
          Guidance rooted in optimism, discipline, and a passion for lifelong learning.
        </p>
      </div>

      <div id="director-message" className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 to-white p-5 sm:p-7">
        <div className="relative w-full max-w-[240px] mx-auto aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/images/about-us/picture6.jpg"
            alt="Sardar Abdul Aqeel - Executive Director"
            fill
            className="object-cover"
            loading="lazy"
            sizes="240px"
          />
        </div>
        <div>
          <h4 className="text-xl sm:text-2xl font-bold text-secondary-900 font-josefin">
            Sardar Abdul Aqeel
          </h4>
          <p className="text-primary-700 font-semibold text-sm sm:text-base mb-4">
            Executive Director
          </p>
          <p className="text-sm sm:text-base text-secondary-600 mb-4 leading-relaxed">
            Educationist and managing director of Pak Wattan—optimistic, community-focused, and
            committed to affordable excellence for every field of tomorrow.
          </p>
          <blockquote className="rounded-xl bg-white border-l-4 border-primary-600 p-4 shadow-sm">
            <Quote className="w-5 h-5 text-primary-600 mb-2" />
            <p className="text-sm text-secondary-700 italic leading-relaxed">
              Since 2 November 2020, Pak Wattan has grown rapidly—preparing future doctors, engineers,
              and professionals with character, creativity, confidence, and enthusiasm for education.
            </p>
          </blockquote>
        </div>
      </div>

      <div id="principal-message" className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 rounded-2xl border border-accent-100 bg-gradient-to-br from-accent-50 to-white p-5 sm:p-7">
        <div className="relative w-full max-w-[240px] mx-auto aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/images/about-us/Picture7.jpg"
            alt="Malik Ahsan Ali - Principal"
            fill
            className="object-cover"
            loading="lazy"
            sizes="240px"
          />
        </div>
        <div>
          <h4 className="text-xl sm:text-2xl font-bold text-secondary-900 font-josefin">
            Malik Ahsan Ali
          </h4>
          <p className="text-accent-700 font-semibold text-sm sm:text-base mb-4">
            Administration Cum Principal
          </p>
          <p className="text-sm sm:text-base text-secondary-600 mb-4 leading-relaxed">
            A passionate educationist known for discipline, sincerity, and quality education with
            fair fee structures and meaningful scholarships.
          </p>
          <Accordion
            defaultOpenId="principal-quote"
            items={[
              {
                id: 'principal-quote',
                title: 'On knowledge & ambition',
                content:
                  'Never settle for less knowledge—strive for the real thirst of learning. Your first step into Pak Wattan should open a path of success, discipline, and sincerity.',
              },
              {
                id: 'welcome',
                title: 'Visit invitation',
                content:
                  'Families are welcome to schedule a campus visit and experience how Pak Wattan supports the personal and academic growth of every child.',
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default LeadershipTab
