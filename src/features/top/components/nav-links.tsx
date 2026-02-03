"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "ホーム" },
  { href: "/companies", label: "企業を探す" },
  { href: "/compare", label: "企業比較" },
  { href: "/es", label: "ES・体験記" },
];

export function NavLinks() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm font-medium transition-colors ${
            isActive(item.href)
              ? "text-primary border-b-2 border-primary pb-1"
              : "text-foreground hover:text-primary"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
