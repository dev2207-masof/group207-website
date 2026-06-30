'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Package, CheckCircle2, Clock, XCircle,
  Warehouse, ArrowRight, ArrowLeft, RotateCcw, MapPin, AlertCircle,
} from 'lucide-react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'

// Real format from the system: 4 letters + 7 digits (e.g. MSCU1234567)
const CONTAINER_REGEX = /^[A-Za-z]{4}\d{7}$/

type StatusKey = 'EXPECTED' | 'PP_AWAITING_EMPTY' | 'PP_EMPTIED' | 'HH_IN_WAREHOUSE' | 'EXITED' | 'NOT_FOUND'

interface TrackingResult {
  status: StatusKey
  containerNumber: string
  type: string
  terminal: string
  entryDate: string | null
  rkDate: string | null
  exitDate: string | null
}

const STATUS_META: Record<StatusKey, { label: string; color: string; bg: string; border: string; icon: React.ReactNode }> = {
  EXPECTED: {
    label: 'צפוי להגיע לטרמינל',
    color: 'text-blue-light',
    bg: 'bg-blue-brand/10',
    border: 'border-blue-brand/30',
    icon: <Clock size={16} />,
  },
  PP_AWAITING_EMPTY: {
    label: 'בטרמינל — ממתין לפריקה',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/30',
    icon: <Package size={16} />,
  },
  PP_EMPTIED: {
    label: 'פריקה בוצעה — ממתין לשחרור',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    border: 'border-orange-400/30',
    icon: <Package size={16} />,
  },
  HH_IN_WAREHOUSE: {
    label: 'במחסן',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/30',
    icon: <Warehouse size={16} />,
  },
  EXITED: {
    label: 'שוחרר מהטרמינל',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/30',
    icon: <CheckCircle2 size={16} />,
  },
  NOT_FOUND: {
    label: 'מכולה לא נמצאה',
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    border: 'border-red-400/30',
    icon: <XCircle size={16} />,
  },
}

function getMockResult(raw: string): TrackingResult {
  const containerNumber = raw.toUpperCase()
  // Vary status based on digit sum mod 4 to make different numbers feel realistic
  const digits = containerNumber.replace(/\D/g, '')
  const sum = digits.split('').reduce((a, d) => a + parseInt(d), 0)
  const bucket = sum % 4

  const type = containerNumber.charCodeAt(3) % 2 === 0 ? 'מכולה מלאה (PP)' : 'מכולה בית-לבית (HH)'

  if (bucket === 0) {
    return { status: 'EXPECTED', containerNumber, type, terminal: 'טרמינל 207 — נמל אשדוד', entryDate: null, rkDate: null, exitDate: null }
  } else if (bucket === 1) {
    return { status: 'PP_AWAITING_EMPTY', containerNumber, type, terminal: 'טרמינל 207 — נמל אשדוד', entryDate: '25.06.2026', rkDate: null, exitDate: null }
  } else if (bucket === 2) {
    return { status: 'PP_EMPTIED', containerNumber, type, terminal: 'טרמינל 207 — נמל אשדוד', entryDate: '22.06.2026', rkDate: '25.06.2026', exitDate: null }
  } else {
    return { status: 'EXITED', containerNumber, type, terminal: 'טרמינל 207 — נמל אשדוד', entryDate: '19.06.2026', rkDate: '22.06.2026', exitDate: '26.06.2026' }
  }
}

interface TimelineStep {
  label: string
  date: string | null
  done: boolean
  current: boolean
}

