import { Metadata } from 'next'
import getDb from '@/lib/db'
import BlogCard from '@/components/ui/BlogCard'
import AnimatedSection from '@/components/ui/AnimatedSection'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Yazıcı 55 İnşaat blog yazıları. İnşaat sektörü haberleri ve bilgiler.',
}

export default function BlogPage() {
  const db = getDb()
  const posts = db
    .prepare(
      `SELECT id, title, slug, excerpt, image_url, category, author, created_at 
       FROM blog_posts 
       WHERE is_published = 1 
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
              Blog
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-800 mt-3 mb-4">
              Güncel <span className="text-neon">Yazılar</span>
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Gayrimenkul yatırımı, piyasa trendleri ve sektörel gelişmeler
              hakkında uzman görüşlerimizi okuyun.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-padding !pt-4">
        <div className="container-custom">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Henüz blog yazısı eklenmemiş.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
