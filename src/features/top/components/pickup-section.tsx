"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompanyCard } from "./company-card";
import { Company } from "@/features/company/types"; // Company型をインポート

const companies: Company[] = [
  // Company型に合わせてデータを変更
  {
    id: "pickup-1",
    name: "ピックアップ企業A",
    slug: "pickup-a",
    description: "ピックアップ対象の注目企業です。",
    industry: "Webサービス",
    logo_url: "/office.png",
    created_at: "2024-02-01T00:00:00Z",
  },
  {
    id: "pickup-2",
    name: "ピックアップ企業B",
    slug: "pickup-b",
    description: "急成長中のスタートアップ。",
    industry: "AI",
    logo_url: "/office.png",
    created_at: "2024-02-02T00:00:00Z",
  },
  {
    id: "pickup-3",
    name: "ピックアップ企業C",
    slug: "pickup-c",
    description: "働きがいのある企業として選出。",
    industry: "コンサルティング",
    logo_url: "/office.png",
    created_at: "2024-02-03T00:00:00Z",
  },
  {
    id: "pickup-4",
    name: "ピックアップ企業D",
    slug: "pickup-d",
    description: "最新技術を積極導入。",
    industry: "製造業",
    logo_url: "/office.png",
    created_at: "2024-02-04T00:00:00Z",
  },
  {
    id: "pickup-5",
    name: "ピックアップ企業E",
    slug: "pickup-e",
    description: "社会貢献度の高い事業を展開。",
    industry: "教育",
    logo_url: "/office.png",
    created_at: "2024-02-05T00:00:00Z",
  },
];

export function PickupSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-primary font-medium mb-1">PICKUP</p>
            <h2 className="text-xl font-bold text-foreground">ピックアップ</h2>
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} /> // company propを渡す
          ))}
        </div>
      </div>
    </section>
  );
}
