# リリースガイド

このドキュメントでは、このアプリケーションのリリース手順について説明します。

## バージョニング

本プロジェクトでは[セマンティックバージョニング](https://semver.org/lang/ja/)を採用します。バージョン番号は `MAJOR.MINOR.PATCH` の形式です。

- **MAJOR**: 後方互換性のない変更
- **MINOR**: 後方互換性のある機能追加
- **PATCH**: 後方互換性のあるバグ修正

バージョンの更新は、`package.json`の`version`フィールドを直接編集することで行います。

## リリース手順

### 1. 開発ブランチの作成

`main`ブランチから、作業内容に応じた名前のブランチを作成します。

```bash
git checkout main
git pull origin main
git checkout -b feat/my-awesome-feature
```

### 2. 開発と変更

ブランチ上でコードの修正や機能追加を行います。

### 3. CHANGELOG.md の更新

リリースする変更点を `CHANGELOG.md` ファイルに追記します。
ファイルが存在しない場合は、新規に作成してください。

`Unreleased`セクションに、行った変更の概要を記述します。

```markdown
# Changelog

## [Unreleased]

### Added

- 〇〇機能を追加

### Fixed

- △△のバグを修正
```

### 4. プルリクエストの作成

変更内容をリモートリポジトリにプッシュし、`main`ブランチへのプルリクエストを作成します。

```bash
git add .
git commit -m "feat: 〇〇機能の追加"
git push origin feat/my-awesome-feature
```

プルリクエストがレビューされ、承認されたらマージします。

### 5. Git タグの作成とプッシュ

`main`ブランチに切り替え、`package.json`のバージョン番号と同じ名前でGitタグを作成し、プッシュします。

```bash
git checkout main
git pull origin main

# package.json のバージョンを確認 (例: 1.2.3)
# タグを作成
git tag v1.2.3
git push origin v1.2.3
```

## Vercel へのデプロイ

`main`ブランチへのコミットは、自動的にVercelのプレビュー環境にデプロイされます。
本番環境へのデプロイは、Vercelのダッシュボードから手動で行うか、Gitタグに連動した自動デプロイを設定します。

**注意:** デプロイ設定で、以下の環境変数が正しく設定されていることを確認してください。

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_USE_MOCK_API=false`
