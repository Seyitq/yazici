'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { HiX, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'

interface GalleryImage {
  id: number
  title: string
  image_url: string
  category: string
}

export default function GaleriClient({ images }: { images: GalleryImage[] }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [filter, setFilter] = useState('Tümü')

  const categories = ['Tümü', ...Array.from(new Set(images.map((img) => img.category).filter(Boolean)))]
  const filtered = filter === 'Tümü' ? images : images.filter((img) => img.category === filter)

  const handlePrev = () => {
    if (selectedImage === null) return
    const idx = filtered.findIndex((img) => img.id === selectedImage)
    const prev = idx > 0 ? filtered[idx - 1].id : filtered[filtered.length - 1].id
    setSelectedImage(prev)
  }

  const handleNext = () => {
    if (selectedImage === null) return
    const idx = filtered.findIndex((img) => img.id === selectedImage)
    const next = idx < filtered.length - 1 ? filtered[idx + 1].id : filtered[0].id
    setSelectedImage(next)
  }

  const selectedImg = filtered.find((img) => img.id === selectedImage)

  return (
    <>
      {/* Filter */}
      {categories.length > 1 && (
        <AnimatedSection className="flex flex-wrap justify-center gap-2 mb-10 px-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? 'bg-neon text-dark'
                  : 'bg-gray-100 text-gray-500 border border-gray-300 hover:border-neon/30 hover:text-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </AnimatedSection>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 cursor-pointer group"
            onClick={() => setSelectedImage(img.id)}
          >
            <Image
              src={img.image_url}
              alt={img.title || 'Galeri'}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
              <div className="p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                {img.title && (
                  <p className="text-white text-sm font-medium">{img.title}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Bu kategoride görsel bulunamadı.</p>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(null)
              }}
              className="absolute top-6 right-6 text-white hover:text-neon transition-colors"
              aria-label="Kapat"
            >
              <HiX size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrev()
              }}
              className="absolute left-4 md:left-8 text-white hover:text-neon transition-colors"
              aria-label="Önceki"
            >
              <HiOutlineChevronLeft size={40} />
            </button>

            <motion.div
              key={selectedImg.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl max-h-[80vh] w-full aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImg.image_url}
                alt={selectedImg.title || 'Galeri'}
                fill
                className="object-contain"
              />
              {selectedImg.title && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark/80 to-transparent">
                  <p className="text-white text-lg font-medium">{selectedImg.title}</p>
                </div>
              )}
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className="absolute right-4 md:right-8 text-white hover:text-neon transition-colors"
              aria-label="Sonraki"
            >
              <HiOutlineChevronRight size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
