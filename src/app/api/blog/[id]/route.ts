import { NextResponse } from 'next/server'
import getDb, { generateSlug } from '@/lib/db'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDb()
    const post = db
      .prepare('SELECT * FROM blog_posts WHERE id = ?')
      .get(params.id)

    if (!post) {
      return NextResponse.json({ error: 'Yazı bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: 'Veri alınamadı' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const db = getDb()

    if (!data.title) {
      return NextResponse.json({ error: 'Başlık gerekli' }, { status: 400 })
    }

    const slug = generateSlug(data.title)

    db.prepare(
      `UPDATE blog_posts SET 
        title = ?, slug = ?, excerpt = ?, content = ?, image_url = ?, 
        category = ?, author = ?, is_published = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    ).run(
      data.title,
      slug,
      data.excerpt || '',
      data.content || '',
      data.image_url || '',
      data.category || '',
      data.author || 'Yazıcı 55 İnşaat',
      data.is_published !== undefined ? data.is_published : 1,
      params.id
    )

    return NextResponse.json({ message: 'Blog yazısı güncellendi' })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Blog yazısı güncellenemedi' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDb()
    db.prepare('DELETE FROM blog_posts WHERE id = ?').run(params.id)
    return NextResponse.json({ message: 'Blog yazısı silindi' })
  } catch {
    return NextResponse.json({ error: 'Blog yazısı silinemedi' }, { status: 500 })
  }
}
