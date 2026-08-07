'use client'

import { MapPin, Mountain, Factory } from 'lucide-react'
import Accordion from '@/components/ui/Accordion'
import AboutTimeline from '@/components/about/AboutTimeline'
import AboutImageGallery from '@/components/about/AboutImageGallery'

const HistoryTab = () => {
  return (
    <div id="history" className="scroll-mt-28 space-y-10 sm:space-y-12">
      <div className="max-w-3xl">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary-600 mb-2">
          Since 2 November 2020
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold font-josefin text-secondary-900 mb-3">
          Our Story in Havelian
        </h3>
        <p className="text-secondary-600 leading-relaxed">
          Pak Wattan School & College of Sciences was founded to deliver quality education at
          affordable expenses—with yearly scholarships and a clear focus on circle-level academic leadership.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-100 p-5 sm:p-6">
          <div className="flex items-start gap-3 mb-3">
            <MapPin className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-semibold text-secondary-900 mb-1">Campus Location</h4>
              <p className="text-sm sm:text-base text-secondary-600 leading-relaxed">
                On the Karakoram Highway beside Dor River in Havelian—about 15.5 km southwest of Abbottabad.
                Boys wing & main campus: Azam Khan Road. Primary section: Gohar Market.
              </p>
            </div>
          </div>
        </div>
        <Accordion
          items={[
            {
              id: 'sights',
              title: 'Around Havelian',
              content: (
                <ul className="space-y-3">
                  <li className="flex gap-2">
                    <Mountain className="w-4 h-4 text-primary-600 mt-1 shrink-0" />
                    <span>Nearby Sajikot Waterfall—popular regional destination.</span>
                  </li>
                  <li className="flex gap-2">
                    <Factory className="w-4 h-4 text-primary-600 mt-1 shrink-0" />
                    <span>Home to Pakistan Ordinance Factory and strategic industry links.</span>
                  </li>
                </ul>
              ),
            },
            {
              id: 'scholarships',
              title: 'Annual scholarships',
              content:
                'Pakians, Merit Based, Orphans, Special Child, and Hafiz ul Quran scholarships. Scholarship test traditionally held on 23 March at the Girls Campus.',
            },
          ]}
        />
      </div>

      <div>
        <h3 className="text-xl sm:text-2xl font-bold font-josefin text-secondary-900 mb-6">
          Growth Timeline
        </h3>
        <AboutTimeline />
      </div>

      <div>
        <h3 className="text-xl sm:text-2xl font-bold font-josefin text-secondary-900 mb-2">
          Campus Gallery
        </h3>
        <p className="text-sm text-secondary-600 mb-5">Moments from life at Pak Wattan.</p>
        <AboutImageGallery />
      </div>

      <div className="rounded-2xl overflow-hidden border border-secondary-200 bg-secondary-900 shadow-lg">
        <div className="aspect-video">
          <iframe
            src="https://www.youtube.com/embed/B5HXn5sZRXM"
            title="Pak Wattan School video"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}

export default HistoryTab
