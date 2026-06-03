import { NextResponse } from 'next/server'
import getDb, { generateSlug } from '@/lib/db'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDb()
    const project = db
      .prepare('SELECT * FROM projects WHERE id = ?')
      .get(params.id)

    if (!project) {
      return NextResponse.json({ error: 'Proje bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(project)
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
      `UPDATE projects SET 
        title = ?, slug = ?, description = ?, content = ?, location = ?, 
        price = ?, area = ?, rooms = ?, status = ?, image_url = ?, 
        images = ?, features = ?, map_url = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    ).run(
      data.title,
      slug,
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
      data.map_url || '',
      params.id
    )

    return NextResponse.json({ message: 'Proje güncellendi' })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Proje güncellenemedi' },
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
    db.prepare('DELETE FROM projects WHERE id = ?').run(params.id)
    return NextResponse.json({ message: 'Proje silindi' })
  } catch {
    return NextResponse.json({ error: 'Proje silinemedi' }, { status: 500 })
  }
}
