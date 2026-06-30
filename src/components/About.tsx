'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, Award, Users, TrendingUp } from 'lucide-react'
import Image from 'next/image'

const pillars = [
  {
    icon: Award,
    title: 'מוביל בתעשייה',
    desc: 'מוכרים כקבוצת הלוגיסטיקה הימית המשולבת ביותר בישראל, המפעילים תשתיות לאומיות קריטיות.',
  },
  {
    icon: Users,
    title: 'צוותי מומחים',
    desc: 'למעלה מ-500 אנשי לוגיסטיקה מקצועיים בתחומי מבצעים, טכנולוגיה ושירות לקוחות.',
  },
  {
    icon: TrendingUp,
    title: 'צמיחה מתמדת',
    desc: 'הרחבת כושר ייצור ויכולות שנה אחר שנה עם מתקנים מתקדמים.',
  },
]

const values = [
  'פתרונות לוגיסטיקה מקיפים',
  'טכנולוגיית WMS מתקדמת',
  'ניהול עסקי אתי',
  'שרשרת אספקה מקצה לקצה',
  'עמידה מלאה ברגולציה',
  'אחריות סביבתית',
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="relative py-28 bg-navy-900 overflow-hidden">
      {/* Photo background */}
      <div className="absolute inset-0">
        <Image
          src="/photos/DJI_0429.JPG"
          alt="מתקני קבוצת GROUP 207"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-navy-900/88" />
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-brand/4 to-transparent pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-96 h-96 rounded-full bg-gold/4 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Centered header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-blue-light text-xs font-bold tracking-widest uppercase mb-4">
            אודות קבוצה 207
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6 text-center">
            <span className="block text-center">עמוד השדרה</span>
            <span className="block text-center">של <span className="gradient-text">הסחר הימי</span></span>
            <span className="block text-center">הישראלי.</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto mb-8 text-center">
            נוסדנו בשנת 1996 וצמחנו מפעילות טרמינל אחת לאקוסיסטם משולב של
            שש חברות מתמחות — כולן פועלות בסינרגיה כדי לספק לוגיסטיקה חלקה
            מהנמל ועד ליעד.
          </p>

          {/* Values checklist */}
          <div className="inline-grid grid-cols-2 md:grid-cols-3 gap-3 mb-10 text-right">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 size={14} className="text-blue-brand shrink-0" />
                <span className="text-white/60 text-sm">{v}</span>
              </motion.div>
            ))}
          </div>

          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 border border-gold/30 hover:border-gold/60 text-gold font-semibold rounded-xl transition-all duration-200 hover:bg-gold/15"
          >
            הצטרפו אלינו
          </motion.a>
        </motion.div>

        {/* Pillar cards + stat card */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }}
              className="glass-card rounded-2xl p-6 flex flex-col items-center text-center gap-4 group transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-brand/15 flex items-center justify-center shrink-0 group-hover:bg-blue-brand/25 transition-colors duration-300">
                <p.icon size={22} className="text-blue-light" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">{p.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* Decorative stat card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="rounded-2xl p-6 bg-gradient-to-br from-blue-brand/20 to-navy-700 border border-blue-brand/20 flex flex-col justify-between"
          >
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">סטטוס</p>
              <span className="inline-flex items-center gap-1.5 text-emerald-400 text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                פעיל
              </span>
            </div>
            <div className="text-center mt-4">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">נוסדה</p>
              <p className="text-5xl font-black text-white">1996</p>
              <p className="text-blue-light text-sm mt-1">נמל אשדוד, ישראל</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
