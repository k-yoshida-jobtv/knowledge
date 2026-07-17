"use client";

import { useState } from "react";
import { X } from "lucide-react";
import TagBadge from "./TagBadge";
import { TAGS, CURRENT_USER } from "@/lib/mock-data";
import { useApp } from "@/app/providers";
import type { Post, PostType } from "@/lib/types";

export default function NewPostModal() {
  const { setShowNewPost, addPost } = useApp();
  const [type, setType] = useState<PostType>("article");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const close = () => setShowNewPost(false);

  const submit = () => {
    if (!title.trim() || !content.trim()) {
      alert("タイトルと本文を入力してください");
      return;
    }
    const post: Post = {
      id: Date.now(),
      type,
      title: title.trim(),
      author: CURRENT_USER.id,
      tags: selectedTags.length > 0 ? selectedTags : ["ナレッジ"],
      content: content.trim(),
      likes: 0,
      comments: [],
      views: 1,
      createdAt: "たった今",
      resolved: false,
    };
    addPost(post);
    close();
  };

  const toggleTag = (name: string) => {
    setSelectedTags((prev) => (prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]));
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">新規投稿</h2>
          <button onClick={close} className="text-slate-400 hover:text-slate-600" aria-label="閉じる">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">種別</label>
            <div className="mt-1.5 flex gap-2">
              {(
                [
                  { k: "article", l: "📝 記事（ナレッジ共有）" },
                  { k: "qa", l: "❓ 質問（Q&A）" },
                ] as const
              ).map((o) => (
                <button
                  key={o.k}
                  onClick={() => setType(o.k)}
                  className={`px-4 py-2 text-sm rounded-lg font-medium transition ${
                    type === o.k ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">タイトル</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                type === "article"
                  ? "例: 法人メルマガの件名作成ルール"
                  : "例: 28卒イベントの会場、300名規模で押さえられる都内の候補ありますか？"
              }
              className="mt-1.5 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">本文</label>
            <textarea
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="ナレッジを共有しましょう。マークダウン（### 見出し、- 箇条書き）が使えます。"
              className="mt-1.5 w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">タグ（複数選択可）</label>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {TAGS.map((t) => (
                <TagBadge
                  key={t.name}
                  name={t.name}
                  active={selectedTags.includes(t.name)}
                  onClick={() => toggleTag(t.name)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 flex justify-end gap-2">
          <button
            onClick={close}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            キャンセル
          </button>
          <button
            onClick={submit}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm"
          >
            投稿する
          </button>
        </div>
      </div>
    </div>
  );
}
