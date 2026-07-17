"use client";

import PostList from "@/components/PostList";
import SearchResults from "@/components/SearchResults";
import { useApp } from "../providers";

export default function QaPage() {
  const { searchQuery } = useApp();
  if (searchQuery.trim()) return <SearchResults />;
  return <PostList type="qa" title="Q&A" />;
}
