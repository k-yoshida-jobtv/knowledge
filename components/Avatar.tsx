import type { User } from "@/lib/types";

type Props = {
  user: User;
  size?: string;
  text?: string;
};

export default function Avatar({ user, size = "w-9 h-9", text = "text-sm" }: Props) {
  return (
    <div
      className={`${size} ${user.color} rounded-full flex items-center justify-center text-white font-bold ${text} shrink-0`}
    >
      {user.avatar}
    </div>
  );
}
