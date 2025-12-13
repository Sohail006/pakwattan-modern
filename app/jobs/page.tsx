import JobApplicationForm from '@/components/jobs/JobApplicationForm'

export const metadata = {
	title: 'Job Opportunities - Pak Wattan School',
	description: 'Apply for teaching positions at Pak Wattan School. Join our team of dedicated educators.',
}

export default function JobsPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Join Our Team</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Pak Wattan School is always looking for passionate and dedicated educators. If you&apos;re interested in making a difference in students&apos; lives, we&apos;d love to hear from you.
					</p>
				</div>

				<JobApplicationForm />
			</div>
		</div>
	)
}
