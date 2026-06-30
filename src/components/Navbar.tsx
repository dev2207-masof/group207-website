'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, Sun, Moon } from 'lucide-react'

const links = [
  { label: 'אודות', href: '/#about' },
  { label: 'החזון שלנו', href: '/#vision' },
  { label: 'שירותים', href: '/#subsidiaries' },
  { label: 'חדשות', href: '/#news' },
  { label: 'צור קשר', href: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    setIsDark(localStorage.getItem('theme') !== 'light')
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('light', !next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-navy-900/90 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center group">
          <img
            src="/207GroupLogo.png"
            alt="קבוצת GROUP 207"
            className="h-9 w-auto object-contain group-hover:opacity-90 transition-opacity duration-200"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/60 hover:text-white transition-colors duration-200 relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 right-0 w-0 h-px bg-blue-brand group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/tracking"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
          >
            <Search size={14} />
            מעקב מטען
          </a>
          <a
            href="/#contact"
            className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
          >
            דברו איתנו
          </a>
          <a
            href="/#subsidiaries"
            className="px-4 py-2 text-sm font-semibold bg-blue-brand hover:bg-blue-light text-white rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(20,99,255,0.4)]"
          >
            השירותים שלנו
          </a>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="החלף מצב תצוגה"
          className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 hover:border-white/25 text-white/50 hover:text-white transition-all duration-200 cursor-pointer"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="תפריט"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-navy-800/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/tracking"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
              >
                <Search size={14} />
                מעקב מטען
              </a>
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-2 px-4 py-2 text-sm font-semibold bg-blue-brand text-white rounded-lg text-center"
              >
                דברו איתנו
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
