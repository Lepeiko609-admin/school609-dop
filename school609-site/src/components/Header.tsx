'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { href: '#courses', label: 'Каталог' },
  { href: '#teachers', label: 'Педагоги' },
  { href: '#how-to', label: 'Как записаться' },
  { href: '#about', label: 'О центре' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md shadow-[0_2px_24px_-12px_rgba(11,36,52,0.18)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3 group">
            <div className="grid h-10 md:h-11 w-10 md:w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#0FB5B5] to-[#0A8A8A] text-white font-extrabold text-lg shadow-md shadow-[#0FB5B5]/30 transition-transform group-hover:scale-105">
              609
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[15px] md:text-base font-extrabold text-ink">
                Школа №609
              </span>
              <span className="text-[11px] md:text-xs text-muted-foreground font-medium">
                Доп. образование
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-semibold text-ink/70 hover:text-turquoise transition-colors rounded-lg hover:bg-turquoise/5"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#courses"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.03] hover:bg-ink/90"
            >
              Записаться
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-xl bg-muted text-ink"
            aria-label="Меню"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 pt-2 border-t border-border">
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 text-sm font-semibold text-ink/80 hover:text-turquoise rounded-lg hover:bg-turquoise/5"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#courses"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-xl bg-ink px-4 py-3 text-sm font-bold text-white"
              >
                Записаться
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
