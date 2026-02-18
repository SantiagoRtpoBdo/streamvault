import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { movieService } from "@/services";
import { APP_CONFIG, getBackdropUrl } from "@/config";
import { MovieDetailSkeleton } from "@/components/movies";
import { MovieDetailClient } from "./movie-detail-client";

// ──────────────────────────────────────────────────────────
// Dynamic Metadata (SEO)
// ──────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const movie = await movieService.getDetails(Number(id));
    return {
      title: movie.title,
      description: movie.overview || `${movie.title} on ${APP_CONFIG.name}`,
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: movie.backdrop_path
          ? [
              {
                url: getBackdropUrl(movie.backdrop_path, "w1280"),
                width: 1280,
                height: 720,
              },
            ]
          : [],
      },
    };
  } catch {
    return { title: "Movie Not Found" };
  }
}

// ──────────────────────────────────────────────────────────
// Server Component - Data Fetching
// ──────────────────────────────────────────────────────────

async function MovieDetail({ id }: { id: number }) {
  let movie;
  try {
    movie = await movieService.getDetails(id);
  } catch {
    notFound();
  }

  if (!movie) notFound();

  // Extract trailer key
  const trailer = movie.videos?.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );
  const trailerKey = trailer?.key ?? null;

  // Top cast
  const cast = movie.credits?.cast.slice(0, 12) ?? [];

  // Director
  const director = movie.credits?.crew.find((c) => c.job === "Director");

  // Similar movies
  const similar = movie.similar?.results.slice(0, 10) ?? [];

  return (
    <MovieDetailClient
      movie={movie}
      trailerKey={trailerKey}
      cast={cast}
      director={director ?? null}
      similar={similar}
    />
  );
}

// ──────────────────────────────────────────────────────────
// Page Component
// ──────────────────────────────────────────────────────────

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId)) notFound();

  return (
    <Suspense fallback={<MovieDetailSkeleton />}>
      <MovieDetail id={movieId} />
    </Suspense>
  );
}
