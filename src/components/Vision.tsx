'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Eye, Zap, Handshake, Leaf } from 'lucide-react'

const pillars = [
  {
    icon: Eye,
    title: 'מצוינות תפעולית',
    desc: 'שמירה על הסטנדרט הגבוה ביותר בכל נקודת מגע עם הלקוח — מרגע קבלת המטען ועד שחרורו.',
  },
  {
    icon: Zap,
    title: 'חדשנות טכנולוגית',
    desc: 'השקעה מתמדת במערכות מתקדמות שמשפרות יעילות, שקיפות ומהירות בכל שלבי הלוגיסטיקה.',
  },
  {
    icon: Handshake,
    title: 'שותפות ארוכת טווח',
    desc: 'בניית יחסי אמון עמוקים עם כל לקוח — מיצרנים גדולים ועד יבואנים פרטיים.',
  },
  {
    icon: Leaf,
    title: 'אחריות סביבתית',
    desc: 'פעולה בתנאי קיימות ואחריות סביבתית, לטובת הכלכלה הימית של הדורות הבאים.',
  },
]

export default function Vision() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="vision" ref={ref} className="relative py-28 bg-navy-800 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/4 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="inline-block text-gold text-xs font-bold tracking-widest uppercase mb-4">
            החזון שלנו
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8">
            <span className="block">להיות עמוד השדרה</span>
            <span className="block">של <span className="gradient-text">הסחר הימי הישראלי</span></span>
          </h2>

          {/* Vision statement */}
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative max-w-3xl mx-auto"
          >
            <div className="absolute -top-4 -right-2 text-6xl text-gold/20 font-serif leading-none select-none">"</div>
            <p className="text-white/60 text-xl leading-relaxed px-8">
              אנחנו לא רק מפעילי טרמינל — אנחנו השותף הלוגיסטי שמאפשר לכלכלה
              הישראלית להתחבר לשאר העולם. כל מכולה שעוברת דרכנו היא חוליה
              בשרשרת שמחברת יצרנים, יבואנים וצרכנים.
            </p>
            <div className="absolute -bottom-6 -left-2 text-6xl text-gold/20 font-serif leading-none select-none rotate-180">"</div>
          </motion.blockquote>
        </motion.div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              className="glass-card rounded-2xl p-6 flex flex-col items-center text-center gap-4 border border-white/5 hover:border-gold/20 transition-colors duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/18 transition-colors duration-300">
                <p.icon size={22} className="text-gold" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2">{p.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
