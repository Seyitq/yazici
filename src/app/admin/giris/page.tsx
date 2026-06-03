'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function AdminGirisPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        toast.success('Giriş başarılı!')
        router.push('/admin')
        router.refresh()
      } else {
        const data = await res.json()
        toast.error(data.error || 'Giriş başarısız')
      }
    } catch {
      toast.error('Bağlantı hatası')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-neon/10 border border-neon/30 flex items-center justify-center mx-auto mb-4">
            <span className="text-neon font-bold text-2xl">Y</span>
          </div>
          <h1 className="text-2xl font-heading font-bold text-white">
            Admin Paneli
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Yazıcı 55 İnşaat Yönetim
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 border border-gray-700 rounded-2xl p-6"
        >
          <div className="mb-4">
            <label
              htmlFor="username"
              className="text-sm text-gray-400 mb-1.5 block"
            >
              Kullanıcı Adı
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-neon/50 focus:outline-none transition-colors"
              placeholder="admin"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="text-sm text-gray-400 mb-1.5 block"
            >
              Şifre
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-neon/50 focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  )
}
