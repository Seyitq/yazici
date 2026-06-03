'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { HiOutlineUpload, HiOutlineTrash, HiOutlinePhotograph } from 'react-icons/hi'
import Image from 'next/image'
import Link from 'next/link'

interface GalleryItem {
  id: number
  title: string
  image_url: string
  category: string
}

export default function GaleriAdmin() {
  const [images, setImages] = useState<GalleryItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({ title: '', category: '' })

  async function fetchImages() {
    const res = await fetch('/api/gallery')
    const data = await res.json()
    if (Array.isArray(data)) setImages(data)
  }

  useEffect(() => {
    fetchImages()
  }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        const uploadData = await uploadRes.json()

        if (!uploadData.url) {
          toast.error(`${file.name}: ${uploadData.error || 'Yükleme başarısız'}`)
          continue
        }

        const addRes = await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image_url: uploadData.url,
            title: form.title || file.name.replace(/\.[^.]+$/, ''),
            category: form.category,
          }),
        })

        if (addRes.ok) {
          toast.success(`${file.name} eklendi`)
        } else {
          toast.error(`${file.name} eklenemedi`)
        }
      } catch {
        toast.error(`${file.name} yüklenemedi`)
      }
    }

    setUploading(false)
    fetchImages()
    e.target.value = ''
  }

  async function handleDelete(id: number) {
    if (!confirm('Bu görseli silmek istediğinize emin misiniz?')) return

    const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Görsel silindi')
      setImages((prev) => prev.filter((img) => img.id !== id))
    } else {
      toast.error('Görsel silinemedi')
    }
  }

  return (
    <div className="p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Galeri</h1>
          <p className="text-gray-400 text-sm mt-1">{images.length} görsel</p>
        </div>
        <Link href="/galeri" target="_blank" className="text-xs text-gray-400 hover:text-neon transition-colors">
          Galeriyi Görüntüle →
        </Link>
      </div>

      {/* Upload Area */}
      <div className="bg-gray-700/50 border border-gray-600 border-dashed rounded-xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Görsel başlığı (opsiyonel)"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:border-neon/50 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Kategori (opsiyonel)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white text-sm focus:border-neon/50 focus:outline-none"
          />
        </div>

        <label className="flex flex-col items-center justify-center gap-3 cursor-pointer group">
          <div className="w-14 h-14 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center group-hover:bg-neon/20 transition-colors">
            <HiOutlinePhotograph className="text-neon" size={24} />
          </div>
          <div className="text-center">
            <p className="text-white font-medium text-sm">
              {uploading ? 'Yükleniyor...' : 'Görsel Seç veya Sürükle'}
            </p>
            <p className="text-gray-500 text-xs mt-1">JPEG, PNG, WebP, GIF — Birden fazla seçilebilir</p>
          </div>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {/* Grid */}
      {images.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <HiOutlinePhotograph size={40} className="mx-auto mb-3 opacity-40" />
          <p>Henüz görsel eklenmemiş</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {images.map((img) => (
            <div key={img.id} className="group relative aspect-square rounded-lg overflow-hidden bg-gray-700">
              <Image
                src={img.image_url}
                alt={img.title || 'Galeri görseli'}
                fill
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                {img.title && (
                  <p className="text-white text-xs text-center font-medium line-clamp-2">{img.title}</p>
                )}
                <button
                  onClick={() => handleDelete(img.id)}
                  className="flex items-center gap-1.5 bg-red-500/80 hover:bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
                >
                  <HiOutlineTrash size={14} />
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
