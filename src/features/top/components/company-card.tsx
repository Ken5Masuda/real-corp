import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link"; // Linkをインポート
import { Company } from "@/features/company/types"; // Company型をインポート

interface CompanyCardProps {
  company: Company; // Companyオブジェクトを受け入れるように変更
}

export function CompanyCard({ company }: CompanyCardProps) {
  // companyを分割代入
  return (
    <Link href={`/companies/${company.slug}`} passHref>
      {" "}
      {/* Linkでラップ */}
      <div className="bg-white rounded-lg border border-border/50 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        <div className="aspect-[4/3] bg-muted relative">
          <Image
            src={company.logo_url || "/office.png"}
            alt={company.name}
            fill
            className="object-cover"
          />{" "}
          {/* logo_urlを使用 */}
        </div>
        <div className="p-3">
          <h3 className="font-bold text-sm text-foreground mb-1">
            {company.name}
          </h3>{" "}
          {/* company.nameを使用 */}
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
            {company.industry} {/* company.industryを使用 */}
          </p>
          <div className="flex flex-wrap gap-1">
            <Badge
              variant="secondary"
              className="text-[10px] px-2 py-0 bg-primary/10 text-primary hover:bg-primary/20"
            >
              {company.industry} {/* industryをタグとして使用 */}
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
}
