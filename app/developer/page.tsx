import Container from '@/components/ui/Container'
import { Code, Github, Linkedin, Mail, Globe, Heart } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Developer Information - Pak Wattan School & College of Sciences',
  description: 'Learn about the developer behind Pak Wattan School & College of Sciences website.',
  keywords: 'developer, website developer, pak wattan developer, web development',
}

export default function DeveloperPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <Container className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl mb-6 shadow-lg">
              <Code className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-800 font-josefin mb-4">
              Developer <span className="text-gradient">Information</span>
            </h1>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Built with passion and dedication for Pak Wattan School & College of Sciences
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-8 md:p-12 text-white">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white/30">
                  <Code className="w-16 h-16 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2 font-josefin">
                    Website Developer
                  </h2>
                  <p className="text-xl text-white/90 mb-4">
                    Custom-built website for Pak Wattan School & College of Sciences
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    This website has been carefully crafted using modern web technologies 
                    to provide an exceptional user experience for students, parents, and staff.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              {/* Technologies Used */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-secondary-800 mb-6 flex items-center">
                  <Code className="w-6 h-6 mr-2 text-primary-600" />
                  Technologies & Stack
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    'Next.js 14',
                    'React',
                    'TypeScript',
                    'Tailwind CSS',
                    'Node.js',
                    'PostgreSQL',
                  ].map((tech) => (
                    <div
                      key={tech}
                      className="bg-gradient-to-br from-primary-50 to-accent-50 p-4 rounded-xl border border-primary-100 text-center hover:shadow-md transition-shadow"
                    >
                      <p className="font-semibold text-secondary-700">{tech}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-secondary-800 mb-6 flex items-center">
                  <Globe className="w-6 h-6 mr-2 text-primary-600" />
                  Key Features
                </h3>
                <div className="space-y-3">
                  {[
                    'Responsive design for all devices',
                    'Fast loading and optimized performance',
                    'Secure authentication system',
                    'Real-time updates and notifications',
                    'Comprehensive dashboard for administrators',
                    'Student and parent portals',
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors"
                    >
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-secondary-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Section */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-2xl font-bold text-secondary-800 mb-6 flex items-center">
                  <Mail className="w-6 h-6 mr-2 text-primary-600" />
                  Get in Touch
                </h3>
                <p className="text-secondary-600 mb-6">
                  For technical inquiries, website updates, or collaboration opportunities, 
                  please reach out through the following channels:
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="mailto:developer@example.com"
                    className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Email</span>
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center">
            <p className="text-secondary-600 flex items-center justify-center space-x-2">
              <span>Made with</span>
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <span>for Pak Wattan School & College of Sciences</span>
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 mt-4 text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              <span>← Back to Home</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

