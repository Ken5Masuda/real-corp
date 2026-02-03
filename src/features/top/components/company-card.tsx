import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { CompanyListItem } from "@/features/company/types";

interface CompanyCardProps {
  company: CompanyListItem;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link href={`/companies/${company.slug}`} passHref>
      <div className="bg-white rounded-lg border border-border/50 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        <div className="aspect-[4/3] bg-muted relative flex items-center justify-center">
          <Building2 className="h-12 w-12 text-muted-foreground/50" />
        </div>
        <div className="p-3">
          <h3 className="font-bold text-sm text-foreground mb-1">
            {company.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
            {company.industry}
          </p>
          <div className="flex flex-wrap gap-1">
            <Badge
              variant="secondary"
              className="text-[10px] px-2 py-0 bg-primary/10 text-primary hover:bg-primary/20"
            >
              {company.industry}
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
}
