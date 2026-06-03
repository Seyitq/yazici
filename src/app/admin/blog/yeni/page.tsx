'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { HiOutlineArrowLeft, HiOutlineUpload } from 'react-icons/hi'
import Link from 'next/link'

function BlogForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    image_url: '',
    category: '',
    author: 'Yazıcı 55 İnşaat',
    is_published: 1,
  })

  useEffect(() => {
    if (editId) {
      fetch(`/api/blog/${editId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data && !data.error) {
            setForm({
              title: data.title || '',
              excerpt: data.excerpt || '',
              content: data.content || '',
              image_url: data.image_url || '',
              category: data.category || '',
              author: data.author || 'Yazıcı 55 İnşaat',
              is_published: data.is_published ?? 1,
            })
          }
        })
        .catch(() => toast.error('Yazı verisi alınamadı'))
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

    try {
      const url = editId ? `/api/blog/${editId}` : '/api/blog'
      const method = editId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        toast.success(editId ? 'Yazı güncellendi' : 'Yazı oluşturuldu')
        router.push('/admin/blog')
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
          placeholder="Yazı başlığı"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="text-sm text-gray-400 mb-1.5 block">Özet</label>
        <textarea
          rows={2}
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon/50 focus:outline-none transition-colors resize-none"
          placeholder="Yazının kısa özeti"
        />
      </div>

      {/* Content */}
      <div>
        <label className="text-sm text-gray-400 mb-1.5 block">İçerik</label>
        <textarea
          rows={12}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon/50 focus:outline-none transition-colors resize-none"
          placeholder="Yazı içeriği..."
        />
      </div>

      {/* Row: Category, Author, Published */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">
            Kategori
          </label>
          <input
            type="text"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon/50 focus:outline-none transition-colors"
            placeholder="Yatırım, Piyasa, vb."
          />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">Yazar</label>
          <input
            type="text"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon/50 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1.5 block">Durum</label>
          <select
            value={form.is_published}
            onChange={(e) =>
              setForm({ ...form, is_published: Number(e.target.value) })
            }
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon/50 focus:outline-none transition-colors"
          >
            <option value={1}>Yayında</option>
            <option value={0}>Taslak</option>
          </select>
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
              accept="image/jpeg,image/png,image/webp,image/gif"
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
            : 'Yazı Oluştur'}
        </button>
        <Link href="/admin/blog" className="btn-outline">
          İptal
        </Link>
      </div>
    </form>
  )
}

export default function AdminBlogYeniPage() {
  return (
    <div>
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-neon transition-colors mb-6 text-sm"
      >
        <HiOutlineArrowLeft size={18} />
        Blog Yazılarına Dön
      </Link>

      <Suspense fallback={<div className="text-gray-500">Yükleniyor...</div>}>
        <BlogFormWrapper />
      </Suspense>
    </div>
  )
}

function BlogFormWrapper() {
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')

  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-6">
        {editId ? 'Yazıyı Düzenle' : 'Yeni Blog Yazısı'}
      </h1>
      <BlogForm />
    </>
  )
}
