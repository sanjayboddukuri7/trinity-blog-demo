// The four blog models. Blogs, authors, comments and the interior studio are made up for the prototype.
// Photos are free-to-use images from Unsplash (https://unsplash.com/license), credited on each post.

export type ArtKind = 'branch' | 'grid' | 'code' | 'bolt' | 'room' | 'palette' | 'lamp' | 'plan';
export type Cover = { photo: string; by: string } | { art: ArtKind; colors: [string, string] };
export type Ingredient = { q?: number; u?: string; item: string };

export type Block =
  | { t: 'p'; text: string }
  | { t: 'h'; text: string }
  | { t: 'list'; items: string[]; ordered?: boolean }
  | { t: 'quote'; text: string; by?: string }
  | { t: 'tip'; title?: string; text: string }
  | { t: 'code'; lang: string; code: string }
  | { t: 'img'; photo: string; by: string; caption: string }
  | { t: 'facts'; title: string; items: { l: string; v: string }[] }
  | { t: 'days'; items: { day: string; title: string; plan: string[] }[] }
  | { t: 'recipe'; name: string; serves: number; unit: string; prep: string; cook: string; ingredients: { group: string; items: Ingredient[] }[]; steps: string[] }
  | { t: 'cta'; title: string; text: string; button: string };

export type Comment = { name: string; text: string; ago: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // YYYY-MM-DD
  cover: Cover;
  featured?: boolean;
  blocks: Block[];
  comments?: Comment[];
};

export type Theme = {
  bg: string; text: string; muted: string; accent: string; accentText: string;
  card: string; line: string; soft: string; display: string; body: string; dark?: boolean;
};

export type Blog = {
  slug: string;
  kind: string;
  usedBy: string;
  special: string;
  name: string;
  tagline: string;
  author: { name: string; initials: string; role: string; bio: string };
  business?: { nav: string[]; cta: string };
  theme: Theme;
  categories: string[];
  posts: Post[];
};

export const photoUrl = (id: string, w: number) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;
export const creditUrl = (by: string) => `https://unsplash.com/@${by}?utm_source=trinity_blog_prototype&utm_medium=referral`;

const LORA = 'Lora, Georgia, serif';
const INTER = 'Inter, system-ui, sans-serif';

