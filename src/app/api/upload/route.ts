import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Sadece JPEG, PNG, WebP ve GIF dosyaları kabul edilir' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadsDir = path.join(process.cwd(), 'data', 'uploads')
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    // Sanitize filename
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const filename = `${Date.now()}-${safeName}`
    const filepath = path.join(uploadsDir, filename)

    fs.writeFileSync(filepath, buffer)

    if (!fs.existsSync(filepath)) {
      return NextResponse.json(
        { error: 'Dosya diske kaydedilemedi' },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: `/api/uploads/${filename}` })
  } catch {
    return NextResponse.json(
      { error: 'Dosya yüklenemedi' },
      { status: 500 }
    )
  }
}
