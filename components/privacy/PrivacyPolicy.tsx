import { Shield, Users, Database, Lock, Eye, Mail, Calendar } from 'lucide-react'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="container-custom">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-josefin mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Pak Wattan School & College of Sciences, Havelian
            </p>
            <p className="text-sm text-white/80 mt-2">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Table of Contents */}
              <div className="bg-gray-50 p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Table of Contents</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <a href="#introduction" className="text-primary-600 hover:text-primary-700 transition-colors">1. Introduction</a>
                  <a href="#information-collection" className="text-primary-600 hover:text-primary-700 transition-colors">2. Information We Collect</a>
                  <a href="#how-we-use" className="text-primary-600 hover:text-primary-700 transition-colors">3. How We Use Information</a>
                  <a href="#information-sharing" className="text-primary-600 hover:text-primary-700 transition-colors">4. Information Sharing</a>
                  <a href="#data-security" className="text-primary-600 hover:text-primary-700 transition-colors">5. Data Security</a>
                  <a href="#your-rights" className="text-primary-600 hover:text-primary-700 transition-colors">6. Your Rights</a>
                  <a href="#cookies" className="text-primary-600 hover:text-primary-700 transition-colors">7. Cookies and Tracking</a>
                  <a href="#third-party" className="text-primary-600 hover:text-primary-700 transition-colors">8. Third-Party Services</a>
                  <a href="#contact" className="text-primary-600 hover:text-primary-700 transition-colors">9. Contact Us</a>
                  <a href="#updates" className="text-primary-600 hover:text-primary-700 transition-colors">10. Policy Updates</a>
                </div>
              </div>

              {/* Privacy Policy Content */}
              <div className="p-8 space-y-8">
                {/* Introduction */}
                <section id="introduction">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-primary-600" />
                    1. Introduction
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      At Pak Wattan School & College of Sciences, Havelian, we are committed to protecting the privacy and security of all personal information collected from our students, parents, guardians, staff, and website visitors. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our educational services.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      This policy applies to all information collected through our website, mobile applications, and in-person interactions related to our educational services.
                    </p>
                  </div>
                </section>

                {/* Information We Collect */}
                <section id="information-collection">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Database className="w-6 h-6 mr-3 text-primary-600" />
                    2. Information We Collect
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Student Information
                      </h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Personal details (name, date of birth, gender, address)</li>
                        <li>• Academic records and performance data</li>
                        <li>• Medical information and emergency contacts</li>
                        <li>• Attendance records and disciplinary history</li>
                        <li>• Photographs and videos for school activities</li>
                        <li>• Parent/guardian contact information</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Parent/Guardian Information
                      </h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Contact details (phone, email, address)</li>
                        <li>• Employment information</li>
                        <li>• Emergency contact information</li>
                        <li>• Payment and billing information</li>
                        <li>• Communication preferences</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Staff Information
                      </h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Personal and professional details</li>
                        <li>• Employment records and performance data</li>
                        <li>• Educational qualifications and certifications</li>
                        <li>• Contact information and emergency contacts</li>
                        <li>• Financial information for payroll</li>
                      </ul>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-orange-800 mb-3 flex items-center">
                        <Database className="w-5 h-5 mr-2" />
                        Website Usage Data
                      </h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• IP address and browser information</li>
                        <li>• Pages visited and time spent on site</li>
                        <li>• Device information and operating system</li>
                        <li>• Cookies and similar tracking technologies</li>
                        <li>• Form submissions and inquiries</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* How We Use Information */}
                <section id="how-we-use">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Eye className="w-6 h-6 mr-3 text-primary-600" />
                    3. How We Use Information
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Educational Purposes</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Providing educational services and academic support</li>
                        <li>• Maintaining student records and academic progress</li>
                        <li>• Conducting assessments and evaluations</li>
                        <li>• Organizing school activities and events</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Communication</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Sending important school announcements</li>
                        <li>• Providing academic updates to parents</li>
                        <li>• Responding to inquiries and requests</li>
                        <li>• Emergency notifications and safety alerts</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Administrative Functions</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Processing admissions and enrollment</li>
                        <li>• Managing fee collection and billing</li>
                        <li>• Maintaining staff records and payroll</li>
                        <li>• Ensuring compliance with educational regulations</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Information Sharing */}
                <section id="information-sharing">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Users className="w-6 h-6 mr-3 text-primary-600" />
                    4. Information Sharing
                  </h2>
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      We do not sell, trade, or rent your personal information to third parties. We may share information only in the following limited circumstances:
                    </p>
                    <ul className="text-gray-700 space-y-2">
                      <li>• <strong>Educational Authorities:</strong> As required by educational boards and regulatory bodies</li>
                      <li>• <strong>Service Providers:</strong> Trusted third parties who assist in school operations (IT services, transportation, etc.)</li>
                      <li>• <strong>Legal Requirements:</strong> When required by law or to protect rights and safety</li>
                      <li>• <strong>Emergency Situations:</strong> To protect health and safety in emergency situations</li>
                      <li>• <strong>Parental Consent:</strong> With explicit consent from parents/guardians</li>
                    </ul>
                  </div>
                </section>

                {/* Data Security */}
                <section id="data-security">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Lock className="w-6 h-6 mr-3 text-primary-600" />
                    5. Data Security
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Technical Safeguards</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• SSL encryption for data transmission</li>
                          <li>• Secure servers and databases</li>
                          <li>• Regular security updates</li>
                          <li>• Access controls and authentication</li>
                        </ul>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Administrative Safeguards</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Staff training on data protection</li>
                          <li>• Limited access to personal information</li>
                          <li>• Regular security audits</li>
                          <li>• Incident response procedures</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Your Rights */}
                <section id="your-rights">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-primary-600" />
                    6. Your Rights
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      You have the following rights regarding your personal information:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-primary-600 text-sm font-bold">1</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Access</h4>
                            <p className="text-sm text-gray-600">Request access to your personal information</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-primary-600 text-sm font-bold">2</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Correction</h4>
                            <p className="text-sm text-gray-600">Request correction of inaccurate information</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-primary-600 text-sm font-bold">3</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Deletion</h4>
                            <p className="text-sm text-gray-600">Request deletion of personal information</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-primary-600 text-sm font-bold">4</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Portability</h4>
                            <p className="text-sm text-gray-600">Request transfer of your data</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-primary-600 text-sm font-bold">5</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Objection</h4>
                            <p className="text-sm text-gray-600">Object to certain processing activities</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-primary-600 text-sm font-bold">6</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Complaint</h4>
                            <p className="text-sm text-gray-600">Lodge a complaint with authorities</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Cookies and Tracking */}
                <section id="cookies">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Database className="w-6 h-6 mr-3 text-primary-600" />
                    7. Cookies and Tracking
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Our website uses cookies and similar technologies to enhance your browsing experience and analyze website usage.
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Types of Cookies We Use</h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-gray-700">Essential Cookies</h4>
                          <p className="text-sm text-gray-600">Required for website functionality and security</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700">Analytics Cookies</h4>
                          <p className="text-sm text-gray-600">Help us understand how visitors use our website</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700">Functional Cookies</h4>
                          <p className="text-sm text-gray-600">Remember your preferences and settings</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Third-Party Services */}
                <section id="third-party">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Users className="w-6 h-6 mr-3 text-primary-600" />
                    8. Third-Party Services
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      We may use third-party services that have their own privacy policies. These include:
                    </p>
                    <ul className="text-gray-700 space-y-2">
                      <li>• <strong>YouTube:</strong> For educational videos and content</li>
                      <li>• <strong>Google Analytics:</strong> For website traffic analysis</li>
                      <li>• <strong>Social Media Platforms:</strong> For sharing content and updates</li>
                      <li>• <strong>Payment Processors:</strong> For fee collection and transactions</li>
                      <li>• <strong>Email Services:</strong> For communication and notifications</li>
                    </ul>
                  </div>
                </section>

                {/* Contact Us */}
                <section id="contact">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Mail className="w-6 h-6 mr-3 text-primary-600" />
                    9. Contact Us
                  </h2>
                  <div className="bg-primary-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      If you have any questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Email:</strong> privacy@pakwattan.edu.pk</p>
                      <p><strong>Phone:</strong> 0318 0821377</p>
                      <p><strong>Address:</strong> Pak Wattan School & College of Sciences, Havelian, Pakistan</p>
                      <p><strong>Office Hours:</strong> Monday to Friday, 8:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </section>

                {/* Policy Updates */}
                <section id="updates">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Calendar className="w-6 h-6 mr-3 text-primary-600" />
                    10. Policy Updates
                  </h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the updated policy on our website and, where appropriate, through other communication channels.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy
