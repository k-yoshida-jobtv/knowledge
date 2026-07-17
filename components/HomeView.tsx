"use client";

import { FileText, HelpCircle, Flame, Heart, Pin, Sparkles } from "lucide-react";
import PostCard from "./PostCard";
import { useApp } from "@/app/providers";
import { filterPosts } from "@/lib/filters";

export default function HomeView() {
  const { posts, searchQuery, activeTag } = useApp();
  const filtered = filterPosts(posts, searchQuery, activeTag);

  const pinned = filtered.filter((p) => p.pinned);
  const recent = filtered.filter((p) => !p.pinned).slice(0, 4);
  const unresolved = posts.filter((p) => p.type === "qa" && !p.resolved);

  const stats = [
    {
      label: "全記事",
      value: posts.filter((p) => p.type === "article").length,
      color: "from-indigo-500 to-purple-600",
      Icon: FileText,
    },
    {
      label: "Q&A",
      value: posts.filter((p) => p.type === "qa").length,
      color: "from-sky-500 to-cyan-500",
      Icon: HelpCircle,
    },
    {
      label: "未解決",
      value: unresolved.length,
      color: "from-rose-500 to-pink-500",
      Icon: Flame,
    },
    {
      label: "総いいね",
      value: posts.reduce((s, p) => s + p.likes, 0),
      color: "from-amber-500 to-orange-500",
      Icon: Heart,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.Icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-4">
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-2`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-slate-800">{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          );
        })}
      </div>

      {pinned.length > 0 && (
        <section>
          <h2 className="text-base font-bold text-slate-700 mb-3 flex items-center gap-1.5">
            <Pin className="w-4 h-4 text-amber-600" />
            ピン留め
          </h2>
          <div className="space-y-3">
            {pinned.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-base font-bold text-slate-700 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          新着
        </h2>
        <div className="space-y-3">
          {recent.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
