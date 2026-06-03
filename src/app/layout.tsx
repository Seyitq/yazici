import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: {
    default: 'Yazıcı 55 İnşaat | Güvenilir İnşaat & Yapı',
    template: '%s | Yazıcı 55 İnşaat',
  },
  description:
    'Yazıcı 55 İnşaat ile kaliteli ve güvenilir inşaat projelerini keşfedin. Modern, sağlam ve değer katan yapılar inşa ediyoruz.',
  keywords: [
    'inşaat',
    'yapı',
    'konut',
    'proje',
    'yazıcı 55 inşaat',
    'müteahhit',
    'bina',
  ],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yazici55insaat.com',
    siteName: 'Yazıcı 55 İnşaat',
    title: 'Yazıcı 55 İnşaat | Güvenilir İnşaat & Yapı',
    description:
      'Yazıcı 55 İnşaat ile kaliteli inşaat projelerini keşfedin.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yazıcı 55 İnşaat | Güvenilir İnşaat & Yapı',
    description:
      'Yazıcı 55 İnşaat ile kaliteli inşaat projelerini keşfedin.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="font-sans">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid #2a2a2a',
            },
          }}
        />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
