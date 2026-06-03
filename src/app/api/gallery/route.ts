import { NextResponse } from 'next/server'
import getDb from '@/lib/db'

export async function GET() {
  try {
    const db = getDb()
    const images = db
      .prepare('SELECT * FROM gallery ORDER BY created_at DESC')
      .all()
    return NextResponse.json(images)
  } catch {
    return NextResponse.json({ error: 'Veri alınamadı' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    if (!data.image_url) {
      return NextResponse.json({ error: 'Görsel URL gerekli' }, { status: 400 })
    }

    const db = getDb()
    const result = db
      .prepare(
        `INSERT INTO gallery (title, image_url, category, project_id)
         VALUES (?, ?, ?, ?)`
      )
      .run(
        data.title || '',
        data.image_url,
        data.category || '',
        data.project_id || null
      )

    return NextResponse.json({
      id: result.lastInsertRowid,
      message: 'Görsel eklendi',
    })
  } catch {
    return NextResponse.json(
      { error: 'Görsel eklenemedi' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID gerekli' }, { status: 400 })
    }

    const db = getDb()
    db.prepare('DELETE FROM gallery WHERE id = ?').run(id)

    return NextResponse.json({ message: 'Görsel silindi' })
  } catch {
    return NextResponse.json({ error: 'Görsel silinemedi' }, { status: 500 })
  }
}
