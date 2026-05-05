'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, GraduationCap } from 'lucide-react'
import {
  FSC_PART1_GROUP_TABLES,
  type FscPart1GroupTable,
} from '@/lib/scholarship-fsc-part1-data'

function normalizeHeaders(table: FscPart1GroupTable): string[] {
  const colCount = Math.max(
    table.headers?.length ?? 0,
    ...table.rows.map((r) => r.length),
    0
  )
  const h = [...(table.headers ?? [])].map((x) => String(x ?? '').trim())
  while (h.length < colCount) h.push('')
  return h.slice(0, colCount)
}

function normalizeRow(row: string[] | undefined, width: number): string[] {
  const r = [...(row ?? [])].map((c) => (c == null ? '' : String(c)).trim())
  while (r.length < width) r.push('')
  return r.slice(0, width)
}

function GroupResultTable({ group }: { group: FscPart1GroupTable }) {
  if (!group?.rows?.length) {
    return (
      <p className="text-center text-gray-500 text-sm py-6 px-4">No results for this group.</p>
    )
  }

  const rawHeaders = normalizeHeaders(group)
  const width = Math.max(rawHeaders.length, 1)
  const rawRows = group.rows.map((r) => normalizeRow(r, width))
  const headers = rawHeaders
  const rows = rawRows

  return (
    <div className="relative rounded-xl bg-white ring-1 ring-gray-200/80 shadow-sm">
      <p className="sr-only">Scholarship result table for {group.title}.</p>
      <div className="overflow-x-auto overscroll-x-contain rounded-xl">
        <table className="min-w-full border-separate border-spacing-0 text-left text-xs sm:text-sm">
          <thead>
            <tr>
              {headers.map((header, hi) => (
                <th
                  key={hi}
                  scope="col"
                  className="sticky top-0 z-10 bg-primary-600 px-2.5 py-3 sm:px-3 sm:py-3.5 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wide text-white border-b border-primary-700/80 first:rounded-tl-xl last:rounded-tr-xl sm:first:rounded-none sm:last:rounded-none whitespace-nowrap"
                >
                  {header || '\u00a0'}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className="border-b border-gray-100 last:border-b-0 odd:bg-white even:bg-gray-50/80"
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className="px-2.5 py-2 sm:px-3 sm:py-2.5 align-top tabular-nums max-w-[14rem] sm:max-w-none break-words border-r border-gray-100/90 last:border-r-0"
                  >
                    {cell === '' ? <span className="block min-h-[1.25em]">&nbsp;</span> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function ScholarshipFscPart1Section() {
  const [open, setOpen] = useState(true)
  const totalRecords = FSC_PART1_GROUP_TABLES.reduce((n, g) => n + (g.rows?.length ?? 0), 0)

  return (
    <div className="rounded-2xl border border-gray-200/90 bg-white shadow-sm ring-1 ring-black/[0.03] overflow-hidden transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full min-h-[3.25rem] items-center justify-between gap-3 px-4 py-3.5 sm:px-5 sm:py-4 text-left active:bg-gray-50/80 transition-colors"
        aria-expanded={open}
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-[0.7rem] font-bold leading-tight text-primary-800 px-1 text-center">
            FSC
          </span>
          <div className="min-w-0">
            <span className="block font-semibold text-gray-900 text-base sm:text-lg leading-tight">
              FSC Part 1
            </span>
            <span className="mt-0.5 flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
              <GraduationCap className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
              {totalRecords} {totalRecords === 1 ? 'record' : 'records'} · session 2026–27
            </span>
          </div>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-primary-800 sm:text-sm">
          {open ? (
            <>
              <ChevronUp className="h-4 w-4" aria-hidden />
              Close
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" aria-hidden />
              Open
            </>
          )}
        </span>
      </button>

      {open && (
        <div className="border-t border-gray-100 bg-gray-50/70 px-3 pb-3 pt-3 sm:px-4 sm:pb-4 sm:pt-4">
          <div className="flex flex-col gap-6 sm:gap-8">
            {FSC_PART1_GROUP_TABLES.map((group) => (
              <div key={group.title} className="space-y-3">
                <h3 className="text-sm font-bold text-gray-800 sm:text-base border-l-4 border-primary-500 pl-3">
                  {group.title}
                </h3>
                <div
                  className="max-h-[min(72vh,36rem)] overflow-auto rounded-xl"
                  role="region"
                  aria-label={`Results for ${group.title}`}
                >
                  <GroupResultTable group={group} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
