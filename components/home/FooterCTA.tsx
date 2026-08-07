import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { SCHOOL_INFO } from '@/lib/constants'

const FooterCTA = () => {
  const phone = SCHOOL_INFO.contact.whatsapp || '03348113302'
  const digits = phone.replace(/\D/g, '')
  const international = digits.startsWith('0') ? `92${digits.slice(1)}` : digits
  const waHref = `https://wa.me/${international}`

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-accent-600 text-white py-10 sm:py-12 lg:py-14">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,white,transparent_45%),radial-gradient(circle_at_80%_80%,#fda406,transparent_40%)]" />
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-10">
          <div className="flex-shrink-0">
            <Image
              src="/images/3.png"
              alt="Pak Wattan Logo"
              width={80}
              height={80}
              className="w-16 h-16 sm:w-20 sm:h-20"
              loading="lazy"
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <p className="text-accent-300 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
              Admissions Open
            </p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-josefin mb-2 sm:mb-3">
              Start Your Journey at Pak Wattan
            </h3>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Join a campus known for Havelian Circle toppers, caring teachers, and affordable excellence.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href="/admission"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-400 text-secondary-900 font-bold shadow-xl shadow-black/20 transition-all hover:scale-[1.02] active:scale-100"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-white text-primary-800 font-bold shadow-xl shadow-black/10 hover:bg-primary-50 transition-all hover:scale-[1.02] active:scale-100"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default FooterCTA
