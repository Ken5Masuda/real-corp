import { createClient } from "@/lib/supabase/server";
import { Company, CompanyListItem, RankingCompany } from "../types";
import {
  fetchMockCompanies,
  fetchMockCompanyBySlug,
  fetchMockCompanyListItems,
  fetchMockRankings,
  searchMockCompanies,
  fetchMockCompaniesForComparison,
  CompanySearchParams,
} from "./_mock";

/**
 * 全ての企業データを取得する関数
 */
export async function getAllCompanies(): Promise<Company[]> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_API === "true") {
    return fetchMockCompanies();
  }

  // Supabase実装（将来用）
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all companies:", error);
    return [];
  }
  return data as Company[];
}

/**
 * スラッグに基づいて単一の企業データを取得する関数
 * @param slug - 取得する企業のスラッグ
 */
export async function getCompanyBySlug(
  slug: string
): Promise<Company | undefined> {
  console.log(`[DEBUG] getCompanyBySlug: slug = ${slug}`);
  console.log(
    `[DEBUG] NEXT_PUBLIC_USE_MOCK_API = ${process.env.NEXT_PUBLIC_USE_MOCK_API}`
  );

  if (process.env.NEXT_PUBLIC_USE_MOCK_API === "true") {
    const data = await fetchMockCompanyBySlug(slug);
    console.log(`[DEBUG] Mock data for slug "${slug}":`, data ? "found" : "not found");
    return data;
  }

  // Supabase実装（将来用）
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(
      `[DEBUG] Supabase error fetching company by slug "${slug}":`,
      error
    );
    return undefined;
  }
  console.log(`[DEBUG] Supabase data for slug "${slug}":`, data);
  return data as Company;
}

/**
 * 一覧表示用の企業データを取得
 */
export async function getCompanyListItems(): Promise<CompanyListItem[]> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_API === "true") {
    return fetchMockCompanyListItems();
  }

  // Supabase実装（将来用）
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching company list:", error);
    return [];
  }
  return data as CompanyListItem[];
}

/**
 * ランキングデータを取得
 */
export async function getRankings(
  type: "average" | "30-average"
): Promise<RankingCompany[]> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_API === "true") {
    return fetchMockRankings(type);
  }

  // Supabase実装（将来用）
  const supabase = await createClient();
  const orderColumn = type === "average" ? "average_salary" : "average_salary_30";
  const { data, error } = await supabase
    .from("companies")
    .select("id, name, slug, average_salary, average_salary_30")
    .order(orderColumn, { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching rankings:", error);
    return [];
  }

  return (data || []).map((item, index) => ({
    id: item.id,
    rank: index + 1,
    name: item.name,
    slug: item.slug,
    salary: type === "average" ? item.average_salary : item.average_salary_30,
    salaryDisplay: `${type === "average" ? item.average_salary : item.average_salary_30}万円`,
  }));
}

/**
 * 企業検索
 */
export async function searchCompanies(
  params: CompanySearchParams
): Promise<CompanyListItem[]> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_API === "true") {
    return searchMockCompanies(params);
  }

  // Supabase実装（将来用）- 基本的なテキスト検索のみ
  const supabase = await createClient();
  let query = supabase.from("companies").select("*");

  if (params.query) {
    query = query.or(
      `name.ilike.%${params.query}%,description.ilike.%${params.query}%,industry.ilike.%${params.query}%`
    );
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    console.error("Error searching companies:", error);
    return [];
  }
  return data as CompanyListItem[];
}

/**
 * 比較用の企業データを取得
 */
export async function getCompaniesForComparison(
  ids: string[]
): Promise<Company[]> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_API === "true") {
    return fetchMockCompaniesForComparison(ids);
  }

  // Supabase実装（将来用）
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .in("id", ids);

  if (error) {
    console.error("Error fetching companies for comparison:", error);
    return [];
  }
  return data as Company[];
}

// 型の再エクスポート
export type { CompanySearchParams };