export const BLOGS: Blog[] = [
  /* ------------------------------------------------------------------ FOOD */
  {
    slug: 'food',
    kind: 'Food & recipe blog',
    usedBy: 'Home cooks, chefs, cloud kitchens, food creators',
    special: 'Recipe cards with a servings changer, tick-off steps and print',
    name: 'Masala & More',
    tagline: 'Everyday Indian home cooking, tested in a small kitchen.',
    author: { name: 'Priya Nair', initials: 'PN', role: 'Home cook & recipe developer, Kochi', bio: 'I cook the food I grew up with and write it down so it works the first time in your kitchen too. Every recipe here is tested at least three times.' },
    theme: { bg: '#FFF8EF', text: '#2A1A12', muted: '#6E5A4C', accent: '#C2410C', accentText: '#FFFFFF', card: '#FFFFFF', line: '#EFE2D2', soft: '#FBEEDD', display: '"Fraunces", Georgia, serif', body: LORA },
    categories: ['Breakfast', 'Snacks', 'Everyday meals', 'Basics'],
    posts: [
      {
        slug: 'crispy-masala-dosa',
        title: 'Crispy masala dosa at home (the batter that never fails)',
        excerpt: 'Golden, paper-thin dosas with a soft potato filling. The secret is in the soak, the grind and a hot tawa.',
        category: 'Breakfast',
        date: '2026-11-21',
        featured: true,
        cover: { photo: 'photo-1668236543090-82eba5ee5976', by: 'paul19977' },
        blocks: [
          { t: 'p', text: 'For years my dosas stuck to the pan, tore in the middle or came out thick like uttapam. What changed everything was not a new pan but **better batter**: the right ratio, a smooth dal and a long, warm ferment.' },
          { t: 'p', text: 'This recipe makes about 12 dosas. The batter keeps in the fridge for 4 days, so weekday breakfast is only ten minutes away.' },
          { t: 'h', text: 'The batter ratio' },
          { t: 'p', text: 'I use **3 parts rice to 1 part urad dal**, plus a little fenugreek. The rice gives crispness, the dal gives that soft lift, and the fenugreek helps the batter ferment and turn golden.' },
          { t: 'tip', title: 'Cold kitchen?', text: 'In winter, ferment the batter inside a switched-off oven with only the light on. It stays warm enough to rise overnight.' },
          { t: 'h', text: 'The recipe' },
          {
            t: 'recipe', name: 'Masala dosa', serves: 4, unit: 'people (about 12 dosas)', prep: '20 min + soaking & fermenting', cook: '40 min',
            ingredients: [
              { group: 'Dosa batter', items: [
                { q: 3, u: 'cups', item: 'raw rice (sona masoori or idli rice)' },
                { q: 1, u: 'cup', item: 'whole urad dal' },
                { q: 0.5, u: 'tsp', item: 'fenugreek (methi) seeds' },
                { q: 1.5, u: 'tsp', item: 'salt' },
                { item: 'Water, as needed' },
              ] },
              { group: 'Potato masala', items: [
                { q: 4, item: 'medium potatoes, boiled and roughly mashed' },
                { q: 1, item: 'large onion, thinly sliced' },
                { q: 2, item: 'green chillies, slit' },
                { q: 1, u: 'tsp', item: 'mustard seeds' },
                { q: 1, u: 'tsp', item: 'urad dal' },
                { q: 0.5, u: 'tsp', item: 'turmeric powder' },
                { q: 10, item: 'curry leaves' },
                { q: 2, u: 'tbsp', item: 'oil' },
              ] },
              { group: 'To cook', items: [{ item: 'Ghee or oil, for the tawa' }] },
            ],
            steps: [
              'Rinse the rice and soak it for 5–6 hours. Separately rinse and soak the urad dal with the fenugreek seeds for the same time.',
              'Grind the dal with a little cold water until it is smooth and fluffy. Grind the rice until it is fine but very slightly gritty.',
              'Mix both batters with the salt by hand, cover and leave in a warm place for 8–12 hours, until bubbly and almost doubled.',
              'For the masala, heat the oil, add mustard seeds and urad dal and let them splutter. Add curry leaves, chillies and onion and cook until soft.',
              'Add turmeric, the mashed potatoes, salt and a splash of water. Mix and cook for 2 minutes. Keep warm.',
              'Heat a cast-iron or non-stick tawa on medium-high. Sprinkle water on it: if it sizzles away at once, it is ready.',
              'Pour a ladle of batter in the centre and spread it outwards in a spiral. Drizzle ghee around the edge.',
              'Cook until golden and crisp, about 2 minutes. Add a spoon of masala, fold and serve hot with chutney and sambar.',
            ],
          },
          { t: 'h', text: 'Why dosas stick (and how to fix it)' },
          { t: 'list', items: ['**The tawa is not hot enough.** Always do the water test first.', '**The batter is too thick.** It should pour like thick cream; add water a spoon at a time.', '**A new tawa.** Rub it with half an onion dipped in oil before every dosa until it is seasoned.'] },
          { t: 'quote', text: 'The first dosa is for the pan. Everyone in my family knows that one is mine.', by: 'My amma' },
        ],
        comments: [
          { name: 'Deepa K.', text: 'Finally crisp dosas! The oven-light trick worked even in Delhi winter.', ago: '3 days ago' },
          { name: 'Rohan', text: 'Can I use a mixer instead of a wet grinder?', ago: '2 days ago' },
          { name: 'Priya Nair (author)', text: 'Yes Rohan, grind in small batches with cold water so the mixer does not heat the batter.', ago: '2 days ago' },
        ],
      },
      {
        slug: 'golden-samosas',
        title: 'Golden samosas with a flaky crust (fry or air-fry)',
        excerpt: 'A crust that blisters, not bubbles, and a spiced potato filling. Includes an air-fryer method.',
        category: 'Snacks',
        date: '2026-11-12',
        cover: { photo: 'photo-1601050690597-df0568f70950', by: 'kabircheema' },
        blocks: [
          { t: 'p', text: 'A good samosa crust is firm, flaky and covered in tiny blisters. A bad one is soft and full of big air bubbles. The difference is how much fat goes into the dough and how slowly you fry.' },
          { t: 'h', text: 'Two rules for the crust' },
          { t: 'list', ordered: true, items: ['**Rub the fat in well.** Squeeze a handful of the flour: it should hold its shape like wet sand.', '**Fry on low heat.** The oil should be only warm when the samosas go in. It takes 12–15 minutes, and that is what makes them crisp.'] },
          {
            t: 'recipe', name: 'Aloo samosa', serves: 6, unit: 'people (12 samosas)', prep: '40 min', cook: '30 min',
            ingredients: [
              { group: 'Dough', items: [
                { q: 2, u: 'cups', item: 'maida (all-purpose flour)' },
                { q: 0.25, u: 'cup', item: 'ghee or oil' },
                { q: 0.5, u: 'tsp', item: 'ajwain (carom seeds)' },
                { q: 0.5, u: 'tsp', item: 'salt' },
                { q: 6, u: 'tbsp', item: 'cold water, about' },
              ] },
              { group: 'Filling', items: [
                { q: 4, item: 'medium potatoes, boiled and crumbled' },
                { q: 0.5, u: 'cup', item: 'green peas' },
                { q: 1, u: 'tsp', item: 'cumin seeds' },
                { q: 1, u: 'tsp', item: 'grated ginger' },
                { q: 2, item: 'green chillies, chopped' },
                { q: 1, u: 'tsp', item: 'coriander powder' },
                { q: 1, u: 'tsp', item: 'garam masala' },
                { q: 1, u: 'tsp', item: 'amchur (dry mango powder)' },
                { item: 'Salt and fresh coriander, to taste' },
              ] },
              { group: 'To fry', items: [{ item: 'Oil, for deep frying' }] },
            ],
            steps: [
              'Mix flour, ajwain and salt. Add the ghee and rub it in with your fingers until the flour holds its shape when squeezed.',
              'Add water little by little and knead into a firm, stiff dough. Cover and rest for 30 minutes.',
              'For the filling, heat a little oil, add cumin, ginger and chillies, then the peas, spices, potatoes and salt. Mix, add coriander and cool completely.',
              'Divide the dough into 6 balls. Roll each into an oval and cut it in half.',
              'Fold each half into a cone, sealing the edge with water. Fill, then pinch the top shut.',
              'Put the samosas into warm (not hot) oil. Fry on low heat for 12–15 minutes, turning, until golden and firm.',
              'Air-fryer: brush with oil and cook at 180 °C for 15–18 minutes, turning once.',
            ],
          },
          { t: 'tip', title: 'Make ahead', text: 'Shape the samosas, freeze them on a tray, then store in a box for up to a month. Fry straight from frozen, adding a few minutes.' },
        ],
        comments: [{ name: 'Ayesha', text: 'The wet-sand test is genius. No more bubbly crust!', ago: '1 week ago' }],
      },
      {
        slug: 'everyday-dal-tadka',
        title: 'Everyday dal tadka in 30 minutes',
        excerpt: 'The comfort food of a million homes: soft toor dal with a smoky ghee tadka. Simple, but every step counts.',
        category: 'Everyday meals',
        date: '2026-11-03',
        cover: { photo: 'photo-1585937421612-70a008356fbe', by: 'eastcoastkitchen' },
        blocks: [
          { t: 'p', text: 'If I had to eat one dish every day, it would be this. Dal tadka is two things: well-cooked dal and a **tadka**, spices fried in hot ghee and poured over at the end. The tadka is where all the flavour comes from.' },
          {
            t: 'recipe', name: 'Dal tadka', serves: 4, unit: 'people', prep: '10 min', cook: '20 min',
            ingredients: [
              { group: 'Dal', items: [
                { q: 1, u: 'cup', item: 'toor dal, rinsed' },
                { q: 3, u: 'cups', item: 'water' },
                { q: 0.5, u: 'tsp', item: 'turmeric powder' },
                { item: 'Salt, to taste' },
              ] },
              { group: 'Tadka', items: [
                { q: 2, u: 'tbsp', item: 'ghee' },
                { q: 1, u: 'tsp', item: 'cumin seeds' },
                { q: 2, item: 'dried red chillies' },
                { q: 4, item: 'garlic cloves, chopped' },
                { q: 1, item: 'onion, finely chopped' },
                { q: 1, item: 'tomato, chopped' },
                { q: 1, u: 'tsp', item: 'Kashmiri chilli powder' },
                { item: 'A pinch of hing (asafoetida)' },
                { item: 'Fresh coriander, to finish' },
              ] },
            ],
            steps: [
              'Pressure cook the dal with water and turmeric for 3–4 whistles, until completely soft. Whisk it smooth and add salt.',
              'Heat the ghee in a small pan. Add cumin seeds and red chillies; when the cumin darkens, add the garlic.',
              'Add the onion and cook until golden, then the tomato, and cook until it softens.',
              'Turn off the heat, add the hing and chilli powder, and pour everything over the hot dal.',
              'Simmer for 2 minutes, finish with coriander and serve with rice or roti.',
            ],
          },
          { t: 'tip', text: 'For a restaurant-style smoky taste, add a second small tadka of ghee and chilli powder right before serving.' },
        ],
      },
      {
        slug: 'whole-spices-guide',
        title: "A beginner's guide to whole spices",
        excerpt: 'Seven whole spices that do most of the work in an Indian kitchen, what they taste like and how to keep them fresh.',
        category: 'Basics',
        date: '2026-10-25',
        cover: { photo: 'photo-1581600140682-d4e68c8cde32', by: 'marionb_photography' },
        blocks: [
          { t: 'p', text: 'You do not need forty jars to cook good Indian food. Most of my recipes use the same seven whole spices. Learn these and you can cook almost anything on this blog.' },
          { t: 'h', text: 'The seven to start with' },
          { t: 'list', items: [
            '**Cumin (jeera):** warm and earthy. Fried in oil at the start of dals and sabzis.',
            '**Mustard seeds (rai):** sharp and nutty once they pop. The base of most South Indian tadkas.',
            '**Green cardamom (elaichi):** sweet and floral. For chai, kheer and biryani.',
            '**Cloves (laung):** strong and warming. Use only two or three at a time.',
            '**Cinnamon (dalchini):** sweet and woody. A small stick is enough for a pot of rice.',
            '**Bay leaf (tej patta):** gentle and herbal. Goes into pulao and gravies, out before serving.',
            '**Fenugreek seeds (methi):** bitter on their own, wonderful in pickles and dosa batter.',
          ] },
          { t: 'img', photo: 'photo-1784501025488-001592b6ee31', by: 'simpoge', caption: 'Buying loose spices at a market lets you take only what you need.' },
          { t: 'h', text: 'Keeping spices fresh' },
          { t: 'list', items: ['Store them in airtight jars, away from the stove and sunlight.', 'Buy small amounts. Whole spices stay good for about a year, ground ones for a few months.', 'Rub a pinch between your fingers: if you cannot smell it, it is time to replace it.'] },
          { t: 'quote', text: 'Toast, then grind. Five minutes of effort for twice the flavour.' },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- TRAVEL */
  {
    slug: 'travel',
    kind: 'Travel blog',
    usedBy: 'Travel creators, tour operators, homestays, travel agencies',
    special: 'Trip facts, day-by-day itineraries and photo stories',
    name: 'Wander Notes',
    tagline: 'Slow travel across India, with honest budgets.',
    author: { name: 'Kabir Sethi', initials: 'KS', role: 'Travel writer, based in Pune', bio: 'Six years, 24 states and too many train journeys. I write the guides I wish I had: real costs, real timings and the places worth slowing down for.' },
    theme: { bg: '#FFFFFF', text: '#14211B', muted: '#56655D', accent: '#166534', accentText: '#FFFFFF', card: '#FFFFFF', line: '#E2E8E3', soft: '#EEF4EF', display: '"Playfair Display", Georgia, serif', body: LORA },
    categories: ['Hills', 'Heritage', 'Itineraries', 'Tips'],
    posts: [
      {
        slug: 'three-days-in-munnar',
        title: 'Three days in Munnar: tea hills, waterfalls and misty mornings',
        excerpt: 'A relaxed three-day plan for Kerala\'s favourite hill station, with what it really costs.',
        category: 'Itineraries',
        date: '2026-11-19',
        featured: true,
        cover: { photo: 'photo-1491497895121-1334fc14d8c9', by: 'qriusv' },
        blocks: [
          { t: 'p', text: 'Munnar is where the Western Ghats turn into an endless green carpet of tea. Most people rush through in a day. Stay three, and you get the misty mornings, the quiet estate walks and the views without the crowds.' },
          { t: 'facts', title: 'Trip at a glance', items: [
            { l: 'Best time', v: 'September to March' },
            { l: 'Days needed', v: '3 days, 2 nights' },
            { l: 'Budget', v: '₹9,000–14,000 per person' },
            { l: 'Nearest airport', v: 'Kochi, about 4 hours by road' },
          ] },
          { t: 'h', text: 'Day-by-day plan' },
          { t: 'days', items: [
            { day: 'Day 1', title: 'Tea country', plan: ['Arrive by lunch and check in', 'Visit a tea museum to see how leaves become tea', 'Sunset walk through a tea estate'] },
            { day: 'Day 2', title: 'Wildlife and waterfalls', plan: ['Early start for Eravikulam National Park to spot the Nilgiri tahr', 'Lunch in town, then Lakkam waterfalls', 'Evening at Mattupetty dam'] },
            { day: 'Day 3', title: 'Sunrise and goodbye', plan: ['Pre-dawn drive to Top Station for the sea of clouds', 'Boating on Kundala lake', 'Leave after lunch'] },
          ] },
          { t: 'img', photo: 'photo-1455157823797-3019317cbcf0', by: 'ravipinisetti', caption: 'Clouds roll over the plantations almost every morning after the monsoon.' },
          { t: 'tip', title: 'Check before you go', text: 'Eravikulam usually closes for a few weeks around February and March for the tahr calving season. Check the forest department site before planning Day 2.' },
          { t: 'h', text: 'Where to stay' },
          { t: 'p', text: 'Skip the busy town centre. A homestay or a small resort on the Chithirapuram or Pallivasal side is quieter, cheaper and wakes you up with a view.' },
        ],
        comments: [
          { name: 'Sneha', text: 'Followed this exact plan last month. Top Station at sunrise was unreal!', ago: '4 days ago' },
          { name: 'Arun', text: 'Is two nights enough with kids?', ago: '1 day ago' },
        ],
      },
      {
        slug: 'jodhpur-blue-city',
        title: 'Jodhpur in two days: forts, stepwells and the blue city',
        excerpt: 'Climb Mehrangarh, get lost in blue lanes and find the best lassi in town. A compact two-day guide.',
        category: 'Heritage',
        date: '2026-11-08',
        cover: { photo: 'photo-1781940114914-c63f5c998b46', by: 'naam_ka_photographer' },
        blocks: [
          { t: 'p', text: 'From the walls of Mehrangarh Fort, Jodhpur looks like someone spilled blue paint across the desert. Two days is just right to see the big sights and still have time to wander.' },
          { t: 'facts', title: 'Trip at a glance', items: [
            { l: 'Best time', v: 'October to March' },
            { l: 'Days needed', v: '2 days' },
            { l: 'Budget', v: '₹6,000–10,000 per person' },
            { l: 'Getting around', v: 'Walk the old city, autos for the rest' },
          ] },
          { t: 'h', text: 'Day 1: the fort and the old city' },
          { t: 'list', items: ['Reach **Mehrangarh Fort** at opening time, before the tour buses.', 'Walk down to **Jaswant Thada**, the white marble memorial with lake views.', 'Afternoon in the blue lanes of Navchokiya and Brahmpuri.', 'Sunset from a rooftop café facing the fort.'] },
          { t: 'h', text: 'Day 2: stepwells and markets' },
          { t: 'list', items: ['Morning at **Toorji ka Jhalra**, a beautifully restored stepwell.', 'Spices, textiles and snacks at the **Clock Tower market**.', 'Afternoon visit to the **Umaid Bhawan Palace** museum.'] },
          { t: 'img', photo: 'photo-1769122620093-82fb8a5351b0', by: 'aytida_jpg', caption: 'Old-city lanes are best explored on foot, early in the morning.' },
          { t: 'tip', text: 'Carry cash for the old-city snack stalls, and do not leave without trying a mirchi vada.' },
        ],
      },
      {
        slug: 'varanasi-first-timers-guide',
        title: 'Varanasi for first-timers: ghats, boats and the evening aarti',
        excerpt: 'How to plan your first visit to one of the oldest living cities in the world, respectfully and calmly.',
        category: 'Heritage',
        date: '2026-10-29',
        cover: { photo: 'photo-1768844370016-044dd73c1a7a', by: 'sjpaul' },
        blocks: [
          { t: 'p', text: 'Varanasi is loud, crowded, spiritual and unforgettable, often all at once. A little planning helps you enjoy it instead of feeling overwhelmed.' },
          { t: 'facts', title: 'Trip at a glance', items: [
            { l: 'Best time', v: 'October to March' },
            { l: 'Days needed', v: '2–3 days' },
            { l: 'Budget', v: '₹5,000–9,000 per person' },
            { l: 'Don\'t miss', v: 'Sunrise boat ride' },
          ] },
          { t: 'h', text: 'What to do' },
          { t: 'list', items: ['Take a **sunrise boat ride** from Assi Ghat when the river is calm and golden.', 'Walk the ghats from Assi towards Dashashwamedh, stopping for chai.', 'Watch the **Ganga aarti** at Dashashwamedh Ghat in the evening; arrive early for a spot.', 'Spend half a day at **Sarnath**, about 10 km away, where the Buddha gave his first sermon.'] },
          { t: 'h', text: 'Be a respectful visitor' },
          { t: 'list', items: ['Do not photograph cremations at the burning ghats.', 'Dress modestly and remove shoes where asked.', 'Agree on boat prices before you step in.'] },
          { t: 'quote', text: 'You do not see Varanasi. You feel it, one ghat at a time.' },
        ],
        comments: [{ name: 'Meghna', text: 'The boat price tip saved us so much haggling. Thank you!', ago: '2 weeks ago' }],
      },
      {
        slug: 'seven-kilo-packing-list',
        title: 'Packing light: my 7 kg carry-on list for any trip',
        excerpt: 'Everything I carry for one week or one month, and the three things I stopped packing.',
        category: 'Tips',
        date: '2026-10-14',
        cover: { photo: 'photo-1542708993627-b6e5bbae43c4', by: 'hyperickz' },
        blocks: [
          { t: 'p', text: 'I have travelled with only a cabin bag for four years. No waiting at baggage belts, no extra fees and no back pain on station stairs. Here is the exact list.' },
          { t: 'h', text: 'Clothes' },
          { t: 'list', items: ['3 T-shirts and 1 shirt that work together', '1 pair of jeans and 1 pair of light trousers', '1 light jacket that packs small', 'Comfortable walking shoes (worn, not packed)', '4 sets of quick-dry innerwear and socks'] },
          { t: 'h', text: 'Everything else' },
          { t: 'list', items: ['Small toiletry kit in 100 ml bottles', 'Phone, a 10,000 mAh power bank and one multi-port charger', 'Basic medicines and a few plasters', 'A reusable water bottle', 'Copies of ID saved offline on your phone'] },
          { t: 'tip', title: 'What I stopped packing', text: 'Hair dryers, "just in case" outfits and full-size towels. Every hotel and homestay already has the last one.' },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ TECH */
  {
    slug: 'tech',
    kind: 'Tech & tutorial blog',
    usedBy: 'Developers, coding teachers, SaaS products, tech communities',
    special: 'Code blocks with one-click copy, dark theme and series',
    name: 'Byte Sized',
    tagline: 'Short, practical web development tutorials.',
    author: { name: 'Sam Joseph', initials: 'SJ', role: 'Frontend developer & teacher', bio: 'I write the tutorials I wanted when I started: short, with real code you can copy and use today.' },
    theme: { bg: '#0D1117', text: '#E6EDF3', muted: '#9BA7B4', accent: '#A78BFA', accentText: '#160B33', card: '#161B22', line: '#262D36', soft: '#1C232C', display: '"Space Grotesk", Inter, sans-serif', body: INTER, dark: true },
    categories: ['Git', 'CSS', 'JavaScript', 'Performance'],
    posts: [
      {
        slug: 'git-commands-every-day',
        title: 'The Git commands I actually use every day',
        excerpt: 'Forget the 150-command cheat sheets. A dozen commands cover nearly everything in a normal working day.',
        category: 'Git',
        date: '2026-11-24',
        featured: true,
        cover: { art: 'branch', colors: ['#7C3AED', '#2563EB'] },
        blocks: [
          { t: 'p', text: 'Git has a huge number of commands, but day to day I use only a dozen. Learn these well and you will rarely need to search for anything else.' },
          { t: 'h', text: 'See what is going on' },
          { t: 'code', lang: 'bash', code: 'git status                      # what changed and what is staged\ngit diff                        # changes not staged yet\ngit diff --staged               # changes that will go in the next commit\ngit log --oneline --graph -10   # the last 10 commits as a tree' },
          { t: 'h', text: 'Save your work' },
          { t: 'code', lang: 'bash', code: 'git add -p                      # stage changes piece by piece\ngit commit -m "Fix header on mobile"\ngit commit --amend --no-edit    # add forgotten changes to the last commit' },
          { t: 'tip', title: 'Why add -p?', text: 'It shows each change and asks before staging it, so debugging leftovers never sneak into a commit.' },
          { t: 'h', text: 'Branches and syncing' },
          { t: 'code', lang: 'bash', code: 'git switch -c feature/search     # create a branch and move to it\ngit pull --rebase                # get the latest work without merge commits\ngit stash                        # park unfinished work\ngit stash pop                    # bring it back' },
          { t: 'h', text: 'Undo a mistake' },
          { t: 'code', lang: 'bash', code: 'git restore index.html          # throw away changes to one file\ngit restore --staged index.html # unstage it but keep the changes' },
          { t: 'quote', text: 'Commit small, commit often. Future you will thank present you.' },
        ],
        comments: [
          { name: 'dev_ankit', text: 'add -p changed my life. Clean commits ever since.', ago: '2 days ago' },
          { name: 'Lena', text: 'Would love a follow-up on interactive rebase!', ago: '1 day ago' },
        ],
      },
      {
        slug: 'css-grid-in-10-minutes',
        title: 'CSS Grid in 10 minutes: the only layouts you need',
        excerpt: 'A responsive card grid with one line, and a full page layout with named areas.',
        category: 'CSS',
        date: '2026-11-15',
        cover: { art: 'grid', colors: ['#0EA5E9', '#7C3AED'] },
        blocks: [
          { t: 'p', text: 'Most layouts on the web are one of two things: a grid of cards, or a page with a header, sidebar, main area and footer. CSS Grid handles both with very little code.' },
          { t: 'h', text: '1. A responsive card grid' },
          { t: 'p', text: 'This one rule fits as many 220px cards as the screen allows and stretches them to fill the row. No media queries needed.' },
          { t: 'code', lang: 'css', code: '.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n  gap: 1rem;\n}' },
          { t: 'h', text: '2. A page layout with named areas' },
          { t: 'code', lang: 'css', code: '.page {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  grid-template-areas:\n    "header  header"\n    "sidebar main"\n    "footer  footer";\n  gap: 1rem;\n}\nheader { grid-area: header; }\naside  { grid-area: sidebar; }\nmain   { grid-area: main; }\nfooter { grid-area: footer; }\n\n@media (max-width: 700px) {\n  .page {\n    grid-template-columns: 1fr;\n    grid-template-areas: "header" "main" "sidebar" "footer";\n  }\n}' },
          { t: 'p', text: 'On phones, the sidebar simply moves below the main content. You change the map, not the HTML.' },
          { t: 'h', text: '3. Perfect centring' },
          { t: 'code', lang: 'css', code: '.center {\n  display: grid;\n  place-items: center;\n}' },
          { t: 'tip', text: 'Use Grid for two-dimensional layouts (rows and columns) and Flexbox for a single row or column of items.' },
        ],
      },
      {
        slug: 'javascript-array-methods',
        title: 'JavaScript array methods, explained with a food order',
        excerpt: 'map, filter, reduce, find, some and every, all on one small example you will remember.',
        category: 'JavaScript',
        date: '2026-11-06',
        cover: { art: 'code', colors: ['#F59E0B', '#DB2777'] },
        blocks: [
          { t: 'p', text: 'Array methods are easier to remember with real data. Here is a small food order we will use for every example.' },
          { t: 'code', lang: 'js', code: "const order = [\n  { item: 'Dosa', price: 80, veg: true },\n  { item: 'Chicken roll', price: 140, veg: false },\n  { item: 'Samosa', price: 30, veg: true },\n];" },
          { t: 'h', text: 'Transform and pick' },
          { t: 'code', lang: 'js', code: "order.map(o => o.item);        // ['Dosa', 'Chicken roll', 'Samosa']\norder.filter(o => o.veg);      // the two veg items\norder.find(o => o.price > 100); // { item: 'Chicken roll', ... }" },
          { t: 'h', text: 'Add it up' },
          { t: 'code', lang: 'js', code: 'const total = order.reduce((sum, o) => sum + o.price, 0); // 250' },
          { t: 'p', text: '`reduce` walks through the array carrying a running value. Here it starts at `0` and adds each price.' },
          { t: 'h', text: 'Ask yes-or-no questions' },
          { t: 'code', lang: 'js', code: 'order.some(o => !o.veg);        // true: at least one non-veg item\norder.every(o => o.price < 200); // true: everything is under 200' },
          { t: 'tip', title: 'Do not mutate', text: 'map, filter and toSorted return a new array and leave the original alone. That makes bugs much easier to find.' },
        ],
      },
      {
        slug: 'faster-website-quick-wins',
        title: 'Make your website load faster: 6 quick wins',
        excerpt: 'Small changes to images, scripts and fonts that make a real difference on slow phones.',
        category: 'Performance',
        date: '2026-10-27',
        cover: { art: 'bolt', colors: ['#10B981', '#0EA5E9'] },
        blocks: [
          { t: 'p', text: 'Most visitors open your site on a phone, often on a patchy connection. These six changes take an afternoon and usually make the biggest difference.' },
          { t: 'h', text: 'Images' },
          { t: 'list', ordered: true, items: ['Serve **WebP or AVIF** instead of large JPEGs and PNGs.', 'Always set **width and height** so the page does not jump while loading.', '**Lazy-load** images further down the page, but never the main hero image.'] },
          { t: 'code', lang: 'html', code: '<!-- hero: load it first -->\n<img src="hero.webp" width="1200" height="600" alt="Our team" fetchpriority="high">\n\n<!-- below the fold: load when needed -->\n<img src="gallery-1.webp" width="600" height="400" alt="Office" loading="lazy" decoding="async">' },
          { t: 'h', text: 'Scripts and fonts' },
          { t: 'list', ordered: true, items: ['Add **defer** to scripts so they do not block the page.', 'Use **font-display: swap** so text shows immediately.', '**Preconnect** to the servers you load fonts or images from.'] },
          { t: 'code', lang: 'html', code: '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<script src="app.js" defer></script>' },
          { t: 'tip', text: 'Measure before and after with PageSpeed Insights, so you know which change actually helped.' },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------- BUSINESS */
  {
    slug: 'business',
    kind: 'Business blog',
    usedBy: 'Interior designers, clinics, schools, agencies, any business that wants Google leads',
    special: 'Blog inside a business website, with a booking call-to-action in every post',
    name: 'Nest Interiors',
    tagline: 'The Journal: ideas and real projects from our studio.',
    author: { name: 'Ananya Rao', initials: 'AR', role: 'Lead designer, Nest Interiors, Bengaluru', bio: 'Ananya has designed more than 200 homes across Bengaluru. She writes about the small decisions that make a home feel right.' },
    business: { nav: ['Services', 'Projects', 'Journal', 'Contact'], cta: 'Book a free consultation' },
    theme: { bg: '#F6F2EC', text: '#1F2A27', muted: '#5C6561', accent: '#2F5D50', accentText: '#FFFFFF', card: '#FFFFFF', line: '#E3DBCF', soft: '#ECE5DA', display: '"DM Serif Display", Georgia, serif', body: INTER },
    categories: ['Small spaces', 'Colour', 'Lighting', 'Projects'],
    posts: [
      {
        slug: 'make-a-small-room-feel-bigger',
        title: '7 ways to make a small room feel bigger',
        excerpt: 'No walls to knock down. Just light, mirrors, furniture and a few smart tricks we use in every compact home.',
        category: 'Small spaces',
        date: '2026-11-20',
        featured: true,
        cover: { art: 'room', colors: ['#2F5D50', '#C9A66B'] },
        blocks: [
          { t: 'p', text: 'Most city apartments have at least one room that feels too small. The good news: how big a room feels depends far more on light and clutter than on square feet.' },
          { t: 'h', text: 'Seven tricks that work' },
          { t: 'list', ordered: true, items: [
            '**Paint walls and ceiling in light, warm tones.** Edges disappear and the room opens up.',
            '**Hang curtains high and wide.** Mount the rod near the ceiling so windows look taller.',
            '**Use one large mirror** opposite or beside a window to double the daylight.',
            '**Choose furniture on legs.** Seeing the floor underneath makes a room feel larger.',
            '**Go vertical with storage.** Tall shelves draw the eye up and free floor space.',
            '**Pick one large rug** instead of several small ones.',
            '**Keep surfaces clear.** A closed cabinet beats open shelves full of things.',
          ] },
          { t: 'tip', title: 'Designer tip', text: 'Match the curtain colour to the walls. Without the contrast, the room reads as one calm, bigger space.' },
          { t: 'cta', title: 'Have a room that feels cramped?', text: 'Send us a photo and its size. We will suggest a layout in a free 20-minute call.', button: 'Book a free consultation' },
        ],
        comments: [{ name: 'Kavya M.', text: 'Did the curtain trick in our bedroom and it looks so much taller!', ago: '5 days ago' }],
      },
      {
        slug: 'choose-paint-colours',
        title: "How to choose paint colours you won't regret",
        excerpt: 'The 60-30-10 rule, why you should test on the wall, and how daylight changes everything.',
        category: 'Colour',
        date: '2026-11-10',
        cover: { art: 'palette', colors: ['#C9A66B', '#7C9A92'] },
        blocks: [
          { t: 'p', text: 'Paint is the cheapest way to transform a home and the easiest to get wrong. A colour that looks perfect on a tiny card can feel completely different across four walls.' },
          { t: 'h', text: 'Use the 60-30-10 rule' },
          { t: 'list', items: ['**60%** main colour: walls and large surfaces.', '**30%** second colour: furniture, curtains or one feature wall.', '**10%** accent: cushions, art and small décor.'] },
          { t: 'h', text: 'Always test on the wall' },
          { t: 'p', text: 'Buy sample pots and paint large patches on two different walls. Look at them in the morning, the afternoon and at night under your own lights before you decide.' },
          { t: 'h', text: 'Think about the light' },
          { t: 'list', items: ['Rooms with strong afternoon sun suit cooler greys, greens and blues.', 'Rooms with little direct sun feel cosier in warm whites, beige and terracotta.'] },
          { t: 'cta', title: 'Not sure about a colour?', text: 'Our designers can create a colour plan for your whole home, with samples.', button: 'Book a free consultation' },
        ],
      },
      {
        slug: 'lighting-101',
        title: 'Lighting 101: the three layers every room needs',
        excerpt: 'Why one ceiling light is never enough, and how to choose warm or cool bulbs for each room.',
        category: 'Lighting',
        date: '2026-10-31',
        cover: { art: 'lamp', colors: ['#1F2A27', '#C9A66B'] },
        blocks: [
          { t: 'p', text: 'The fastest way to make an expensive room look flat is to light it with a single tube light. Good lighting uses three layers that work together.' },
          { t: 'h', text: 'The three layers' },
          { t: 'list', items: ['**Ambient:** the general light that fills the room, such as ceiling lights or cove lighting.', '**Task:** focused light where you work, such as under-cabinet strips in the kitchen or a reading lamp.', '**Accent:** light that adds mood, such as wall washers on art, shelf lights or a floor lamp.'] },
          { t: 'h', text: 'Warm or cool?' },
          { t: 'list', items: ['**2700–3000K (warm white):** living rooms and bedrooms.', '**4000K (neutral white):** kitchens, bathrooms and study areas.', 'Put dimmers on the living room lights. It costs little and changes everything.'] },
          { t: 'tip', text: 'Plan the lighting before the false ceiling and electrical work begin. Adding points later means breaking walls.' },
          { t: 'cta', title: 'Planning a new home?', text: 'We design the lighting plan together with your interiors, so nothing has to be redone.', button: 'Book a free consultation' },
        ],
      },
      {
        slug: 'whitefield-2bhk-makeover',
        title: 'Before & after: a 2BHK makeover in Whitefield',
        excerpt: 'How we turned a dark, rented-looking flat into a warm family home in seven weeks.',
        category: 'Projects',
        date: '2026-10-18',
        cover: { art: 'plan', colors: ['#2F5D50', '#E3DBCF'] },
        blocks: [
          { t: 'p', text: 'The owners, a young couple with a toddler, had lived with builder-grade fittings for three years. They wanted more storage, a brighter living room and a kitchen that actually worked.' },
          { t: 'facts', title: 'Project at a glance', items: [
            { l: 'Home', v: '2BHK, 1,150 sq ft' },
            { l: 'Duration', v: '7 weeks' },
            { l: 'Budget', v: '₹8.5 lakh' },
            { l: 'Scope', v: 'Living, kitchen, 2 bedrooms' },
          ] },
          { t: 'h', text: 'What we changed' },
          { t: 'list', items: ['Replaced a heavy TV unit with a slim, wall-mounted panel and hidden storage.', 'Opened the kitchen with a breakfast counter and added tall pull-out pantry units.', 'Built floor-to-ceiling wardrobes in both bedrooms.', 'Added warm cove lighting and a dimmable living room plan.'] },
          { t: 'quote', text: 'We finally have a home that feels like us, and we can find everything!', by: 'The homeowners' },
          { t: 'cta', title: 'Want results like this?', text: 'Tell us about your home. We share a design concept and an estimate within a week.', button: 'Book a free consultation' },
        ],
      },
    ],
  },
];

export const getBlog = (slug: string) => BLOGS.find(b => b.slug === slug);

/** Reading time at about 200 words a minute. */
export function readMins(post: Post) {
  const text = post.blocks.map(b => {
    switch (b.t) {
      case 'p': case 'h': case 'tip': case 'quote': return b.text;
      case 'list': return b.items.join(' ');
      case 'code': return b.code;
      case 'days': return b.items.map(d => d.plan.join(' ')).join(' ');
      case 'recipe': return b.steps.join(' ') + b.ingredients.map(g => g.items.map(i => i.item).join(' ')).join(' ');
      default: return '';
    }
  }).join(' ');
  return Math.max(2, Math.round(text.split(/\s+/).length / 200));
}

export const fmtDate = (d: string) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
