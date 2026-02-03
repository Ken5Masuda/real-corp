"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { id: "overview", label: "会社概要" },
  { id: "report", label: "企業レポート" },
  { id: "business", label: "事業内容" },
  { id: "financials", label: "業績" },
  { id: "salary", label: "給与待遇" },
  { id: "workstyle", label: "働き方" },
  { id: "strategy", label: "中長期経営戦略" },
];

interface SectionNavProps {
  slug: string;
}

export function SectionNav({ slug }: SectionNavProps) {
  const pathname = usePathname();

  const isActive = (sectionId: string) => {
    const sectionPath = `/companies/${slug}/${sectionId}`;
    // メインページの場合はoverviewをアクティブに
    if (pathname === `/companies/${slug}` && sectionId === "overview") {
      return true;
    }
    return pathname === sectionPath;
  };

  return (
    <nav className="space-y-1">
      {sections.map(({ id, label }) => (
        <Link
          key={id}
          href={`/companies/${slug}/${id}`}
          scroll={false}
          className={`block px-4 py-2.5 text-sm transition-all rounded-lg ${
            isActive(id)
              ? "bg-primary text-primary-foreground font-medium"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
