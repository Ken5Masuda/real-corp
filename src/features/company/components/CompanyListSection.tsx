import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CompanyCard } from "@/features/top/components/company-card"; // Reusing the existing card
import { getAllCompanies } from "@/features/company/api/getCompanies";

export async function CompanyListSection() {
  const companies = await getAllCompanies();

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-primary font-medium mb-1">COMPANY</p>
            <h2 className="text-xl font-bold text-foreground">注目企業</h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-xs bg-transparent"
            asChild
          >
            <Link href="/companies">企業一覧を見る →</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
}
