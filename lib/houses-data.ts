/** House System content — Pak Wattan School & College of Sciences */

export const HOUSE_SYSTEM_ANCHOR = 'house-system'
export const HOUSE_STANDINGS_ANCHOR = 'house-standings'

export const HOUSE_SYSTEM_INTRO =
  'At Pak Wattan School & College of Sciences, we believe that education extends beyond the classroom. Our House System provides students with opportunities to develop leadership, teamwork, discipline, confidence, and a spirit of healthy competition. Each house is inspired by a distinguished national personality whose values continue to inspire the next generation.'

export const HOUSE_SYSTEM_CTA =
  'Explore our four houses and discover the spirit, values, and identity behind each one.'

export const HOUSE_SYSTEM_PILLARS = [
  {
    title: 'Leadership',
    description: 'House captains and student leaders guide their teams with responsibility and pride.',
  },
  {
    title: 'Teamwork',
    description: 'Students collaborate across grades to earn points and support one another.',
  },
  {
    title: 'Discipline',
    description: 'Regular conduct and commitment strengthen character inside and outside the classroom.',
  },
  {
    title: 'Healthy Competition',
    description: 'Inter-house events in academics, sports, and co-curricular life celebrate excellence.',
  },
] as const

export type HouseId =
  | 'marium-mukhtiar'
  | 'major-aziz-bhatti'
  | 'abdul-sattar-edhi'
  | 'dr-abdul-qadeer-khan'

export type House = {
  id: HouseId
  name: string
  shortName: string
  motto: string
  description: string
  namesakeTitle: string
  namesakeBio: string
  focusAreas: readonly string[]
  values: readonly string[]
  crest: {
    src: string
    alt: string
    width: number
    height: number
  }
  accentClass: string
  seo: {
    title: string
    description: string
    keywords: string
  }
}

