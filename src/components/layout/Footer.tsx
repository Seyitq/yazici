import Link from 'next/link'
import Image from 'next/image'
import { FaInstagram, FaWhatsapp, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi'

const quickLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/projeler', label: 'Projeler' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/blog', label: 'Blog' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/iletisim', label: 'İletişim' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container-custom px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="Yazıcı 55 İnşaat Logo"
                width={180}
                height={68}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Yazıcı 55 İnşaat olarak kaliteli malzeme ve deneyimli ekibimizle
              sağlam ve modern yapılar inşa ediyoruz.
            </p>
            <div className="flex gap-3">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || '905412573297'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-500 hover:text-neon hover:border-neon/30 transition-all"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={18} />
              </a>
              <a
                href={`https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM || 'yazici55insaat'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-500 hover:text-neon hover:border-neon/30 transition-all"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-500 hover:text-neon hover:border-neon/30 transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-500 hover:text-neon hover:border-neon/30 transition-all"
                aria-label="X"
              >
                <FaXTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4 text-sm uppercase tracking-wider">
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-neon transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4 text-sm uppercase tracking-wider">
              Hizmetlerimiz
            </h3>
            <ul className="space-y-2.5">
              {[
                'Konut Projeleri',
                'Ticari Gayrimenkul',
                'Arazi Yatırımı',
                'Yatırım Danışmanlığı',
                'Portföy Yönetimi',
              ].map((item) => (
                <li key={item}>
                  <span className="text-gray-500 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4 text-sm uppercase tracking-wider">
              İletişim
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker className="text-neon mt-0.5 shrink-0" size={18} />
                <span className="text-gray-500 text-sm">
                  Osmangazi, Bademlik Yolu Cd. No:179
                  <br />
                  06280 Keçiören/Ankara
                </span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlinePhone className="text-neon shrink-0" size={18} />
                <a
                  href="tel:+905412573297"
                  className="text-gray-500 hover:text-neon transition-colors text-sm"
                >
                  +90 541 257 32 97
                </a>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineMail className="text-neon shrink-0" size={18} />
                <a
                  href="mailto:info@yazici55insaat.com"
                  className="text-gray-500 hover:text-neon transition-colors text-sm"
                >
                  info@yazici55insaat.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="container-custom px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Yazıcı 55 İnşaat. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="#" className="text-gray-600 hover:text-gray-400 transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-400 transition-colors">
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
