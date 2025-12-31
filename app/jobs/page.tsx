import { Metadata } from 'next'
import JobsHero from '@/components/jobs/JobsHero'
import JobApplicationForm from '@/components/jobs/JobApplicationForm'
import Container from '@/components/ui/Container'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'

export const metadata: Metadata = generatePageMetadata({
	title: 'Job Opportunities',
	description: 'Apply for teaching positions at Pak Wattan School & College of Sciences for Academic Session 2026-27. Join our team of dedicated educators and make a difference in students\' lives.',
	keywords: 'jobs, pak wattan jobs, teaching jobs, school jobs, havelian jobs, teacher positions, academic session 2026-27',
	path: '/jobs',
})

export default function JobsPage() {
	const breadcrumbs = generateBreadcrumbSchema([
		{ name: 'Home', url: 'https://pakwattan.edu.pk' },
		{ name: 'Jobs', url: 'https://pakwattan.edu.pk/jobs' },
	])

	return (
		<>
			<StructuredData data={breadcrumbs} />
			<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
				{/* Hero Section */}
				<JobsHero />

				{/* Application Form Section */}
				<section className="py-12 md:py-16 lg:py-20">
					<Container>
						<JobApplicationForm />
					</Container>
				</section>
			</div>
		</>
	)
}
