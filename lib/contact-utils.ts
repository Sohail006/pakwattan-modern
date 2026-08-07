import { Campus } from '@/lib/api/campuses'
import { SCHOOL_INFO } from '@/lib/constants'

/** Normalize common API envelopes into a Campus array */
export function normalizeCampusesResponse(payload: unknown): Campus[] {
  if (Array.isArray(payload)) return payload as Campus[]
  if (payload && typeof payload === 'object') {
    const obj = payload as Record<string, unknown>
    if (Array.isArray(obj.data)) return obj.data as Campus[]
    if (Array.isArray(obj.campuses)) return obj.campuses as Campus[]
    if (Array.isArray(obj.items)) return obj.items as Campus[]
    if (Array.isArray(obj.result)) return obj.result as Campus[]
  }
  return []
}

export function sortCampusesByPriority(campuses: Campus[]): Campus[] {
  return [...campuses].sort((a, b) => {
    const priorityA = a.priority || 0
    const priorityB = b.priority || 0
    if (priorityB !== priorityA) return priorityB - priorityA
    return a.name.localeCompare(b.name)
  })
}

/** Fallback single campus when API is unavailable */
export function getFallbackCampuses(): Campus[] {
  return [
    {
      id: 0,
      name: SCHOOL_INFO.fullName,
      address: SCHOOL_INFO.contact.address,
      phone: SCHOOL_INFO.contact.phone,
      email: SCHOOL_INFO.contact.email,
      whatsAppNumber: SCHOOL_INFO.contact.whatsapp,
      officeHours: 'Monday – Friday: 8:00 AM – 4:00 PM\nSaturday: 8:00 AM – 1:00 PM\nSunday: Closed',
      principalName: undefined,
      priority: 100,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
  ]
}

export function toWhatsAppHref(phone?: string, message?: string): string | null {
  if (!phone) return null
  const digits = phone.replace(/\D/g, '')
  if (!digits) return null
  const international = digits.startsWith('0')
    ? `92${digits.slice(1)}`
    : digits.startsWith('92')
      ? digits
      : digits
  const base = `https://wa.me/${international}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function toTelHref(phone?: string): string | null {
  if (!phone) return null
  const cleaned = phone.replace(/[^\d+]/g, '')
  return cleaned ? `tel:${cleaned}` : null
}

export function mapsDirectionsUrl(query: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`
}

export const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.9665027710457!2d73.15231645927724!3d34.052579608411705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38de35a5c79e4a3b%3A0xe10972f181f577f5!2sPak%20Wattan%20School%20And%20College%20of%20Sciences%2CHavelian!5e1!3m2!1sen!2s!4v1764491327824!5m2!1sen!2s'

export const MAP_PLACE_QUERY = 'Pak Wattan School And College of Sciences, Havelian'

export const OFFICE_TIMINGS = [
  { day: 'Monday – Friday', hours: '8:00 AM – 4:00 PM' },
  { day: 'Saturday', hours: '8:00 AM – 1:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
]

export const CONTACT_OFFICE_PHOTOS = [
  { src: '/images/about-us/Picture1.jpg', alt: 'Pak Wattan main campus' },
  { src: '/images/about-us/Picture2.jpg', alt: 'Pak Wattan school entrance' },
  { src: '/images/about-us/Picture3.png', alt: 'Campus facilities' },
  { src: '/images/about-us/Picture5.jpg', alt: 'Office and administration area' },
]

export const CONTACT_FAQS = [
  {
    question: 'What are the main campus office hours?',
    answer:
      'Monday to Friday 8:00 AM – 4:00 PM, and Saturday 8:00 AM – 1:00 PM. The office is closed on Sunday.',
  },
  {
    question: 'How can I inquire about admissions?',
    answer:
      'Call or WhatsApp the campus, fill the contact form on this page, or visit /admission to apply online.',
  },
  {
    question: 'Where is Pak Wattan located?',
    answer:
      'Azam Khan Road, beside Mubarak Plaza, Havelian, Abbottabad, KPK. Use Get Directions on the map section for turn-by-turn navigation.',
  },
  {
    question: 'Which WhatsApp number should I use?',
    answer:
      'Use the campus WhatsApp shown on the Contact Card, or message 0334-8113302 for a quick response.',
  },
]
