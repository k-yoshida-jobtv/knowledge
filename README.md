# JOBTV Knowledge — 社内ナレッジ共有システム（Next.js版）

JOBTV事業本部向けの社内ナレッジ共有システム プロトタイプ。
Qastを参考に、記事投稿・Q&A・タグ管理・いいね・コメント・ランキングを備えた単一アプリケーションとして構築。

## 技術スタック

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 3**
- **lucide-react** (アイコン)
- 状態管理は React Context（外部ライブラリ不要）

## ディレクトリ構成

```
nextjs/
├── app/
│   ├── layout.tsx              # ルートレイアウト（AppShellを注入）
│   ├── providers.tsx           # AppProvider (Context)
│   ├── page.tsx                # ホーム（ダッシュボード）
│   ├── articles/page.tsx       # 記事一覧
│   ├── qa/page.tsx             # Q&A一覧
│   ├── tags/page.tsx           # タグ一覧
│   ├── ranking/page.tsx        # ランキング
│   └── globals.css
├── components/
│   ├── AppShell.tsx            # Header + Sidebar + main + モーダル
│   ├── Header.tsx              # 検索・投稿・通知・プロフィール
│   ├── Sidebar.tsx             # ナビ・人気タグ
│   ├── PostCard.tsx            # 投稿カード
│   ├── PostDetail.tsx          # 投稿詳細モーダル
│   ├── NewPostModal.tsx        # 新規投稿モーダル
│   ├── PostList.tsx            # 記事/Q&Aの一覧
│   ├── HomeView.tsx            # ダッシュボード
│   ├── TagsView.tsx            # タグ一覧
│   ├── RankingView.tsx         # ランキング
│   ├── SearchResults.tsx       # 検索結果
│   ├── Avatar.tsx
│   └── TagBadge.tsx
├── lib/
│   ├── types.ts                # User / Post / Comment 型
│   ├── mock-data.ts            # モックユーザー・記事データ
│   └── filters.ts              # 検索・タグフィルタリング
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── postcss.config.mjs
```

## セットアップ & 起動

```bash
cd nextjs
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開く。

## 機能一覧

| カテゴリ | 機能 |
| --- | --- |
| 投稿 | 記事 / Q&A の2タイプ、マークダウン（### 見出し、- 箇条書き）対応 |
| タグ | 10種類のカラータグ、複数付与可、人気タグランキング、タグ別フィルタ |
| インタラクション | いいね（トグル）、コメント投稿、ベストアンサー表示 |
| 検索 | タイトル・本文・タグ横断の全文検索 |
| ランキング | 人気記事Top5、貢献メンバーランキング |
| ダッシュボード | KPIカード（全記事・Q&A・未解決・総いいね）、ピン留め、新着 |

## 次ステップ（本番実装に向けて）

- **データベース**: Supabase / PlanetScale / Prisma + Postgres
- **認証**: NextAuth.js（Google Workspace / Azure AD SSO）
- **全文検索**: Algolia / Meilisearch / Postgres全文検索
- **エディタ**: TipTap / Tiptap Pro（リッチテキスト）
- **通知**: Slack連携（新規投稿・メンション時に自動通知）
- **権限**: 部署ベースのロールアクセス制御（RBAC）
- **分析**: 閲覧数・検索キーワードの蓄積とダッシュボード化
