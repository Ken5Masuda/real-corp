import Link from "next/link";
import { ChevronRight, Building2 } from "lucide-react";

import { Header } from "@/features/top/components/header";
import { Footer } from "@/features/top/components/footer";
import { getCompanyBySlug } from "@/features/company/api/getCompanies";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionNav } from "./_components/SectionNav";
import { FormattedText } from "./_components/FormattedText";

interface CompanyLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function CompanyLayout({
  children,
  params,
}: CompanyLayoutProps) {
  const resolvedParams = await params;
  const company = await getCompanyBySlug(resolvedParams.slug);

  if (!company) {
    notFound();
  }

  const companyName = company.topPage.name;

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
            <Link
              href="/companies"
              className="text-primary hover:text-primary/80"
            >
              企業を探す
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{companyName}</span>
          </nav>
        </div>
      </div>

      {/* 企業ヘッダー */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Card className="overflow-hidden">
            {/* 企業情報バッジ */}
            <div className="px-4 py-2">
              <Badge className="bg-primary text-primary-foreground">企業情報</Badge>
            </div>

            <div className="p-6 pt-2">
              <div className="flex flex-col md:flex-row gap-6">
                {/* 会社画像 */}
                <div className="w-full md:w-48 h-36 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <Building2 className="h-16 w-16 text-muted-foreground/30" />
                </div>

                {/* 会社情報 */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-muted-foreground" />
                    <h1 className="text-xl font-bold text-foreground">
                      {companyName}
                    </h1>
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    <FormattedText
                      text={company.report.summary || `${company.basicInfo.industry}で事業を展開`}
                      maxLines={2}
                    />
                  </div>
                </div>
              </div>

              {/* 情報カード */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card className="p-4 bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">業界</p>
                  <p className="font-medium">{company.basicInfo.industry}</p>
                </Card>
                <Card className="p-4 bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">平均年収</p>
                  <p className="font-medium">{company.compensation.averageSalary}</p>
                </Card>
                <Card className="p-4 bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">30歳平均年収</p>
                  <p className="font-medium">{company.compensation.averageSalary30}</p>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* サイドバー */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-20">
              <SectionNav slug={resolvedParams.slug} />
            </div>
          </aside>

          {/* メインエリア */}
          <main className="flex-1 space-y-6">
            {/* ページコンテンツ */}
            {children}

            {/* 企業一覧へ戻るボタン */}
            <div className="flex justify-center pt-4">
              <Link
                href="/companies"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                企業一覧に戻る
              </Link>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
