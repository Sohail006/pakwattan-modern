/** Case-insensitive match against any cell in a result row (roll no., name, marks, etc.). */
export function rowMatchesScholarshipQuery(row: string[], query: string): boolean {
  const t = query.trim().toLowerCase()
  if (!t) return true
  return row.some((c) => String(c).toLowerCase().includes(t))
}
