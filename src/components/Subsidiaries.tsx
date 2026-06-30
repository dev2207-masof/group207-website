'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Anchor, Warehouse, Truck, Container, Thermometer, Building2, ArrowUpLeft
} from 'lucide-react'

const companies = [
  {
    id: 1,
    name: 'טרמינל 207',
    tagline: 'פעילות טרמינל נמל',
    founded: '1996',
    icon: Anchor,
    color: '#1463FF',
    description:
      'טרמינל הנמל הראשי של ישראל, המטפל במיליוני TEU מדי שנה עם מערכות מנוף מתקדמות ומעקב מטענים בזמן אמת.',
    highlights: ['פעילות 24/7', 'עגורנים אוטומטיים', 'מעקב בזמן אמת'],
  },
  {
    id: 2,
    name: 'TPL 208',
    tagline: 'מחסנאות מתקדמות',
    founded: '2004',
    icon: Warehouse,
    color: '#4A90FF',
    description:
      'מרכז לוגיסטי מודרני המצויד בטכנולוגיית WMS מתקדמת, המאפשר ניהול מלאי מדויק ומימוש הזמנות מהיר.',
    highlights: ['50,000 מ"ר', 'WMS בענן', 'שליחה ביום ההזמנה'],
  },
  {
    id: 3,
    name: 'אייל פרייט',
    tagline: 'הובלה יבשתית',
    founded: '1995',
    icon: Truck,
    color: '#F0A500',
    description:
      'מתמחים בהובלת מטענים יבוא/יצוא ברחבי ישראל, המחברים בין טרמינלי הנמל למרכזי הפצה עם צי מודרני.',
    highlights: ['200+ כלי רכב', 'מעקב GPS', 'רישיון חומ"ס'],
  },
  {
    id: 4,
    name: 'מרין מכולות',
    tagline: 'טרמינל מכולות ריקות',
    founded: '2008',
    icon: Container,
    color: '#1463FF',
    description:
      'ניהול המחסן הגדול ביותר למכולות ריקות בישראל — בדיקה, תיקון, אחסון ומיקום מחדש עבור חברות הספנות המובילות.',
    highlights: ['80,000 TEU קיבולת', 'תיקון מכולות', 'שירות סוכנות'],
  },
  {
    id: 5,
    name: 'מרין קירור',
    tagline: 'שירותי מכולות קירור',
    founded: '2010',
    icon: Thermometer,
    color: '#4A90FF',
    description:
      'טיפול מומחה במטענים מקוררים עם תחנות חיבור בשליטת טמפרטורה, ניטור ותחזוקה עבור סחורות רגישות.',
    highlights: ['1,200 שקעי חשמל', '−30°C עד +25°C', 'ניטור מרחוק'],
  },
  {
    id: 6,
    name: 'מרין מבנים',
    tagline: 'ארכיטקטורת מכולות',
    founded: '1986',
    icon: Building2,
    color: '#F0A500',
    description:
      'המרה חדשנית של מכולות ISO למבנים מודולריים מותאמים אישית — משרדים, יחידות אחסון, חללי פופ-אפ ועוד.',
    highlights: ['עיצוב מותאם', 'תקן ISO', 'אספקה מהירה'],
  },
]

function CompanyCard({ company, index }: { company: typeof companies[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 3) * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 group relative overflow-hidden"
      style={{
        borderColor: hovered ? `${company.color}40` : undefined,
        transform: hovered ? 'translateY(-4px)' : undefined,
        boxShadow: hovered ? `0 20px 60px ${company.color}15, 0 0 0 1px ${company.color}30` : undefined,
      }}
    >
      <div
        className="absolute -top-10 -left-10 w-32 h-32 rounded-full blur-3xl transition-opacity duration-500"
        style={{ backgroundColor: company.color, opacity: hovered ? 0.12 : 0 }}
      />

      <div className="flex items-start justify-between mb-5 relative">
        <div className="flex items-center gap-2">
          <span className="text-white/25 text-xs">נוסדה {company.founded}</span>
          <motion.div
            animate={{ rotate: hovered ? -45 : 0, opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpLeft size={16} className="text-white/30" style={{ color: hovered ? company.color : undefined }} />
          </motion.div>
        </div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: hovered ? `${company.color}25` : `${company.color}15`,
            boxShadow: hovered ? `0 0 20px ${company.color}30` : undefined,
          }}
        >
          <company.icon size={22} style={{ color: company.color }} />
        </div>
      </div>

      <h3 style={{ textAlign: 'center' }} className="text-white font-bold text-xl mb-0.5">{company.name}</h3>
      <p style={{ textAlign: 'center' }} className="text-white/40 text-xs font-medium uppercase tracking-wider mb-4">{company.tagline}</p>

      <p style={{ textAlign: 'center' }} className="text-white/50 text-sm leading-relaxed mb-5">{company.description}</p>

      <div className="flex flex-wrap gap-2 justify-end">
        {company.highlights.map((h) => (
          <span
            key={h}
            className="px-2.5 py-1 rounded-lg text-xs font-medium transition-colors duration-300"
            style={{
              backgroundColor: hovered ? `${company.color}20` : 'rgba(255,255,255,0.05)',
              color: hovered ? company.color : 'rgba(255,255,255,0.4)',
            }}
          >
            {h}
          </span>
        ))}
      </div>

      <div
        className="absolute bottom-0 right-0 h-0.5 transition-all duration-500"
        style={{
          width: hovered ? '100%' : '0%',
          background: `linear-gradient(270deg, transparent, ${company.color}, transparent)`,
        }}
      />
    </motion.div>
  )
}

export default function Subsidiaries() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="subsidiaries" ref={ref} className="relative py-28 bg-navy-950 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-blue-light text-xs font-bold tracking-widest uppercase mb-4">
            החברות שלנו
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 text-center">
            שש חטיבות.{' '}
            <span className="gradient-text">חזון אחד.</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-center">
            כל חברת בת היא מומחית בתחומה — יחד הן מרכיבות את האקוסיסטם הלוגיסטי
            השלם ביותר בישראל.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {companies.map((c, i) => (
            <CompanyCard key={c.id} company={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
