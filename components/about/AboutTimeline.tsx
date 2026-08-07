'use client'

import { useEffect, useRef } from 'react'
import { ABOUT_TIMELINE } from '@/lib/about-data'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const TimelineItem = ({
  item,
  index,
}: {
  item: (typeof ABOUT_TIMELINE)[number]
  index: number
}) => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.25, freezeOnceVisible: true })
  const visible = !!entry?.isIntersecting
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-0 ${
        isEven ? '' : 'lg:flex-row-reverse'
      }`}
    >
      <div
        className={`w-full lg:w-[calc(50%-1.5rem)] transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        style={{ transitionDelay: `${index * 80}ms` }}
      >
        <div className="bg-white rounded-2xl border border-primary-100 shadow-md p-5 sm:p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-2xl font-bold font-josefin text-primary-700">{item.year}</span>
            <span className="text-xs font-semibold rounded-full bg-accent-100 text-accent-800 px-3 py-1">
              {item.students} students
            </span>
          </div>
          <h4 className="text-lg font-semibold text-secondary-900 mb-1">{item.title}</h4>
          <p className="text-sm sm:text-base text-secondary-600 leading-relaxed">{item.description}</p>
        </div>
      </div>

      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent-500 ring-4 ring-primary-100 z-10" />
      <div className="lg:hidden absolute left-0 top-6 w-3 h-3 rounded-full bg-accent-500 ring-4 ring-primary-50" />
      <div className="hidden lg:block w-[calc(50%-1.5rem)]" />
    </div>
  )
}

const AboutTimeline = () => {
  const lineRef = useRef<HTMLDivElement>(null)
  const [wrapRef, entry] = useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true })

  useEffect(() => {
    if (!entry?.isIntersecting || !lineRef.current) return
    lineRef.current.style.height = '100%'
  }, [entry?.isIntersecting])

  return (
    <div ref={wrapRef} className="relative pl-6 lg:pl-0">
      <div className="absolute left-[5px] lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary-100 overflow-hidden">
        <div
          ref={lineRef}
          className="w-full bg-gradient-to-b from-primary-500 to-accent-500 transition-[height] duration-[1600ms] ease-out"
          style={{ height: 0 }}
        />
      </div>
      <div className="space-y-8 sm:space-y-10">
        {ABOUT_TIMELINE.map((item, index) => (
          <TimelineItem key={item.year} item={item} index={index} />
        ))}
      </div>
    </div>
  )
}

export default AboutTimeline
