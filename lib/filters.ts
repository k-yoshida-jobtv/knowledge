import type { Post } from "./types";

export function filterPosts(posts: Post[], query: string, activeTag: string | null): Post[] {
  let list = posts;
  if (activeTag) list = list.filter((p) => p.tags.includes(activeTag));
  const q = query.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }
  return list;
}
