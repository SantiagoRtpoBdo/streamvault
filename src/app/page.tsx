import { Suspense } from "react";
import { movieService } from "@/services";
import {
  HeroSection,
  MovieRow,
  MovieRowSkeleton,
  HeroSkeleton,
} from "@/components/movies";

// ──────────────────────────────────────────────────────────
// Data Fetching (Server Component)
// ──────────────────────────────────────────────────────────

async function HeroData() {
  const trending = await movieService.getTrending();
  return <HeroSection movies={trending.results} />;
}

async function TrendingRow() {
  const data = await movieService.getTrending();
  return <MovieRow title="Trending Now" movies={data.results} />;
}

async function PopularRow() {
  const data = await movieService.getPopular();
  return <MovieRow title="Popular" movies={data.results} />;
}

async function TopRatedRow() {
  const data = await movieService.getTopRated();
  return <MovieRow title="Top Rated" movies={data.results} />;
}

async function UpcomingRow() {
  const data = await movieService.getUpcoming();
  return <MovieRow title="Coming Soon" movies={data.results} />;
}

// ──────────────────────────────────────────────────────────
// Home Page
// ──────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="space-y-10 pb-12">
      {/* Hero */}
      <Suspense fallback={<HeroSkeleton />}>
        <HeroData />
      </Suspense>

      {/* Movie Sections */}
      <div className="space-y-10 -mt-16 relative z-10">
        <Suspense fallback={<MovieRowSkeleton />}>
          <TrendingRow />
        </Suspense>

        <Suspense fallback={<MovieRowSkeleton />}>
          <PopularRow />
        </Suspense>

        <Suspense fallback={<MovieRowSkeleton />}>
          <TopRatedRow />
        </Suspense>

        <Suspense fallback={<MovieRowSkeleton />}>
          <UpcomingRow />
        </Suspense>
      </div>
    </div>
  );
}
