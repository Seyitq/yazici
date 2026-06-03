'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import AnimatedSection from '@/components/ui/AnimatedSection'
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineClock,
} from 'react-icons/hi'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa6'

function IletisimForm() {
  const searchParams = useSearchParams()
  const konuParam = searchParams.get('konu') || ''

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: konuParam,
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        toast.success('Mesajınız başarıyla gönderildi!')
        setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        toast.error('Bir hata oluştu. Lütfen tekrar deneyin.')
      }
    } catch {
      toast.error('Bağlantı hatası. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="text-sm text-gray-600 mb-1.5 block">
            Ad Soyad *
          </label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-neon/50 focus:outline-none transition-colors"
            placeholder="Adınızı girin"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm text-gray-600 mb-1.5 block">
            E-posta
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-neon/50 focus:outline-none transition-colors"
            placeholder="E-posta adresiniz"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="text-sm text-gray-600 mb-1.5 block">
            Telefon
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-neon/50 focus:outline-none transition-colors"
            placeholder="0555 123 45 67"
          />
        </div>
        <div>
          <label htmlFor="subject" className="text-sm text-gray-600 mb-1.5 block">
            Konu
          </label>
          <input
            id="subject"
            type="text"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-neon/50 focus:outline-none transition-colors"
            placeholder="Konu başlığı"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm text-gray-600 mb-1.5 block">
          Mesaj *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-neon/50 focus:outline-none transition-colors resize-none"
          placeholder="Mesajınızı yazın..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Gönderiliyor...' : 'Mesaj Gönder'}
      </button>
    </form>
  )
}

export default function IletisimPage() {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="section-padding !pb-10 relative">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center">
            <span className="text-neon text-sm font-semibold uppercase tracking-widest">
              İletişim
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-800 mt-3 mb-4">
              Bizimle <span className="text-neon">İletişime</span> Geçin
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Projelerimiz hakkında bilgi almak veya yatırım danışmanlığı için
              bize ulaşabilirsiniz.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding !pt-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <AnimatedSection direction="left" className="lg:col-span-1">
              <div className="space-y-4">
                <div className="card-dark p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-neon/10 text-neon border border-neon/20 flex items-center justify-center shrink-0">
                      <HiOutlineLocationMarker size={20} />
                    </div>
                    <div>
                      <h3 className="text-gray-800 font-semibold text-sm mb-1">Adres</h3>
                      <p className="text-gray-500 text-sm">
                        Osmangazi, Bademlik Yolu Cd. No:179
                        <br />
                        06280 Keçiören/Ankara
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card-dark p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-neon/10 text-neon border border-neon/20 flex items-center justify-center shrink-0">
                      <HiOutlinePhone size={20} />
                    </div>
                    <div>
                      <h3 className="text-gray-800 font-semibold text-sm mb-1">Telefon</h3>
                      <a
                        href="tel:+905412573297"
                        className="text-gray-500 hover:text-neon transition-colors text-sm"
                      >
                        +90 541 257 32 97
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card-dark p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-neon/10 text-neon border border-neon/20 flex items-center justify-center shrink-0">
                      <HiOutlineMail size={20} />
                    </div>
                    <div>
                      <h3 className="text-gray-800 font-semibold text-sm mb-1">E-posta</h3>
                      <a
                        href="mailto:info@yazici55insaat.com"
                        className="text-gray-500 hover:text-neon transition-colors text-sm"
                      >
                        info@yazici55insaat.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card-dark p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-neon/10 text-neon border border-neon/20 flex items-center justify-center shrink-0">
                      <HiOutlineClock size={20} />
                    </div>
                    <div>
                      <h3 className="text-gray-800 font-semibold text-sm mb-1">
                        Çalışma Saatleri
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Pazartesi - Cumartesi
                        <br />
                        09:00 - 18:00
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="flex gap-3 pt-2">
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || '905412573297'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600/10 border border-green-600/20 text-green-500 rounded-lg py-3 hover:bg-green-600/20 transition-colors text-sm font-medium"
                  >
                    <FaWhatsapp size={18} />
                    WhatsApp
                  </a>
                  <a
                    href={`https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM || 'yazici55insaat'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-pink-600/10 border border-pink-600/20 text-pink-500 rounded-lg py-3 hover:bg-pink-600/20 transition-colors text-sm font-medium"
                  >
                    <FaInstagram size={18} />
                    Instagram
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection direction="right" className="lg:col-span-2">
              <div className="card-dark p-6 md:p-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Mesaj Gönderin
                </h2>
                <Suspense fallback={<div className="text-gray-500">Yükleniyor...</div>}>
                  <IletisimForm />
                </Suspense>
              </div>
            </AnimatedSection>
          </div>

          {/* Map */}
          <AnimatedSection className="mt-10">
            <div className="rounded-2xl overflow-hidden border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195360.11123048965!2d32.8201705!3d40.08652505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34d2525dbd949%3A0x60eddddf61f2d4dd!2zWWF6xLFjxLEgNTUgxLBuxZ8u!5e0!3m2!1str!2str!4v1780500908386!5m2!1str!2str"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Yazıcı 55 İnşaat Konum"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
