# StreamVault

Proyecto personal de una interfaz de plataforma de streaming, construido para practicar y afianzar habilidades con tecnologías modernas del ecosistema React/Next.js. Consume datos reales de películas desde la API de TMDb.

## Tecnologías

- **Next.js 15** (App Router, Server Components)
- **TypeScript**
- **Tailwind CSS 4**
- **shadcn/ui**
- **Framer Motion**
- **TMDb API**

## Funcionalidades

- Hero dinámico con transiciones animadas entre películas en tendencia
- Categorías: Trending, Popular, Top Rated, Upcoming
- Carruseles horizontales estilo Netflix
- Página de detalle con backdrop, póster, géneros, rating, cast y tráiler
- Búsqueda en tiempo real
- Diseño responsive con tema oscuro cinematográfico
- SEO dinámico por página (Open Graph, Twitter Cards)
- Loading skeletons y error boundaries por ruta

## Inicio rápido

```bash
git clone <tu-repo-url>
cd streamvault
npm install
```

Crea un archivo `.env.local` con tu [API Key de TMDb](https://www.themoviedb.org/settings/api) (gratuita):

```
TMDB_API_KEY=tu_api_key
NEXT_PUBLIC_TMDB_API_KEY=tu_api_key
```

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Legal

Este proyecto usa la [API de TMDb](https://www.themoviedb.org/) pero no está avalado ni certificado por TMDb.
