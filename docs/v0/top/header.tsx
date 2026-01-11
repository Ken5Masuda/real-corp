import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-xl font-bold text-primary">リアル企業分析</span>
            <span className="text-xs text-muted-foreground">IT企業を目指す学生のための就職活動サイト</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-primary border-b-2 border-primary pb-1">
            ホーム
          </Link>
          <Link href="/search" className="text-sm font-medium text-foreground hover:text-primary">
            企業を探す
          </Link>
          <Link href="/compare" className="text-sm font-medium text-foreground hover:text-primary">
            企業比較
          </Link>
          <Link href="/es" className="text-sm font-medium text-foreground hover:text-primary">
            ES・体験記
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden sm:inline">採用担当者はこちら</span>
          <Button variant="outline" size="sm" className="text-xs bg-transparent">
            ログイン
          </Button>
          <Button size="sm" className="text-xs bg-primary hover:bg-primary/90">
            新規登録
          </Button>
        </div>
      </div>
    </header>
  )
}
