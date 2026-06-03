'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa6'
import { HiX } from 'react-icons/hi'

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '905412573297'
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM || 'yazici55insaat'

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.a
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-dark-100 border border-dark-300 rounded-full pl-4 pr-2 py-2 hover:border-pink-500/50 transition-all group"
            >
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                Instagram
              </span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
                <FaInstagram className="text-white" size={20} />
              </div>
            </motion.a>

            <motion.a
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Merhaba, bilgi almak istiyorum.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-dark-100 border border-dark-300 rounded-full pl-4 pr-2 py-2 hover:border-green-500/50 transition-all group"
            >
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                WhatsApp
              </span>
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <FaWhatsapp className="text-white" size={22} />
              </div>
            </motion.a>
          </>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen
            ? 'bg-dark-200 border border-dark-400'
            : 'bg-neon hover:bg-neon-dim shadow-neon'
        }`}
        aria-label="Sosyal medya butonları"
      >
        {isOpen ? (
          <HiX className={isOpen ? 'text-white' : 'text-dark'} size={24} />
        ) : (
          <FaWhatsapp className="text-dark" size={26} />
        )}
      </motion.button>
    </div>
  )
}
