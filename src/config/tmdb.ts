import type { MovieSection } from "@/types";

// ──────────────────────────────────────────────────────────
// TMDb Configuration
// ──────────────────────────────────────────────────────────

export const TMDB_CONFIG = {
  baseUrl:
    process.env.NEXT_PUBLIC_TMDB_BASE_URL || "https://api.themoviedb.org/3",
  imageBaseUrl:
    process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p",
  apiKey:
    process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY || "",
} as const;

// ──────────────────────────────────────────────────────────
// Image URL Helpers
// ──────────────────────────────────────────────────────────

export function getImageUrl(
  path: string | null,
  size: string = "w500",
): string {
  if (!path) return "/images/placeholder-poster.svg";
  return `${TMDB_CONFIG.imageBaseUrl}/${size}${path}`;
}

export function getBackdropUrl(
  path: string | null,
  size: string = "original",
): string {
  if (!path) return "/images/placeholder-backdrop.svg";
  return `${TMDB_CONFIG.imageBaseUrl}/${size}${path}`;
}

// ──────────────────────────────────────────────────────────
// Movie Sections Config
// ──────────────────────────────────────────────────────────

export const MOVIE_SECTIONS: MovieSection[] = [
  {
    id: "trending",
    title: "Trending Now",
    endpoint: "/trending/movie/week",
  },
  {
    id: "popular",
    title: "Popular",
    endpoint: "/movie/popular",
  },
  {
    id: "top_rated",
    title: "Top Rated",
    endpoint: "/movie/top_rated",
  },
  {
    id: "upcoming",
    title: "Coming Soon",
    endpoint: "/movie/upcoming",
  },
];

// ──────────────────────────────────────────────────────────
// App Constants
// ──────────────────────────────────────────────────────────

export const APP_CONFIG = {
  name: "StreamVault",
  description:
    "Discover and explore movies with StreamVault — your cinematic vault.",
  url: "https://streamvault.vercel.app",
} as const;
