'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

const info = [
  { icon: MapPin, label: 'מיקום', value: 'נמל אשדוד, ישראל' },
  { icon: Phone, label: 'טלפון', value: '08 XXX XXXX' },
  { icon: Mail, label: 'אימייל', value: 'info@group207.co.il' },
]

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" ref={ref} className="relative py-28 bg-navy-950 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-brand/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-gold/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Centered header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-gold text-xs font-bold tracking-widest uppercase mb-4">
            צור קשר
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            מוכנים להניע{' '}
            <span className="gradient-text">מטענים קדימה?</span>
          </h2>
          <p className="text-white/45 text-lg leading-relaxed max-w-2xl mx-auto">
            בין אם אתם מחפשים גישה לטרמינל נמל, מחסנאות, הובלת מטענים
            או פתרון לוגיסטי מקיף — הצוות שלנו מוכן לבנות את השותפות הנכונה עבורכם.
          </p>
        </motion.div>

        {/* Info row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {info.map((item, i) => (
            <div key={i} className="flex items-center gap-3 glass-card rounded-xl px-5 py-3">
              <div className="w-9 h-9 rounded-lg bg-blue-brand/15 flex items-center justify-center shrink-0">
                <item.icon size={16} className="text-blue-light" />
              </div>
              <div className="text-center">
                <p className="text-white/30 text-xs uppercase tracking-wider">{item.label}</p>
                <p className="text-white font-medium text-sm">{item.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Centered form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-8 border border-white/5">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-emerald-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">ההודעה נשלחה</h3>
                <p className="text-white/45 text-sm">
                  תודה שפנית אלינו. הצוות שלנו יחזור אליך בהקדם.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/40 text-xs uppercase tracking-wider mb-2 text-center">
                      שם מלא *
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="השם שלך"
                      className="w-full bg-navy-800 border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-blue-brand/50 transition-colors text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs uppercase tracking-wider mb-2 text-center">
                      אימייל *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full bg-navy-800 border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-blue-brand/50 transition-colors text-center"
                      dir="ltr"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/40 text-xs uppercase tracking-wider mb-2 text-center">
                    חברה
                  </label>
                  <input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="שם החברה שלך"
                    className="w-full bg-navy-800 border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-blue-brand/50 transition-colors text-center"
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-xs uppercase tracking-wider mb-2 text-center">
                    הודעה *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="ספרו לנו על צרכי הלוגיסטיקה שלכם..."
                    className="w-full bg-navy-800 border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-blue-brand/50 transition-colors resize-none text-center"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-brand hover:bg-blue-light text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(20,99,255,0.4)] group"
                >
                  <Send size={15} className="group-hover:-translate-x-1 transition-transform" />
                  שלח הודעה
                </button>
                <p className="text-white/25 text-xs text-center">
                  אנו מגיבים תוך יום עסקים אחד
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
