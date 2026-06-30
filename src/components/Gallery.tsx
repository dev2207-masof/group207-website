'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'

const photos = [
  {
    src: '/photos/DJI_0426.JPG',
    alt: 'טרמינל 207 — נמל אשדוד',
    caption: 'טרמינל 207',
  },
  {
    src: '/photos/DJI_0347.JPG',
    alt: 'אזור בדיקות מכס — קבוצת GROUP 207',
    caption: 'אזור בדיקות מכס',
  },
  {
    src: '/photos/DJI_0350.JPG',
    alt: 'מתחם המכולות — קבוצת GROUP 207',
    caption: 'מתחם המכולות',
  },
  {
    src: '/photos/DJI_0432.JPG',
    alt: 'מחסן קבוצת GROUP 207',
    caption: 'מחסן הקבוצה',
  },
]

export default function Gallery() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <section id="gallery" ref={ref} className="relative py-28 bg-navy-950 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-brand/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-blue-light text-xs font-bold tracking-widest uppercase mb-4">
            הגלריה שלנו
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            <span className="block">הפעילות שלנו</span>
            <span className="block gradient-text">מהאוויר</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
              className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setLightbox(i)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 right-0 p-4">
                <p className="text-white font-semibold text-sm drop-shadow-lg">{photo.caption}</p>
              </div>
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/15 rounded-2xl transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[lightbox].src}
                alt={photos[lightbox].alt}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-200"
              aria-label="סגור"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
