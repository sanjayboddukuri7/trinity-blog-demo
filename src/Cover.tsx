import type { ReactNode } from 'react';
import { photoUrl, type ArtKind, type Cover as CoverT } from './blogs';

/** A post cover: an Unsplash photo, or an illustration drawn in code for tech and business posts. */
export function Cover({ cover, title, w = 900, className = '', eager = false }: { cover: CoverT; title: string; w?: number; className?: string; eager?: boolean }) {
  if ('photo' in cover) {
    return (
      <div className={`overflow-hidden bg-soft ${className}`}>
        <img src={photoUrl(cover.photo, w)} alt={title} loading={eager ? 'eager' : 'lazy'} decoding="async"
          className="w-full h-full object-cover" />
      </div>
    );
  }
  const [a, b] = cover.colors;
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: `linear-gradient(135deg, ${a}, ${b})` }} role="img" aria-label={`${title} cover illustration`}>
      <div className="absolute -right-10 -top-12 w-44 h-44 rounded-full bg-white/15" />
      <div className="absolute -left-10 -bottom-14 w-48 h-48 rounded-full bg-black/10" />
      <div className="absolute inset-0 grid place-items-center p-6">{ART[cover.art](a, b)}</div>
    </div>
  );
}

const Card = ({ children, dark = false, className = '' }: { children: ReactNode; dark?: boolean; className?: string }) => (
  <div className={`w-[78%] max-w-[320px] rounded-xl shadow-2xl overflow-hidden ${dark ? 'bg-[#0D1117]' : 'bg-white/95'} ${className}`}>
    <div className={`h-5 flex items-center gap-1 px-2 ${dark ? 'bg-white/5' : 'bg-black/5'}`}>
      {['#F87171', '#FBBF24', '#34D399'].map(c => <span key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />)}
    </div>
    <div className="p-3">{children}</div>
  </div>
);

