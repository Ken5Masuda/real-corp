import { Briefcase } from "lucide-react";
import { getCompanyBySlug } from "@/features/company/api/getCompanies";
import { notFound } from "next/navigation";
import { SectionCard } from "../_components/SectionCard";
import { FormattedText } from "../_components/FormattedText";

interface BusinessPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BusinessPage({ params }: BusinessPageProps) {
  const resolvedParams = await params;
  const company = await getCompanyBySlug(resolvedParams.slug);

  if (!company) {
    notFound();
  }

  return (
    <SectionCard title="事業内容" icon={Briefcase}>
      <div className="space-y-6">
        {company.business.overview && (
          <div>
            <h4 className="font-bold text-primary mb-3 text-base border-b pb-2">事業概要</h4>
            <FormattedText text={company.business.overview} maxLines={5} />
          </div>
        )}
        {company.business.segments && (
          <div>
            <h4 className="font-bold text-primary mb-3 text-base border-b pb-2">事業セグメント情報</h4>
            <FormattedText text={company.business.segments} maxLines={5} />
          </div>
        )}
        {company.business.productsServices && (
          <div>
            <h4 className="font-bold text-primary mb-3 text-base border-b pb-2">商品・サービス</h4>
            <FormattedText text={company.business.productsServices} maxLines={5} />
          </div>
        )}
      </div>
    </SectionCard>
  );
}