function buildTimeline(result: TrackingResult): TimelineStep[] {
  const s = result.status
  return [
    {
      label: 'הזמנה התקבלה',
      date: null,
      done: true,
      current: false,
    },
    {
      label: 'מכולה צפויה להגיע לטרמינל',
      date: null,
      done: s !== 'NOT_FOUND',
      current: s === 'EXPECTED',
    },
    {
      label: 'כניסה לטרמינל נמל אשדוד',
      date: result.entryDate,
      done: !!result.entryDate,
      current: false,
    },
    {
      label: 'ממתין לפריקה',
      date: null,
      done: s === 'PP_EMPTIED' || s === 'HH_IN_WAREHOUSE' || s === 'EXITED',
      current: s === 'PP_AWAITING_EMPTY',
    },
    {
      label: 'פריקה בוצעה / העברה למחסן',
      date: result.rkDate,
      done: !!result.rkDate || s === 'HH_IN_WAREHOUSE' || s === 'EXITED',
      current: s === 'HH_IN_WAREHOUSE',
    },
    {
      label: 'שחרור ממכס',
      date: null,
      done: s === 'EXITED',
      current: false,
    },
    {
      label: 'יציאה מהטרמינל',
      date: result.exitDate,
      done: !!result.exitDate,
      current: false,
    },
  ]
}

