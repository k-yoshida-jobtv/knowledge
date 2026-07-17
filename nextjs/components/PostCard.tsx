"use client";

import { Heart, MessageSquare, Eye, Pin } from "lucide-react";
import Avatar from "./Avatar";
import TagBadge from "./TagBadge";
import { getUser } from "@/lib/mock-data";
import { useApp } from "@/app/providers";
import type { Post } from "@/lib/types";

type Props = { post: Post };

export default function PostCard({ post }: Props) {
  const { likedIds, toggleLike, setOpenPostId } = useApp();
  const liked = likedIds.has(post.id);
  const author = getUser(post.author);

  const snippet = post.content
    .replace(/###\s*.+?\n/g, "")
    .replace(/\n+/g, " ")
    .slice(0, 120);

  return (
    <article
      onClick={() => setOpenPostId(post.id)}
      className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-indigo-200 transition cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <Avatar user={author} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {post.pinned && (
              <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                <Pin className="w-3 h-3" />
                PIN
              </span>
            )}
            {post.type === "qa" && (
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  post.resolved ? "bg-emerald-100 text-emerald-700" : "bg-sky-100 text-sky-700"
                }`}
              >
                {post.resolved ? "✓ 解決済み" : "Q&A"}
              </span>
            )}
            <div className="text-xs text-slate-600 font-semibold">{author.name}</div>
            <div className="text-xs text-slate-400">·</div>
            <div className="text-xs text-slate-400">{post.createdAt}</div>
          </div>
          <h3 className="mt-1.5 text-[15px] font-bold text-slate-800 leading-snug">{post.title}</h3>
          <p className="mt-1 text-sm text-slate-600 line-clamp-2">{snippet}…</p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <TagBadge key={t} name={t} />
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(post.id);
                }}
                className={`flex items-center gap-1 transition ${liked ? "text-rose-500" : "hover:text-rose-500"}`}
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                {post.likes + (liked ? 1 : 0)}
              </button>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                {post.comments.length}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.views}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
