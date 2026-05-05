'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, GraduationCap } from 'lucide-react'
import {
  SCHOLARSHIP_RESULTS_TABLES,
  type ScholarshipResultTable,
} from '@/lib/scholarship-results-tables'
import { rowMatchesScholarshipQuery } from '@/lib/scholarship-table-filter'
import ScholarshipResultSearchBar from '@/components/scholarships/ScholarshipResultSearchBar'

const GRADES = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const

function ordinalLabel(n: number) {
  const suf = n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'
  return `${n}${suf} Class`
}

function getTableForGrade(grade: number): ScholarshipResultTable | undefined {
  const map = SCHOLARSHIP_RESULTS_TABLES as unknown as Record<string, ScholarshipResultTable>
  return map[String(grade)]
}

function normalizeHeaders(table: ScholarshipResultTable): string[] {
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

/** Section title already shows the class; drop redundant Class column if present. */
function stripClassColumn(headers: string[], rows: string[][]): { headers: string[]; rows: string[][] } {
  const classIdx = headers.findIndex((h) => h.trim().toLowerCase() === 'class')
  if (classIdx < 0) return { headers, rows }
  const nextHeaders = headers.filter((_, i) => i !== classIdx)
  const nextRows = rows.map((r) => r.filter((_, i) => i !== classIdx))
  return { headers: nextHeaders, rows: nextRows }
}

function getStrippedRowsForGrade(grade: number): string[][] {
  const table = getTableForGrade(grade)
  if (!table?.rows?.length) return []
  const rawHeaders = normalizeHeaders(table)
  const width = Math.max(rawHeaders.length, 1)
  const rawRows = table.rows.map((r) => normalizeRow(r, width))
  return stripClassColumn(rawHeaders, rawRows).rows
}

function ResultTable({ grade, query }: { grade: number; query: string }) {
  const table = getTableForGrade(grade)
  if (!table?.rows?.length) {
    return (
      <p className="text-center text-gray-500 text-sm py-8 px-4">No results loaded for this class.</p>
    )
  }

  const rawHeaders = normalizeHeaders(table)
  const width = Math.max(rawHeaders.length, 1)
  const rawRows = table.rows.map((r) => normalizeRow(r, width))
  const { headers, rows: allRows } = stripClassColumn(rawHeaders, rawRows)
  const rows = query.trim()
    ? allRows.filter((r) => rowMatchesScholarshipQuery(r, query))
    : allRows

  if (!rows.length) {
    return (
      <p className="text-center text-gray-500 text-sm py-8 px-4">
        No rows match your search. Try another name, roll number, or keyword.
      </p>
    )
  }

  return (
    <div className="relative rounded-xl bg-white ring-1 ring-gray-200/80 shadow-sm">
      <p className="sr-only">
        Official result table for {ordinalLabel(grade)}. Scroll horizontally on small screens to see all
        columns.
      </p>
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

export default function ScholarshipResultClassList() {
  const [openGrade, setOpenGrade] = useState<number | null>(1)
  const [classQuery, setClassQuery] = useState('')

  useEffect(() => {
    setClassQuery('')
  }, [openGrade])

  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      {GRADES.map((grade) => {
        const isOpen = openGrade === grade
        const table = getTableForGrade(grade)
        const count = table?.rows?.length ?? 0

        let totalStripped = 0
        let filteredStripped = 0
        if (isOpen) {
          const allStripped = getStrippedRowsForGrade(grade)
          totalStripped = allStripped.length
          filteredStripped =
            classQuery.trim() === ''
              ? totalStripped
              : allStripped.filter((r) => rowMatchesScholarshipQuery(r, classQuery)).length
        }

        return (
          <div
            key={grade}
            className="rounded-2xl border border-gray-200/90 bg-white shadow-sm ring-1 ring-black/[0.03] overflow-hidden transition-shadow hover:shadow-md"
          >
            <button
              type="button"
              onClick={() => setOpenGrade(isOpen ? null : grade)}
              className="flex w-full min-h-[3.25rem] items-center justify-between gap-3 px-4 py-3.5 sm:px-5 sm:py-4 text-left active:bg-gray-50/80 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-base font-bold text-primary-800">
                  {grade}
                </span>
                <div className="min-w-0">
                  <span className="block font-semibold text-gray-900 text-base sm:text-lg leading-tight">
                    {ordinalLabel(grade)}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                    <GraduationCap className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
                    {count} {count === 1 ? 'record' : 'records'} · official list
                  </span>
                </div>
              </div>
              <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-primary-800 sm:text-sm">
                {isOpen ? (
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

            {isOpen && (
              <div className="border-t border-gray-100 bg-gray-50/70 px-3 pb-3 pt-3 sm:px-4 sm:pb-4 sm:pt-4">
                <ScholarshipResultSearchBar
                  id={`scholarship-class-${grade}-search`}
                  value={classQuery}
                  onChange={setClassQuery}
                  filteredCount={filteredStripped}
                  totalCount={totalStripped}
                />
                <div
                  className="max-h-[min(72vh,36rem)] overflow-auto rounded-xl"
                  role="region"
                  aria-label={`Results for ${ordinalLabel(grade)}`}
                >
                  <ResultTable grade={grade} query={classQuery} />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
