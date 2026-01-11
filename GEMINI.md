# Gemini Rules

このファイルは、Gemini CLI と Antigravity エージェントのための共有ルール定義です。

## プロジェクト概要
Next.js と Supabase を使用した Web アプリケーション開発プロジェクト。

## 技術スタック
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Backend**: Supabase
- **Icons**: Lucide React

## コーディング規約

### 一般
- コンポーネントは関数コンポーネントとして定義してください。
- `const` を優先して使用してください。
- 変数名はわかりやすく、意味のある名前（英語）にしてください。
- コメントやドキュメントは**日本語**で記述してください。

### TypeScript
- `any` 型の使用は極力避け、適切な型定義を行ってください。
- インターフェース（Interface）よりも型エイリアス（Type Alias）を優先してください（一貫性のため）。

### ディレクトリ構成 (Bulletproof React ライク)
- 機能ごとに `src/features` 配下にまとめてください。
  - 例: `src/features/auth/components`, `src/features/auth/api`
- 共通コンポーネントは `src/components` に配置してください。

### スタイリング
- モバイルファーストで記述してください。
- スタイルは Tailwind CSS のユーティリティクラスを使用してください。
- 複雑なスタイルや再利用可能なスタイルは、共通コンポーネント化するか、Tailwind の `layer` 機能などを検討してください。

## エージェントへの指示
- ユーザーへの応答は**日本語**で行ってください。
- コードの修正を提案する際は、可能な限り既存のコードスタイルに従ってください。
- 新しいファイルを作成する際は、プロジェクトのディレクトリ構成ルールに従ってください。
