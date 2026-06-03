'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { HiOutlineArrowLeft, HiOutlineUpload } from 'react-icons/hi'
import Link from 'next/link'

function ProjeForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    content: '',
    location: '',
    price: '',
    area: '',
    rooms: '',
    status: 'aktif',
    image_url: '',
    features: '',
    map_url: '',
  })

  useEffect(() => {
    if (editId) {
      fetch(`/api/projects/${editId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data && !data.error) {
            let features = ''
            try {
              const arr = JSON.parse(data.features || '[]')
              features = arr.join(', ')
            } catch {
              features = data.features || ''
            }
            setForm({
              title: data.title || '',
              description: data.description || '',
              content: data.content || '',
              location: data.location || '',
              price: data.price || '',
              area: data.area || '',
              rooms: data.rooms || '',
              status: data.status || 'aktif',
              image_url: data.image_url || '',
              features,
              map_url: data.map_url || '',
            })
          }
        })
        .catch(() => toast.error('Proje verisi alınamadı'))
    }
  }, [editId])

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url) {
        setForm((f) => ({ ...f, image_url: data.url }))
        toast.success('Görsel yüklendi')
      } else {
        toast.error(data.error || 'Yükleme başarısız')
      }
    } catch {
      toast.error('Yükleme hatası')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const features = form.features
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean)

    const body = {
      ...form,
      features,
    }

    try {
      const url = editId ? `/api/projects/${editId}` : '/api/projects'
      const method = editId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        toast.success(editId ? 'Proje güncellendi' : 'Proje oluşturuldu')
        router.push('/admin/projeler')
      } else {
        const data = await res.json()
        toast.error(data.error || 'İşlem başarısız')
      }
    } catch {
      toast.error('Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
      {/* Title */}
      <div>
        <label className="text-sm text-gray-400 mb-1.5 block">Başlık *</label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon/50 focus:outline-none transition-colors"
          placeholder="Proje adı"
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-sm text-gray-400 mb-1.5 block">
          Kısa Açıklama
        </label>
        <textarea
          rows={2}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon/50 focus:outline-none transition-colors resize-none"
          placeholder="Projenin kısa açıklaması"
        />
      </div>

      {/* Content */}
      <div>
        <label className="text-sm text-gray-400 mb-1.5 block">
          Detaylı İçerik
        </label>
        <textarea
          rows={8}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon/50 focus:outline-none transition-colors resize-none"
          placeholder="Projenin detaylı açıklaması"
        />
      </div>

      {/* Row: Location, Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">Konum</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon/50 focus:outline-none transition-colors"
            placeholder="İstanbul, Beşiktaş"
          />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">Durum</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon/50 focus:outline-none transition-colors"
          >
            <option value="aktif">Satışta</option>
            <option value="yakında">Yakında</option>
            <option value="tamamlandi">Tamamlandı</option>
          </select>
        </div>
      </div>

      {/* Row: Price, Area, Rooms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">Fiyat</label>
          <input
            type="text"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon/50 focus:outline-none transition-colors"
            placeholder="₺1,500,000'den"
          />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">Alan</label>
          <input
            type="text"
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon/50 focus:outline-none transition-colors"
            placeholder="120 m²"
          />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">Oda Tipi</label>
          <input
            type="text"
            value={form.rooms}
            onChange={(e) => setForm({ ...form, rooms: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon/50 focus:outline-none transition-colors"
            placeholder="2+1, 3+1, 4+1"
          />
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="text-sm text-gray-400 mb-1.5 block">
          Kapak Görseli
        </label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-400 hover:text-neon hover:border-neon/30 transition-colors cursor-pointer">
            <HiOutlineUpload size={18} />
            <span className="text-sm">
              {uploading ? 'Yükleniyor...' : 'Görsel Seç'}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </label>
          {form.image_url && (
            <span className="text-neon text-xs truncate max-w-xs">
              {form.image_url}
            </span>
          )}
        </div>
      </div>

      {/* Features */}
      <div>
        <label className="text-sm text-gray-400 mb-1.5 block">
          Özellikler (virgülle ayırın)
        </label>
        <input
          type="text"
          value={form.features}
          onChange={(e) => setForm({ ...form, features: e.target.value })}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon/50 focus:outline-none transition-colors"
          placeholder="Havuz, Spor Salonu, Otopark, Güvenlik"
        />
      </div>

      {/* Map URL */}
      <div>
        <label className="text-sm text-gray-400 mb-1.5 block">
          Google Maps Embed URL
        </label>
        <input
          type="text"
          value={form.map_url}
          onChange={(e) => setForm({ ...form, map_url: e.target.value })}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon/50 focus:outline-none transition-colors"
          placeholder="https://www.google.com/maps/embed?..."
        />
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:opacity-50"
        >
          {loading
            ? 'Kaydediliyor...'
            : editId
            ? 'Güncelle'
            : 'Proje Oluştur'}
        </button>
        <Link href="/admin/projeler" className="btn-outline">
          İptal
        </Link>
      </div>
    </form>
  )
}

export default function AdminProjeYeniPage() {
  return (
    <div>
      <Link
        href="/admin/projeler"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-neon transition-colors mb-6 text-sm"
      >
        <HiOutlineArrowLeft size={18} />
        Projelere Dön
      </Link>

      <Suspense fallback={<div className="text-gray-500">Yükleniyor...</div>}>
        <ProjeFormWrapper />
      </Suspense>
    </div>
  )
}

function ProjeFormWrapper() {
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')

  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-6">
        {editId ? 'Projeyi Düzenle' : 'Yeni Proje'}
      </h1>
      <ProjeForm />
    </>
  )
}
