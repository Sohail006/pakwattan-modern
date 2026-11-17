/** Calendar date helpers in Asia/Karachi (school attendance timezone). */

const KARACHI = 'Asia/Karachi'

/** Today's date as YYYY-MM-DD in Pakistan. */
export function karachiToday(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: KARACHI,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

/** Shift a YYYY-MM-DD calendar date by delta days (date-only, no TZ drift). */
export function shiftKarachiDate(baseYmd: string, deltaDays: number): string {
  const [y, m, d] = baseYmd.split('-').map(Number)
  const utc = new Date(Date.UTC(y, m - 1, d + deltaDays))
  const yyyy = utc.getUTCFullYear()
  const mm = String(utc.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(utc.getUTCDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}
