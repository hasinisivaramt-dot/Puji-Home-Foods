# 🫙 PUJI HOME FOODS

A premium, production-grade React landing page for **PUJI HOME FOODS** — Authentic Homemade Pickles & Sweets.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/puji-home-foods.git
cd puji-home-foods

# Install dependencies
npm install

# Start development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
puji-home-foods/
├── public/
│   └── images/              ← All food images & logo go here
│       ├── logo.png
│       ├── hero1.png
│       ├── hero2.png
│       ├── hero3.png
│       ├── hero4.png
│       ├── nonveg-pickle.png
│       ├── chicken-pickle.webp
│       ├── ginger-pickle.jpg
│       ├── ariselu.jpg
│       └── atukula-mixture.webp
├── src/
│   ├── App.jsx              ← Main component (all sections)
│   ├── index.css            ← Global styles & keyframes
│   └── main.jsx             ← React entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## 🖼️ Adding / Replacing Images

All images live in `public/images/`. To replace any image:
1. Drop the new file into `public/images/`
2. Update the filename reference in `src/App.jsx` under the `IMG` object at the top

```js
const IMG = {
  logo:    '/images/logo.png',
  hero1:   '/images/hero1.png',
  chicken: '/images/chicken-pickle.webp',
  // etc.
}
```

---

## ✨ Features

- Sticky glass-blur navbar with login dropdown
- Auto-scrolling hero with 4 slides, arrows & dot indicators
- Category cards with circular images & gold hover glow
- Product cards with wishlist toggle & Add to Cart
- Why Choose Us with SVG icons (no emojis)
- Masonry gallery with lightbox popup
- Customer testimonials
- Premium dark maroon hero & footer, white mid-sections
- Premium soft gold hover effect on all cards & buttons
- Scroll reveal animations
- Back to Top button
- Fully responsive

---

## 🛠️ Tech Stack

- **React 18** (Vite)
- **Plain CSS-in-JS** (inline styles for zero dependency)
- **Google Fonts** — Playfair Display, Cormorant Garamond, DM Sans

---

© 2026 PUJI HOME FOODS. All Rights Reserved.
