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
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp'
import StickyApplyNow from '@/components/ui/StickyApplyNow'
import { getGlobalStructuredData } from '@/lib/seo/siteSchemas'
// Initialize token refresh service
import '@/lib/services/tokenRefresh'

export const metadata: Metadata = {
  title: {
    default: 'Pak Wattan School & College of Sciences | Best School in Havelian',
    template: `%s | Pak Wattan School & College of Sciences`,
  },
  description:
    'Pak Wattan School & College of Sciences, Havelian — quality education since 2020. SSC Havelian Circle toppers, scholarships, Montessori to FSc, and affordable excellence in KPK.',
  keywords:
    'Pak Wattan, PWSCS, Havelian school, best school in Havelian, Abbottabad schools, KPK education, SSC toppers, FSc college Havelian, Pak Wattan admission',
  authors: [{ name: 'Pak Wattan School & College of Sciences Havelian' }],
  creator: 'Pak Wattan School & College of Sciences',
  publisher: 'Pak Wattan School & College of Sciences',
  applicationName: 'Pak Wattan School & College of Sciences',
  category: 'education',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pakwattan.edu.pk'),
  openGraph: {
    title: 'Pak Wattan School & College of Sciences | Best School in Havelian',
    description:
      'Quality education in Havelian, KPK since 2020. Circle toppers, scholarships, and campuses for boys and girls.',
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
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Pak Wattan School & College of Sciences | Best School in Havelian',
    description:
      'Quality education in Havelian, KPK since 2020. Circle toppers, scholarships, and campuses for boys and girls.',
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
  // Global structured data: Organization, School, LocalBusiness, WebSite + SearchAction
  const globalSchemas = getGlobalStructuredData()

  return (
    <html lang="en" className="font-sans">
      <head>
        <StructuredData data={globalSchemas} />
        {/* Resource hints for external domains - improve connection speed */}
        {/* Google Fonts - Critical for initial render (preload + stylesheet reduces CLS) */}
        {/* eslint-disable @next/next/google-font-preconnect, @next/next/no-page-custom-font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Josefin+Sans:wght@100..700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Josefin+Sans:wght@100..700&display=swap"
        />
        {/* eslint-enable @next/next/google-font-preconnect, @next/next/no-page-custom-font */}
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
          <FloatingWhatsApp />
          <StickyApplyNow />
        </NotificationProvider>
      </body>
    </html>
  )
}
