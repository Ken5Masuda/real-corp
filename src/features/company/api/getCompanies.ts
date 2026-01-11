import { createClient } from "@/lib/supabase/server";
import { Company } from "../types";
import { fetchMockCompanies } from "./_mock";

/**
 * 全ての企業データを取得する関数
 */
export async function getAllCompanies(): Promise<Company[]> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_API === "true") {
    const data = await fetchMockCompanies();
    return Array.isArray(data) ? data : [];
  }

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
  slug: string,
): Promise<Company | undefined> {
  console.log(`[DEBUG] getCompanyBySlug: slug = ${slug}`);
  console.log(`[DEBUG] NEXT_PUBLIC_USE_MOCK_API = ${process.env.NEXT_PUBLIC_USE_MOCK_API}`);

  if (process.env.NEXT_PUBLIC_USE_MOCK_API === "true") {
    const data = await fetchMockCompanies(slug);
    console.log(`[DEBUG] Mock data for slug "${slug}":`, data);
    return !Array.isArray(data) ? data : undefined;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`[DEBUG] Supabase error fetching company by slug "${slug}":`, error);
    return undefined;
  }
  console.log(`[DEBUG] Supabase data for slug "${slug}":`, data);
  return data as Company;
}
