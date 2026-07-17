"use client";

import { getTag } from "@/lib/mock-data";

type Props = {
  name: string;
  onClick?: () => void;
  active?: boolean;
};

export default function TagBadge({ name, onClick, active }: Props) {
  const tag = getTag(name);
  const Tag = onClick ? "button" : "span";
  return (
    <Tag
      onClick={onClick}
      className={`text-xs px-2.5 py-1 rounded-full font-medium transition ${
        active ? "ring-2 ring-indigo-400 " : ""
      }${tag.color} ${onClick ? "hover:opacity-80 cursor-pointer" : ""}`}
    >
      #{name}
    </Tag>
  );
}
