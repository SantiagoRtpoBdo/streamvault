"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getBackdropUrl } from "@/config";
import type { TMDbMovie } from "@/types";

interface HeroSectionProps {
  movies: TMDbMovie[];
}

const FEATURED_COUNT = 5;

export function HeroSection({ movies }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featured = movies.slice(0, FEATURED_COUNT);
  const current = featured[currentIndex];

  const navigate = (direction: "prev" | "next") => {
    setCurrentIndex((prev) =>
      direction === "next"
        ? (prev + 1) % FEATURED_COUNT
        : (prev - 1 + FEATURED_COUNT) % FEATURED_COUNT,
    );
  };

  if (!current) return null;

  return (
    <section className="relative h-[75vh] min-h-[550px] md:h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 bg-background"
        >
          <Image
            src={getBackdropUrl(current.backdrop_path, "original")}
            alt={current.title}
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay Gradients */}
      <div className="absolute inset-0 gradient-overlay" />
      <div className="absolute inset-0 gradient-overlay-left" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-end pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-[1400px] px-4 md:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl space-y-4"
            >
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white drop-shadow-2xl">
                {current.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="secondary"
                  className="bg-primary/90 text-primary-foreground border-0"
                >
                  <Star className="mr-1 h-3 w-3 fill-current" />
                  {current.vote_average.toFixed(1)}
                </Badge>
                {current.release_date && (
                  <span className="text-sm text-gray-300">
                    {new Date(current.release_date).getFullYear()}
                  </span>
                )}
                <span className="text-sm text-gray-400">
                  Trending #{currentIndex + 1}
                </span>
              </div>

              {/* Overview */}
              <p className="text-sm md:text-base text-gray-300 line-clamp-3 leading-relaxed max-w-xl">
                {current.overview}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25"
                >
                  <Link href={`/movie/${current.id}`}>
                    <Play className="mr-2 h-5 w-5 fill-current" />
                    Watch Trailer
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:text-white"
                >
                  <Link href={`/movie/${current.id}`}>
                    <Info className="mr-2 h-5 w-5" />
                    More Info
                  </Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots & Arrows */}
          <div className="mt-8 flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
              onClick={() => navigate("prev")}
              aria-label="Previous movie"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex gap-2">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-8 bg-primary"
                      : "w-4 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
              onClick={() => navigate("next")}
              aria-label="Next movie"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
