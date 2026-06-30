
const aboutLinks = [
  { label: 'פרופיל החברה', href: '/#about' },
  { label: 'החזון שלנו', href: '/#vision' },
  { label: 'הנהלה', href: '/#about' },
  { label: 'לקוחות', href: '/#about' },
  { label: 'קוד אתי', href: '#' },
  { label: 'הסכם שירות', href: '#' },
]

const subsidiaryLinks = [
  { label: 'טרמינל 207', href: '/#subsidiaries' },
  { label: 'TPL 208', href: '/#subsidiaries' },
  { label: 'אייל פרייט', href: '/#subsidiaries' },
  { label: 'מרין מכולות', href: '/#subsidiaries' },
  { label: 'מרין קירור', href: '/#subsidiaries' },
  { label: 'מרין מבנים', href: '/#subsidiaries' },
]

const serviceLinks = [
  { label: 'מעקב מטען', href: '/tracking' },
  { label: 'ניהול מכולות', href: '#' },
  { label: 'הודעות ועדכונים', href: '/#news' },
  { label: 'טפסים', href: '#' },
  { label: 'שאלות נפוצות', href: '#' },
  { label: 'צור קשר', href: '/#contact' },
]

export default function Footer() {
  return (
    <footer className="relative bg-navy-950 border-t border-white/5">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-brand/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-5 gap-10 mb-14">

          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center mb-5 w-fit group">
              <img
                src="/207GroupLogo.png"
                alt="קבוצת GROUP 207"
                className="h-10 w-auto object-contain group-hover:opacity-80 transition-opacity duration-200"
              />
            </a>
            <p className="text-white/35 text-sm leading-relaxed mb-6 max-w-xs">
              קבוצת הלוגיסטיקה הימית המשולבת ביותר בישראל.
              מחברים בין הנמל ליעד מאז 1996.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-blue-brand/20 border border-white/8 hover:border-blue-brand/40 flex items-center justify-center text-white/40 hover:text-blue-light transition-all duration-200 text-xs font-bold"
              >
                f
              </a>
              <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                כל המערכות פעילות
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">אודות קבוצה 207</h4>
            <ul className="flex flex-col gap-2.5">
              {aboutLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-white/40 hover:text-white text-sm transition-colors duration-200">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">שירותי לוגיסטיקה</h4>
            <ul className="flex flex-col gap-2.5">
              {subsidiaryLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-white/40 hover:text-white text-sm transition-colors duration-200">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">שירות לקוחות</h4>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-white/40 hover:text-white text-sm transition-colors duration-200">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-5 border-t border-white/5">
              <p className="text-white/25 text-xs mb-1">טלפון</p>
              <p className="text-white/50 text-sm" dir="ltr">08 XXX XXXX</p>
              <p className="text-white/25 text-xs mt-2 mb-1">אימייל</p>
              <p className="text-white/50 text-sm" dir="ltr">info@group207.co.il</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} קבוצה 207. כל הזכויות שמורות.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors">מדיניות פרטיות</a>
            <a href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors">הסכם שירות</a>
            <a href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors">קוד אתי</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
