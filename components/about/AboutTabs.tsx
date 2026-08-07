'use client'

import { useCallback, useEffect, useState, type ComponentType } from 'react'
import { ABOUT_TABS, AboutTabId, resolveAboutTabFromHash } from '@/lib/about-data'
import HistoryTab from '@/components/about/tabs/HistoryTab'
import VisionTab from '@/components/about/tabs/VisionTab'
import FacultyTab from '@/components/about/tabs/FacultyTab'
import LeadershipTab from '@/components/about/tabs/LeadershipTab'
import AchievementsTab from '@/components/about/tabs/AchievementsTab'
import Container from '@/components/ui/Container'

const TAB_PANELS: Record<AboutTabId, ComponentType> = {
  history: HistoryTab,
  vision: VisionTab,
  faculty: FacultyTab,
  leadership: LeadershipTab,
  achievements: AchievementsTab,
}

const AboutTabs = () => {
  const [active, setActive] = useState<AboutTabId>('history')

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash
      const tab = resolveAboutTabFromHash(hash)
      setActive(tab)

      const targetId = hash.replace(/^#/, '')
      if (!targetId) return

      // Scroll to nested anchors after the tab panel paints
      window.setTimeout(() => {
        const el = document.getElementById(targetId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          document.getElementById('about-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 80)
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  const selectTab = useCallback((id: AboutTabId) => {
    setActive(id)
    const url = `${window.location.pathname}#${id}`
    window.history.replaceState(null, '', url)
    window.setTimeout(() => {
      document.getElementById('about-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 40)
  }, [])

  const Panel = TAB_PANELS[active]

  return (
    <section id="about-tabs" className="scroll-mt-20 py-8 sm:py-10 lg:py-12 bg-gradient-to-b from-white via-secondary-50/40 to-white">
      <Container>
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-josefin text-secondary-900 mb-2">
            Who We Are
          </h2>
          <p className="text-sm sm:text-base text-secondary-600 max-w-2xl mx-auto">
            Explore our history, vision, faculty, leadership, and achievements.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="About sections"
          className="flex gap-2 overflow-x-auto pb-2 mb-6 sm:mb-8 scrollbar-thin sticky top-16 z-30 bg-white/95 backdrop-blur-md py-2 -mx-1 px-1 rounded-xl border border-secondary-100 shadow-sm"
        >
          {ABOUT_TABS.map((tab) => {
            const isActive = active === tab.id
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => selectTab(tab.id)}
                className={`shrink-0 min-h-[44px] px-4 sm:px-5 py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md'
                    : 'bg-secondary-50 text-secondary-700 hover:bg-primary-50 hover:text-primary-800'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${active}`}
          aria-labelledby={`tab-${active}`}
          className="min-h-[320px]"
        >
          <Panel />
        </div>
      </Container>
    </section>
  )
}

export default AboutTabs
