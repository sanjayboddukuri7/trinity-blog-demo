import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Bookmark, Check, ChevronRight, Clock, Heart, Link2, Mail, MessageCircle, MessageSquare, Search, Send, Share2, X,
} from 'lucide-react';
import { BLOGS, creditUrl, fmtDate, readMins, type Blog, type Comment, type Post } from './blogs';
import { BlockView, headingId } from './Blocks';
import { Cover } from './Cover';
import { Initials, PrototypeBar, Reveal, START_PROJECT_URL, TrinityCredit, scrollToId, useStored, useTheme } from './shared';

const sorted = (b: Blog) => [...b.posts].sort((x, y) => y.date.localeCompare(x.date));
const neighbours = (b: Blog) => {
  const i = BLOGS.findIndex(x => x.slug === b.slug);
  return { index: i, prev: BLOGS[i - 1], next: BLOGS[i + 1] };
};

/* ================================================================ header / footer */

function Header({ blog }: { blog: Blog }) {
  const [open, setOpen] = useState(false);
  const biz = blog.business;
  const goSection = (id: string) => {
    if (document.getElementById(id)) return scrollToId(id);
    window.location.hash = `#/${blog.slug}`;
    setTimeout(() => scrollToId(id), 120);
  };
  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-bg">
      <div className="wrap h-16 flex items-center justify-between gap-4">
        <a href={`#/${blog.slug}`} className="font-display text-[22px] sm:text-2xl font-bold leading-none whitespace-nowrap">
          {blog.name}{biz && <span className="font-sans text-xs font-semibold text-muted ml-2 align-middle">Journal</span>}
        </a>
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {biz
            ? biz.nav.map(n => {
                const onClick = n === 'Journal' ? () => { window.location.hash = `#/${blog.slug}`; }
                  : n === 'Projects' ? () => { window.location.hash = `#/${blog.slug}/category/Projects`; }
                  : () => goSection(n === 'Services' ? 'services' : 'consult');
                return <button key={n} onClick={onClick} className={`px-3 h-9 rounded-full hover:bg-soft ${n === 'Journal' ? 'text-accent font-semibold' : ''}`}>{n}</button>;
              })
            : blog.categories.map(c => <a key={c} href={`#/${blog.slug}/category/${encodeURIComponent(c)}`} className="px-3 h-9 inline-flex items-center rounded-full hover:bg-soft">{c}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => goSection(biz ? 'consult' : 'subscribe')} className="btn-accent h-10 px-4 hidden sm:inline-flex">
            {biz ? biz.cta : <><Mail className="w-4 h-4" /> Subscribe</>}
          </button>
          <button onClick={() => setOpen(o => !o)} className="md:hidden w-10 h-10 rounded-full border border-line grid place-items-center" aria-label="Menu" aria-expanded={open}>
            {open ? <X className="w-4 h-4" /> : <span className="space-y-1"><span className="block w-4 h-0.5 bg-fg" /><span className="block w-4 h-0.5 bg-fg" /><span className="block w-4 h-0.5 bg-fg" /></span>}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-line wrap py-3 flex flex-wrap gap-2">
          {(biz ? [] : blog.categories).map(c => <a key={c} onClick={() => setOpen(false)} href={`#/${blog.slug}/category/${encodeURIComponent(c)}`} className="chip">{c}</a>)}
          <button onClick={() => { setOpen(false); goSection(biz ? 'consult' : 'subscribe'); }} className="chip !bg-accent !text-on-accent !border-transparent">{biz ? biz.cta : 'Subscribe'}</button>
          {biz && <button onClick={() => { setOpen(false); goSection('services'); }} className="chip">Services</button>}
        </div>
      )}
    </header>
  );
}

