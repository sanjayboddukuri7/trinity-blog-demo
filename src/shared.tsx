import { Fragment, useEffect, useLayoutEffect, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import type { Blog, Theme } from './blogs';

export const TRINITY_URL = 'https://trinity-tech.vercel.app';
export const START_PROJECT_URL = `${TRINITY_URL}/project?category=${encodeURIComponent('Blog / Content Website')}`;
export const trinityWhatsapp = (about: string) =>
  `https://wa.me/917075452718?text=${encodeURIComponent(`Hi Trinity Tech, I saw ${about} in Trinity Blog (Prototype) and would like my own blog website.`)}`;

/* ---------- routing: "#/food/post/crispy-masala-dosa" -> ["food", "post", "crispy-masala-dosa"] ---------- */

const parse = () => window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
export function useRoute(): string[] {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const on = () => {
      setRoute(parse());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: reduce ? 'auto' : 'smooth' });
}

/* ---------- theme ---------- */

export function useTheme(t: Theme | null) {
  useLayoutEffect(() => {
    if (!t) return;
    const vars: Record<string, string> = {
      bg: t.bg, text: t.text, muted: t.muted, accent: t.accent, 'accent-text': t.accentText, card: t.card, line: t.line, soft: t.soft, display: t.display, body: t.body,
    };
    const root = document.documentElement.style;
    Object.entries(vars).forEach(([k, v]) => root.setProperty(`--${k}`, v));
    document.documentElement.style.colorScheme = t.dark ? 'dark' : 'light';
    return () => {
      Object.keys(vars).forEach(k => root.removeProperty(`--${k}`));
      document.documentElement.style.colorScheme = '';
    };
  }, [t]);
}

/* ---------- browser-only storage ---------- */

const KEY = 'trinity-blog-demo:';
export function useStored<T>(key: string, initial: T) {
  const [v, setV] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(KEY + key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  const set = (next: T) => {
    setV(next);
    try { localStorage.setItem(KEY + key, JSON.stringify(next)); } catch { /* storage full or blocked */ }
  };
  return [v, set] as const;
}

/** Renders **bold** and `code` inside a sentence. */
export function rich(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={i} className="inline">{part.slice(1, -1)}</code>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export function Initials({ text, size = 'md' }: { text: string; size?: 'sm' | 'md' | 'lg' }) {
  const dims = size === 'lg' ? 'w-16 h-16 text-xl' : size === 'md' ? 'w-11 h-11 text-sm' : 'w-8 h-8 text-[11px]';
  return (
    <span className={`${dims} rounded-full bg-accent text-on-accent grid place-items-center font-bold shrink-0`} aria-hidden>{text}</span>
  );
}

/* ---------- Trinity prototype chrome ---------- */

export function PrototypeBar({ blog, index, total, prev, next }: { blog: Blog; index: number; total: number; prev?: Blog; next?: Blog }) {
  return (
    <div role="note" className="no-print bg-gradient-to-r from-[#b8741a] via-[#e8a33d] to-[#f6d28a] text-[#1b1407] text-[12.5px] relative z-50">
      <div className="wrap py-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
        <a href="#/" className="inline-flex items-center gap-1.5 font-semibold hover:underline underline-offset-2">
          <LayoutGrid className="w-3.5 h-3.5" /> All blog models
        </a>
        <span className="flex items-center gap-2">
          <span className="rounded-full bg-[#1b1407] text-gold-light px-2 py-0.5 text-[10.5px] font-bold tracking-[0.14em]">PROTOTYPE</span>
          <span>Model {index + 1} of {total}: <b>{blog.kind}</b></span>
        </span>
        <span className="flex items-center gap-3 font-semibold">
          {prev && <a href={`#/${prev.slug}`} className="inline-flex items-center gap-1 hover:underline underline-offset-2"><ArrowLeft className="w-3.5 h-3.5" /> Prev</a>}
          {next && <a href={`#/${next.slug}`} className="inline-flex items-center gap-1 hover:underline underline-offset-2">Next <ArrowRight className="w-3.5 h-3.5" /></a>}
        </span>
      </div>
    </div>
  );
}

export function TrinityCredit({ dark = true }: { dark?: boolean }) {
  return (
    <a href={TRINITY_URL} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 text-xs ${dark ? 'text-white/60' : 'text-muted'}`}>
      <img src="/mark.png" alt="" className="w-6 h-5 object-contain" />
      <span className={`font-brand tracking-[0.14em] ${dark ? 'text-white' : 'text-fg'}`}>TRINITY TECH</span>
      <span>· Build. Innovate. Transform.</span>
    </a>
  );
}
