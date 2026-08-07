'use client'

import { useState, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

export type AccordionItem = {
  id: string
  title: string
  content: ReactNode
}

type AccordionProps = {
  items: AccordionItem[]
  allowMultiple?: boolean
  defaultOpenId?: string | null
  className?: string
}

const Accordion = ({
  items,
  allowMultiple = false,
  defaultOpenId = null,
  className = '',
}: AccordionProps) => {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  )

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id)
      if (allowMultiple) {
        return isOpen ? prev.filter((x) => x !== id) : [...prev, id]
      }
      return isOpen ? [] : [id]
    })
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id)
        return (
          <div
            key={item.id}
            className="rounded-xl border border-secondary-200 bg-white shadow-sm overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left min-h-[52px] hover:bg-secondary-50/80 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-secondary-900 text-sm sm:text-base">
                {item.title}
              </span>
              <ChevronDown
                className={`w-5 h-5 shrink-0 text-primary-600 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-4 sm:px-5 pb-4 pt-1 text-sm sm:text-base text-secondary-600 leading-relaxed border-t border-secondary-100">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
