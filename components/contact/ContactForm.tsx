'use client'

import { useMemo, useState } from 'react'
import { createContact } from '@/lib/api/contact'
import { User, Mail, Phone, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react'
import FormField from '@/components/ui/FormField'
import Container from '@/components/ui/Container'

type FormErrors = Partial<Record<'name' | 'email' | 'phone' | 'subject' | 'message', string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PK_PHONE_RE = /^(\+92|0)?3\d{9}$|^(\+92|0)?\d{2,4}[- ]?\d{6,8}$/

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const errors = useMemo(() => {
    const next: FormErrors = {}
    const name = formData.name.trim()
    const email = formData.email.trim()
    const phone = formData.phone.trim().replace(/[\s-]/g, '')
    const message = formData.message.trim()

    if (!name) next.name = 'Full name is required'
    else if (name.length < 2) next.name = 'Enter at least 2 characters'
    else if (name.length > 80) next.name = 'Name must be under 80 characters'

    if (!email) next.email = 'Email is required'
    else if (!EMAIL_RE.test(email)) next.email = 'Enter a valid email address'

    if (phone && !PK_PHONE_RE.test(phone)) {
      next.phone = 'Use a valid Pakistan phone number'
    }

    if (!formData.subject) next.subject = 'Please select a subject'

    if (!message) next.message = 'Message is required'
    else if (message.length < 10) next.message = 'Please write at least 10 characters'
    else if (message.length > 2000) next.message = 'Message must be under 2000 characters'

    return next
  }, [formData])

  const isValid = Object.keys(errors).length === 0

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTouched({ name: true, email: true, phone: true, subject: true, message: true })
    if (!isValid) return

    setIsSubmitting(true)
    setError(null)

    try {
      await createContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        subject: formData.subject,
        message: formData.message.trim(),
      })
      setIsSubmitted(true)
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to send your message. Please try again or contact us on WhatsApp.'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 min-h-[44px] ${
      touched[field] && errors[field]
        ? 'border-red-400 focus:ring-red-400'
        : 'border-gray-300 focus:ring-primary-500'
    }`

  if (isSubmitted) {
    return (
      <section className="py-10 sm:py-12 lg:py-14 bg-gradient-to-br from-green-50 to-primary-50">
        <Container>
          <div className="max-w-xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 animate-fade-in-up">
              <div className="relative w-20 h-20 mx-auto mb-5">
                <span className="absolute inset-0 rounded-full bg-green-400/30 animate-ping" />
                <div className="relative w-20 h-20 bg-green-100 rounded-full flex items-center justify-center scale-100 animate-[bounce_0.7s_ease-out_1]">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-josefin text-secondary-800 mb-3">
                Message Sent!
              </h2>
              <p className="text-secondary-600 mb-6 leading-relaxed">
                Thank you for contacting Pak Wattan. We&apos;ll review your inquiry and respond soon.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false)
                  setTouched({})
                  setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
                }}
                className="btn-primary min-h-[48px]"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section id="contact-form" className="scroll-mt-20 py-10 sm:py-12 lg:py-14 bg-gradient-to-br from-secondary-50 to-primary-50">
      <Container>
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-3">
            Send us a <span className="text-gradient">Message</span>
          </h2>
          <p className="text-sm sm:text-base text-secondary-600 max-w-2xl mx-auto">
            Questions about admissions or programs? We&apos;d love to help.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-secondary-100">
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 px-5 py-4">
              <h3 className="text-lg sm:text-xl font-bold text-white text-center">Contact Form</h3>
            </div>

            <form onSubmit={handleSubmit} noValidate className="p-5 sm:p-8 space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  label={
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Full Name
                    </span>
                  }
                  required
                  htmlFor="name"
                  error={touched.name ? errors.name : undefined}
                >
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('name')}
                    maxLength={80}
                    aria-invalid={!!(touched.name && errors.name)}
                    className={fieldClass('name')}
                    placeholder="Enter your full name"
                  />
                </FormField>

                <FormField
                  label={
                    <span className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Address
                    </span>
                  }
                  required
                  htmlFor="email"
                  error={touched.email ? errors.email : undefined}
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('email')}
                    maxLength={120}
                    aria-invalid={!!(touched.email && errors.email)}
                    className={fieldClass('email')}
                    placeholder="name@example.com"
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  label={
                    <span className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Phone Number
                    </span>
                  }
                  htmlFor="phone"
                  error={touched.phone ? errors.phone : undefined}
                >
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('phone')}
                    aria-invalid={!!(touched.phone && errors.phone)}
                    className={fieldClass('phone')}
                    placeholder="03XX-XXXXXXX"
                  />
                </FormField>

                <FormField
                  label="Subject"
                  required
                  htmlFor="subject"
                  error={touched.subject ? errors.subject : undefined}
                >
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('subject')}
                    aria-invalid={!!(touched.subject && errors.subject)}
                    className={fieldClass('subject')}
                  >
                    <option value="">Select a subject</option>
                    <option value="admission">Admission Inquiry</option>
                    <option value="scholarship">Scholarship Information</option>
                    <option value="academic">Academic Programs</option>
                    <option value="general">General Information</option>
                    <option value="other">Other</option>
                  </select>
                </FormField>
              </div>

              <FormField
                label={
                  <span className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message
                  </span>
                }
                required
                htmlFor="message"
                error={touched.message ? errors.message : undefined}
              >
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('message')}
                  rows={5}
                  maxLength={2000}
                  aria-invalid={!!(touched.message && errors.message)}
                  className={`${fieldClass('message')} resize-y min-h-[120px]`}
                  placeholder="Tell us how we can help you..."
                />
                <p className="text-xs text-secondary-500 mt-1 text-right">
                  {formData.message.trim().length}/2000
                </p>
              </FormField>

              <div className="text-center pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-primary min-h-[48px] px-8 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ContactForm
