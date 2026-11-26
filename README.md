# Trinity Blog (Prototype)

A prototype by [Trinity Tech](https://trinity-tech.vercel.app) that explains **what a blog website is** and shows **4 sample blogs**.

## Home page

- What a blog is: write once, get found on Google for years
- Social media post vs blog post
- Cards for each model
- What every blog includes

## The 4 blogs

| Model | Made-up blog | Special feature |
|---|---|---|
| Food & recipe blog | Masala & More | Recipe cards with a servings changer, tick-off steps and print |
| Travel blog | Wander Notes | Trip facts, day-by-day itineraries and photo stories |
| Tech & tutorial blog | Byte Sized | Dark theme, code blocks with one-click copy |
| Business blog | Nest Interiors Journal | Blog inside a business website, with a "Book a free consultation" form |

Each blog has:

- A featured post, category filters and search
- Post pages with reading time, a reading progress bar and a table of contents
- Likes, share to WhatsApp or X, and copy link
- Author box, comments, older/newer post links and related posts
- Newsletter sign-up (or a consultation form for the business blog)

Blogs, authors, comments and the interior studio are made up. Photos are free-to-use images from [Unsplash](https://unsplash.com/license), credited on each post; tech and business covers are drawn in code. Likes, comments and forms save only in the visitor's browser.

## Edit or add a blog

All content is in `src/blogs.ts`.

## Run locally

```
npm install
npm run dev
```

Opens on http://127.0.0.1:3900.

## Deploy on Vercel

Import this repository as a new Vercel project (framework: Vite). Build command `npm run build`, output folder `dist`. No environment variables needed.
