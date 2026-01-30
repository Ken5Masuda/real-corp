import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              IT企業を目指す学生のための就職活動サイト
            </p>
            <Link href="/" className="text-xl font-bold text-foreground">
              リアル企業分析
            </Link>
            <p className="text-xs text-muted-foreground mt-2">
              © 2026 Lifedge Inc. All Rights Reserved.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              ホーム
            </Link>
            <Link href="/search" className="hover:text-foreground">
              企業を探す
            </Link>
            <Link href="/es" className="hover:text-foreground">
              ES・体験記
            </Link>
            <Link href="/compare" className="hover:text-foreground">
              企業比較
            </Link>
          </nav>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <Link href="/faq" className="hover:text-foreground">
              よくある質問
            </Link>
            <Link href="/privacy" className="hover:text-foreground">
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
