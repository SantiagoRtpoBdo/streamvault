import type { Metadata } from "next";
import { SearchPageClient } from "./search-client";
import { APP_CONFIG } from "@/config";

export const metadata: Metadata = {
  title: "Explore",
  description: `Search and discover movies on ${APP_CONFIG.name}`,
};

export default function SearchPage() {
  return <SearchPageClient />;
}
