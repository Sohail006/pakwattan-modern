import { Metadata } from 'next'
import JobsHero from '@/components/jobs/JobsHero'
import JobApplicationForm from '@/components/jobs/JobApplicationForm'
import Container from '@/components/ui/Container'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import {
	generateBreadcrumbSchema,
	generateJobPostingSchema,
} from '@/lib/seo/structuredData'

export const metadata: Metadata = generatePageMetadata({
	title: 'Teaching Jobs 2026-27 | Apply Online',
	description:
		'Apply online for teaching jobs at Pak Wattan School & College of Sciences, Havelian for Academic Session 2026-27. Full-time faculty positions across subjects.',
	keywords:
		'teaching jobs Havelian, Pak Wattan jobs, school teacher jobs Abbottabad, FSc teacher vacancy, SSC teacher jobs KPK, academic session 2026-27',
	path: '/jobs',
})

export default function JobsPage() {
	const breadcrumbs = generateBreadcrumbSchema([
		{ name: 'Home', url: 'https://pakwattan.edu.pk' },
		{ name: 'Jobs', url: 'https://pakwattan.edu.pk/jobs' },
	])
	const jobPosting = generateJobPostingSchema({
		title: 'Teaching Positions — Academic Session 2026-27',
		description:
			'Pak Wattan School & College of Sciences, Havelian is hiring dedicated teachers for Academic Session 2026-27. Apply online with your experience, subject expertise, and expected salary. Join a campus known for SSC and HSSC Havelian Circle excellence.',
		datePosted: '2026-01-01',
		validThrough: '2026-12-31',
		employmentType: 'FULL_TIME',
		hiringOrganizationLogo: 'https://pakwattan.edu.pk/images/logo/logo_150x150.png',
	})

	return (
		<>
			<StructuredData data={[breadcrumbs, jobPosting]} />
			<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 pb-20 md:pb-0">
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
