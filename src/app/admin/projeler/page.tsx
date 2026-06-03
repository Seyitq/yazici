'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'

interface Project {
  id: number
  title: string
  slug: string
  status: string
  location: string
  price: string
  created_at: string
}

export default function AdminProjelerPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      setProjects(Array.isArray(data) ? data : [])
    } catch {
      toast.error('Projeler yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Bu projeyi silmek istediğinize emin misiniz?')) return

    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Proje silindi')
        setProjects(projects.filter((p) => p.id !== id))
      } else {
        toast.error('Proje silinemedi')
      }
    } catch {
      toast.error('Bir hata oluştu')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Projeler</h1>
        <Link
          href="/admin/projeler/yeni"
          className="btn-primary !py-2.5 !px-4 text-sm flex items-center gap-2"
        >
          <HiOutlinePlus size={18} />
          Yeni Proje
        </Link>
      </div>

      {loading ? (
        <div className="text-gray-500 text-center py-10">Yükleniyor...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 bg-gray-800 border border-gray-700 rounded-xl">
          <p className="text-gray-500 mb-4">Henüz proje eklenmemiş.</p>
          <Link href="/admin/projeler/yeni" className="btn-primary text-sm">
            İlk Projeyi Ekle
          </Link>
        </div>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Proje
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">
                  Konum
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">
                  Fiyat
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
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-gray-700/50 hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="text-white font-medium text-sm">
                      {project.title}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-sm hidden md:table-cell">
                    {project.location || '-'}
                  </td>
                  <td className="px-4 py-3 text-gold text-sm hidden md:table-cell">
                    {project.price || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        project.status === 'aktif'
                          ? 'bg-neon/10 text-neon'
                          : project.status === 'yakında'
                          ? 'bg-gold/10 text-gold'
                          : 'bg-gray-600 text-gray-400'
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projeler/yeni?id=${project.id}`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-neon hover:bg-neon/10 transition-colors"
                        title="Düzenle"
                      >
                        <HiOutlinePencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
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
