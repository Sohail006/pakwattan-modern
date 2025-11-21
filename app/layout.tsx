import type { Metadata } from 'next'
import { Inter, Josefin_Sans } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/components/layout/ConditionalLayout'
import { NotificationProvider } from '@/components/notifications/NotificationProvider'
import ToastContainer from '@/components/ui/ToastContainer'
import Analytics from '@/components/Analytics'
// Initialize token refresh service
import '@/lib/services/tokenRefresh'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const josefin = Josefin_Sans({ 
  subsets: ['latin'],
  variable: '--font-josefin',
  display: 'swap',
})

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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${josefin.variable}`}>
      <head>
        <link rel="icon" href="/favicons.ico" />
        <link rel="icon" type="image/jpeg" sizes="16x16" href="/favicon-16x16.jpg" />
        <link rel="icon" type="image/jpeg" sizes="32x32" href="/favicon-32x32.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#24744f" />
        <script src="https://www.youtube.com/player_api" async></script>
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <NotificationProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <ToastContainer />
          <Analytics />
        </NotificationProvider>
      </body>
    </html>
  )
}
