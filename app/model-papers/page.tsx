import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import ModelPapersHero from '@/components/model-papers/ModelPapersHero'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

// Lazy load below-fold components for better performance
const ModelPapersDetails = dynamic(() => import('@/components/model-papers/ModelPapersDetails'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const ModelPapersDownload = dynamic(() => import('@/components/model-papers/ModelPapersDownload'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

export const metadata: Metadata = generatePageMetadata({
  title: 'Model Papers',
  description: 'Download model papers and past papers for all grades at Pak Wattan School & College of Sciences. Practice with previous exam papers to excel in your tests.',
  keywords: 'model papers, past papers, exam papers, practice papers, pak wattan model papers, download papers',
  path: '/model-papers',
})

export default function ModelPapers() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Model Papers', url: 'https://pakwattan.edu.pk/model-papers' },
  ])
  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <ModelPapersHero />
        <ModelPapersDetails />
        <ModelPapersDownload />
      </div>
    </>
  )
}
