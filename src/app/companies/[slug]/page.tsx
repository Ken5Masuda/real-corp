import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Header } from "@/features/top/components/header";
import { Footer } from "@/features/top/components/footer";
import { getCompanyBySlug } from "@/features/company/api/getCompanies";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CompanyDetailPageProps {
  params: { slug: string };
}

export default async function CompanyDetailPage({
  params,
}: CompanyDetailPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const company = await getCompanyBySlug(resolvedParams.slug);

  if (!company) {
    notFound(); // 会社が見つからない場合は404ページを表示
  }

  // グラフのデータはダミーとして定義
  const chartLabels = ["2023年", "2024年", "2025年"];
  const chartData = [1050, 1100, 1200]; // 単位: 万円

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
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
            <span className="text-foreground">{company.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground px-4 py-3 text-sm font-medium">
                企業情報
              </CardHeader>
              <nav className="divide-y divide-border/50">
                <Link
                  href={`/companies/${company.slug}#overview`}
                  className="block px-4 py-3 text-sm text-foreground hover:bg-muted"
                >
                  会社概要
                </Link>
                <Link
                  href={`/companies/${company.slug}#report`}
                  className="block px-4 py-3 text-sm text-foreground hover:bg-muted"
                >
                  企業レポート
                </Link>
                <Link
                  href={`/companies/${company.slug}#industry`}
                  className="block px-4 py-3 text-sm text-foreground hover:bg-muted"
                >
                  業界内容
                </Link>
                <Link
                  href={`/companies/${company.slug}#type`}
                  className="block px-4 py-3 text-sm text-foreground hover:bg-muted"
                >
                  業種
                </Link>
                <Link
                  href={`/companies/${company.slug}#salary`}
                  className="block px-4 py-3 text-sm font-medium bg-muted text-primary" // active-sidebar
                >
                  給与待遇
                </Link>
                <Link
                  href={`/companies/${company.slug}#workstyle`}
                  className="block px-4 py-3 text-sm text-foreground hover:bg-muted"
                >
                  働き方
                </Link>
                <Link
                  href={`/companies/${company.slug}#strategy`}
                  className="block px-4 py-3 text-sm text-foreground hover:bg-muted"
                >
                  中長期経営戦略
                </Link>
                <Link
                  href={`/companies/${company.slug}#reviews`}
                  className="block px-4 py-3 text-sm text-foreground hover:bg-muted"
                >
                  現役社員の
                  <br />
                  口コミ・動画
                </Link>
                <Link
                  href={`/companies/${company.slug}#es-experience`}
                  className="block px-4 py-3 text-sm text-foreground hover:bg-muted"
                >
                  ES体験記
                </Link>
                <Link
                  href={`/companies/${company.slug}#sales`}
                  className="block px-4 py-3 text-sm text-foreground hover:bg-muted"
                >
                  営業情報
                </Link>
              </nav>
            </Card>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {/* Company Header */}
            <Card className="p-6 mb-6">
              <div className="flex flex-col sm:flex-row items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    {/* Icon placeholder */}
                    <svg
                      className="w-5 h-5 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      ></path>
                    </svg>
                    <h1 className="text-2xl font-bold text-foreground">
                      {company.name}
                    </h1>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {company.description}
                  </p>
                </div>
                <Image
                  src={company.logo_url || "/office.png"}
                  alt={company.name}
                  width={160} // w-40
                  height={112} // h-28
                  className="object-cover rounded-lg ml-0 sm:ml-6 mt-4 sm:mt-0"
                />
              </div>
            </Card>

            {/* Point Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Dummy Point Cards based on description */}
              <Card className="p-4">
                <Badge className="bg-primary text-primary-foreground mb-2">
                  POINT01
                </Badge>
                <p className="text-sm text-foreground">
                  {company.industry}に強み。業界をリードする存在。
                </p>
              </Card>
              <Card className="p-4">
                <Badge className="bg-primary text-primary-foreground mb-2">
                  POINT02
                </Badge>
                <p className="text-sm text-foreground">
                  設立{company.founded_year}年。従業員{company.employee_count}
                  名の成長企業。
                </p>
              </Card>
              <Card className="p-4">
                <Badge className="bg-primary text-primary-foreground mb-2">
                  POINT03
                </Badge>
                <p className="text-sm text-foreground">
                  詳細は公式サイト{" "}
                  <Link
                    href={company.website_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-primary"
                  >
                    {company.website_url ? "こちら" : "N/A"}
                  </Link>{" "}
                  で。
                </p>
              </Card>
            </div>

            {/* Salary Information Section */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle className="text-lg font-bold">企業情報</CardTitle>
              </CardHeader>

              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-8">
                  2025年度の<span className="text-primary">給与待遇</span>
                </h3>

                {/* Salary Charts Grid */}
                <div className="space-y-8">
                  {/* Row 1: Two Charts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Chart 1 */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">
                              平均年収(全体)
                            </div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-bold text-primary">
                                {company.employee_count &&
                                  (company.employee_count * 0.1).toFixed(0)}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                万円
                              </span>
                              <Badge
                                variant="secondary"
                                className="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                              >
                                前年比 1%↑
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {/* Chart Placeholder */}
                        <div className="w-full h-32 bg-muted flex items-center justify-center text-sm text-muted-foreground rounded">
                          Chart Placeholder
                        </div>
                      </CardContent>
                    </Card>

                    {/* Chart 2 */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">
                              30歳平均年収
                            </div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-bold text-primary">
                                {company.founded_year &&
                                  (company.founded_year * 0.05).toFixed(0)}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                万円
                              </span>
                              <Badge
                                variant="secondary"
                                className="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                              >
                                前年比 2%↑
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {/* Chart Placeholder */}
                        <div className="w-full h-32 bg-muted flex items-center justify-center text-sm text-muted-foreground rounded">
                          Chart Placeholder
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Row 2: Two Charts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Chart 3 */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">
                              職種別平均年収
                            </div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-bold text-primary">
                                900
                              </span>
                              <span className="text-sm text-muted-foreground">
                                万円
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Chart Placeholder */}
                        <div className="w-full h-32 bg-muted flex items-center justify-center text-sm text-muted-foreground rounded">
                          Chart Placeholder
                        </div>
                      </CardContent>
                    </Card>

                    {/* Chart 4 */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">
                              新卒初任給
                            </div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-bold text-primary">
                                40
                              </span>
                              <span className="text-sm text-muted-foreground">
                                万円
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Chart Placeholder */}
                        <div className="w-full h-32 bg-muted flex items-center justify-center text-sm text-muted-foreground rounded">
                          Chart Placeholder
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Row 3: Single Chart */}
                  <div className="max-w-md mx-auto">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">
                              男女比率
                            </div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-bold text-primary">
                                60
                              </span>
                              <span className="text-sm text-muted-foreground">
                                %
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Chart Placeholder */}
                        <div className="w-full h-32 bg-muted flex items-center justify-center text-sm text-muted-foreground rounded">
                          Chart Placeholder
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
