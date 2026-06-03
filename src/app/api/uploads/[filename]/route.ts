import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
}

export async function GET(
  _request: Request,
  { params }: { params: { filename: string } }
) {
  const filename = params.filename

  // Path traversal koruması
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return NextResponse.json({ error: 'Geçersiz dosya adı' }, { status: 400 })
  }

  const filepath = path.join(process.cwd(), 'data', 'uploads', filename)

  if (!fs.existsSync(filepath)) {
    // Eski public/uploads yolunu da kontrol et (geriye uyumluluk)
    const legacyPath = path.join(process.cwd(), 'public', 'uploads', filename)
    if (fs.existsSync(legacyPath)) {
      const ext = path.extname(legacyPath).toLowerCase()
      const contentType = MIME_TYPES[ext] || 'application/octet-stream'
      const file = fs.readFileSync(legacyPath)
      return new NextResponse(file, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }
    return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 404 })
  }

  const ext = path.extname(filepath).toLowerCase()
  const contentType = MIME_TYPES[ext] || 'application/octet-stream'
  const file = fs.readFileSync(filepath)

  return new NextResponse(file, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
