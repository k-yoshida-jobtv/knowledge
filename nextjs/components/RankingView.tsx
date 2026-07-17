"use client";

import { Flame, Heart, Trophy, Eye } from "lucide-react";
import Avatar from "./Avatar";
import { USERS, getUser } from "@/lib/mock-data";
import { useApp } from "@/app/providers";

export default function RankingView() {
  const { posts } = useApp();

  const topPosts = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 5);
  const userStats = USERS.map((u) => {
    const userPosts = posts.filter((p) => p.author === u.id);
    const totalLikes = userPosts.reduce((s, p) => s + p.likes, 0);
    return { user: u, posts: userPosts.length, likes: totalLikes };
  }).sort((a, b) => b.likes - a.likes);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-rose-500" />
          <h2 className="text-lg font-bold text-slate-800">人気記事ランキング（今月）</h2>
        </div>
        <div className="space-y-3">
          {topPosts.map((p, i) => {
            const author = getUser(p.author);
            const medal = ["🥇", "🥈", "🥉"][i] ?? `${i + 1}.`;
            return (
              <div key={p.id} className="flex items-center gap-4 py-2 border-b border-slate-100 last:border-0">
                <div className="text-2xl font-bold text-slate-400 w-10 text-center">{medal}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-800 truncate">{p.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{author.name}</div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1 text-rose-500 font-semibold">
                    <Heart className="w-4 h-4 fill-current" />
                    {p.likes}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Eye className="w-4 h-4" />
                    {p.views}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-bold text-slate-800">貢献メンバー（今月）</h2>
        </div>
        <div className="space-y-3">
          {userStats.map((s, i) => {
            const medal = ["🥇", "🥈", "🥉"][i] ?? `${i + 1}.`;
            return (
              <div key={s.user.id} className="flex items-center gap-4 py-2 border-b border-slate-100 last:border-0">
                <div className="text-2xl font-bold text-slate-400 w-10 text-center">{medal}</div>
                <Avatar user={s.user} />
                <div className="flex-1">
                  <div className="font-semibold text-slate-800">{s.user.name}</div>
                  <div className="text-xs text-slate-500">{s.user.role}</div>
                </div>
                <div className="text-right text-sm">
                  <div className="font-semibold text-slate-700">
                    {s.posts}件投稿 / {s.likes}いいね
                  </div>
                  <div className="w-32 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      style={{ width: `${Math.min(100, s.likes * 2)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
