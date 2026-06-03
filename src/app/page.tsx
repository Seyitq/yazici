import Hero from '@/components/home/Hero'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import Stats from '@/components/home/Stats'
import AboutPreview from '@/components/home/AboutPreview'
import CTASection from '@/components/home/CTASection'
import getDb from '@/lib/db'

export default function HomePage() {
  const db = getDb()
  const projects = db
    .prepare(
      `SELECT id, title, slug, description, location, price, area, status, image_url 
       FROM projects 
       ORDER BY created_at DESC 
       LIMIT 6`
    )
    .all() as any[]

  return (
    <>
      <Hero />
      <FeaturedProjects projects={projects} />
      <Stats />
      <AboutPreview />
      <CTASection />
    </>
  )
}
