'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { HiOutlineLocationMarker, HiOutlineArrowRight } from 'react-icons/hi'

interface ProjectCardProps {
  project: {
    id: number
    title: string
    slug: string
    description: string
    location: string
    price: string
    area: string
    status: string
    image_url: string
  }
  index?: number
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/projeler/${project.slug}`} className="group block">
        <div className="card-dark overflow-hidden">
          {/* Image */}
          <div className="relative h-64 overflow-hidden">
            {project.image_url ? (
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <Image
                src="/hero-1.jpg"
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-neon transition-colors mb-2">
              {project.title}
            </h3>

            {project.location && (
              <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
                <HiOutlineLocationMarker size={14} className="text-neon/60" />
                {project.location}
              </div>
            )}

            {project.description && (
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                {project.description}
              </p>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div className="flex gap-4">
                {project.price && (
                  <div>
                    <p className="text-xs text-gray-600">Fiyat</p>
                    <p className="text-sm font-semibold text-gold">{project.price}</p>
                  </div>
                )}
                {project.area && (
                  <div>
                    <p className="text-xs text-gray-600">Alan</p>
                    <p className="text-sm font-semibold text-gray-700">{project.area}</p>
                  </div>
                )}
              </div>
              <div className="text-neon/50 group-hover:text-neon group-hover:translate-x-1 transition-all">
                <HiOutlineArrowRight size={20} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