export const HOUSES: readonly House[] = [
  {
    id: 'marium-mukhtiar',
    name: 'Marium Mukhtiar House',
    shortName: 'Marium Mukhtiar',
    motto: 'Soar with Courage',
    description:
      "Inspired by the courage and determination of Pakistan's first female fighter pilot to be martyred in the line of duty, this house encourages students to rise above challenges and pursue their goals fearlessly. Its members embody resilience, confidence, and the courage to reach new heights.",
    namesakeTitle: 'Flying Officer Marium Mukhtiar Shaheed',
    namesakeBio:
      'Flying Officer Marium Mukhtiar Shaheed was Pakistan\'s first female fighter pilot to embrace martyrdom in the line of duty. Her dedication, professionalism, and courage continue to inspire young Pakistanis — especially girls — to dream boldly and serve with honour.',
    focusAreas: ['Public speaking & debate', 'Sports & athletics', 'Leadership roles', 'Academic resilience'],
    values: ['Courage', 'Resilience', 'Confidence'],
    crest: {
      src: '/images/houses/marium-mukhtiar-house.jpg',
      alt: 'Marium Mukhtiar House crest — Soar with Courage',
      width: 400,
      height: 480,
    },
    accentClass: 'from-emerald-700 to-emerald-900',
    seo: {
      title: 'Marium Mukhtiar House',
      description:
        'Marium Mukhtiar House at Pak Wattan — Soar with Courage. A house inspired by Pakistan\'s first female fighter pilot martyred in the line of duty.',
      keywords: 'Marium Mukhtiar house, Pak Wattan houses, soar with courage, PWSCS house system',
    },
  },
  {
    id: 'major-aziz-bhatti',
    name: 'Major Aziz Bhatti House',
    shortName: 'Major Aziz Bhatti',
    motto: 'Bravery in Action',
    description:
      'Named after Major Raja Aziz Bhatti Shaheed, this house represents courage, discipline, and selfless service to the nation. It inspires students to transform their values into meaningful actions and face every challenge with bravery and determination.',
    namesakeTitle: 'Major Raja Aziz Bhatti Shaheed, NH',
    namesakeBio:
      'Major Raja Aziz Bhatti Shaheed was awarded the Nishan-e-Haider for extraordinary bravery during the 1965 war. His unwavering defence of the nation stands as a timeless example of discipline, patriotism, and sacrifice.',
    focusAreas: ['Sports & drill', 'Discipline & conduct', 'Patriotic events', 'Team competitions'],
    values: ['Bravery', 'Discipline', 'Patriotism'],
    crest: {
      src: '/images/houses/major-aziz-bhatti-house.jpg',
      alt: 'Major Aziz Bhatti House crest — Bravery in Action',
      width: 400,
      height: 480,
    },
    accentClass: 'from-green-800 to-green-950',
    seo: {
      title: 'Major Aziz Bhatti House',
      description:
        'Major Aziz Bhatti House at Pak Wattan — Bravery in Action. Courage, discipline, and selfless service inspired by a national hero.',
      keywords: 'Aziz Bhatti house, Pak Wattan houses, bravery in action, PWSCS house system',
    },
  },
  {
    id: 'abdul-sattar-edhi',
    name: 'Abdul Sattar Edhi House',
    shortName: 'Abdul Sattar Edhi',
    motto: 'Serving Humanity, Saving Souls',
    description:
      'Inspired by the legendary humanitarian Abdul Sattar Edhi, this house promotes compassion, kindness, and service to others. Its members are encouraged to lead with empathy and make a meaningful difference in the lives of those around them.',
    namesakeTitle: 'Abdul Sattar Edhi',
    namesakeBio:
      'Abdul Sattar Edhi devoted his life to serving humanity through ambulance services, shelters, and relief work — asking for nothing in return. His legacy reminds us that true greatness lies in compassion and selfless service.',
    focusAreas: ['Community service', 'Kindness initiatives', 'Social responsibility', 'Peer support'],
    values: ['Compassion', 'Kindness', 'Service'],
    crest: {
      src: '/images/houses/abdul-sattar-edhi-house.jpg',
      alt: 'Abdul Sattar Edhi House crest — Serving Humanity, Saving Souls',
      width: 400,
      height: 480,
    },
    accentClass: 'from-teal-800 to-emerald-950',
    seo: {
      title: 'Abdul Sattar Edhi House',
      description:
        'Abdul Sattar Edhi House at Pak Wattan — Serving Humanity, Saving Souls. Compassion, kindness, and service inspired by a legendary humanitarian.',
      keywords: 'Edhi house, Pak Wattan houses, serving humanity, PWSCS house system',
    },
  },
  {
    id: 'dr-abdul-qadeer-khan',
    name: 'Dr. Abdul Qadeer Khan House',
    shortName: 'Dr. Abdul Qadeer Khan',
    motto: 'Knowledge for Innovation, Excellence for the Nation',
    description:
      'Named after Dr. Abdul Qadeer Khan, this house celebrates knowledge, scientific curiosity, innovation, and excellence. It inspires students to pursue learning with purpose and contribute their skills and ideas towards the progress of the nation.',
    namesakeTitle: 'Dr. Abdul Qadeer Khan',
    namesakeBio:
      'Dr. Abdul Qadeer Khan was a distinguished scientist whose work strengthened Pakistan\'s scientific standing. His house encourages curiosity, research-minded thinking, and the pursuit of excellence for national progress.',
    focusAreas: ['Science fairs & models', 'Quiz competitions', 'Innovation projects', 'Academic excellence'],
    values: ['Knowledge', 'Innovation', 'Excellence'],
    crest: {
      src: '/images/houses/dr-abdul-qadeer-khan-house.jpg',
      alt: 'Dr. Abdul Qadeer Khan House crest — Knowledge for Innovation, Excellence for the Nation',
      width: 400,
      height: 480,
    },
    accentClass: 'from-lime-900 to-green-950',
    seo: {
      title: 'Dr. Abdul Qadeer Khan House',
      description:
        'Dr. Abdul Qadeer Khan House at Pak Wattan — Knowledge for Innovation, Excellence for the Nation. Science, curiosity, and academic excellence.',
      keywords: 'Abdul Qadeer Khan house, Pak Wattan houses, innovation excellence, PWSCS house system',
    },
  },
] as const

/** Current academic year label for standings display */
export const HOUSE_STANDINGS_SEASON = '2025–26'

/**
 * Inter-house points — update this array when results are published.
 * Leave empty to show the “awaiting results” state on the site.
 */
export const HOUSE_STANDINGS: readonly { houseId: HouseId; points: number }[] = []

export const HOUSE_STANDINGS_NOTE =
  'Standings are updated after inter-house sports, quiz, and co-curricular events throughout the academic year.'

export const HOUSE_OPTIONS = HOUSES.map((house) => ({
  value: house.name,
  label: house.name,
  id: house.id,
}))

export function getHouseById(id: string): House | undefined {
  return HOUSES.find((house) => house.id === id)
}

export function getAllHouseIds(): HouseId[] {
  return HOUSES.map((house) => house.id)
}

export function getSortedHouseStandings(): {
  house: House
  points: number
  rank: number
}[] {
  const pointsMap = new Map(HOUSE_STANDINGS.map((row) => [row.houseId, row.points]))

  const rows = HOUSES.map((house) => ({
    house,
    points: pointsMap.get(house.id) ?? 0,
  }))

  rows.sort((a, b) => b.points - a.points)

  return rows.map((row, index) => ({
    ...row,
    rank: index + 1,
  }))
}

export function hasPublishedStandings(): boolean {
  return HOUSE_STANDINGS.length > 0
}

export function isPakWattanSchoolName(school: string): boolean {
  const normalized = school.toLowerCase()
  return (
    normalized.includes('pak wattan') ||
    normalized.includes('pakwattan') ||
    normalized.includes('pwscs')
  )
}
