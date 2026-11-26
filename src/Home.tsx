import { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, Clock, FolderSearch, Heart, ListTree, Mail, MessageCircle, MessageSquare, PenLine, Search, Share2, Smartphone, TrendingUp, X,
} from 'lucide-react';
import { BLOGS, readMins, type Blog, type Theme } from './blogs';
import { Cover } from './Cover';
import { Reveal, START_PROJECT_URL, TrinityCredit, scrollToId, trinityWhatsapp, useTheme } from './shared';

const TRINITY_THEME: Theme = {
  bg: '#120E0A', text: '#FFFFFF', muted: '#A69C8C', accent: '#E8A33D', accentText: '#1B1407', card: '#1C1712', line: '#2E281F', soft: '#241D16',
  display: '"Playfair Display", Georgia, serif', body: 'Inter, system-ui, sans-serif', dark: true,
};

export function Home() {
  useTheme(TRINITY_THEME);
  useEffect(() => {
    document.title = 'Trinity Blog (Prototype) — blog websites by Trinity Tech';
  }, []);

  return (
    <div>
      <div role="note" className="bg-gradient-to-r from-[#b8741a] via-[#e8a33d] to-[#f6d28a] text-[#1b1407] text-[12.5px]">
        <div className="wrap py-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
          <span className="rounded-full bg-[#1b1407] text-gold-light px-2 py-0.5 text-[10.5px] font-bold tracking-[0.14em]">PROTOTYPE</span>
          <span>Sample blogs by Trinity Tech. The blogs, authors and comments are made up.</span>
        </div>
      </div>
      <header className="wrap h-16 flex items-center justify-between gap-4">
        <a href="#/" className="flex items-center gap-2.5">
          <img src="/mark.png" alt="" className="w-10 h-8 object-contain drop-shadow-[0_0_10px_rgba(232,163,61,0.45)]" />
          <span className="leading-none">
            <span className="block font-brand font-bold tracking-[0.12em] text-[15px]">TRINITY BLOG <span className="font-sans tracking-normal text-gold text-[13px]">(Prototype)</span></span>
            <span className="block text-[11px] text-white/50 mt-1">by Trinity Tech</span>
          </span>
        </a>
        <a href={START_PROJECT_URL} target="_blank" rel="noreferrer" className="btn-gold h-10 hidden sm:inline-flex">Get your blog <ArrowUpRight className="w-4 h-4" /></a>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_85%_20%,rgba(232,163,61,0.16),transparent_70%)]" />
        <div className="wrap relative pt-10 sm:pt-16 pb-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <div>
            <span className="inline-flex rounded-full bg-white/10 text-gold-light px-3 py-1 text-xs font-semibold">What is a blog website?</span>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="mt-5 font-serif text-[42px] sm:text-[60px] leading-[1.05] font-bold">
              Write once.<br />
              <span className="bg-gradient-to-r from-[#e8a33d] to-[#f6d28a] bg-clip-text text-transparent">Get found for years.</span>
            </motion.h1>
            <p className="mt-6 text-lg text-white/70 max-w-xl">
              A blog is <b className="text-white">a website where you publish articles</b>: recipes, travel guides, tutorials, tips or news about
              your business. Every post is a page that people find on Google, share on WhatsApp and come back to.
            </p>
            <p className="mt-3 text-white/60 max-w-xl">Explore <b className="text-white">{BLOGS.length} sample blogs</b> below: food, travel, tech, and a blog inside a business website.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => scrollToId('models')} className="btn-gold">See the {BLOGS.length} blogs <ArrowDown className="w-4 h-4" /></button>
              <a href={trinityWhatsapp('the blog websites')} target="_blank" rel="noreferrer" className="btn bg-white/10 text-white hover:bg-white/15"><MessageCircle className="w-4 h-4" /> Ask Trinity Tech</a>
            </div>
          </div>
          <SearchCard />
        </div>
      </section>

      <section className="bg-[#F7F4EE] text-[#17140F] py-20 sm:py-24">
        <div className="wrap">
          <Reveal className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-[44px] leading-tight font-bold">A social post lasts a day. A blog post keeps working.</h2>
            <p className="mt-4 text-lg text-[#3B362E]">Instagram and Facebook are great for reach, but posts disappear from feeds fast. Your blog is yours, and Google keeps sending people to it.</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <Reveal>
              <div className="h-full rounded-3xl bg-white border border-[#E7E0D3] p-7">
                <span className="w-11 h-11 rounded-2xl bg-[#F1ECE2] text-[#6F685C] grid place-items-center"><Share2 className="w-5 h-5" /></span>
                <h3 className="mt-5 font-serif text-2xl font-bold">Only social media posts</h3>
                <ul className="mt-5 space-y-2.5 text-[15px]">
                  {['Gone from the feed in a day or two', 'Hard to find again later', 'Not shown on Google search', 'The platform owns your audience'].map(x => (
                    <li key={x} className="flex gap-2.5"><X className="w-4 h-4 mt-1 text-[#C0897E] shrink-0" />{x}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-3xl bg-[#17140F] text-white p-7 shadow-[0_20px_60px_-15px_rgba(232,163,61,0.45)]">
                <span className="w-11 h-11 rounded-2xl bg-[#E8A33D] text-[#1b1407] grid place-items-center"><PenLine className="w-5 h-5" /></span>
                <h3 className="mt-5 font-serif text-2xl font-bold">Your own blog</h3>
                <ul className="mt-5 space-y-2.5 text-[15px]">
                  {['Each post is a page Google can show', 'Readers find old posts for years', 'Builds trust in you or your business', 'Email subscribers you own', 'Turns readers into enquiries'].map(x => (
                    <li key={x} className="flex gap-2.5"><Check className="w-4 h-4 mt-1 text-[#E8A33D] shrink-0" />{x}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="models" className="py-20 sm:py-28">
        <div className="wrap">
          <Reveal className="max-w-2xl mx-auto text-center mb-12">
            <span className="inline-flex rounded-full bg-white/10 text-gold-light px-3 py-1 text-xs font-semibold">Blog models</span>
            <h2 className="font-serif text-3xl sm:text-[44px] leading-tight font-bold mt-4">Four kinds of blogs, four looks.</h2>
            <p className="mt-4 text-white/60 text-lg">Open any blog, read a post, try the search, the comments and the special features.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {BLOGS.map((b, i) => <ModelCard key={b.slug} blog={b} index={i} />)}
          </div>
          <Reveal className="mt-6">
            <a href={START_PROJECT_URL} target="_blank" rel="noreferrer"
              className="group flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border-2 border-dashed border-white/20 p-6 hover:border-gold transition-colors">
              <div>
                <div className="font-serif text-xl font-bold">Something else in mind?</div>
                <p className="text-sm text-white/60 mt-1">Health tips for a clinic, school news, a magazine, a community or a news portal… we build the blog that fits.</p>
              </div>
              <span className="text-sm font-semibold text-gold-light group-hover:underline inline-flex items-center gap-1">Start a project <ArrowUpRight className="w-4 h-4" /></span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#F7F4EE] text-[#17140F] py-20">
        <div className="wrap">
          <Reveal className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="font-serif text-3xl sm:text-[40px] leading-tight font-bold">Every blog includes</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { icon: FolderSearch, t: 'Categories & search', d: 'Readers find the right post in seconds.' },
              { icon: Clock, t: 'Easy-to-read posts', d: 'Reading time, progress bar and a table of contents.' },
              { icon: MessageSquare, t: 'Comments', d: 'Readers ask questions and you reply.' },
              { icon: Heart, t: 'Likes & sharing', d: 'One tap to share on WhatsApp, X or copy the link.' },
              { icon: Mail, t: 'Newsletter sign-up', d: 'Build an email list you own.' },
              { icon: ListTree, t: 'Related posts', d: 'Readers keep reading instead of leaving.' },
              { icon: Smartphone, t: 'Made for phones', d: 'Most readers open blogs on their phone.' },
              { icon: Search, t: 'Found on Google', d: 'Clean pages, titles and descriptions for search.' },
            ].map(x => (
              <div key={x.t} className="rounded-3xl bg-white border border-[#E7E0D3] p-5">
                <x.icon className="w-5 h-5 text-[#B9771E]" />
                <h3 className="mt-3 font-semibold">{x.t}</h3>
                <p className="mt-1 text-sm text-[#3B362E]">{x.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-[#3B362E] max-w-2xl mx-auto">
            On a real blog, you write and publish posts yourself from a simple editor, with no coding. In this prototype the posts are fixed and anything you type is saved only in your browser.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="wrap">
          <Reveal>
            <div className="rounded-[36px] bg-gradient-to-br from-[#26211A] to-[#120E0A] border border-white/10 px-6 py-14 sm:p-16 text-center">
              <PenLine className="w-10 h-10 mx-auto text-gold" />
              <h2 className="font-serif text-3xl sm:text-[44px] leading-tight font-bold mt-5">Ready to start your blog?</h2>
              <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">Tell us what you want to write about. Trinity Tech designs the blog, sets it up for Google and shows you how to post.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={START_PROJECT_URL} target="_blank" rel="noreferrer" className="btn-gold">Start a project <ArrowRight className="w-4 h-4" /></a>
                <a href={trinityWhatsapp('the blog websites')} target="_blank" rel="noreferrer" className="btn bg-[#25D366] text-[#062b14]"><MessageCircle className="w-4 h-4" /> WhatsApp us</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="wrap py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <p><b className="text-white">Trinity Blog (Prototype)</b> is a prototype by Trinity Tech. Blogs, authors and comments are made up.</p>
          <TrinityCredit />
        </div>
      </footer>
    </div>
  );
}

function ModelCard({ blog, index }: { blog: Blog; index: number }) {
  const t = blog.theme;
  const p = blog.posts.find(x => x.featured) ?? blog.posts[0];
  return (
    <Reveal delay={(index % 2) * 0.06} className="h-full">
      <a href={`#/${blog.slug}`} className="group h-full rounded-3xl overflow-hidden flex flex-col hover:-translate-y-1 transition-transform shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]" style={{ background: t.bg, color: t.text }}>
        <div className="px-6 pt-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: t.accent }}>Model {index + 1} · {blog.kind}</div>
          <div className="mt-1 text-[28px] font-bold leading-tight" style={{ fontFamily: t.display }}>{blog.name}</div>
          <div className="text-sm" style={{ color: t.muted }}>{blog.tagline}</div>
        </div>
        <div className="mx-6 mt-5 rounded-2xl overflow-hidden" style={{ border: `1px solid ${t.line}`, background: t.card }}>
          <Cover cover={p.cover} title={p.title} w={700} className="h-40" />
          <div className="p-4">
            <div className="text-[15px] font-bold leading-snug" style={{ fontFamily: t.display }}>{p.title}</div>
            <div className="mt-1 text-xs" style={{ color: t.muted }}>{p.category} · {readMins(p)} min read</div>
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <p className="text-sm" style={{ color: t.muted }}><b style={{ color: t.text }}>Special:</b> {blog.special}</p>
          <p className="mt-1.5 text-sm flex-1" style={{ color: t.muted }}><b style={{ color: t.text }}>For:</b> {blog.usedBy}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: t.accent }}>
            Open this blog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </a>
    </Reveal>
  );
}

/** A Google-style result showing a blog post being found by search. */
function SearchCard() {
  const results = [
    { site: 'yourblog.com › recipes', title: 'Crispy masala dosa at home (the batter that never fails)', d: 'Golden, paper-thin dosas with a soft potato filling. The secret is in the soak…', you: true },
    { site: 'example.com › dosa', title: 'Dosa recipe | How to make dosa batter', d: 'Learn how to make dosa batter at home with step-by-step photos…', you: false },
  ];
  return (
    <div className="relative mx-auto w-full max-w-md" aria-label="A blog post appearing in Google search results">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="rounded-3xl bg-white text-[#17140F] p-5 shadow-[0_30px_80px_-20px_rgba(232,163,61,0.5)]">
        <div className="flex items-center gap-2 rounded-full border border-[#E7E0D3] px-4 h-11 text-sm">
          <Search className="w-4 h-4 text-[#6F685C]" />
          <span>how to make crispy dosa at home</span>
        </div>
        <div className="mt-4 space-y-3">
          {results.map((r, i) => (
            <motion.div key={r.site} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.15 }}
              className={`rounded-2xl p-3 ${r.you ? 'bg-[#FBF1E0] ring-2 ring-[#E8A33D]' : ''}`}>
              <div className="text-xs text-[#6F685C] flex items-center gap-2">{r.site}{r.you && <span className="rounded-full bg-[#E8A33D] text-[#1b1407] px-2 py-0.5 text-[10px] font-bold">YOUR BLOG</span>}</div>
              <div className="mt-0.5 text-[15px] font-semibold text-[#1a0dab] leading-snug">{r.title}</div>
              <div className="mt-0.5 text-xs text-[#3B362E]">{r.d}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }}
        className="absolute -bottom-6 -right-2 sm:-right-6 rounded-2xl bg-[#17140F] border border-white/10 px-4 py-3 text-sm shadow-xl flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-gold" /> <span><b>1,240</b> <span className="text-white/60">readers from Google</span></span>
      </motion.div>
    </div>
  );
}
