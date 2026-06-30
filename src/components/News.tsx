'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, ArrowLeft, Tag } from 'lucide-react'

const articles = [
  {
    category: 'תשתיות',
    date: 'יוני 2026',
    title: 'מתקן בדיקות מכס חדש נפתח ליד נמל אשדוד',
    excerpt:
      'קבוצה 207 חנכה מרכז שחרור מכס מתקדם, המצמצם את זמן השהות של מכולות בנמל בכ-40% ומאיץ את שחרור המטענים.',
    color: '#1463FF',
  },
  {
    category: 'טכנולוגיה',
    date: 'מאי 2026',
    title: 'TPL 208 משיקה מערכת ניהול מלאי מבוססת בינה מלאכותית',
    excerpt:
      'חטיבת המחסנאות המתקדמת שלנו עולה לאוויר עם WMS מהדור הבא, המשפר את דיוק האיסוף ל-99.97% ומפחית עלויות תפעוליות.',
    color: '#4A90FF',
  },
  {
    category: 'קהילה',
    date: 'אפריל 2026',
    title: 'קבוצה 207 תומכת ביוזמה לוגיסטית לסיוע הומניטרי',
    excerpt:
      'ניצול רשת הלוגיסטיקה שלנו להקלת העברה מהירה של אספקה הומניטרית, המוכיח את מחויבותנו מעבר לפעילות מסחרית.',
    color: '#F0A500',
  },
]

export default function News() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="news" ref={ref} className="relative py-28 bg-navy-900 overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Centered section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-blue-light text-xs font-bold tracking-widest uppercase mb-3">
            עדכונים אחרונים
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            חדשות <span className="gradient-text">הקבוצה</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="glass-card rounded-2xl p-6 group cursor-pointer transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="flex items-center gap-1.5 text-white/30 text-xs">
                  <Calendar size={11} />
                  {a.date}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
                  style={{ backgroundColor: `${a.color}18`, color: a.color }}
                >
                  <Tag size={10} />
                  {a.category}
                </span>
              </div>

              <div className="news-card-body">
                <h3 className="text-white font-bold text-lg leading-snug mb-3">
                  {a.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">{a.excerpt}</p>
              </div>

              <div
                className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group-hover:gap-2.5"
                style={{ color: a.color }}
              >
                <ArrowLeft size={12} />
                קרא עוד
              </div>

              <div
                className="absolute bottom-0 right-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                style={{ background: `linear-gradient(270deg, ${a.color}, transparent)` }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
