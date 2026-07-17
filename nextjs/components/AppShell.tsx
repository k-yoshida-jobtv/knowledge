"use client";

import Header from "./Header";
import Sidebar from "./Sidebar";
import PostDetail from "./PostDetail";
import NewPostModal from "./NewPostModal";
import { useApp } from "@/app/providers";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { openPostId, showNewPost, posts } = useApp();
  const openPost = posts.find((p) => p.id === openPostId) ?? null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="max-w-7xl mx-auto px-6 flex gap-6">
        <Sidebar />
        <main className="flex-1 py-6 min-w-0">{children}</main>
      </div>
      {openPost && <PostDetail post={openPost} />}
      {showNewPost && <NewPostModal />}
    </div>
  );
}
