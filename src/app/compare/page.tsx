import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Header } from "@/features/top/components/header";
import { Footer } from "@/features/top/components/footer";
import { CompareSearch } from "./_components/CompareSearch";

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* パンくず */}
      <div className="bg-white border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-primary hover:text-primary/80">
              ホーム
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">企業比較</span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">企業比較</h1>
        <p className="text-muted-foreground mb-8">
          気になる企業を選択して、給与・待遇・働き方などを比較できます。
        </p>
        <CompareSearch />
      </main>

      <Footer />
    </div>
  );
}
