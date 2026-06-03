import { NextResponse } from 'next/server'
import getDb from '@/lib/db'

export async function GET() {
  try {
    const db = getDb()
    const contacts = db
      .prepare('SELECT * FROM contacts ORDER BY created_at DESC')
      .all()
    return NextResponse.json(contacts)
  } catch {
    return NextResponse.json({ error: 'Veri alınamadı' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    if (!data.name || !data.message) {
      return NextResponse.json(
        { error: 'Ad ve mesaj alanları zorunludur' },
        { status: 400 }
      )
    }

    // Basic sanitization
    const sanitize = (str: string) => str.slice(0, 1000).trim()

    const db = getDb()
    db.prepare(
      `INSERT INTO contacts (name, email, phone, subject, message)
       VALUES (?, ?, ?, ?, ?)`
    ).run(
      sanitize(data.name),
      sanitize(data.email || ''),
      sanitize(data.phone || ''),
      sanitize(data.subject || ''),
      sanitize(data.message)
    )

    return NextResponse.json({ message: 'Mesajınız alındı' })
  } catch {
    return NextResponse.json(
      { error: 'Mesaj gönderilemedi' },
      { status: 500 }
    )
  }
}
