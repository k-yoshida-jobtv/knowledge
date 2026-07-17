"use client";

import HomeView from "@/components/HomeView";
import SearchResults from "@/components/SearchResults";
import { useApp } from "./providers";

export default function HomePage() {
  const { searchQuery } = useApp();
  if (searchQuery.trim()) return <SearchResults />;
  return <HomeView />;
}