function Footer({ blog }: { blog: Blog }) {
  return (
    <footer className="no-print border-t border-line mt-20">
      <div className="wrap py-10 grid md:grid-cols-[1.2fr_1fr] gap-8 items-start">
        <div>
          <div className="font-display text-2xl font-bold">{blog.name}</div>
          <p className="mt-2 text-sm text-muted max-w-md">{blog.tagline}</p>
          <p className="mt-4 text-xs text-muted">A sample blog by Trinity Tech. The blog, author and comments are made up.</p>
        </div>
        <div className="md:text-right space-y-3">
          <a href={START_PROJECT_URL} target="_blank" rel="noreferrer" className="btn-line h-10">Want a blog like this? <ArrowUpRight className="w-4 h-4" /></a>
          <div><TrinityCredit dark={!!blog.theme.dark} /></div>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================ cards */

function Meta({ blog, post, className = '', hideAuthor = false }: { blog: Blog; post: Post; className?: string; hideAuthor?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted ${className}`}>
      <span>{fmtDate(post.date)}</span>
      <span aria-hidden>·</span>
      <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {readMins(post)} min read</span>
      {!blog.business && !hideAuthor && <><span aria-hidden>·</span><span>{blog.author.name}</span></>}
    </div>
  );
}

function PostCard({ blog, post }: { blog: Blog; post: Post }) {
  return (
    <a href={`#/${blog.slug}/post/${post.slug}`} className="group flex flex-col h-full rounded-3xl overflow-hidden border border-line bg-card hover:-translate-y-1 transition-transform">
      <Cover cover={post.cover} title={post.title} w={700} className="aspect-[16/10]" />
      <div className="p-5 flex-1 flex flex-col">
        <span className="eyebrow !tracking-[0.14em]">{post.category}</span>
        <h3 className="mt-2 font-display text-[22px] leading-snug font-bold group-hover:text-accent transition-colors">{post.title}</h3>
        <p className="mt-2 text-[15px] text-muted flex-1">{post.excerpt}</p>
        <Meta blog={blog} post={post} className="mt-4" />
      </div>
    </a>
  );
}

/* ================================================================ newsletter / consult */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Newsletter({ blog }: { blog: Blog }) {
  const [subscribed, setSubscribed] = useStored<string>(`subscribed:${blog.slug}`, '');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) return setError('Please enter a valid email address.');
    setError('');
    setSubscribed(email.trim());
  };
  return (
    <section id="subscribe" className="no-print rounded-3xl bg-soft border border-line p-6 sm:p-10 scroll-mt-24">
      <div className="grid xl:grid-cols-2 gap-6 items-center">
        <div>
          <Mail className="w-7 h-7 text-accent" />
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight">Get new posts in your inbox</h2>
          <p className="mt-2 text-muted">One email when a new {blog.slug === 'food' ? 'recipe' : blog.slug === 'travel' ? 'guide' : 'post'} is out. No spam, unsubscribe any time.</p>
        </div>
        {subscribed ? (
          <div className="rounded-2xl bg-card border border-line p-5" role="status">
            <div className="flex items-center gap-2 font-semibold"><Check className="w-5 h-5 text-accent" /> You are subscribed!</div>
            <p className="mt-1 text-sm text-muted">We will write to {subscribed}. (Prototype: saved only in this browser.)</p>
            <button onClick={() => setSubscribed('')} className="mt-3 text-sm underline underline-offset-2 text-muted">Undo</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="sr-only" htmlFor={`nl-${blog.slug}`}>Email address</label>
              <input id={`nl-${blog.slug}`} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="field" aria-invalid={!!error} />
              <button className="btn-accent h-12 shrink-0">Subscribe <Send className="w-4 h-4" /></button>
            </div>
            {error && <p className="mt-2 text-sm text-red-600" role="alert">{error}</p>}
          </form>
        )}
      </div>
    </section>
  );
}

