"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, HelpCircle, Tag, Trophy, Sparkles } from "lucide-react";
import { TAGS } from "@/lib/mock-data";
import { useApp } from "@/app/providers";
import TagBadge from "./TagBadge";

const MENUS = [
  { href: "/", label: "ホーム", icon: Home },
  { href: "/articles", label: "記事", icon: FileText },
  { href: "/qa", label: "Q&A", icon: HelpCircle },
  { href: "/tags", label: "タグ", icon: Tag },
  { href: "/ranking", label: "ランキング", icon: Trophy },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { activeTag, setActiveTag } = useApp();

  return (
    <aside className="w-56 shrink-0 py-6 pr-2">
      <nav className="space-y-1">
        {MENUS.map((m) => {
          const active = pathname === m.href;
          const Icon = m.icon;
          return (
            <Link
              key={m.href}
              href={m.href}
              onClick={() => setActiveTag(null)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                active ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              {m.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8">
        <div className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">人気タグ</div>
        <div className="px-2 flex flex-wrap gap-1.5">
          {TAGS.slice(0, 8).map((t) => (
            <TagBadge
              key={t.name}
              name={t.name}
              active={activeTag === t.name}
              onClick={() => setActiveTag(activeTag === t.name ? null : t.name)}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
        <div className="flex items-center gap-1.5 text-xs font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          今週のハイライト
        </div>
        <div className="text-xl font-bold">+42</div>
        <div className="text-xs opacity-90">新規投稿数（先週比 +18%）</div>
      </div>
    </aside>
  );
}
