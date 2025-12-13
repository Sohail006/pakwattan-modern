import JobsHero from '@/components/jobs/JobsHero'
import JobApplicationForm from '@/components/jobs/JobApplicationForm'
import Container from '@/components/ui/Container'

export const metadata = {
	title: 'Job Opportunities 2026-27 - Pak Wattan School',
	description: 'Apply for teaching positions at Pak Wattan School for Academic Session 2026-27. Join our team of dedicated educators.',
}

export default function JobsPage() {
	return (
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
	)
}