function Consult({ blog }: { blog: Blog }) {
  const [sent, setSent] = useStored<string>(`consult:${blog.slug}`, '');
  const [f, setF] = useState({ name: '', phone: '', need: 'Full home interiors' });
  const [error, setError] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (f.name.trim().length < 2) return setError('Please enter your name.');
    if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\D/g, '').slice(-10))) return setError('Please enter a 10-digit mobile number.');
    setError('');
    setSent(f.name.trim());
  };
  return (
    <section id="consult" className="no-print rounded-3xl bg-accent text-on-accent p-6 sm:p-10 scroll-mt-24">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">{blog.business?.cta}</h2>
          <p className="mt-3 opacity-85">Tell us about your home. A designer calls you back within a day for a free 20-minute chat. This is how the blog turns readers into customers.</p>
        </div>
        {sent ? (
          <div className="rounded-2xl bg-white text-[#1F2A27] p-6" role="status">
            <div className="flex items-center gap-2 font-semibold text-lg"><Check className="w-5 h-5 text-[#2F5D50]" /> Thank you, {sent}!</div>
            <p className="mt-1 text-sm text-[#5C6561]">Our designer will call you soon. (Prototype: saved only in this browser.)</p>
            <button onClick={() => setSent('')} className="mt-3 text-sm underline underline-offset-2 text-[#5C6561]">Send another</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="rounded-2xl bg-white text-[#1F2A27] p-5 space-y-3">
            <input aria-label="Your name" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} placeholder="Your name" className="w-full h-12 rounded-xl border border-[#E3DBCF] px-4 outline-none focus:border-[#2F5D50]" />
            <input aria-label="Mobile number" inputMode="tel" value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} placeholder="Mobile number" className="w-full h-12 rounded-xl border border-[#E3DBCF] px-4 outline-none focus:border-[#2F5D50]" />
            <select aria-label="What do you need?" value={f.need} onChange={e => setF({ ...f, need: e.target.value })} className="w-full h-12 rounded-xl border border-[#E3DBCF] px-3 bg-white outline-none focus:border-[#2F5D50]">
              {['Full home interiors', 'Kitchen', 'Bedroom & wardrobes', 'Living room', 'Just ideas for now'].map(o => <option key={o}>{o}</option>)}
            </select>
            {error && <p className="text-sm text-red-700" role="alert">{error}</p>}
            <button className="btn w-full h-12 bg-[#2F5D50] text-white hover:opacity-90">Request a call back <ArrowRight className="w-4 h-4" /></button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ================================================================ blog home */

export function BlogHome({ blog, category }: { blog: Blog; category?: string }) {
  useTheme(blog.theme);
  const { index, prev, next } = neighbours(blog);
  const posts = useMemo(() => sorted(blog), [blog]);
  const featured = posts.find(p => p.featured) ?? posts[0];
  const [cat, setCat] = useState(category && blog.categories.includes(category) ? category : 'All');
  const [q, setQ] = useState('');
  useEffect(() => { document.title = `${blog.name}${blog.business ? ' Journal' : ''} · Trinity Blog (Prototype)`; }, [blog]);
  useEffect(() => { setCat(category && blog.categories.includes(category) ? category : 'All'); }, [category, blog]);

  const filtering = cat !== 'All' || q.trim() !== '';
  const term = q.trim().toLowerCase();
  const list = posts.filter(p =>
    (cat === 'All' || p.category === cat) &&
    (!term || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(term)) &&
    (filtering || p !== featured));

  const pickCat = (c: string) => {
    setCat(c);
    window.history.replaceState(null, '', c === 'All' ? `#/${blog.slug}` : `#/${blog.slug}/category/${encodeURIComponent(c)}`);
  };

  return (
    <div className="min-h-screen">
      <PrototypeBar blog={blog} index={index} total={BLOGS.length} prev={prev} next={next} />
      <Header blog={blog} />

      <main>
        {blog.business ? (
          <section className="wrap pt-12 sm:pt-16 pb-8">
            <span className="eyebrow">The Journal</span>
            <h1 className="mt-3 font-display text-[44px] sm:text-[64px] leading-[1.02] font-bold max-w-3xl">Ideas for a home that feels right.</h1>
            <p className="mt-4 text-lg text-muted max-w-2xl">Design tips, colour and lighting guides and real project stories from the {blog.name} studio in Bengaluru.</p>
          </section>
        ) : (
          <section className="wrap pt-10 sm:pt-14 pb-6 text-center">
            <h1 className="font-display text-[44px] sm:text-[64px] leading-[1.02] font-bold">{blog.name}</h1>
            <p className="mt-3 text-lg text-muted">{blog.tagline}</p>
          </section>
        )}

        {/* featured */}
        <section className="wrap mt-6">
          <a href={`#/${blog.slug}/post/${featured.slug}`} className="group grid lg:grid-cols-[1.25fr_1fr] rounded-[28px] overflow-hidden border border-line bg-card">
            <Cover cover={featured.cover} title={featured.title} w={1200} eager className="aspect-[16/10] lg:aspect-auto lg:min-h-[400px]" />
            <div className="p-6 sm:p-10 flex flex-col justify-center">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent text-on-accent px-3 py-1 text-xs font-bold"><Bookmark className="w-3.5 h-3.5" /> Featured · {featured.category}</span>
              <h2 className="mt-4 font-display text-3xl sm:text-[40px] leading-[1.1] font-bold group-hover:text-accent transition-colors">{featured.title}</h2>
              <p className="mt-3 text-muted text-[17px]">{featured.excerpt}</p>
              <Meta blog={blog} post={featured} className="mt-5" />
              <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-accent">Read the post <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </div>
          </a>
        </section>

        {/* filter + list */}
        <section className="wrap mt-14" id="posts">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categories">
              {['All', ...blog.categories].map(c => (
                <button key={c} role="tab" aria-selected={cat === c} onClick={() => pickCat(c)}
                  className={`h-9 px-4 rounded-full text-sm font-medium border transition-colors ${cat === c ? 'bg-accent text-on-accent border-transparent' : 'border-line hover:bg-soft'}`}>{c}</button>
              ))}
            </div>
            <label className="relative w-full lg:w-72">
              <span className="sr-only">Search posts</span>
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search posts…" className="field h-11 pl-10 rounded-full" />
            </label>
          </div>
          <p className="mt-4 text-sm text-muted" aria-live="polite">
            {filtering ? `${list.length} ${list.length === 1 ? 'post' : 'posts'}${cat !== 'All' ? ` in ${cat}` : ''}${term ? ` matching “${q.trim()}”` : ''}` : 'Latest posts'}
          </p>
          {list.length ? (
            <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {list.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 0.05} className="h-full"><PostCard blog={blog} post={p} /></Reveal>)}
            </div>
          ) : (
            <div className="mt-5 rounded-3xl border border-dashed border-line p-10 text-center text-muted">
              No posts found. <button onClick={() => { setQ(''); pickCat('All'); }} className="underline underline-offset-2 text-fg">Show all posts</button>
            </div>
          )}
        </section>

        {blog.business && (
          <section id="services" className="wrap mt-16 scroll-mt-24">
            <h2 className="font-display text-3xl font-bold">What we do</h2>
            <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[['Full home interiors', 'Design to handover for apartments and villas.'], ['Modular kitchens', 'Practical layouts with plenty of storage.'], ['Wardrobes', 'Floor-to-ceiling, made to measure.'], ['Design consultation', 'Colour, lighting and layout advice.']].map(([t, d]) => (
                <div key={t} className="rounded-2xl border border-line bg-card p-5"><div className="font-semibold">{t}</div><p className="mt-1 text-sm text-muted">{d}</p></div>
              ))}
            </div>
          </section>
        )}

        {/* about + newsletter / consult */}
        <section className="wrap mt-16 grid lg:grid-cols-[0.8fr_1.2fr] gap-5">
          <div className="rounded-3xl border border-line bg-card p-6 sm:p-8">
            <Initials text={blog.author.initials} size="lg" />
            <div className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">{blog.business ? 'Written by' : 'About the author'}</div>
            <div className="mt-1 font-display text-2xl font-bold">{blog.author.name}</div>
            <div className="text-sm text-muted">{blog.author.role}</div>
            <p className="mt-3 text-[15px]">{blog.author.bio}</p>
          </div>
          {blog.business ? <Consult blog={blog} /> : <Newsletter blog={blog} />}
        </section>
      </main>
      <Footer blog={blog} />
    </div>
  );
}

