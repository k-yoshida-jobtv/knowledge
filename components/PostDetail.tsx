"use client";

import { useState } from "react";
import { Heart, MessageSquare, Eye, X } from "lucide-react";
import Avatar from "./Avatar";
import TagBadge from "./TagBadge";
import { getUser, CURRENT_USER } from "@/lib/mock-data";
import { useApp } from "@/app/providers";
import type { Post } from "@/lib/types";

function renderContent(text: string) {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("### "))
      return (
        <h3 key={i} className="text-[17px] font-bold mt-5 mb-2 text-slate-800">
          {line.replace("### ", "")}
        </h3>
      );
    if (line.startsWith("- "))
      return (
        <li key={i} className="ml-5 list-disc leading-7 text-slate-700">
          {line.replace("- ", "")}
        </li>
      );
    if (line.trim() === "") return <br key={i} />;
    return (
      <p key={i} className="leading-7 mb-2 text-slate-700">
        {line}
      </p>
    );
  });
}

type Props = { post: Post };

export default function PostDetail({ post }: Props) {
  const { likedIds, toggleLike, addComment, setOpenPostId } = useApp();
  const [commentText, setCommentText] = useState("");
  const author = getUser(post.author);
  const liked = likedIds.has(post.id);

  const close = () => setOpenPostId(null);

  const submit = () => {
    const text = commentText.trim();
    if (!text) return;
    addComment(post.id, text);
    setCommentText("");
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-slate-200 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {post.type === "qa" && (
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    post.resolved ? "bg-emerald-100 text-emerald-700" : "bg-sky-100 text-sky-700"
                  }`}
                >
                  {post.resolved ? "✓ 解決済み" : "Q&A"}
                </span>
              )}
              {post.tags.map((t) => (
                <TagBadge key={t} name={t} />
              ))}
            </div>
            <h2 className="text-xl font-bold text-slate-800 leading-tight">{post.title}</h2>
            <div className="mt-3 flex items-center gap-2">
              <Avatar user={author} size="w-8 h-8" text="text-xs" />
              <div>
                <div className="text-sm font-semibold text-slate-700">{author.name}</div>
                <div className="text-xs text-slate-500">
                  {author.role} · {post.createdAt}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={close}
            className="text-slate-400 hover:text-slate-600"
            aria-label="閉じる"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 text-[15px]">{renderContent(post.content)}</div>

          <div className="px-6 py-3 border-t border-b border-slate-200 bg-slate-50 flex items-center gap-5 text-sm text-slate-600">
            <button
              onClick={() => toggleLike(post.id)}
              className={`flex items-center gap-1.5 font-semibold transition ${
                liked ? "text-rose-500" : "hover:text-rose-500"
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
              いいね ({post.likes + (liked ? 1 : 0)})
            </button>
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-5 h-5" />
              コメント ({post.comments.length})
            </span>
            <span className="flex items-center gap-1.5 ml-auto text-xs text-slate-400">
              <Eye className="w-4 h-4" />
              {post.views} 回閲覧
            </span>
          </div>

          <div className="p-6 space-y-4">
            <div className="text-sm font-bold text-slate-700">コメント</div>
            {post.comments.map((c, i) => {
              const u = getUser(c.user);
              return (
                <div
                  key={i}
                  className={`flex gap-3 ${
                    c.isAnswer ? "bg-emerald-50 border border-emerald-200 rounded-lg p-3" : ""
                  }`}
                >
                  <Avatar user={u} size="w-8 h-8" text="text-xs" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-700">{u.name}</span>
                      <span className="text-xs text-slate-400">{c.time}</span>
                      {c.isAnswer && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-200 px-1.5 py-0.5 rounded">
                          ベストアンサー
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-sm text-slate-700">{c.text}</div>
                  </div>
                </div>
              );
            })}
            {post.comments.length === 0 && (
              <div className="text-sm text-slate-400 text-center py-4">まだコメントはありません</div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-white flex gap-2">
          <Avatar user={CURRENT_USER} size="w-9 h-9" text="text-sm" />
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="コメントを書く…"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              className="flex-1 px-3 py-2 bg-slate-100 rounded-lg text-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 border border-transparent focus:border-indigo-300"
            />
            <button
              onClick={submit}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg"
            >
              送信
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
