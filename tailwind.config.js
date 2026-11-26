/** @type {import('tailwindcss').Config} */
// Each blog model sets these CSS variables, so one set of classes gives four different looks.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--text)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        'on-accent': 'var(--accent-text)',
        card: 'var(--card)',
        line: 'var(--line)',
        soft: 'var(--soft)',
        gold: { DEFAULT: '#E8A33D', light: '#F6C66B', dark: '#B9771E', soft: '#FBF1E0' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['var(--display)'],
        body: ['var(--body)'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        brand: ['Cinzel', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
