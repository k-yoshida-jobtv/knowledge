import type { Post, TagMeta, User } from "./types";

export const CURRENT_USER: User = {
  id: "u_yoshida",
  name: "吉田 浩太朗",
  role: "JOBTV事業本部 企画室長",
  avatar: "吉",
  color: "bg-indigo-500",
};

export const USERS: User[] = [
  { id: "u_yoshida", name: "吉田 浩太朗", role: "企画室長", avatar: "吉", color: "bg-indigo-500" },
  { id: "u_sato", name: "佐藤 美咲", role: "法人営業", avatar: "佐", color: "bg-pink-500" },
  { id: "u_tanaka", name: "田中 大輔", role: "イベント企画", avatar: "田", color: "bg-emerald-500" },
  { id: "u_suzuki", name: "鈴木 健太", role: "マーケティング", avatar: "鈴", color: "bg-amber-500" },
  { id: "u_ito", name: "伊藤 優花", role: "採用担当", avatar: "伊", color: "bg-sky-500" },
  { id: "u_watanabe", name: "渡辺 翔", role: "SFDC運用", avatar: "渡", color: "bg-rose-500" },
];

export const TAGS: TagMeta[] = [
  { name: "営業", color: "bg-blue-100 text-blue-700" },
  { name: "マーケ", color: "bg-purple-100 text-purple-700" },
  { name: "イベント運営", color: "bg-emerald-100 text-emerald-700" },
  { name: "採用", color: "bg-pink-100 text-pink-700" },
  { name: "SFDC", color: "bg-amber-100 text-amber-700" },
  { name: "値引きルール", color: "bg-red-100 text-red-700" },
  { name: "KPI", color: "bg-indigo-100 text-indigo-700" },
  { name: "28卒", color: "bg-teal-100 text-teal-700" },
  { name: "ナレッジ", color: "bg-slate-100 text-slate-700" },
  { name: "ノウハウ", color: "bg-orange-100 text-orange-700" },
];

export const getUser = (id: string): User =>
  USERS.find((u) => u.id === id) ?? CURRENT_USER;

export const getTag = (name: string): TagMeta =>
  TAGS.find((t) => t.name === name) ?? {
    name,
    color: "bg-slate-100 text-slate-700",
  };

export const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    type: "article",
    title: "【必読】JOBTV 値引きルール 最新版（2026年度）",
    author: "u_yoshida",
    tags: ["値引きルール", "営業", "ナレッジ"],
    content:
      "### 概要\n2026年度からJOBTVの値引きルールが改定されました。全営業メンバー必読です。\n\n### ポイント\n- 定価からの値引きは20%まで（室長承認で25%）\n- 30%以上は本部長決裁が必須\n- 代理店経由の場合はマージン控除後の金額で判定\n\n### 申請フロー\n1. SFDC上で値引き申請レコードを作成\n2. 上長がレビュー\n3. 自動で承認ルートが走る\n\nご不明点は企画室まで。",
    likes: 24,
    comments: [
      { user: "u_sato", text: "いつもありがとうございます！早速チームに共有します。", time: "2時間前" },
      { user: "u_watanabe", text: "SFDCのフローも明日までに整備します。", time: "1時間前" },
    ],
    views: 182,
    createdAt: "2026-04-22 10:30",
    pinned: true,
  },
  {
    id: 2,
    type: "qa",
    title: "28卒向けイベントの会場、300名規模で押さえられる都内の候補ありますか？",
    author: "u_tanaka",
    tags: ["イベント運営", "28卒"],
    content:
      "6月下旬で動いています。ベルサール渋谷、TOC五反田あたりを考えていますが、他におすすめがあれば教えてください。配信も同時に走らせる前提です。",
    likes: 8,
    resolved: true,
    bestAnswer: "u_yoshida",
    comments: [
      { user: "u_yoshida", text: "ベルサール新宿セントラルパークは配信ブース常設で動線◎。見積もり出せるので連携します。", time: "3時間前", isAnswer: true },
      { user: "u_sato", text: "昨年同規模で使ったステーションコンファレンス東京も候補になるかと。", time: "2時間前" },
    ],
    views: 94,
    createdAt: "2026-04-22 09:15",
  },
  {
    id: 3,
    type: "article",
    title: "SFDC 商談フェーズ入力ルール（チーム共通マニュアル）",
    author: "u_watanabe",
    tags: ["SFDC", "ナレッジ", "営業"],
    content:
      "### フェーズ定義\n- **01 ヒアリング**: 初回商談後〜課題特定前\n- **02 提案準備**: 提案書作成中\n- **03 提案中**: 提案実施〜検討待ち\n- **04 契約調整**: 条件調整・稟議待ち\n- **05 受注**: 発注確定\n\n### 入力ルール\n- 週次でフェーズ・次回アクション・受注予定日を更新\n- 金額はネット額（値引き後）\n- 失注時は必ず失注理由を記入",
    likes: 31,
    comments: [{ user: "u_sato", text: "これ、新人研修でそのまま使わせてください！", time: "昨日" }],
    views: 215,
    createdAt: "2026-04-21 16:00",
  },
  {
    id: 4,
    type: "article",
    title: "法人メルマガ開封率を上げる件名の作り方（1年運用してわかったこと）",
    author: "u_suzuki",
    tags: ["マーケ", "ノウハウ"],
    content:
      "### 学んだこと\n法人メルマガの開封率を平均18% → 32%に改善した際の知見をまとめます。\n\n### 効いた施策\n- 件名は**20文字以内**に収める\n- **数字**を必ず入れる（例：「採用単価を42%下げた3つの施策」）\n- 【】は使わない方が開封率が高い傾向\n- 配信時間は火曜朝9:15がベスト\n\n### 効かなかった施策\n- 絵文字（B2Bではむしろ下がった）\n- 「緊急」「最終」などの煽り系ワード",
    likes: 45,
    comments: [
      { user: "u_ito", text: "採用メルマガにも応用します！", time: "昨日" },
      { user: "u_yoshida", text: "数字根拠ありで最高。note化して外にも出そう。", time: "昨日" },
    ],
    views: 312,
    createdAt: "2026-04-21 11:20",
  },
  {
    id: 5,
    type: "qa",
    title: "内定者フォローのSlackワークスペース、招待タイミングっていつが良い？",
    author: "u_ito",
    tags: ["採用"],
    content: "内定承諾後すぐ？それとも懇親会のタイミング？過去の事例教えてください。",
    likes: 5,
    resolved: false,
    comments: [
      { user: "u_yoshida", text: "承諾通知と同時に送って、初回投稿で自己紹介してもらう運用が定着率高かったです。", time: "30分前" },
    ],
    views: 41,
    createdAt: "2026-04-22 08:40",
  },
  {
    id: 6,
    type: "article",
    title: "KPIダッシュボード読み方ガイド（新入社員向け）",
    author: "u_yoshida",
    tags: ["KPI", "ナレッジ"],
    content:
      "### 毎週必ず見るべき数字\n- 新規商談数（週次）\n- パイプライン総額\n- 受注率（直近3ヶ月平均）\n- 失注理由Top3\n\n### 月次で見る数字\n- 売上予実\n- 粗利率\n- LTV / CAC",
    likes: 18,
    comments: [],
    views: 127,
    createdAt: "2026-04-20 14:00",
  },
];
