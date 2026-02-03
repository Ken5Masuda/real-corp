import { Users } from "lucide-react";
import { getCompanyBySlug } from "@/features/company/api/getCompanies";
import { notFound } from "next/navigation";
import { SectionCard } from "../_components/SectionCard";

interface WorkstylePageProps {
  params: Promise<{ slug: string }>;
}

export default async function WorkstylePage({ params }: WorkstylePageProps) {
  const resolvedParams = await params;
  const company = await getCompanyBySlug(resolvedParams.slug);

  if (!company) {
    notFound();
  }

  return (
    <SectionCard title="働き方" icon={Users}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">平均年齢</div>
          <div className="text-xl font-bold text-primary">{company.detailedWorkStyle.averageAge || "-"}</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">平均勤続年数</div>
          <div className="text-xl font-bold text-primary">{company.detailedWorkStyle.averageTenure || "-"}</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">新卒採用人数（予定）</div>
          <div className="text-xl font-bold text-primary">{company.detailedWorkStyle.newGradHiring || "-"}</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">有給取得日数</div>
          <div className="text-xl font-bold text-primary">{company.detailedWorkStyle.paidLeaveDays || "-"}</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">残業時間（月）</div>
          <div className="text-xl font-bold text-primary">{company.detailedWorkStyle.overtimeHours || "-"}</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">3年後離職率</div>
          <div className="text-xl font-bold text-primary">{company.detailedWorkStyle.turnoverRate3Year || "-"}</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">女性比率</div>
          <div className="text-xl font-bold text-primary">{company.detailedWorkStyle.femaleRatio || "-"}</div>
        </div>
      </div>
    </SectionCard>
  );
}