/* ================================================================ post page */

function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '');
  useEffect(() => {
    const on = () => {
      let cur = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 180) cur = id;
      }
      setActive(cur);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [ids]);
  return active;
}

function likeBase(slug: string) {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) % 997;
  return 40 + (h % 180);
}

function Actions({ blog, post }: { blog: Blog; post: Post }) {
  const [likes, setLikes] = useStored<string[]>('likes', []);
  const [copied, setCopied] = useState(false);
  const id = `${blog.slug}/${post.slug}`;
  const liked = likes.includes(id);
  const url = window.location.href;
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* blocked */ }
  };
  return (
    <div className="no-print flex flex-wrap items-center gap-2">
      <button onClick={() => setLikes(liked ? likes.filter(x => x !== id) : [...likes, id])} aria-pressed={liked}
        className={`h-10 px-4 rounded-full border inline-flex items-center gap-2 text-sm font-semibold transition-colors ${liked ? 'bg-accent text-on-accent border-transparent' : 'border-line hover:bg-soft'}`}>
        <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} /> {likeBase(post.slug) + (liked ? 1 : 0)}
      </button>
      <a href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}`} target="_blank" rel="noreferrer" className="h-10 px-4 rounded-full border border-line inline-flex items-center gap-2 text-sm hover:bg-soft"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
      <a href={`https://x.com/intent/post?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" className="h-10 px-4 rounded-full border border-line inline-flex items-center gap-2 text-sm hover:bg-soft"><Share2 className="w-4 h-4" /> Post on X</a>
      <button onClick={copy} className="h-10 px-4 rounded-full border border-line inline-flex items-center gap-2 text-sm hover:bg-soft" aria-live="polite">
        {copied ? <><Check className="w-4 h-4 text-accent" /> Link copied</> : <><Link2 className="w-4 h-4" /> Copy link</>}
      </button>
    </div>
  );
}

