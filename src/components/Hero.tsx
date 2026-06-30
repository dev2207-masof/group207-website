'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronDown, Ship, BarChart3, Globe } from 'lucide-react'
import Image from 'next/image'

const floatingBadges = [
  { icon: Ship, label: 'טרמינל נמל', value: 'אשדוד, ישראל', delay: 0 },
  { icon: BarChart3, label: 'נפח שנתי', value: '2.4M TEU', delay: 0.4 },
  { icon: Globe, label: 'מסלולים גלובליים', value: '60+ נמלים', delay: 0.8 },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    const dots: { x: number; y: number; vx: number; vy: number; alpha: number }[] = []
    for (let i = 0; i < 80; i++) {
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      dots.forEach((d) => {
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > w) d.vx *= -1
        if (d.y < 0 || d.y > h) d.vy *= -1

        ctx.beginPath()
        ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(74, 144, 255, ${d.alpha})`
        ctx.fill()
      })

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(20, 99, 255, ${0.12 * (1 - dist / 120)})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy-950">
      {/* Photo background */}
      <div className="absolute inset-0">
        <Image
          src="/photos/DJI_0431.JPG"
          alt="נמל אשדוד — קבוצת GROUP 207"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-navy-950/75" />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-brand/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gold/6 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          {/* Eyebrow */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-brand/30 bg-blue-brand/10 text-blue-light text-xs font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-brand animate-pulse" />
              קבוצת הלוגיסטיקה המובילה בישראל
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-6xl md:text-8xl font-black leading-tight tracking-tight text-center w-full"
          >
            <span className="block text-white text-center">מניעים את</span>
            <span className="block gradient-text text-center">המטען העולמי</span>
            <span className="block text-white text-center">קדימה.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={item}
            className="max-w-xl text-white/50 text-lg leading-relaxed text-center"
          >
            שש חברות בת משולבות. פתרון אחד חלק. מטרמינל הנמל
            עד המשלוח האחרון — קבוצה 207 מניעה את הכלכלה הימית של ישראל.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href="#subsidiaries"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-brand hover:bg-blue-light text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(20,99,255,0.45)] group"
            >
              גלו את השירותים
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-semibold rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              הסיפור שלנו
            </a>
          </motion.div>

          {/* Floating badges */}
          <motion.div variants={item} className="relative w-full max-w-2xl h-32 mt-4 hidden md:block">
            {floatingBadges.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + b.delay, duration: 0.5 }}
                style={{ left: `${20 + i * 30}%`, top: i % 2 === 0 ? '10px' : '-20px', animationDelay: `${i * 1.2}s` }}
                className="absolute float-slow"
              >
                <div className="glass-card rounded-xl px-4 py-3 flex items-center gap-3 whitespace-nowrap">
                  <div className="w-8 h-8 rounded-lg bg-blue-brand/20 flex items-center justify-center">
                    <b.icon size={16} className="text-blue-light" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider">{b.label}</p>
                    <p className="text-sm font-bold text-white">{b.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest">גלול</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={18} className="text-white/30" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900 to-transparent pointer-events-none" />
    </section>
  )
}
