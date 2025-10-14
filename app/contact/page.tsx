import ContactHero from '@/components/contact/ContactHero'
import ContactInfo from '@/components/contact/ContactInfo'
import ContactForm from '@/components/contact/ContactForm'
import MapSection from '@/components/contact/MapSection'

export const metadata = {
  title: 'Contact Us - Pak Wattan School & College of Sciences',
  description: 'Get in touch with Pak Wattan School & College of Sciences. Find our contact information, location, and send us a message.',
  keywords: 'contact pak wattan, school contact, havelian school contact, pak wattan address, school phone number',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <MapSection />
    </div>
  )
}