const ART: Record<ArtKind, (a: string, b: string) => ReactNode> = {
  branch: (a, b) => (
    <Card dark>
      <svg viewBox="0 0 220 90" className="w-full h-24" aria-hidden>
        <path d="M20 70 H200" stroke="#E6EDF3" strokeOpacity=".35" strokeWidth="3" />
        <path d="M60 70 C 80 70, 80 30, 105 30 H160 C 180 30, 180 70, 200 70" stroke={a} strokeWidth="3" fill="none" />
        {[20, 60, 120, 200].map(x => <circle key={x} cx={x} cy="70" r="6" fill="#0D1117" stroke="#E6EDF3" strokeWidth="2.5" />)}
        {[105, 145].map(x => <circle key={x} cx={x} cy="30" r="6" fill="#0D1117" stroke={b} strokeWidth="2.5" />)}
      </svg>
      <div className="font-mono text-[10px] text-white/70">$ git switch -c feature/search</div>
    </Card>
  ),
  grid: (a, b) => (
    <Card>
      <div className="grid grid-cols-4 grid-rows-3 gap-1.5 h-24">
        <div className="col-span-4 rounded" style={{ background: a, opacity: 0.85 }} />
        <div className="row-span-2 rounded bg-black/10" />
        <div className="col-span-3 rounded" style={{ background: b, opacity: 0.6 }} />
        <div className="col-span-3 rounded bg-black/10" />
      </div>
    </Card>
  ),
  code: (a, b) => (
    <Card dark>
      <div className="font-mono text-[10.5px] leading-relaxed text-white/80">
        <div><span style={{ color: b }}>const</span> total = order</div>
        <div className="pl-3">.<span style={{ color: a }}>filter</span>(o =&gt; o.veg)</div>
        <div className="pl-3">.<span style={{ color: a }}>reduce</span>((s, o) =&gt; s + o.price, 0);</div>
        <div className="text-white/40">// 110</div>
      </div>
    </Card>
  ),
  bolt: a => (
    <Card>
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 60 60" className="w-16 h-16 shrink-0" aria-hidden>
          <circle cx="30" cy="30" r="25" fill="none" stroke="#E5E7EB" strokeWidth="6" />
          <circle cx="30" cy="30" r="25" fill="none" stroke={a} strokeWidth="6" strokeDasharray="150 157" strokeLinecap="round" transform="rotate(-90 30 30)" />
          <text x="30" y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="#111827">98</text>
        </svg>
        <div className="flex-1 space-y-1.5">
          {['92%', '70%', '84%'].map(w => <div key={w} className="h-2 rounded-full" style={{ width: w, background: a, opacity: 0.7 }} />)}
        </div>
      </div>
    </Card>
  ),
  room: (a, b) => (
    <svg viewBox="0 0 240 150" className="w-[82%] max-w-[340px]" aria-hidden>
      <rect x="10" y="10" width="220" height="130" rx="10" fill="#F6F2EC" />
      <rect x="140" y="24" width="64" height="70" rx="4" fill="#DCE8E4" stroke="#fff" strokeWidth="4" />
      <rect x="132" y="18" width="6" height="96" fill={b} />
      <rect x="206" y="18" width="6" height="96" fill={b} />
      <rect x="26" y="34" width="40" height="52" rx="20" fill="#E9E2D6" stroke={b} strokeWidth="3" />
      <rect x="22" y="92" width="98" height="26" rx="8" fill={a} />
      <rect x="22" y="82" width="98" height="16" rx="7" fill={a} opacity=".75" />
      {[30, 110].map(x => <rect key={x} x={x} y="118" width="4" height="12" fill="#1F2A27" />)}
      <ellipse cx="120" cy="134" rx="90" ry="6" fill={b} opacity=".35" />
    </svg>
  ),
  palette: (a, b) => (
    <div className="flex gap-2.5 items-end">
      {[a, '#F6F2EC', b, '#2F5D50', '#E3DBCF'].map((c, i) => (
        <div key={i} className="w-12 sm:w-14 rounded-t-full rounded-b-lg shadow-xl ring-4 ring-white/70" style={{ background: c, height: 80 + (i % 2) * 28 }} />
      ))}
    </div>
  ),
  lamp: (_a, b) => (
    <svg viewBox="0 0 200 150" className="w-[70%] max-w-[300px]" aria-hidden>
      <defs>
        <radialGradient id="glow" cx="50%" cy="20%" r="70%">
          <stop offset="0%" stopColor={b} stopOpacity=".9" />
          <stop offset="100%" stopColor={b} stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M100 0 V30" stroke="#E3DBCF" strokeWidth="2" />
      <path d="M70 58 L82 30 H118 L130 58 Z" fill={b} />
      <path d="M40 150 L76 58 H124 L160 150 Z" fill="url(#glow)" opacity=".6" />
      <rect x="40" y="128" width="120" height="14" rx="6" fill="#F6F2EC" opacity=".85" />
    </svg>
  ),
  plan: (a, b) => (
    <svg viewBox="0 0 240 150" className="w-[82%] max-w-[340px]" aria-hidden>
      <rect x="10" y="10" width="220" height="130" rx="6" fill={b} stroke={a} strokeWidth="5" />
      <path d="M110 10 V80 M10 80 H150 M150 80 V140 M180 10 V60 H230" stroke={a} strokeWidth="4" fill="none" />
      <rect x="24" y="24" width="60" height="36" rx="4" fill={a} opacity=".25" />
      <rect x="124" y="94" width="18" height="34" rx="3" fill={a} opacity=".25" />
      <circle cx="200" cy="100" r="16" fill={a} opacity=".25" />
      <path d="M60 80 A 18 18 0 0 1 78 98" stroke={a} strokeWidth="2" fill="none" strokeDasharray="3 3" />
      <text x="40" y="112" fontSize="11" fontFamily="Inter" fill={a} fontWeight="600">LIVING</text>
      <text x="124" y="40" fontSize="11" fontFamily="Inter" fill={a} fontWeight="600">KITCHEN</text>
    </svg>
  ),
};
