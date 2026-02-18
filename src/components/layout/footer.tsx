import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { APP_CONFIG } from "@/config";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border bg-background/50">
      <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-black text-primary-foreground">
                  S
                </span>
              </div>
              <span className="text-lg font-bold">{APP_CONFIG.name}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover and explore the world of cinema. Your personal vault for
              movies, ratings, and trailers.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/search"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Explore
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              Categories
            </h4>
            <div className="flex flex-col gap-2">
              {["Trending", "Popular", "Top Rated", "Upcoming"].map((cat) => (
                <span key={cat} className="text-sm text-muted-foreground">
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">
                Data provided by TMDb
              </span>
              <span className="text-sm text-muted-foreground">
                This product uses the TMDb API but is not endorsed or certified
                by TMDb.
              </span>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {APP_CONFIG.name}. Portfolio
            project.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js, TypeScript & TMDb
          </p>
        </div>
      </div>
    </footer>
  );
}
