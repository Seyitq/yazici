'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'

interface BlogPost {
  id: number
  title: string
  slug: string
  category: string
  author: string
  is_published: number
  created_at: string
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    try {
      const res = await fetch('/api/blog')
      const data = await res.json()
      setPosts(Array.isArray(data) ? data : [])
    } catch {
      toast.error('Blog yazıları yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return

    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Yazı silindi')
        setPosts(posts.filter((p) => p.id !== id))
      } else {
        toast.error('Yazı silinemedi')
      }
    } catch {
      toast.error('Bir hata oluştu')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Blog Yazıları</h1>
        <Link
          href="/admin/blog/yeni"
          className="btn-primary !py-2.5 !px-4 text-sm flex items-center gap-2"
        >
          <HiOutlinePlus size={18} />
          Yeni Yazı
        </Link>
      </div>

      {loading ? (
        <div className="text-gray-500 text-center py-10">Yükleniyor...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 bg-gray-800 border border-gray-700 rounded-xl">
          <p className="text-gray-500 mb-4">Henüz blog yazısı eklenmemiş.</p>
          <Link href="/admin/blog/yeni" className="btn-primary text-sm">
            İlk Yazıyı Ekle
          </Link>
        </div>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Başlık
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">
                  Kategori
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">
                  Yazar
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Durum
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  İşlem
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-gray-700/50 hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="text-white font-medium text-sm">
                      {post.title}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-sm hidden md:table-cell">
                    {post.category || '-'}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-sm hidden md:table-cell">
                    {post.author}
                  </td>
                  <td className="px-4 py-3">
                    {post.is_published ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-neon/10 text-neon">
                        <HiOutlineEye size={12} />
                        Yayında
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-gray-600 text-gray-400">
                        <HiOutlineEyeOff size={12} />
                        Taslak
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blog/yeni?id=${post.id}`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-neon hover:bg-neon/10 transition-colors"
                        title="Düzenle"
                      >
                        <HiOutlinePencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Sil"
                      >
                        <HiOutlineTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