export default function TrackingPage() {
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TrackingResult | null>(null)

  const handleSearch = () => {
    const trimmed = query.trim()
    if (!trimmed) {
      setError('נא להזין מספר מכולה')
      return
    }
    if (!CONTAINER_REGEX.test(trimmed)) {
      setError('פורמט לא תקין. מספר מכולה: 4 אותיות + 7 ספרות (לדוגמה: MSCU1234567)')
      return
    }
    setError('')
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      setResult(getMockResult(trimmed))
      setLoading(false)
    }, 1400)
  }

  const handleReset = () => {
    setResult(null)
    setQuery('')
    setError('')
  }

  const meta = result ? STATUS_META[result.status] : null
  const timeline = result && result.status !== 'NOT_FOUND' ? buildTimeline(result) : null

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy-950">
        {/* Photo background */}
        <div className="fixed inset-0 pointer-events-none">
          <Image
            src="/photos/DJI_0352.JPG"
            alt="מתחם מכולות נמל אשדוד"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy-950/82" />
        </div>
        {/* Grid background */}
        <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="fixed top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-brand/5 blur-[140px] pointer-events-none" />
        <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gold/4 blur-[120px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 pt-32 pb-24">
          {/* Back link */}
          <a
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors duration-200 mb-10"
          >
            <ArrowLeft size={15} />
            חזרה לדף הבית
          </a>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="mb-5">
              <img src="/207GroupLogo.png" alt="קבוצת GROUP 207" className="h-12 w-auto object-contain mx-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              מעקב <span className="gradient-text">מטען</span>
            </h1>
            <p className="text-white/40 text-lg">
              הזינו מספר מכולה לבדיקת סטטוס המטען שלכם בטרמינל
            </p>
          </motion.div>

          {/* Search box */}
          <AnimatePresence mode="wait">
            {!result && (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-2xl p-6 border border-white/5 mb-6"
              >
                <label className="block text-white/40 text-xs uppercase tracking-widest mb-3 text-center">
                  מספר מכולה / מספר מטען
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value.toUpperCase()); setError('') }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="לדוגמה: MSCU1234567"
                    maxLength={11}
                    dir="ltr"
                    className="flex-1 bg-navy-800 border border-white/10 rounded-xl px-5 py-3.5 text-white text-center text-lg font-mono tracking-widest placeholder-white/15 focus:outline-none focus:border-blue-brand/50 transition-colors"
                  />
                  <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3.5 bg-blue-brand hover:bg-blue-light text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_25px_rgba(20,99,255,0.4)] disabled:opacity-50 shrink-0"
                  >
                    <Search size={16} />
                    חפש
                  </button>
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2 text-red-400 text-sm mt-3"
                  >
                    <AlertCircle size={14} />
                    {error}
                  </motion.p>
                )}
                <p className="text-white/20 text-xs text-center mt-4">
                  פורמט: 4 אותיות + 7 ספרות · לדוגמה MSCU1234567 · TCKU9876543
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading */}
          <AnimatePresence>
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 py-16"
              >
                <div className="w-12 h-12 rounded-full border-2 border-blue-brand/30 border-t-blue-brand animate-spin" />
                <p className="text-white/40 text-sm">מחפש מטען...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Status card */}
                <div className="glass-card rounded-2xl p-6 border border-white/5 mb-4">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-widest mb-1">מספר מכולה</p>
                      <p className="text-white font-mono font-bold text-2xl tracking-widest">{result.containerNumber}</p>
                    </div>
                    {meta && (
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold ${meta.color} ${meta.bg} ${meta.border}`}>
                        {meta.icon}
                        {meta.label}
                      </div>
                    )}
                  </div>

                  {result.status !== 'NOT_FOUND' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/5">
                      <div className="text-center">
                        <p className="text-white/30 text-xs uppercase tracking-wider mb-1">סוג מטען</p>
                        <p className="text-white text-sm font-medium">{result.type}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white/30 text-xs uppercase tracking-wider mb-1">טרמינל</p>
                        <p className="text-white text-sm font-medium flex items-center justify-center gap-1">
                          <MapPin size={12} className="text-blue-light" />
                          {result.terminal}
                        </p>
                      </div>
                      <div className="text-center col-span-2 md:col-span-1">
                        <p className="text-white/30 text-xs uppercase tracking-wider mb-1">תאריך כניסה</p>
                        <p className="text-white text-sm font-medium">{result.entryDate ?? '—'}</p>
                      </div>
                    </div>
                  )}

                  {result.status === 'NOT_FOUND' && (
                    <p className="text-white/40 text-sm mt-4 text-center">
                      המכולה לא נמצאה במערכת. ודאו את מספר המכולה או{' '}
                      <a href="/#contact" className="text-blue-light hover:underline">פנו אלינו</a>.
                    </p>
                  )}
                </div>

                {/* Timeline */}
                {timeline && (
                  <div className="glass-card rounded-2xl p-6 border border-white/5 mb-4">
                    <h3 className="text-white font-bold mb-6 text-center text-sm uppercase tracking-widest text-white/40">
                      מעקב אירועים
                    </h3>
                    <div className="relative">
                      {timeline.map((step, i) => (
                        <div key={i} className="flex gap-4 items-start relative">
                          {/* Connector line */}
                          {i < timeline.length - 1 && (
                            <div className={`absolute right-[19px] top-8 w-px h-8 ${step.done ? 'bg-blue-brand/40' : 'bg-white/8'}`} />
                          )}
                          {/* Icon */}
                          <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                            step.current
                              ? 'bg-blue-brand border-blue-brand shadow-[0_0_20px_rgba(20,99,255,0.5)]'
                              : step.done
                              ? 'bg-emerald-500/15 border-emerald-500/50'
                              : 'bg-white/3 border-white/10'
                          }`}>
                            {step.current ? (
                              <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                            ) : step.done ? (
                              <CheckCircle2 size={16} className="text-emerald-400" />
                            ) : (
                              <Clock size={14} className="text-white/20" />
                            )}
                          </div>
                          {/* Content */}
                          <div className="pb-8 flex-1 flex items-center justify-between">
                            <p className={`text-sm font-medium ${step.current ? 'text-blue-light' : step.done ? 'text-white/80' : 'text-white/25'}`}>
                              {step.label}
                              {step.current && <span className="mr-2 text-xs text-blue-light/60">(סטטוס נוכחי)</span>}
                            </p>
                            {step.date && (
                              <span className="text-white/35 text-xs font-mono">{step.date}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-5 py-2.5 border border-white/10 hover:border-white/25 text-white/60 hover:text-white text-sm font-medium rounded-xl transition-all duration-200"
                  >
                    <RotateCcw size={14} />
                    חיפוש חדש
                  </button>
                  <a
                    href="/#contact"
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-brand/10 hover:bg-blue-brand/20 border border-blue-brand/30 text-blue-light text-sm font-medium rounded-xl transition-all duration-200"
                  >
                    פנו אלינו לפרטים
                    <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  )
}
