import { Metadata } from 'next'
import getDb from '@/lib/db'
import ProjectCard from '@/components/ui/ProjectCard'
import AnimatedSection from '@/components/ui/AnimatedSection'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Projeler',
  description: 'Yazıcı 55 İnşaat projeleri. Kaliteli ve modern yapı projelerimizi keşfedin.',
}

export default function ProjelerPage() {
  const db = getDb()
  const projects = db
    .prepare(
      `SELECT id, title, slug, description, location, price, area, status, image_url 
       FROM projects 
       ORDER BY created_at DESC`
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
              Projelerimiz
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-800 mt-3 mb-4">
              Tüm <span className="text-neon">Projeler</span>
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Yüksek yatırım potansiyeline sahip, sürdürülebilir ve modern
              gayrimenkul projelerimizi inceleyin.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding !pt-4">
        <div className="container-custom">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Henüz proje eklenmemiş.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
