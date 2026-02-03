import { Building2 } from "lucide-react";
import { getCompanyBySlug } from "@/features/company/api/getCompanies";
import { notFound } from "next/navigation";
import { SectionCard } from "../_components/SectionCard";
import { FormattedText } from "../_components/FormattedText";

interface OverviewPageProps {
  params: Promise<{ slug: string }>;
}

export default async function OverviewPage({ params }: OverviewPageProps) {
  const resolvedParams = await params;
  const company = await getCompanyBySlug(resolvedParams.slug);

  if (!company) {
    notFound();
  }

  return (
    <SectionCard title="会社概要" icon={Building2}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex border-b pb-2">
            <span className="w-32 text-muted-foreground text-sm">社名</span>
            <span className="flex-1 font-medium">{company.overview.name}</span>
          </div>
          <div className="flex border-b pb-2">
            <span className="w-32 text-muted-foreground text-sm">本社所在地</span>
            <span className="flex-1">{company.overview.headquarters}</span>
          </div>
          <div className="flex border-b pb-2">
            <span className="w-32 text-muted-foreground text-sm">設立年月日</span>
            <span className="flex-1">{company.overview.foundedDate}</span>
          </div>
          <div className="flex border-b pb-2">
            <span className="w-32 text-muted-foreground text-sm">資本金</span>
            <span className="flex-1">{company.overview.capital}</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex border-b pb-2">
            <span className="w-32 text-muted-foreground text-sm">代表者</span>
            <span className="flex-1">{company.overview.representative}</span>
          </div>
          <div className="flex border-b pb-2">
            <span className="w-32 text-muted-foreground text-sm">従業員数</span>
            <span className="flex-1">{company.overview.employeeCount}</span>
          </div>
          <div className="flex border-b pb-2">
            <span className="w-32 text-muted-foreground text-sm">売上高</span>
            <span className="flex-1">{company.overview.revenue}</span>
          </div>
        </div>
      </div>
      {company.overview.businessSummary && (
        <div className="mt-6 border-t pt-6">
          <h4 className="font-medium mb-3 text-primary">事業概要</h4>
          <div className="bg-muted/30 p-4 rounded-lg">
            <FormattedText text={company.overview.businessSummary} maxLines={6} />
          </div>
        </div>
      )}
    </SectionCard>
  );
}
