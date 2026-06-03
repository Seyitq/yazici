import { Metadata } from 'next'
import getDb from '@/lib/db'
import AnimatedSection from '@/components/ui/AnimatedSection'
import GaleriClient from '@/components/ui/GalleryClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Galeri',
  description: 'Yazıcı 55 İnşaat proje görselleri ve galeri. İnşaat projelerimizin fotoğraflarını inceleyin.',
}

export default function GaleriPage() {
  const db = getDb()
  const images = db
    .prepare(
      `SELECT id, title, image_url, category FROM gallery ORDER BY created_at DESC`
    )
    .all() as any[]

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="section-padding !pb-10 relative">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center">
            <span className="text-neon text-sm font-semibold uppercase tracking-widest">
              Galeri
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-800 mt-3 mb-4">
              Proje <span className="text-neon">Görselleri</span>
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Projelerimizden seçme görseller ve mekanlarımızın detayları.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding !pt-4">
        <div className="container-custom">
          {images.length > 0 ? (
            <GaleriClient images={images} />
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Henüz galeri görseli eklenmemiş.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
