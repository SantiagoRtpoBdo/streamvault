# StreamVault

A modern, production-level streaming platform UI built for professional portfolio purposes. Powered by real movie data from TMDb, featuring a cinematic dark theme, smooth animations, and responsive design.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

---

## Features

- **Dynamic Hero Section** — Animated background transitions between trending movies
- **Movie Categories** — Trending, Popular, Top Rated, and Upcoming sections
- **Horizontal Scroll Carousels** — Netflix-style movie row navigation with arrow controls
- **Movie Detail Pages** — Full backdrop, poster, genres, rating, release date, cast, and trailer
- **Trailer Modal** — YouTube embed via TMDb video key
- **Search** — Real-time movie search via API route
- **Responsive Design** — Mobile-first, fully responsive
- **Dark Cinematic UI** — Custom oklch-based color palette with overlay gradients
- **SEO Optimization** — Dynamic metadata per movie page (Open Graph, Twitter cards)
- **Loading States** — Skeleton loaders for every section
- **Error Boundaries** — Dedicated error pages per route segment
- **Accessible** — ARIA labels, keyboard navigation, semantic HTML

---

## Tech Stack

| Layer       | Technology              |
| ----------- | ----------------------- |
| Framework   | Next.js 15 (App Router) |
| Language    | TypeScript (strict)     |
| Styling     | Tailwind CSS 4          |
| UI Library  | shadcn/ui               |
| Animations  | Framer Motion           |
| Data Source | TMDb API                |
| Deployment  | Vercel                  |

---

## Architecture

```
src/
├── app/                     # Next.js App Router
│   ├── api/search/          # API route for search
│   ├── movie/[id]/          # Dynamic movie detail page
│   ├── search/              # Search/explore page
│   ├── error.tsx            # Global error boundary
│   ├── loading.tsx          # Global loading skeleton
│   ├── not-found.tsx        # 404 page
│   ├── layout.tsx           # Root layout (Navbar + Footer)
│   ├── page.tsx             # Home page (server component)
│   └── globals.css          # Global styles + cinematic theme
├── components/
│   ├── layout/              # Navbar, Footer
│   ├── movies/              # MovieCard, MovieRow, HeroSection, TrailerModal, Skeletons
│   ├── shared/              # ErrorBoundary, reusable wrappers
│   └── ui/                  # shadcn/ui primitives
├── config/                  # App & TMDb configuration, image helpers
├── lib/                     # Utility functions (cn)
├── services/                # TMDb API service layer (class-based client)
└── types/                   # Full TMDb API response types
```

### Key Design Decisions

- **Server Components by default** — Data fetching happens on the server (home page, movie detail)
- **Service Layer Abstraction** — `TMDbClient` class wraps all HTTP logic; `movieService` exposes domain methods
- **Separation of Concerns** — Server components fetch data, client components handle interactivity
- **No hardcoded data** — All content from TMDb API
- **No duplicated logic** — Shared components (`MovieCard`, `MovieRow`) used across pages

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [TMDb API Key](https://www.themoviedb.org/settings/api) (free)

### Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd streamvault

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your TMDb API key to .env.local
# TMDB_API_KEY=your_api_key_here
# NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable                          | Description                  | Required |
| --------------------------------- | ---------------------------- | -------- |
| `TMDB_API_KEY`                    | TMDb API key (server-side)   | Yes      |
| `NEXT_PUBLIC_TMDB_API_KEY`        | TMDb API key (client/search) | Yes      |
| `NEXT_PUBLIC_TMDB_BASE_URL`       | TMDb API base URL            | No       |
| `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL` | TMDb image CDN base URL      | No       |

---

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables (`TMDB_API_KEY`, `NEXT_PUBLIC_TMDB_API_KEY`)
4. Deploy

---

## Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## Legal

This product uses the [TMDb API](https://www.themoviedb.org/) but is not endorsed or certified by TMDb. All movie data and images are provided by TMDb.

---

Built with precision for portfolio purposes.
