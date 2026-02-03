"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompanyCard } from "./company-card";
import { CompanyListItem } from "@/features/company/types";

const companies: CompanyListItem[] = [
  {
    id: "intern-1",
    name: "AlphaSights",
    slug: "alphasights",
    description: "早期選考インターンを実施",
    industry: "コンサルティング",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "intern-2",
    name: "BetaSolutions",
    slug: "betasolutions",
    description: "長期インターン募集中",
    industry: "ITサービス",
    created_at: "2024-01-02T00:00:00Z",
  },
  {
    id: "intern-3",
    name: "GammaTech",
    slug: "gammatech",
    description: "最新技術を学ぶ",
    industry: "Web開発",
    created_at: "2024-01-03T00:00:00Z",
  },
  {
    id: "intern-4",
    name: "Delta Innovations",
    slug: "delta-innovations",
    description: "新規事業開発インターン",
    industry: "スタートアップ",
    created_at: "2024-01-04T00:00:00Z",
  },
  {
    id: "intern-5",
    name: "Epsilon Corp",
    slug: "epsilon-corp",
    description: "AI開発プロジェクト",
    industry: "AI",
    created_at: "2024-01-05T00:00:00Z",
  },
];

export function InternSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs text-primary font-medium mb-1">INTERN</p>
            <h2 className="text-xl font-bold text-foreground">
              10月の早期選考・インターン新規オープン企業
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              1月末〜11月初旬に早期選考・インターン情報が新規オープンした企業
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {String(currentPage).padStart(2, "0")} /{" "}
              {String(totalPages).padStart(2, "0")}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-transparent"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-transparent"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="rounded-full px-8 bg-transparent"
          >
            早期選考・インターン企業一覧を見る →
          </Button>
        </div>
      </div>
    </section>
  );
}
