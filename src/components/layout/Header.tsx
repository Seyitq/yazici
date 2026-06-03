'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi'
import Image from 'next/image'

const navLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/projeler', label: 'Projeler' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/blog', label: 'Blog' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/iletisim', label: 'İletişim' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  // Ana sayfa mı?
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  if (pathname?.startsWith('/admin')) return null

  // Navbar şeffaf mı? Yalnızca ana sayfada ve scroll edilmemişse
  const isTransparent = isHomePage && !isScrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? 'bg-transparent py-5'
          : 'bg-white/95 backdrop-blur-md border-b border-gray-200 py-3 shadow-sm'
      }`}
    >
      <div className="container-custom flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/logo.png"
            alt="Yazıcı 55 İnşaat Logo"
            width={200}
            height={50}
            className="h-10 sm:h-14 lg:h-16 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                  isActive
                    ? 'text-neon'
                    : isTransparent
                    ? 'text-white/90 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-neon rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
          <Link href="/iletisim" className="btn-primary ml-4 text-sm !py-2.5 !px-5">
            Bize Ulaşın
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`lg:hidden p-2 ${isTransparent ? 'text-white' : 'text-gray-800'}`}
          aria-label="Menü"
        >
          {isMobileOpen ? <HiX size={28} /> : <HiOutlineMenuAlt3 size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200 overflow-hidden shadow-lg"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'text-neon bg-neon/5'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Link
                href="/iletisim"
                className="btn-primary mt-2 text-center text-sm"
              >
                Bize Ulaşın
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
