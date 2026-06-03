import { NextResponse } from 'next/server'
import getDb, { generateSlug } from '@/lib/db'

export async function GET() {
  try {
    const db = getDb()
    const projects = db
      .prepare('SELECT * FROM projects ORDER BY created_at DESC')
      .all()
    return NextResponse.json(projects)
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

    const existing = db.prepare('SELECT id FROM projects WHERE slug = ?').get(slug)
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug

    const result = db
      .prepare(
        `INSERT INTO projects (title, slug, description, content, location, price, area, rooms, status, image_url, images, features, map_url)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        data.title,
        finalSlug,
        data.description || '',
        data.content || '',
        data.location || '',
        data.price || '',
        data.area || '',
        data.rooms || '',
        data.status || 'aktif',
        data.image_url || '',
        JSON.stringify(data.images || []),
        JSON.stringify(data.features || []),
        data.map_url || ''
      )

    return NextResponse.json({
      id: result.lastInsertRowid,
      slug: finalSlug,
      message: 'Proje oluşturuldu',
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Proje oluşturulamadı' },
      { status: 500 }
    )
  }
}
