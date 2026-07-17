"use client";

import PostList from "@/components/PostList";
import SearchResults from "@/components/SearchResults";
import { useApp } from "../providers";

export default function ArticlesPage() {
  const { searchQuery } = useApp();
  if (searchQuery.trim()) return <SearchResults />;
  return <PostList type="article" title="記事" />;
}
