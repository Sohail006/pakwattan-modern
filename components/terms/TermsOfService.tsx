import { FileText, Users, GraduationCap, CreditCard, Shield, AlertTriangle, Phone } from 'lucide-react'

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-accent-600 to-primary-600">
        <div className="container-custom">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-josefin mb-4">
              Terms and Service
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
                  <a href="#acceptance" className="text-primary-600 hover:text-primary-700 transition-colors">2. Acceptance of Terms</a>
                  <a href="#admission" className="text-primary-600 hover:text-primary-700 transition-colors">3. Admission Terms</a>
                  <a href="#academic" className="text-primary-600 hover:text-primary-700 transition-colors">4. Academic Policies</a>
                  <a href="#fees" className="text-primary-600 hover:text-primary-700 transition-colors">5. Fee Structure</a>
                  <a href="#conduct" className="text-primary-600 hover:text-primary-700 transition-colors">6. Student Conduct</a>
                  <a href="#parent-obligations" className="text-primary-600 hover:text-primary-700 transition-colors">7. Parent/Guardian Obligations</a>
                  <a href="#website-usage" className="text-primary-600 hover:text-primary-700 transition-colors">8. Website Usage</a>
                  <a href="#intellectual-property" className="text-primary-600 hover:text-primary-700 transition-colors">9. Intellectual Property</a>
                  <a href="#liability" className="text-primary-600 hover:text-primary-700 transition-colors">10. Limitation of Liability</a>
                  <a href="#termination" className="text-primary-600 hover:text-primary-700 transition-colors">11. Termination</a>
                  <a href="#contact" className="text-primary-600 hover:text-primary-700 transition-colors">12. Contact Information</a>
                </div>
              </div>

              {/* Terms Content */}
              <div className="p-8 space-y-8">
                {/* Introduction */}
                <section id="introduction">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-primary-600" />
                    1. Introduction
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Welcome to Pak Wattan School & College of Sciences, Havelian. These Terms and Service ("Terms") govern your use of our educational services, website, and all related activities. By enrolling your child, using our services, or accessing our website, you agree to be bound by these Terms.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      These Terms apply to all students, parents, guardians, staff members, and website visitors associated with Pak Wattan School & College of Sciences.
                    </p>
                  </div>
                </section>

                {/* Acceptance of Terms */}
                <section id="acceptance">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-primary-600" />
                    2. Acceptance of Terms
                  </h2>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
                    </p>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Parents/Guardians must accept these Terms during the admission process</li>
                      <li>• Students are bound by these Terms through their parents/guardians</li>
                      <li>• Staff members must acknowledge these Terms as part of their employment</li>
                      <li>• Website visitors agree to these Terms by using our website</li>
                    </ul>
                  </div>
                </section>

                {/* Admission Terms */}
                <section id="admission">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Users className="w-6 h-6 mr-3 text-primary-600" />
                    3. Admission Terms
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-800 mb-3">Application Process</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• All applications must be submitted through our official channels</li>
                        <li>• Complete application forms with accurate information</li>
                        <li>• Submission of required documents and certificates</li>
                        <li>• Payment of application and admission fees</li>
                        <li>• Attendance at admission interviews and tests</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-3">Eligibility Criteria</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Age-appropriate enrollment for each grade level</li>
                        <li>• Previous academic records and performance</li>
                        <li>• Medical fitness certificate</li>
                        <li>• Character references and recommendations</li>
                        <li>• Compliance with admission requirements</li>
                      </ul>
                    </div>

                    <div className="bg-red-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-red-800 mb-3">Admission Decisions</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Admission decisions are final and non-negotiable</li>
                        <li>• Limited seats available for each class</li>
                        <li>• Merit-based selection process</li>
                        <li>• No guarantee of admission for any applicant</li>
                        <li>• Right to refuse admission without explanation</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Academic Policies */}
                <section id="academic">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <GraduationCap className="w-6 h-6 mr-3 text-primary-600" />
                    4. Academic Policies
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Attendance Requirements</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Minimum 80% attendance required for promotion</li>
                        <li>• Medical certificates required for extended absences</li>
                        <li>• Prior permission required for planned absences</li>
                        <li>• Regular attendance monitoring and reporting</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Examination Rules</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• All examinations must be taken as scheduled</li>
                        <li>• No cheating or malpractice tolerated</li>
                        <li>• Proper examination conduct required</li>
                        <li>• Re-examination policies and procedures</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Grading System</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• A+ (90-100%), A (80-89%), B (70-79%), C (60-69%), D (50-59%), F (Below 50%)</li>
                        <li>• Continuous assessment throughout the academic year</li>
                        <li>• Final examination weightage as per board requirements</li>
                        <li>• Grade improvement opportunities available</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Fee Structure */}
                <section id="fees">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <CreditCard className="w-6 h-6 mr-3 text-primary-600" />
                    5. Fee Structure
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-800 mb-3">Payment Terms</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Monthly fees due by the 10th of each month</li>
                        <li>• Annual fees payable at the beginning of academic year</li>
                        <li>• Transportation fees separate from tuition fees</li>
                        <li>• Late payment charges applicable after due date</li>
                      </ul>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-orange-800 mb-3">Late Fee Policy</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Rs. 500 late fee after 10th of the month</li>
                        <li>• Rs. 1000 late fee after 20th of the month</li>
                        <li>• Additional charges for extended delays</li>
                        <li>• Service suspension for non-payment beyond 30 days</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-800 mb-3">Refund Policy</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• No refunds after 30 days of admission</li>
                        <li>• Partial refunds for early withdrawal (before 30 days)</li>
                        <li>• Security deposits refundable upon proper clearance</li>
                        <li>• Refund processing time: 15-30 working days</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Student Conduct */}
                <section id="conduct">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-primary-600" />
                    6. Student Conduct
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-red-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-red-800 mb-3">Code of Conduct</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Respect for teachers, staff, and fellow students</li>
                        <li>• No bullying, harassment, or discrimination</li>
                        <li>• Proper dress code and grooming standards</li>
                        <li>• No use of mobile phones during school hours</li>
                        <li>• No smoking, drugs, or alcohol on school premises</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-3">Disciplinary Procedures</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Verbal warning for minor infractions</li>
                        <li>• Written warning for repeated violations</li>
                        <li>• Parent meeting for serious misconduct</li>
                        <li>• Suspension for severe violations</li>
                        <li>• Expulsion for extreme cases</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Parent/Guardian Obligations */}
                <section id="parent-obligations">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Users className="w-6 h-6 mr-3 text-primary-600" />
                    7. Parent/Guardian Obligations
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-purple-800 mb-3">Responsibilities</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Ensure regular attendance and punctuality</li>
                        <li>• Support child's academic progress at home</li>
                        <li>• Attend parent-teacher meetings</li>
                        <li>• Provide necessary school supplies and materials</li>
                        <li>• Maintain communication with school administration</li>
                      </ul>
                    </div>

                    <div className="bg-indigo-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-indigo-800 mb-3">Emergency Procedures</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Keep emergency contact information updated</li>
                        <li>• Respond promptly to emergency notifications</li>
                        <li>• Provide accurate medical information</li>
                        <li>• Authorize emergency medical treatment if needed</li>
                        <li>• Ensure child's safety during transportation</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Website Usage */}
                <section id="website-usage">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-primary-600" />
                    8. Website Usage
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Acceptable Use</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Use website for legitimate educational purposes only</li>
                        <li>• Respect intellectual property rights</li>
                        <li>• No unauthorized access to restricted areas</li>
                        <li>• No posting of inappropriate content</li>
                        <li>• No spamming or malicious activities</li>
                      </ul>
                    </div>

                    <div className="bg-red-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-red-800 mb-3">Prohibited Activities</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Hacking or attempting to breach security</li>
                        <li>• Uploading viruses or malicious code</li>
                        <li>• Impersonating other users or school officials</li>
                        <li>• Harassment or cyberbullying</li>
                        <li>• Violation of any applicable laws</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Intellectual Property */}
                <section id="intellectual-property">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-primary-600" />
                    9. Intellectual Property
                  </h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      All content on our website, including text, images, videos, and educational materials, is protected by copyright and other intellectual property laws.
                    </p>
                    <ul className="text-gray-700 space-y-2">
                      <li>• School logo, name, and branding are trademarked</li>
                      <li>• Educational materials are proprietary to the school</li>
                      <li>• No reproduction without written permission</li>
                      <li>• Student work may be used for promotional purposes</li>
                      <li>• Proper attribution required for any authorized use</li>
                    </ul>
                  </div>
                </section>

                {/* Limitation of Liability */}
                <section id="liability">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-3 text-primary-600" />
                    10. Limitation of Liability
                  </h2>
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      To the maximum extent permitted by law, Pak Wattan School & College of Sciences shall not be liable for:
                    </p>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Any indirect, incidental, or consequential damages</li>
                      <li>• Loss of data, profits, or business opportunities</li>
                      <li>• Personal injury or property damage (except due to negligence)</li>
                      <li>• Service interruptions or technical difficulties</li>
                      <li>• Third-party actions or content</li>
                    </ul>
                  </div>
                </section>

                {/* Termination */}
                <section id="termination">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-primary-600" />
                    11. Termination
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-red-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-red-800 mb-3">Service Termination</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• School may terminate services for violation of terms</li>
                        <li>• Non-payment of fees may result in service suspension</li>
                        <li>• Serious misconduct may lead to immediate termination</li>
                        <li>• 30-day notice period for voluntary withdrawal</li>
                        <li>• Clearance process required before final departure</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Contact Information */}
                <section id="contact">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Phone className="w-6 h-6 mr-3 text-primary-600" />
                    12. Contact Information
                  </h2>
                  <div className="bg-primary-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      For questions about these Terms and Service, please contact us:
                    </p>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Email:</strong> info@pakwattan.edu.pk</p>
                      <p><strong>Phone:</strong> 0318 0821377</p>
                      <p><strong>Address:</strong> Azam Khan road, beside Mubarak Plaza, Havelian, Abbottabad, KPK, Pakistan</p>
                      <p><strong>Office Hours:</strong> Monday to Friday, 8:00 AM - 4:00 PM</p>
                    </div>
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

export default TermsOfService
