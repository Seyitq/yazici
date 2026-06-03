import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import getDb from '@/lib/db'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { HiOutlineCalendar, HiOutlineUser, HiOutlineArrowLeft, HiOutlineTag } from 'react-icons/hi'

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const db = getDb()
  const post = db
    .prepare('SELECT title, excerpt FROM blog_posts WHERE slug = ?')
    .get(params.slug) as any

  if (!post) return { title: 'Yazı Bulunamadı' }

  return {
    title: post.title,
    description: post.excerpt || `${post.title} - Yazıcı 55 İnşaat Blog`,
  }
}

export default function BlogDetailPage({ params }: Props) {
  const db = getDb()
  const post = db
    .prepare('SELECT * FROM blog_posts WHERE slug = ? AND is_published = 1')
    .get(params.slug) as any

  if (!post) notFound()

  const date = new Date(post.created_at).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Related posts
  const relatedPosts = db
    .prepare(
      `SELECT id, title, slug, excerpt, image_url, category, created_at, author
       FROM blog_posts 
       WHERE is_published = 1 AND id != ? 
       ORDER BY created_at DESC 
       LIMIT 3`
    )
    .all(post.id) as any[]

  return (
    <div className="pt-24">
      <article className="section-padding">
        <div className="container-custom max-w-4xl">
          {/* Back Button */}
          <AnimatedSection>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-neon transition-colors mb-8 text-sm"
            >
              <HiOutlineArrowLeft size={18} />
              Tüm Yazılar
            </Link>
          </AnimatedSection>

          {/* Header */}
          <AnimatedSection>
            <div className="mb-8">
              {post.category && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 mb-4">
                  <HiOutlineTag className="text-neon" size={14} />
                  <span className="text-neon text-sm">{post.category}</span>
                </div>
              )}
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-5 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <div className="flex items-center gap-2">
                  <HiOutlineUser size={16} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineCalendar size={16} />
                  <span>{date}</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Featured Image */}
          {post.image_url && (
            <AnimatedSection>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-200 mb-10">
                <Image
                  src={post.image_url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </AnimatedSection>
          )}

          {/* Content */}
          <AnimatedSection>
            <div className="prose max-w-none">
              <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                {post.content}
              </div>
            </div>
          </AnimatedSection>

          {/* Share & Tags */}
          <AnimatedSection className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="text-neon hover:text-neon-dim transition-colors text-sm font-medium"
              >
                ← Tüm Yazılar
              </Link>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `${post.title} - Yazıcı 55 İnşaat Blog`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-neon transition-colors text-sm"
              >
                WhatsApp ile Paylaş
              </a>
            </div>
          </AnimatedSection>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <AnimatedSection className="mt-16">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                Diğer Yazılar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/blog/${rp.slug}`}
                    className="card-dark p-4 group"
                  >
                    <h3 className="text-sm font-semibold text-gray-800 group-hover:text-neon transition-colors line-clamp-2 mb-2">
                      {rp.title}
                    </h3>
                    <p className="text-gray-600 text-xs line-clamp-2">
                      {rp.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          )}
        </div>
      </article>
    </div>
  )
}
