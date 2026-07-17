"use client";

import { Search, Bell, Plus } from "lucide-react";
import Avatar from "./Avatar";
import { CURRENT_USER } from "@/lib/mock-data";
import { useApp } from "@/app/providers";

export default function Header() {
  const { searchQuery, setSearchQuery, setShowNewPost } = useApp();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="px-6 h-16 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-sm">
            J
          </div>
          <div>
            <div className="font-bold text-slate-800 leading-tight">JOBTV Knowledge</div>
            <div className="text-[10px] text-slate-500 leading-tight">社内ナレッジ共有システム</div>
          </div>
        </div>

        <div className="flex-1 max-w-2xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="記事・Q&A・タグを検索…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-transparent rounded-lg text-sm focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none transition"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNewPost(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            新しく投稿
          </button>
          <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg" aria-label="通知">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
          </button>
          <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
            <Avatar user={CURRENT_USER} size="w-8 h-8" text="text-xs" />
            <div className="hidden md:block">
              <div className="text-sm font-semibold text-slate-800 leading-tight">{CURRENT_USER.name}</div>
              <div className="text-[10px] text-slate-500 leading-tight">{CURRENT_USER.role}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
