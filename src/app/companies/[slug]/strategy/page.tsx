import { Target } from "lucide-react";
import { getCompanyBySlug } from "@/features/company/api/getCompanies";
import { notFound } from "next/navigation";
import { SectionCard } from "../_components/SectionCard";
import { FormattedText } from "../_components/FormattedText";

interface StrategyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function StrategyPage({ params }: StrategyPageProps) {
  const resolvedParams = await params;
  const company = await getCompanyBySlug(resolvedParams.slug);

  if (!company) {
    notFound();
  }

  return (
    <SectionCard title="中長期経営戦略" icon={Target}>
      <div className="space-y-6">
        {company.strategy.managementPolicy && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-4 rounded-r">
            <h4 className="font-bold text-indigo-800 mb-3 flex items-center gap-2">
              経営方針
            </h4>
            <FormattedText text={company.strategy.managementPolicy} maxLines={4} />
          </div>
        )}
        {company.strategy.longTermStrategy && (
          <div className="border-l-4 border-primary p-4 rounded-r bg-muted/30">
            <h4 className="font-bold text-primary mb-3">中長期経営戦略</h4>
            <FormattedText text={company.strategy.longTermStrategy} maxLines={5} />
          </div>
        )}
        {company.strategy.kpi && (
          <div className="border-l-4 border-emerald-500 p-4 rounded-r bg-emerald-50/50">
            <h4 className="font-bold text-emerald-800 mb-3">経営状況を判断する客観的指標（KPI）</h4>
            <FormattedText text={company.strategy.kpi} maxLines={4} />
          </div>
        )}
        {company.strategy.businessEnvironment && (
          <div className="border-l-4 border-slate-400 p-4 rounded-r bg-slate-50">
            <h4 className="font-bold text-slate-700 mb-3">経営環境</h4>
            <FormattedText text={company.strategy.businessEnvironment} maxLines={4} />
          </div>
        )}
        {company.strategy.rAndD && (
          <div className="border-l-4 border-cyan-500 p-4 rounded-r bg-cyan-50/50">
            <h4 className="font-bold text-cyan-800 mb-3 flex items-center gap-2">
              研究開発（新規事業含む）
            </h4>
            <FormattedText text={company.strategy.rAndD} maxLines={5} />
          </div>
        )}
      </div>
    </SectionCard>
  );
}
