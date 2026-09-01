import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HouseDetail from '@/components/school-life/HouseDetail'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import { getAllHouseIds, getHouseById } from '@/lib/houses-data'

type PageProps = {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllHouseIds().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const house = getHouseById(params.slug)
  if (!house) {
    return generatePageMetadata({
      title: 'House Not Found',
      description: 'The requested house page could not be found.',
      path: '/school-life',
      indexable: false,
    })
  }

  return generatePageMetadata({
    title: house.seo.title,
    description: house.seo.description,
    keywords: house.seo.keywords,
    path: `/school-life/houses/${house.id}`,
    image: house.crest.src,
  })
}

export default function HousePage({ params }: PageProps) {
  const house = getHouseById(params.slug)
  if (!house) notFound()

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'School Life', url: 'https://pakwattan.edu.pk/school-life' },
    { name: 'House System', url: 'https://pakwattan.edu.pk/school-life#house-system' },
    { name: house.name, url: `https://pakwattan.edu.pk/school-life/houses/${house.id}` },
  ])

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <HouseDetail house={house} />
    </>
  )
}
