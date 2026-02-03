import { Target } from "lucide-react";
import { getCompanyBySlug } from "@/features/company/api/getCompanies";
import { notFound } from "next/navigation";
import { SectionCard } from "../_components/SectionCard";
import { FormattedText } from "../_components/FormattedText";

interface ReportPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ReportPage({ params }: ReportPageProps) {
  const resolvedParams = await params;
  const company = await getCompanyBySlug(resolvedParams.slug);

  if (!company) {
    notFound();
  }

  return (
    <SectionCard title="企業レポート" icon={Target}>
      <div className="space-y-8">
        {company.report.summary && (
          <div className="bg-gradient-to-r from-primary/5 to-transparent p-4 rounded-lg border-l-4 border-primary">
            <h4 className="font-bold text-primary mb-3 text-base">企業の特徴サマリ</h4>
            <FormattedText text={company.report.summary} maxLines={4} />
          </div>
        )}
        {company.report.vision && (
          <div>
            <h4 className="font-bold text-primary mb-3 text-base border-b pb-2">経営理念（ミッション、ビジョン）</h4>
            <FormattedText text={company.report.vision} maxLines={4} />
          </div>
        )}
        {company.report.businessModel && (
          <div>
            <h4 className="font-bold text-primary mb-3 text-base border-b pb-2">ビジネスモデル</h4>
            <FormattedText text={company.report.businessModel} maxLines={4} />
          </div>
        )}
        {company.report.strengths && (
          <div>
            <h4 className="font-bold text-primary mb-3 text-base border-b pb-2">特長・強み</h4>
            <FormattedText text={company.report.strengths} maxLines={4} />
          </div>
        )}
        {company.report.competitors && (
          <div>
            <h4 className="font-bold text-primary mb-3 text-base border-b pb-2">競合・市場環境</h4>
            <FormattedText text={company.report.competitors} maxLines={4} />
          </div>
        )}
        {company.report.risks && (
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-bold text-orange-700 mb-3 text-base">事業のリスク</h4>
            <FormattedText text={company.report.risks} maxLines={4} />
          </div>
        )}
        {company.report.challenges && (
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h4 className="font-bold text-amber-700 mb-3 text-base">事業課題</h4>
            <FormattedText text={company.report.challenges} maxLines={4} />
          </div>
        )}
      </div>
    </SectionCard>
  );
}
