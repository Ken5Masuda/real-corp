import { getCompanyBySlug } from "@/features/company/api/getCompanies";
import { notFound } from "next/navigation";
import { SalaryCard } from "../_components/SalaryCard";

interface SalaryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SalaryPage({ params }: SalaryPageProps) {
  const resolvedParams = await params;
  const company = await getCompanyBySlug(resolvedParams.slug);

  if (!company) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold flex items-center gap-2">
        <span className="text-primary">•</span>
        2025年度の給与待遇
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SalaryCard
          title="平均年収(全体)"
          value={company.detailedCompensation.averageSalary || "0"}
          unit="万円"
        />
        <SalaryCard
          title="平均年収(30歳)"
          value={company.detailedCompensation.averageSalary30 || "0"}
          unit="万円"
        />
        <SalaryCard
          title="初任給(大卒)"
          value={company.detailedCompensation.initialSalaryUndergrad || "0"}
          unit="万円"
        />
        <SalaryCard
          title="初任給(院卒)"
          value={company.detailedCompensation.initialSalaryGrad || "0"}
          unit="万円"
        />
        <SalaryCard
          title="住宅補助"
          value={company.detailedCompensation.housingAllowance || "0"}
          unit=""
          fullWidth
        />
      </div>
    </div>
  );
}
