'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { HiOutlineArrowDown } from 'react-icons/hi'

const slides = [
  {
    id: 1,
    image: '/hero1.jpeg',
    label: 'Kaliteli İnşaat',
  },
  {
    id: 2,
    image: '/hero2.jpeg',
    label: 'Modern Yapılar',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── SLIDER BACKGROUND ── */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={slides[current].id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* Real photo */}
            <Image
              src={slides[current].image}
              alt={slides[current].label}
              fill
              className="object-cover"
              priority={current === 0}
              quality={90}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 container-custom px-4 md:px-8 text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6"
        >
          <span
            className="text-white"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.8), 2px 2px 0 rgba(0,0,0,0.5)' }}
          >
            Güvenle İnşa Ediyoruz
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 2px 12px rgba(0,0,0,0.8)' }}
        >
          Yazıcı 55 İnşaat olarak kaliteli malzeme, deneyimli ekip ve sağlam
          yapılarla hayalinizdeki yaşam alanlarını inşa ediyoruz.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/projeler"
            className="inline-flex items-center justify-center gap-2 bg-neon text-white font-semibold px-8 py-4 rounded-lg hover:bg-neon-dim transition-all duration-300 hover:shadow-neon active:scale-95 text-base"
          >
            Projeleri Keşfet
          </Link>
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 active:scale-95 text-base"
          >
            Bize Ulaşın
          </Link>
        </motion.div>
      </div>

      {/* ── SLIDE DOTS ── */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`transition-all duration-300 rounded-full ${
              i === current ? 'w-8 h-2 bg-gold' : 'w-2 h-2 bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white/50"
        >
          <HiOutlineArrowDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  )
}
