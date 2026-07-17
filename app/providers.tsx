"use client";

import React, { createContext, useContext, useMemo, useState, useCallback } from "react";
import { INITIAL_POSTS, CURRENT_USER } from "@/lib/mock-data";
import type { Post } from "@/lib/types";

type AppContextValue = {
  posts: Post[];
  likedIds: Set<number>;
  searchQuery: string;
  activeTag: string | null;
  openPostId: number | null;
  showNewPost: boolean;
  setSearchQuery: (q: string) => void;
  setActiveTag: (t: string | null) => void;
  setOpenPostId: (id: number | null) => void;
  setShowNewPost: (open: boolean) => void;
  toggleLike: (id: number) => void;
  addComment: (postId: number, text: string) => void;
  addPost: (post: Post) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [openPostId, setOpenPostId] = useState<number | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);

  const toggleLike = useCallback((id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const addComment = useCallback((postId: number, text: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                { user: CURRENT_USER.id, text, time: "たった今" },
              ],
            }
          : p,
      ),
    );
  }, []);

  const addPost = useCallback((post: Post) => {
    setPosts((prev) => [post, ...prev]);
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      posts,
      likedIds,
      searchQuery,
      activeTag,
      openPostId,
      showNewPost,
      setSearchQuery,
      setActiveTag,
      setOpenPostId,
      setShowNewPost,
      toggleLike,
      addComment,
      addPost,
    }),
    [posts, likedIds, searchQuery, activeTag, openPostId, showNewPost, toggleLike, addComment, addPost],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
