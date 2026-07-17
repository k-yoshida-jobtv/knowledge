"use client";

import { useRouter } from "next/navigation";
import { TAGS } from "@/lib/mock-data";
import { useApp } from "@/app/providers";

export default function TagsView() {
  const router = useRouter();
  const { posts, setActiveTag } = useApp();

  const tagCounts = TAGS.map((t) => ({
    ...t,
    count: posts.filter((p) => p.tags.includes(t.name)).length,
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-lg font-bold text-slate-800 mb-4">タグ一覧</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {tagCounts.map((t) => (
          <button
            key={t.name}
            onClick={() => {
              setActiveTag(t.name);
              router.push("/articles");
            }}
            className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition text-left"
          >
            <div>
              <div className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${t.color}`}>#{t.name}</div>
              <div className="text-xs text-slate-500 mt-1">{t.count}件の投稿</div>
            </div>
            <div className="text-slate-300 text-xl">›</div>
          </button>
        ))}
      </div>
    </div>
  );
}
