"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Film } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MovieCard, MovieCardSkeleton } from "@/components/movies";
import type { TMDbMovie } from "@/types";

async function fetchSearchResults(searchQuery: string) {
  const res = await fetch(
    `/api/search?q=${encodeURIComponent(searchQuery.trim())}`,
  );
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}

export function SearchPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<TMDbMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(!!initialQuery);
  const [totalResults, setTotalResults] = useState(0);

  // Search on mount if query param exists
  useEffect(() => {
    if (initialQuery) {
      setIsLoading(true);
      setHasSearched(true);
      fetchSearchResults(initialQuery)
        .then((data) => {
          setResults(data.results ?? []);
          setTotalResults(data.total_results ?? 0);
        })
        .catch((err) => {
          console.error("Search error:", err);
          setResults([]);
        })
        .finally(() => setIsLoading(false));
    }
  }, [initialQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    router.push(`/search?q=${encodeURIComponent(trimmed)}`, { scroll: false });
    setIsLoading(true);
    setHasSearched(true);
    try {
      const data = await fetchSearchResults(trimmed);
      setResults(data.results ?? []);
      setTotalResults(data.total_results ?? 0);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
    router.push("/search", { scroll: false });
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h1 className="text-3xl md:text-4xl font-black text-foreground">
            Explore Movies
          </h1>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="relative max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-14 pl-12 pr-12 text-base bg-secondary/50 border-border/50 rounded-xl focus:ring-2 focus:ring-primary/50"
              />
              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Results */}
        <div className="mt-10">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <MovieCardSkeleton key={i} />
              ))}
            </div>
          ) : hasSearched && results.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center gap-4 py-20 text-center"
            >
              <Film className="h-16 w-16 text-muted-foreground/50" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  No movies found
                </h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  We couldn&apos;t find any movies matching &ldquo;
                  {initialQuery || query}&rdquo;. Try a different search term.
                </p>
              </div>
            </motion.div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Found {totalResults.toLocaleString()} results
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                <AnimatePresence>
                  {results.map((movie, index) => (
                    <MovieCard key={movie.id} movie={movie} index={index} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center gap-4 py-20 text-center"
            >
              <Search className="h-16 w-16 text-muted-foreground/30" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Start exploring
                </h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Search for your favorite movies, actors, or genres.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
