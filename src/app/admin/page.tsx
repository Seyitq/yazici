'use client'

import { useEffect, useState } from 'react'
import { HiOutlineOfficeBuilding, HiOutlineNewspaper, HiOutlineMail, HiOutlineEye } from 'react-icons/hi'

interface Stats {
  projects: number
  posts: number
  contacts: number
  unread: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ projects: 0, posts: 0, contacts: 0, unread: 0 })

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projectsRes, postsRes, contactsRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/blog'),
          fetch('/api/contact'),
        ])

        const projects = await projectsRes.json()
        const posts = await postsRes.json()
        const contacts = await contactsRes.json()

        setStats({
          projects: Array.isArray(projects) ? projects.length : 0,
          posts: Array.isArray(posts) ? posts.length : 0,
          contacts: Array.isArray(contacts) ? contacts.length : 0,
          unread: Array.isArray(contacts)
            ? contacts.filter((c: any) => !c.is_read).length
            : 0,
        })
      } catch {
        // silently fail
      }
    }

    fetchStats()
  }, [])

  const cards = [
    {
      label: 'Toplam Proje',
      value: stats.projects,
      icon: HiOutlineOfficeBuilding,
      color: 'neon',
    },
    {
      label: 'Blog Yazısı',
      value: stats.posts,
      icon: HiOutlineNewspaper,
      color: 'neon',
    },
    {
      label: 'Toplam Mesaj',
      value: stats.contacts,
      icon: HiOutlineMail,
      color: 'gold',
    },
    {
      label: 'Okunmamış',
      value: stats.unread,
      icon: HiOutlineEye,
      color: 'gold',
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Yönetim Paneli</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-gray-800 border border-gray-700 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <card.icon
                size={22}
                className={card.color === 'gold' ? 'text-gold' : 'text-neon'}
              />
            </div>
            <div className="text-2xl font-bold text-white">{card.value}</div>
            <div className="text-gray-500 text-sm mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-3">Hoş Geldiniz</h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Yazıcı 55 İnşaat yönetim paneline hoş geldiniz. Sol menüden projeleri,
          blog yazılarını ve iletişim mesajlarını yönetebilirsiniz. Yeni proje
          veya yazı eklemek için ilgili bölüme gidip &quot;Yeni Ekle&quot; butonuna
          tıklayın.
        </p>
      </div>
    </div>
  )
}
