import { TrendingUp } from "lucide-react";
import { getCompanyBySlug } from "@/features/company/api/getCompanies";
import { notFound } from "next/navigation";
import { SectionCard } from "../_components/SectionCard";

interface FinancialsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function FinancialsPage({ params }: FinancialsPageProps) {
  const resolvedParams = await params;
  const company = await getCompanyBySlug(resolvedParams.slug);

  if (!company) {
    notFound();
  }

  return (
    <SectionCard title="業績サマリー" icon={TrendingUp}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">売上高</div>
          <div className="text-lg font-bold text-primary">{company.financials.revenue || "-"}</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">売上総利益</div>
          <div className="text-lg font-bold text-primary">{company.financials.grossProfit || "-"}</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">売上総利益率</div>
          <div className="text-lg font-bold text-primary">{company.financials.grossProfitMargin || "-"}</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">営業利益</div>
          <div className="text-lg font-bold text-primary">{company.financials.operatingProfit || "-"}</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">営業利益率</div>
          <div className="text-lg font-bold text-primary">{company.financials.operatingProfitMargin || "-"}</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">経常利益</div>
          <div className="text-lg font-bold text-primary">{company.financials.ordinaryProfit || "-"}</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">経常利益率</div>
          <div className="text-lg font-bold text-primary">{company.financials.ordinaryProfitMargin || "-"}</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">当期純利益</div>
          <div className="text-lg font-bold text-primary">{company.financials.netProfit || "-"}</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">当期純利益率</div>
          <div className="text-lg font-bold text-primary">{company.financials.netProfitMargin || "-"}</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">従業員数</div>
          <div className="text-lg font-bold text-primary">{company.financials.employeeCount || "-"}</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">一人当たり売上高</div>
          <div className="text-lg font-bold text-primary">{company.financials.revenuePerEmployee || "-"}</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">一人当たり経常利益</div>
          <div className="text-lg font-bold text-primary">{company.financials.ordinaryProfitPerEmployee || "-"}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">総資産</div>
          <div className="text-lg font-bold text-blue-600">{company.financials.totalAssets || "-"}</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">純資産</div>
          <div className="text-lg font-bold text-blue-600">{company.financials.netAssets || "-"}</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">自己資本比率</div>
          <div className="text-lg font-bold text-blue-600">{company.financials.equityRatio || "-"}</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">ROE</div>
          <div className="text-lg font-bold text-blue-600">{company.financials.roe || "-"}</div>
        </div>
      </div>
    </SectionCard>
  );
}
