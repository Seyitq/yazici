'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { HiOutlineCalendar, HiOutlineArrowRight } from 'react-icons/hi'

interface BlogCardProps {
  post: {
    id: number
    title: string
    slug: string
    excerpt: string
    image_url: string
    category: string
    author: string
    created_at: string
  }
  index?: number
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const date = new Date(post.created_at).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="card-dark overflow-hidden">
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            {post.image_url ? (
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Görsel Yok</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60" />

            {/* Category */}
            {post.category && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-neon/20 text-neon border border-neon/30">
                  {post.category}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-2 text-gray-600 text-xs mb-3">
              <HiOutlineCalendar size={14} />
              <span>{date}</span>
              <span>•</span>
              <span>{post.author}</span>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-neon transition-colors mb-2 line-clamp-2">
              {post.title}
            </h3>

            {post.excerpt && (
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center text-neon/50 group-hover:text-neon transition-colors text-sm font-medium">
              <span>Devamını Oku</span>
              <HiOutlineArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
