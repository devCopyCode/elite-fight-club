# Elite Fight Club

Premium Muay Thai & Boxe gym website built with **Next.js 16**, **TypeScript**, **GSAP**, and **Framer Motion**.

## 🎯 Design System

- **Typography:** Bebas Neue (display) + Space Grotesk (body) + Rajdhani (labels)
- **Colors:** Dark luxury palette (#080808 black, #C8102E red, #F0F0F0 white)
- **Animation:** GSAP scroll hijack, clip-path reveals, framer-motion springs
- **Performance:** Sub-2s load, WCAG AA contrast, optimized images

## 📋 Features

✅ **Hero Section** — 160px title reveal, gym interior background, scroll expansion  
✅ **Responsive Design** — Mobile-first, breathing hierarchy  
✅ **Smooth Animations** — Underline nav, button hover glow, marquee loop  
✅ **Image Gallery** — 6-photo carousel with infinite loop and vignette  
✅ **Pricing Plans** — Toggle between adult/child, Muay Thai/Boxe  
✅ **Team Showcase** — Grayscale hover reveal, parallax  
✅ **Testimonials** — Drag scroll marquee with color accent  

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Install

```bash
cd elite-fight-club
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3002](http://localhost:3002)

### Build

```bash
npm run build
npm start
```

## 📦 Deployment

### GitHub

```bash
git remote add origin https://github.com/YOUR_USER/elite-fight-club.git
git branch -M main
git push -u origin main
```

### Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Select **GitHub** → choose `elite-fight-club`
4. Build settings auto-detect from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
5. Click **Deploy site**

## 📐 Project Structure

```
elite-fight-club/
├── app/
│   ├── components/          # React components
│   │   ├── Nav.tsx         # Fixed navbar
│   │   ├── Sobre.tsx       # About section
│   │   ├── Programas.tsx   # Programs
│   │   ├── Galeria.tsx     # Photo gallery
│   │   ├── Instrutores.tsx # Team cards
│   │   ├── Planos.tsx      # Pricing plans
│   │   ├── Depoimentos.tsx # Testimonials
│   │   ├── CTAFinal.tsx    # Final CTA
│   │   └── Footer.tsx      # Footer
│   ├── layout.tsx          # Root layout + fonts
│   ├── globals.css         # CSS vars
│   └── page.tsx            # Main page
├── components/ui/          # UI components
├── hooks/                  # React hooks
├── public/                 # Static assets
├── netlify.toml           # Netlify deployment config
└── package.json
```

## 🎨 Design Checklist ($10K Website)

- [x] **Point of view** — dark-luxury fight sport
- [x] **Typography** — premium font pairing (no AI)
- [x] **Color system** — 5 colors, restrained
- [x] **Hierarchy** — breathing + scale differentiation
- [x] **Imagery** — real photos, art-directed
- [x] **Motion** — hand-crafted micro-interactions
- [x] **Mobile** — designed layout changes
- [x] **Invisible** — WCAG AA, semantic HTML

## 🛠 Tech Stack

- **Framework:** Next.js 16 App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** GSAP + Framer Motion v12
- **3D:** Three.js (intro particles)
- **Icons:** Phosphor Icons
- **Fonts:** Google Fonts via `next/font`
- **Hosting:** Netlify

## 📝 License

© 2026 Elite Fight Club. All rights reserved.
