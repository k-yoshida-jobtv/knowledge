"use client";

import PostCard from "./PostCard";
import { useApp } from "@/app/providers";
import { filterPosts } from "@/lib/filters";

export default function SearchResults() {
  const { posts, searchQuery, activeTag } = useApp();
  const filtered = filterPosts(posts, searchQuery, activeTag);

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-3">
        「{searchQuery}」の検索結果{" "}
        <span className="text-sm text-slate-500 font-normal">({filtered.length}件)</span>
      </h2>
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-400">該当する投稿はありません</div>
        ) : (
          filtered.map((p) => <PostCard key={p.id} post={p} />)
        )}
      </div>
    </div>
  );
}
