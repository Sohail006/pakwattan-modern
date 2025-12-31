import type { Metadata } from 'next'
import './globals.css'
import ConditionalLayout from '@/components/layout/ConditionalLayout'
import { NotificationProvider } from '@/components/notifications/NotificationProvider'
import ToastContainer from '@/components/ui/ToastContainer'
import ChunkErrorHandler from '@/components/ui/ChunkErrorHandler'
import Analytics from '@/components/Analytics'
import FontLoader from '@/components/layout/FontLoader'
import YouTubeScript from '@/components/layout/YouTubeScript'
import StructuredData from '@/components/seo/StructuredData'
import BackToTop from '@/components/ui/BackToTop'
import { generateOrganizationSchema } from '@/lib/seo/structuredData'
import { generateWebSiteSchema } from '@/lib/seo/structuredData'
// Initialize token refresh service
import '@/lib/services/tokenRefresh'

export const metadata: Metadata = {
  title: 'Pak Wattan School & College of Sciences - Havelian',
  description: 'Pak Wattan School & College of Sciences is one of the best schools in Havelian, KPK, established in 2020 providing best quality education in Pakistan.',
  keywords: 'Abbottabad schools, top-ranked schools in Pakistan, Pakistan best schools, top 10 schools in Pakistan, best school in Pakistan, best school in Abbottabad, best school in Havelian, best college in Abbottabad, best college in Havelian, Pakians Abbottabad, PWSC, Pak Wattan, Pak Wattan Coaching Academy',
  authors: [{ name: 'Pak Wattan School & College of Sciences Havelian' }],
  creator: 'Pak Wattan School & College of Sciences',
  publisher: 'Pak Wattan School & College of Sciences',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pakwattan.edu.pk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Pak Wattan School & College of Sciences Havelian',
    description: 'Pak Wattan School & College of Sciences is one of the best schools in Havelian, KPK, established in 2020 providing best quality education in Pakistan.',
    url: 'https://pakwattan.edu.pk',
    siteName: 'Pak Wattan School & College of Sciences',
    images: [
      {
        url: '/images/logo/logo_150x150.png',
        width: 150,
        height: 150,
        alt: 'Pak Wattan School & College of Sciences',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pak Wattan School & College of Sciences Havelian',
    description: 'Pak Wattan School & College of Sciences is one of the best schools in Havelian, KPK, established in 2020 providing best quality education in Pakistan.',
    images: ['/images/logo/logo_150x150.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? {
        google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      }
    : undefined,
  icons: {
    icon: [
      { url: '/favicons.ico' },
      { url: '/favicon-16x16.jpg', sizes: '16x16', type: 'image/jpeg' },
      { url: '/favicon-32x32.jpg', sizes: '32x32', type: 'image/jpeg' },
    ],
  },
  other: {
    'theme-color': '#24744f',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Organization structured data
  const organizationSchema = generateOrganizationSchema({
    name: 'Pak Wattan School & College of Sciences',
    url: 'https://pakwattan.edu.pk',
    logo: 'https://pakwattan.edu.pk/images/logo/logo_150x150.png',
    contactPoint: {
      telephone: '+92-318-0821377',
      contactType: 'Customer Service',
      email: 'pakwattan2020@gmail.com',
    },
    address: {
      addressLocality: 'Havelian',
      addressRegion: 'Khyber Pakhtunkhwa',
      addressCountry: 'PK',
    },
    sameAs: [
      'https://www.facebook.com/PAKWATTAN2020',
    ],
  })

  // Website structured data
  const websiteSchema = generateWebSiteSchema('https://pakwattan.edu.pk')

  return (
    <html lang="en" className="font-sans">
      <head>
        <StructuredData data={[organizationSchema, websiteSchema]} />
        {/* Resource hints for external domains - improve connection speed */}
        {/* Google Fonts - Critical for initial render */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        {/* YouTube & Google APIs */}
        <link rel="preconnect" href="https://www.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googleapis.com" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        {/* Facebook */}
        <link rel="preconnect" href="https://www.facebook.com" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        {/* Google Maps */}
        <link rel="preconnect" href="https://maps.google.com" />
        <link rel="dns-prefetch" href="https://maps.google.com" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <FontLoader />
        <YouTubeScript />
        <NotificationProvider>
          <ChunkErrorHandler />
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <ToastContainer />
          <Analytics />
          <BackToTop />
        </NotificationProvider>
      </body>
    </html>
  )
}
