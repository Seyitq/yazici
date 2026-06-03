'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiOutlineShieldCheck, HiOutlineLightBulb, HiOutlineGlobe, HiOutlineTrendingUp } from 'react-icons/hi'

const features = [
  {
    icon: HiOutlineShieldCheck,
    title: 'Güvenilir Yatırım',
    description: 'Şeffaf süreçler ve güvenceli yatırım modelleri ile varlıklarınızı koruyun.',
    color: 'neon',
  },
  {
    icon: HiOutlineLightBulb,
    title: 'Yenilikçi Projeler',
    description: 'Akıllı ev teknolojileri ve sürdürülebilir mimari ile fark yaratan projeler.',
    color: 'neon',
  },
  {
    icon: HiOutlineGlobe,
    title: 'Stratejik Konumlar',
    description: 'Değer kazanma potansiyeli yüksek, ulaşımı kolay prime lokasyonlar.',
    color: 'gold',
  },
  {
    icon: HiOutlineTrendingUp,
    title: 'Yüksek Getiri',
    description: 'Piyasa ortalamasının üzerinde kira getirisi ve değer artışı.',
    color: 'gold',
  },
]

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section-padding relative">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-gold text-sm font-semibold uppercase tracking-widest">
            Neden Biz?
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-800 mt-3 mb-4">
            Fark Yaratan <span className="text-gold">Değerler</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Yazıcı 55 İnşaat olarak kalite, güven ve müşteri memnuniyetini her zaman ön planda tutuyoruz.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-dark p-6 md:p-8 group hover:border-glow"
            >
              <div className="flex items-start gap-5">
                <div
                  className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${
                    feature.color === 'gold'
                      ? 'bg-gold/10 text-gold border border-gold/20'
                      : 'bg-neon/10 text-neon border border-neon/20'
                  } group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
