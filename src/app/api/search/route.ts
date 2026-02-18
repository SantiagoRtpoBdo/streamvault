import { NextRequest, NextResponse } from "next/server";
import { movieService } from "@/services";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const page = searchParams.get("page") ?? "1";

  if (!query || !query.trim()) {
    return NextResponse.json(
      { results: [], total_results: 0, total_pages: 0, page: 1 },
      { status: 200 },
    );
  }

  try {
    const data = await movieService.search(query.trim(), Number(page));
    return NextResponse.json(data);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to search movies" },
      { status: 500 },
    );
  }
}
