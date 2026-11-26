import { useState } from 'react';
import { Check, ChefHat, Clock, Copy, Lightbulb, Minus, Plus, Printer, Quote, Users } from 'lucide-react';
import { creditUrl, photoUrl, type Block, type Ingredient } from './blogs';
import { rich, scrollToId } from './shared';

export const headingId = (text: string) => 'h-' + text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/** Renders one article block. */
export function BlockView({ block, blogSlug, postSlug }: { block: Block; blogSlug: string; postSlug: string }) {
  switch (block.t) {
    case 'p':
      return <p>{rich(block.text)}</p>;
    case 'h':
      return <h2 id={headingId(block.text)} className="font-display text-[28px] sm:text-[32px] leading-tight font-bold !mt-12 !mb-4 scroll-mt-24">{block.text}</h2>;
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag className="my-5 space-y-2.5">
          {block.items.map((x, i) => (
            <li key={i} className="flex gap-3">
              {block.ordered
                ? <span className="mt-1 w-6 h-6 rounded-full bg-accent text-on-accent text-xs font-bold grid place-items-center shrink-0 font-sans">{i + 1}</span>
                : <span className="mt-[0.7em] w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
              <span>{rich(x)}</span>
            </li>
          ))}
        </Tag>
      );
    }
    case 'quote':
      return (
        <blockquote className="my-8 border-l-4 border-accent pl-5 sm:pl-6">
          <Quote className="w-6 h-6 text-accent mb-2" />
          <p className="font-display text-2xl leading-snug">{block.text}</p>
          {block.by && <footer className="mt-2 text-sm text-muted font-sans">— {block.by}</footer>}
        </blockquote>
      );
    case 'tip':
      return (
        <aside className="my-7 rounded-2xl bg-soft border border-line p-5 font-sans text-[16px] leading-relaxed">
          <div className="flex items-center gap-2 font-semibold text-accent"><Lightbulb className="w-4 h-4" /> {block.title ?? 'Tip'}</div>
          <p className="mt-1.5">{rich(block.text)}</p>
        </aside>
      );
    case 'code':
      return <CodeBlock lang={block.lang} code={block.code} />;
    case 'img':
      return (
        <figure className="my-8 -mx-5 sm:mx-0">
          <img src={photoUrl(block.photo, 1200)} alt={block.caption} loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover sm:rounded-2xl bg-soft" />
          <figcaption className="mt-2 px-5 sm:px-0 text-sm text-muted font-sans">
            {block.caption} Photo: <a className="underline underline-offset-2" href={creditUrl(block.by)} target="_blank" rel="noreferrer">@{block.by}</a> on Unsplash.
          </figcaption>
        </figure>
      );
    case 'facts':
      return (
        <section className="my-8 rounded-2xl border border-line bg-card p-5 sm:p-6 font-sans">
          <div className="eyebrow">{block.title}</div>
          <dl className="mt-4 grid grid-cols-2 gap-4">
            {block.items.map(x => (
              <div key={x.l}>
                <dt className="text-xs text-muted">{x.l}</dt>
                <dd className="mt-0.5 font-semibold text-[15px] leading-snug">{x.v}</dd>
              </div>
            ))}
          </dl>
        </section>
      );
    case 'days':
      return (
        <ol className="my-6 space-y-4 font-sans">
          {block.items.map(d => (
            <li key={d.day} className="relative rounded-2xl border border-line bg-card p-5 pl-6 overflow-hidden">
              <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-accent" />
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{d.day}</div>
              <div className="font-display text-xl font-bold mt-0.5">{d.title}</div>
              <ul className="mt-2 space-y-1 text-[15.5px]">
                {d.plan.map(p => <li key={p} className="flex gap-2"><Check className="w-4 h-4 mt-1 text-accent shrink-0" />{p}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      );
    case 'recipe':
      return <RecipeCard block={block} key={`${blogSlug}-${postSlug}`} />;
    case 'cta':
      return (
        <aside className="my-10 rounded-3xl bg-accent text-on-accent p-6 sm:p-8 font-sans">
          <div className="font-display text-2xl sm:text-[28px] font-bold leading-tight">{block.title}</div>
          <p className="mt-2 opacity-85 text-[16px]">{block.text}</p>
          <button onClick={() => scrollToId('consult')} className="btn mt-5 bg-white text-[#1F2A27] hover:bg-white/90">{block.button}</button>
        </aside>
      );
  }
}

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard blocked */ }
  };
  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-line bg-[#0A0E14] font-sans">
      <div className="flex items-center justify-between px-4 h-10 border-b border-white/10 text-xs">
        <span className="font-mono uppercase tracking-wider text-[#9BA7B4]">{lang}</span>
        <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-md px-2 h-7 text-[#E6EDF3] hover:bg-white/10" aria-live="polite">
          {copied ? <><Check className="w-3.5 h-3.5 text-[#34D399]" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[13.5px] leading-relaxed text-[#E6EDF3]"><code className="font-mono">{highlight(code)}</code></pre>
    </div>
  );
}

/** Very small highlighter: greys out comments, colours strings. Enough for short tutorial snippets. */
function commentStart(line: string) {
  let quote = '';
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (quote) { if (c === quote) quote = ''; continue; }
    if (c === "'" || c === '"') { quote = c; continue; }
    const startOk = i === 0 || /\s/.test(line[i - 1]);
    if (startOk && (line.startsWith('//', i) || c === '#' || line.startsWith('<!--', i))) return i;
  }
  return -1;
}

function highlight(code: string) {
  return code.split('\n').map((line, i) => {
    const at = commentStart(line);
    const body = at < 0 ? line : line.slice(0, at);
    const comment = at < 0 ? '' : line.slice(at);
    const parts = body.split(/('[^']*'|"[^"]*")/g);
    return (
      <span key={i} className="block">
        {parts.map((p, j) => (/^['"]/.test(p) ? <span key={j} className="text-[#A5D6A7]">{p}</span> : <span key={j}>{p}</span>))}
        {comment && <span className="text-[#8B949E]">{comment}</span>}
        {line === '' && ' '}
      </span>
    );
  });
}

/* ---------- recipe card ---------- */

const FRACTIONS: [number, string][] = [[0, ''], [0.25, '¼'], [1 / 3, '⅓'], [0.5, '½'], [2 / 3, '⅔'], [0.75, '¾'], [1, '']];
export function fmtQty(n: number) {
  let whole = Math.floor(n + 1e-9);
  const frac = n - whole;
  const [val, sym] = FRACTIONS.reduce((best, f) => (Math.abs(f[0] - frac) < Math.abs(best[0] - frac) ? f : best));
  if (Math.abs(val - frac) > 0.06) return String(Math.round(n * 10) / 10);
  if (val === 1) whole += 1;
  return whole ? `${whole}${sym}` : sym || '0';
}
const unitFor = (u: string, q: number) => (u.startsWith('cup') ? (q > 1 ? 'cups' : 'cup') : u);

function IngredientLine({ i, scale }: { i: Ingredient; scale: number }) {
  if (i.q == null) return <>{i.item}</>;
  const q = i.q * scale;
  return <><b className="font-semibold">{fmtQty(q)}{i.u ? ` ${unitFor(i.u, q)}` : ''}</b> {i.item}</>;
}

function RecipeCard({ block }: { block: Extract<Block, { t: 'recipe' }> }) {
  const [serves, setServes] = useState(block.serves);
  const [done, setDone] = useState<number[]>([]);
  const scale = serves / block.serves;
  const toggle = (i: number) => setDone(d => (d.includes(i) ? d.filter(x => x !== i) : [...d, i]));
  const print = () => {
    document.body.classList.add('print-recipe');
    const off = () => { document.body.classList.remove('print-recipe'); window.removeEventListener('afterprint', off); };
    window.addEventListener('afterprint', off);
    window.print();
  };

  return (
    <section id="recipe" className="recipe-card my-10 rounded-3xl border-2 bg-card p-5 sm:p-8 font-sans text-[16px] leading-relaxed scroll-mt-24" style={{ borderColor: 'color-mix(in srgb, var(--accent) 35%, transparent)' }}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="eyebrow flex items-center gap-1.5"><ChefHat className="w-4 h-4" /> Recipe</div>
          <h3 className="font-display text-3xl font-bold mt-1">{block.name}</h3>
        </div>
        <button onClick={print} className="btn-line h-10 no-print"><Printer className="w-4 h-4" /> Print recipe</button>
      </div>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <div className="rounded-xl bg-soft p-3"><div className="text-muted text-xs flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Prep</div><div className="font-semibold mt-0.5">{block.prep}</div></div>
        <div className="rounded-xl bg-soft p-3"><div className="text-muted text-xs flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Cook</div><div className="font-semibold mt-0.5">{block.cook}</div></div>
        <div className="rounded-xl bg-soft p-3">
          <div className="text-muted text-xs flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Serves</div>
          <div className="mt-1 flex items-center gap-2">
            <button aria-label="Fewer servings" onClick={() => setServes(s => Math.max(1, s - 1))} className="no-print w-7 h-7 rounded-full border border-line grid place-items-center hover:bg-card disabled:opacity-40" disabled={serves <= 1}><Minus className="w-3.5 h-3.5" /></button>
            <span className="font-semibold tabular-nums min-w-[1.5ch] text-center" aria-live="polite">{serves}</span>
            <button aria-label="More servings" onClick={() => setServes(s => Math.min(24, s + 1))} className="no-print w-7 h-7 rounded-full border border-line grid place-items-center hover:bg-card"><Plus className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      </div>
      {serves !== block.serves && <p className="mt-2 text-xs text-muted no-print">Quantities changed for {serves} {serves === 1 ? 'person' : 'people'}. Original recipe serves {block.serves} {block.unit}.</p>}

      <div className="mt-7 grid md:grid-cols-[0.9fr_1.1fr] gap-8">
        <div>
          <h4 className="font-bold text-lg">Ingredients</h4>
          {block.ingredients.map(g => (
            <div key={g.group} className="mt-4">
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{g.group}</div>
              <ul className="mt-2 space-y-1.5">
                {g.items.map(i => <li key={i.item} className="flex gap-2"><span className="mt-[0.65em] w-1.5 h-1.5 rounded-full bg-accent shrink-0" /><span><IngredientLine i={i} scale={scale} /></span></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div>
          <h4 className="font-bold text-lg">Method <span className="text-sm font-normal text-muted no-print">· tap a step when done</span></h4>
          <ol className="mt-4 space-y-3">
            {block.steps.map((s, i) => {
              const on = done.includes(i);
              return (
                <li key={i}>
                  <button onClick={() => toggle(i)} aria-pressed={on} className={`w-full text-left flex gap-3 rounded-xl p-2 -m-2 hover:bg-soft transition-colors ${on ? 'opacity-55' : ''}`}>
                    <span className={`mt-0.5 w-7 h-7 rounded-full grid place-items-center text-xs font-bold shrink-0 ${on ? 'bg-accent text-on-accent' : 'border-2 border-accent text-accent'}`}>
                      {on ? <Check className="w-4 h-4" /> : i + 1}
                    </span>
                    <span className={on ? 'line-through' : ''}>{s}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
