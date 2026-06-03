import { NextResponse } from 'next/server'
import getDb, { generateSlug } from '@/lib/db'

export async function GET() {
  try {
    const db = getDb()
    const posts = db
      .prepare('SELECT * FROM blog_posts ORDER BY created_at DESC')
      .all()
    return NextResponse.json(posts)
  } catch {
    return NextResponse.json({ error: 'Veri alınamadı' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    if (!data.title) {
      return NextResponse.json({ error: 'Başlık gerekli' }, { status: 400 })
    }

    const db = getDb()
    const slug = generateSlug(data.title)

    const existing = db.prepare('SELECT id FROM blog_posts WHERE slug = ?').get(slug)
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug

    const result = db
      .prepare(
        `INSERT INTO blog_posts (title, slug, excerpt, content, image_url, category, author, is_published)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        data.title,
        finalSlug,
        data.excerpt || '',
        data.content || '',
        data.image_url || '',
        data.category || '',
        data.author || 'Yazıcı 55 İnşaat',
        data.is_published !== undefined ? data.is_published : 1
      )

    return NextResponse.json({
      id: result.lastInsertRowid,
      slug: finalSlug,
      message: 'Blog yazısı oluşturuldu',
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Blog yazısı oluşturulamadı' },
      { status: 500 }
    )
  }
}
