import { Company } from "../types";

const companies: Company[] = [
  {
    id: "company-1",
    name: "リアクティブソリューションズ",
    slug: "reactive-solutions",
    description:
      "高速なWebアプリケーション開発とコンサルティングを提供しています。モダンな技術スタックを駆使し、顧客のビジネス課題を解決します。",
    industry: "ソフトウェア開発",
    logo_url: "/office.png",
    founded_year: 2018,
    employee_count: 50,
    website_url: "https://reactive.example.com",
    created_at: "2024-01-20T10:00:00Z",
  },
  {
    id: "company-2",
    name: "イノベーションラボ",
    slug: "innovation-lab",
    description:
      "AIと機械学習を活用した次世代ソリューションの研究開発を行っています。データ駆動型のアプローチで社会に貢献します。",
    industry: "AI/機械学習",
    logo_url: "/office.png",
    founded_year: 2020,
    employee_count: 30,
    website_url: "https://innovation.example.com",
    created_at: "2024-01-18T14:30:00Z",
  },
  {
    id: "company-3",
    name: "クラウドワークス",
    slug: "cloud-works",
    description:
      "クラウドネイティブなインフラ構築と運用を専門としています。ScalableでResilientなシステムを設計・実装します。",
    industry: "クラウドインフラ",
    logo_url: "/office.png",
    founded_year: 2015,
    employee_count: 100,
    website_url: "https://cloudworks.example.com",
    created_at: "2024-01-15T09:00:00Z",
  },
];

export async function fetchMockCompanies(
  slug?: string,
): Promise<Company | Company[] | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (slug) {
        const company = companies.find((c) => c.slug === slug);
        resolve(company);
      } else {
        resolve(companies);
      }
    }, 500);
  });
}
