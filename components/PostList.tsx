"use client";

import PostCard from "./PostCard";
import { useApp } from "@/app/providers";
import { filterPosts } from "@/lib/filters";
import type { PostType } from "@/lib/types";

type Props = {
  type: PostType;
  title: string;
};

export default function PostList({ type, title }: Props) {
  const { posts, searchQuery, activeTag } = useApp();
  const filtered = filterPosts(posts, searchQuery, activeTag).filter((p) => p.type === type);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-slate-800">
          {title}
          {activeTag && <span className="text-sm font-normal text-slate-500"> / #{activeTag}</span>}
        </h2>
        <span className="text-xs text-slate-500">{filtered.length}件</span>
      </div>
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
