import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "./providers";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "JOBTV Knowledge - 社内ナレッジ共有システム",
  description: "JOBTV事業本部の社内ナレッジ・Q&A・ノウハウを集約するプラットフォーム",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased">
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
