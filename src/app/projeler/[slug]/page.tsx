import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import getDb from '@/lib/db'
import AnimatedSection from '@/components/ui/AnimatedSection'
import {
  HiOutlineLocationMarker,
  HiOutlineCurrencyDollar,
  HiOutlineTemplate,
  HiOutlineCheckCircle,
  HiOutlineArrowLeft,
} from 'react-icons/hi'

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const db = getDb()
  const project = db
    .prepare('SELECT title, description FROM projects WHERE slug = ?')
    .get(params.slug) as any

  if (!project) return { title: 'Proje Bulunamadı' }

  return {
    title: project.title,
    description: project.description || `${project.title} - Yazıcı 55 İnşaat projesi`,
  }
}

export default function ProjectDetailPage({ params }: Props) {
  const db = getDb()
  const project = db
    .prepare('SELECT * FROM projects WHERE slug = ?')
    .get(params.slug) as any

  if (!project) notFound()

  const features: string[] = (() => {
    try {
      return JSON.parse(project.features || '[]')
    } catch {
      return []
    }
  })()

  const images: string[] = (() => {
    try {
      return JSON.parse(project.images || '[]')
    } catch {
      return []
    }
  })()

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-custom">
          {/* Back Button */}
          <AnimatedSection>
            <Link
              href="/projeler"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-neon transition-colors mb-8 text-sm"
            >
              <HiOutlineArrowLeft size={18} />
              Tüm Projeler
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Main Image */}
              <AnimatedSection>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-200 mb-6">
                  {project.image_url ? (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Görsel Yok</span>
                    </div>
                  )}
                </div>
              </AnimatedSection>

              {/* Gallery */}
              {images.length > 0 && (
                <AnimatedSection>
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {images.map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-video rounded-lg overflow-hidden border border-gray-200"
                      >
                        <Image
                          src={img}
                          alt={`${project.title} - ${i + 1}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* Content */}
              <AnimatedSection>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                  {project.title}
                </h1>
                {project.location && (
                  <div className="flex items-center gap-2 text-gray-600 mb-6">
                    <HiOutlineLocationMarker className="text-neon" size={20} />
                    {project.location}
                  </div>
                )}
                <div className="prose max-w-none">
                  <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {project.content || project.description}
                  </div>
                </div>
              </AnimatedSection>

              {/* Features */}
              {features.length > 0 && (
                <AnimatedSection className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Proje Özellikleri
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-gray-700 text-sm bg-gray-50 rounded-lg p-3 border border-gray-200"
                      >
                        <HiOutlineCheckCircle className="text-neon shrink-0" size={18} />
                        {feature}
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* Map */}
              {project.map_url && (
                <AnimatedSection className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Konum</h2>
                  <div className="rounded-xl overflow-hidden border border-gray-200">
                    <iframe
                      src={project.map_url}
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Proje Konumu"
                    />
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection direction="right">
                <div className="card-dark p-6 sticky top-28">
                  <div className="mb-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'aktif'
                          ? 'bg-neon/20 text-neon border border-neon/30'
                          : project.status === 'yakında'
                          ? 'bg-gold/20 text-gold border border-gold/30'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {project.status === 'aktif'
                        ? 'Satışta'
                        : project.status === 'yakında'
                        ? 'Yakında'
                        : 'Tamamlandı'}
                    </span>
                  </div>

                  {project.price && (
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                      <HiOutlineCurrencyDollar className="text-gold" size={22} />
                      <div>
                        <p className="text-xs text-gray-600">Başlangıç Fiyatı</p>
                        <p className="text-xl font-bold text-gold">{project.price}</p>
                      </div>
                    </div>
                  )}

                  {project.area && (
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                      <HiOutlineTemplate className="text-neon" size={22} />
                      <div>
                        <p className="text-xs text-gray-600">Proje Alanı</p>
                        <p className="text-lg font-semibold text-gray-800">{project.area}</p>
                      </div>
                    </div>
                  )}

                  {project.rooms && (
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                      <HiOutlineTemplate className="text-neon" size={22} />
                      <div>
                        <p className="text-xs text-gray-600">Oda Tipi</p>
                        <p className="text-lg font-semibold text-gray-800">{project.rooms}</p>
                      </div>
                    </div>
                  )}

                  <Link
                    href={`/iletisim?konu=${encodeURIComponent(project.title)}`}
                    className="btn-primary w-full text-center block mb-3"
                  >
                    Bilgi Al
                  </Link>
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || '905551234567'}?text=${encodeURIComponent(
                      `Merhaba, ${project.title} projesi hakkında bilgi almak istiyorum.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline w-full text-center block"
                  >
                    WhatsApp ile İletişim
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
