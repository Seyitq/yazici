import Link from 'next/link'
import ProjectCard from '@/components/ui/ProjectCard'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { HiOutlineArrowRight } from 'react-icons/hi'

interface Project {
  id: number
  title: string
  slug: string
  description: string
  location: string
  price: string
  area: string
  status: string
  image_url: string
}

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="section-padding bg-dark-50 relative">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center mb-14">
          <span className="text-neon text-sm font-semibold uppercase tracking-widest">
            Projelerimiz
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-800 mt-3 mb-4">
            Öne Çıkan <span className="text-neon">Projeler</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Yatırım değeri yüksek, sürdürülebilir ve modern projelerimizi keşfedin.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <AnimatedSection className="text-center mt-12">
          <Link
            href="/projeler"
            className="inline-flex items-center gap-2 text-neon hover:text-neon-dim transition-colors font-medium"
          >
            Tüm Projeleri Gör
            <HiOutlineArrowRight size={18} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