function Comments({ blog, post }: { blog: Blog; post: Post }) {
  const [mine, setMine] = useStored<Comment[]>(`comments:${blog.slug}/${post.slug}`, []);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const all = [...(post.comments ?? []), ...mine];
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return setError('Please enter your name.');
    if (text.trim().length < 3) return setError('Please write a comment.');
    setError('');
    setMine([...mine, { name: name.trim(), text: text.trim(), ago: 'Just now' }]);
    setText('');
  };
  return (
    <section className="no-print mt-14" aria-labelledby="comments-h">
      <h2 id="comments-h" className="font-display text-2xl font-bold flex items-center gap-2"><MessageSquare className="w-5 h-5 text-accent" /> {all.length} {all.length === 1 ? 'comment' : 'comments'}</h2>
      <ul className="mt-5 space-y-4">
        {all.map((c, i) => {
          const author = c.name.includes('(author)');
          return (
            <li key={i} className={`flex gap-3 ${author ? 'pl-6 sm:pl-12' : ''}`}>
              <span className={`w-9 h-9 rounded-full grid place-items-center text-xs font-bold shrink-0 ${author ? 'bg-accent text-on-accent' : 'bg-soft border border-line'}`}>
                {c.name.replace(/\(.*\)/, '').trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase()}
              </span>
              <div className="flex-1 rounded-2xl bg-card border border-line p-4">
                <div className="flex flex-wrap items-baseline gap-x-2 text-sm"><b>{c.name}</b><span className="text-muted text-xs">{c.ago}</span></div>
                <p className="mt-1 text-[15px]">{c.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <form onSubmit={submit} noValidate className="mt-6 rounded-2xl border border-line bg-card p-5 space-y-3">
        <div className="font-semibold">Leave a comment</div>
        <input aria-label="Your name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="field" />
        <textarea aria-label="Your comment" value={text} onChange={e => setText(e.target.value)} placeholder="Share your thoughts or ask a question…" rows={3} className="field h-auto py-3 resize-y" />
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted">Prototype: your comment is saved only in this browser.</p>
          <button className="btn-accent">Post comment</button>
        </div>
      </form>
    </section>
  );
}

export function PostPage({ blog, post }: { blog: Blog; post: Post }) {
  useTheme(blog.theme);
  const { index, prev, next } = neighbours(blog);
  const headings = useMemo(() => post.blocks.flatMap(b => (b.t === 'h' ? [{ id: headingId(b.text), text: b.text }] : [])), [post]);
  const ids = useMemo(() => headings.map(h => h.id), [headings]);
  const active = useActiveHeading(ids);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  const list = sorted(blog);
  const related = [...list.filter(p => p.slug !== post.slug && p.category === post.category), ...list.filter(p => p.slug !== post.slug && p.category !== post.category)].slice(0, 3);
  const pos = list.findIndex(p => p.slug === post.slug);
  const newer = list[pos - 1];
  const older = list[pos + 1];
  const hasRecipe = post.blocks.some(b => b.t === 'recipe');

  useEffect(() => { document.title = `${post.title} · ${blog.name}`; }, [blog, post]);

  return (
    <div className="min-h-screen">
      <motion.div className="no-print fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[60]" style={{ scaleX: progress }} aria-hidden />
      <PrototypeBar blog={blog} index={index} total={BLOGS.length} prev={prev} next={next} />
      <Header blog={blog} />

      <main className="wrap">
        <article>
          <header className="max-w-3xl mx-auto pt-10 sm:pt-14 text-center">
            <nav aria-label="Breadcrumb" className="no-print flex items-center justify-center gap-1 text-sm text-muted">
              <a href={`#/${blog.slug}`} className="hover:text-fg">{blog.business ? 'Journal' : 'Home'}</a>
              <ChevronRight className="w-3.5 h-3.5" />
              <a href={`#/${blog.slug}/category/${encodeURIComponent(post.category)}`} className="text-accent font-semibold hover:underline underline-offset-2">{post.category}</a>
            </nav>
            <h1 className="mt-4 font-display text-[34px] sm:text-[52px] leading-[1.08] font-bold">{post.title}</h1>
            <p className="mt-4 text-lg sm:text-xl text-muted">{post.excerpt}</p>
            <div className="mt-6 flex items-center justify-center gap-3 text-left">
              <Initials text={blog.author.initials} />
              <div>
                <div className="font-semibold text-sm">{blog.author.name}</div>
                <Meta blog={blog} post={post} hideAuthor />
              </div>
            </div>
            {hasRecipe && (
              <button onClick={() => scrollToId('recipe')} className="no-print btn-accent mt-6"><ArrowRight className="w-4 h-4 rotate-90" /> Jump to recipe</button>
            )}
          </header>

          <figure className="mt-10 -mx-5 sm:mx-0">
            <Cover cover={post.cover} title={post.title} w={1600} eager className={`${'photo' in post.cover ? 'aspect-[16/9]' : 'aspect-[16/9] sm:aspect-[21/9]'} sm:rounded-[28px]`} />
            {'photo' in post.cover && (
              <figcaption className="mt-2 px-5 sm:px-0 text-xs text-muted text-center">Photo: <a className="underline underline-offset-2" href={creditUrl(post.cover.by)} target="_blank" rel="noreferrer">@{post.cover.by}</a> on Unsplash</figcaption>
            )}
          </figure>

          <div className="mt-10 grid lg:grid-cols-[minmax(0,1fr)_240px] gap-12 max-w-5xl mx-auto">
            <div className="min-w-0 max-w-[720px]">
              {headings.length > 1 && (
                <details className="lg:hidden no-print mb-6 rounded-2xl border border-line bg-card p-4">
                  <summary className="font-semibold cursor-pointer">In this post</summary>
                  <ol className="mt-3 space-y-1.5 text-sm">
                    {headings.map(h => <li key={h.id}><button onClick={() => scrollToId(h.id)} className="text-left hover:text-accent">{h.text}</button></li>)}
                  </ol>
                </details>
              )}
              <div className="prose-blog">
                {post.blocks.map((b, i) => <BlockView key={i} block={b} blogSlug={blog.slug} postSlug={post.slug} />)}
              </div>

              <div className="mt-10 pt-6 border-t border-line"><Actions blog={blog} post={post} /></div>

              <div className="no-print mt-10 rounded-3xl border border-line bg-card p-6 flex flex-col sm:flex-row gap-4">
                <Initials text={blog.author.initials} size="lg" />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Written by</div>
                  <div className="font-display text-xl font-bold mt-0.5">{blog.author.name}</div>
                  <div className="text-sm text-muted">{blog.author.role}</div>
                  <p className="mt-2 text-[15px]">{blog.author.bio}</p>
                </div>
              </div>

              <nav className="no-print mt-8 grid sm:grid-cols-2 gap-3" aria-label="More posts">
                {older ? (
                  <a href={`#/${blog.slug}/post/${older.slug}`} className="rounded-2xl border border-line p-4 hover:bg-soft">
                    <div className="text-xs text-muted inline-flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> Older post</div>
                    <div className="mt-1 font-semibold leading-snug">{older.title}</div>
                  </a>
                ) : <span />}
                {newer && (
                  <a href={`#/${blog.slug}/post/${newer.slug}`} className="rounded-2xl border border-line p-4 hover:bg-soft sm:text-right">
                    <div className="text-xs text-muted inline-flex items-center gap-1">Newer post <ArrowRight className="w-3.5 h-3.5" /></div>
                    <div className="mt-1 font-semibold leading-snug">{newer.title}</div>
                  </a>
                )}
              </nav>

              <Comments blog={blog} post={post} />
            </div>

            <aside className="no-print hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {headings.length > 1 && (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">In this post</div>
                    <ol className="mt-3 space-y-1 border-l border-line">
                      {headings.map(h => (
                        <li key={h.id}>
                          <button onClick={() => scrollToId(h.id)}
                            className={`-ml-px border-l-2 pl-3 py-1 text-left text-sm transition-colors ${active === h.id ? 'border-accent text-fg font-semibold' : 'border-transparent text-muted hover:text-fg'}`}>{h.text}</button>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                <div className="rounded-2xl border border-line bg-card p-4 text-sm">
                  <div className="font-semibold">{readMins(post)} min read</div>
                  <div className="text-muted">Published {fmtDate(post.date)}</div>
                </div>
              </div>
            </aside>
          </div>
        </article>

        <section className="no-print mt-20">
          <h2 className="font-display text-3xl font-bold">{blog.business ? 'More from the Journal' : 'You might also like'}</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map(p => <PostCard key={p.slug} blog={blog} post={p} />)}
          </div>
        </section>

        <div className="mt-16">{blog.business ? <Consult blog={blog} /> : <Newsletter blog={blog} />}</div>
      </main>
      <Footer blog={blog} />
    </div>
  );
}
