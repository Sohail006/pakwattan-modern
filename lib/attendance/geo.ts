/** Haversine distance in meters between two WGS84 points */
export function distanceMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const toRad = (d: number) => (d * Math.PI) / 180
  const R = 6371000
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)))
}

export function isWithinRadius(
  userLat: number,
  userLng: number,
  campusLat: number,
  campusLng: number,
  radiusMeters: number
): { inside: boolean; distanceM: number } {
  const distanceM = distanceMeters(userLat, userLng, campusLat, campusLng)
  return { inside: distanceM <= radiusMeters, distanceM: Math.round(distanceM) }
}

/** Parse "HH:mm" to minutes from midnight */
export function timeToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map((n) => parseInt(n, 10))
  if (Number.isNaN(h) || Number.isNaN(m)) return 0
  return h * 60 + m
}

/** Current time parts in Asia/Karachi */
export function karachiNow(date = new Date()): {
  dateKey: string
  minutes: number
  iso: string
} {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Karachi',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const parts = Object.fromEntries(
    fmt.formatToParts(date).map((p) => [p.type, p.value])
  )
  const dateKey = `${parts.year}-${parts.month}-${parts.day}`
  const hour = parseInt(parts.hour === '24' ? '0' : parts.hour, 10)
  const minute = parseInt(parts.minute, 10)
  return {
    dateKey,
    minutes: hour * 60 + minute,
    iso: date.toISOString(),
  }
}
