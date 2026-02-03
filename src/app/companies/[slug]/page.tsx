import { redirect } from "next/navigation";

interface CompanyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CompanyDetailPage({
  params,
}: CompanyDetailPageProps) {
  const resolvedParams = await params;
  // メインページは会社概要ページにリダイレクト
  redirect(`/companies/${resolvedParams.slug}/overview`);
}
