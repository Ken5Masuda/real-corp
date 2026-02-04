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

// Helper: Supabaseの正規化データをCompany型に変換
function transformSupabaseToCompany(data: SupabaseCompanyFullData): Company {
  return {
    id: data.id,
    slug: data.slug,
    topPage: {
      name: data.name || "",
      averageSalary: data.top_average_salary || data.average_salary || "-",
      averageSalary30: data.top_average_salary_30 || data.average_salary_30 || "-",
    },
    basicInfo: {
      industry: data.industry || "-",
      foundedDate: data.founded_date || "-",
      capital: data.capital || "-",
      employeeCount: data.employee_count || "-",
    },
    compensation: {
      averageSalary: data.average_salary || "-",
      averageSalary30: data.average_salary_30 || "-",
      initialSalaryUndergrad: data.initial_salary_undergrad || "-",
      initialSalaryGrad: data.initial_salary_grad || "-",
      housingAllowance: data.housing_allowance || "-",
    },
    performance: {
      revenue: data.financial_revenue || data.revenue || "-",
      revenuePerEmployee: data.revenue_per_employee || "-",
      ordinaryProfit: data.ordinary_profit || "-",
      ordinaryProfitPerEmployee: data.ordinary_profit_per_employee || "-",
      ordinaryProfitMargin: data.ordinary_profit_margin || "-",
    },
    workStyle: {
      averageAge: data.average_age || "-",
      averageTenure: data.average_tenure || "-",
      newGradHiring: data.new_grad_hiring || "-",
      paidLeaveDays: data.paid_leave_days || "-",
      overtimeHours: data.overtime_hours || "-",
      turnoverRate3Year: data.turnover_rate_3year || "-",
      femaleRatio: data.female_ratio || "-",
    },
    report: {
      summary: data.report_summary || "",
      vision: data.report_vision || "",
      businessModel: data.report_business_model || "",
      strengths: data.report_strengths || "",
      competitors: data.report_competitors || "",
      risks: data.report_risks || "",
      challenges: data.report_challenges || "",
    },
    overview: {
      name: data.name || "",
      headquarters: data.headquarters || "-",
      foundedDate: data.founded_date || "-",
      capital: data.capital || "-",
      representative: data.representative || "-",
      employeeCount: data.employee_count || "-",
      revenue: data.revenue || "-",
      businessSummary: data.business_overview || "",
    },
    business: {
      overview: data.business_overview_detail || data.business_overview || "",
      segments: data.business_segments || "",
      productsServices: data.business_products_services || "",
    },
    financials: {
      revenue: data.financial_revenue || data.revenue || "-",
      grossProfit: data.gross_profit || "-",
      grossProfitMargin: data.gross_profit_margin || "-",
      operatingProfit: data.operating_profit || "-",
      operatingProfitMargin: data.operating_profit_margin || "-",
      ordinaryProfit: data.ordinary_profit || "-",
      ordinaryProfitMargin: data.ordinary_profit_margin || "-",
      netProfit: data.net_profit || "-",
      netProfitMargin: data.net_profit_margin || "-",
      employeeCount: data.employee_count || "-",
      revenuePerEmployee: data.revenue_per_employee || "-",
      ordinaryProfitPerEmployee: data.ordinary_profit_per_employee || "-",
      totalAssets: data.total_assets || "-",
      netAssets: data.net_assets || "-",
      equityRatio: data.equity_ratio || "-",
      roe: data.roe || "-",
      fixedRatio: data.fixed_ratio || "-",
    },
    detailedCompensation: {
      averageSalary: data.average_salary || "-",
      averageSalary30: data.average_salary_30 || "-",
      initialSalaryUndergrad: data.initial_salary_undergrad || "-",
      initialSalaryGrad: data.initial_salary_grad || "-",
      housingAllowance: data.housing_allowance || "-",
    },
    detailedWorkStyle: {
      averageAge: data.average_age || "-",
      averageTenure: data.average_tenure || "-",
      newGradHiring: data.new_grad_hiring || "-",
      paidLeaveDays: data.paid_leave_days || "-",
      overtimeHours: data.overtime_hours || "-",
      turnoverRate3Year: data.turnover_rate_3year || "-",
      femaleRatio: data.female_ratio || "-",
    },
    strategy: {
      managementPolicy: data.strategy_management_policy || "",
      longTermStrategy: data.strategy_long_term || "",
      kpi: data.strategy_kpi || "",
      businessEnvironment: data.strategy_business_environment || "",
      rAndD: data.strategy_r_and_d || "",
    },
    created_at: data.created_at || new Date().toISOString(),
  };
}

// Supabase company_full_info ビューの型
type SupabaseCompanyFullData = {
  id: string;
  slug: string;
  name: string;
  industry?: string;
  founded_date?: string;
  capital?: string;
  headquarters?: string;
  representative?: string;
  employee_count?: string;
  revenue?: string;
  business_overview?: string;
  created_at?: string;
  updated_at?: string;
  // compensation
  top_average_salary?: string;
  top_average_salary_30?: string;
  average_salary?: string;
  average_salary_30?: string;
  initial_salary_undergrad?: string;
  initial_salary_grad?: string;
  housing_allowance?: string;
  has_housing_allowance?: boolean;
  // work_style
  average_age?: string;
  average_tenure?: string;
  new_grad_hiring?: string;
  paid_leave_days?: string;
  overtime_hours?: string;
  turnover_rate_3year?: string;
  female_ratio?: string;
  // financials
  financial_revenue?: string;
  revenue_per_employee?: string;
  gross_profit?: string;
  gross_profit_margin?: string;
  operating_profit?: string;
  operating_profit_margin?: string;
  ordinary_profit?: string;
  ordinary_profit_margin?: string;
  net_profit?: string;
  net_profit_margin?: string;
  total_assets?: string;
  net_assets?: string;
  equity_ratio?: string;
  roe?: string;
  fixed_ratio?: string;
  ordinary_profit_per_employee?: string;
  // reports
  report_summary?: string;
  report_vision?: string;
  report_business_model?: string;
  report_strengths?: string;
  report_competitors?: string;
  report_risks?: string;
  report_challenges?: string;
  // business
  business_overview_detail?: string;
  business_segments?: string;
  business_products_services?: string;
  // strategy
  strategy_management_policy?: string;
  strategy_long_term?: string;
  strategy_kpi?: string;
  strategy_business_environment?: string;
  strategy_r_and_d?: string;
};

/**
 * 全ての企業データを取得する関数
 */
export async function getAllCompanies(): Promise<Company[]> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_API === "true") {
    return fetchMockCompanies();
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("company_full_info")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all companies:", error);
    return [];
  }

  return (data || []).map(transformSupabaseToCompany);
}

/**
 * スラッグに基づいて単一の企業データを取得する関数
 * @param slug - 取得する企業のスラッグ
 */
export async function getCompanyBySlug(
  slug: string
): Promise<Company | undefined> {
  // URLエンコードされたスラッグをデコード
  const decodedSlug = decodeURIComponent(slug);
  console.log(`[DEBUG] getCompanyBySlug: slug = ${slug}, decoded = ${decodedSlug}`);
  console.log(
    `[DEBUG] NEXT_PUBLIC_USE_MOCK_API = ${process.env.NEXT_PUBLIC_USE_MOCK_API}`
  );

  if (process.env.NEXT_PUBLIC_USE_MOCK_API === "true") {
    const data = await fetchMockCompanyBySlug(decodedSlug);
    console.log(`[DEBUG] Mock data for slug "${decodedSlug}":`, data ? "found" : "not found");
    return data;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("company_full_info")
    .select("*")
    .eq("slug", decodedSlug)
    .single();

  if (error) {
    console.error(
      `[DEBUG] Supabase error fetching company by slug "${slug}":`,
      error
    );
    return undefined;
  }

  console.log(`[DEBUG] Supabase data for slug "${slug}":`, data ? "found" : "not found");
  return transformSupabaseToCompany(data);
}

/**
 * 一覧表示用の企業データを取得
 */
export async function getCompanyListItems(): Promise<CompanyListItem[]> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_API === "true") {
    return fetchMockCompanyListItems();
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("company_full_info")
    .select("id, slug, name, industry, business_overview, average_salary, average_salary_30, has_housing_allowance, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching company list:", error);
    return [];
  }

  return (data || []).map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    description: item.business_overview || "",
    industry: item.industry || "-",
    averageSalary: item.average_salary,
    averageSalary30: item.average_salary_30,
    hasHousingAllowance: item.has_housing_allowance,
    created_at: item.created_at || new Date().toISOString(),
  }));
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

  const supabase = await createClient();

  // company_full_info ビューから取得し、給与でソート
  const salaryColumn = type === "average" ? "top_average_salary" : "top_average_salary_30";

  const { data, error } = await supabase
    .from("company_full_info")
    .select("id, name, slug, top_average_salary, top_average_salary_30")
    .not(salaryColumn, "is", null)
    .order(salaryColumn, { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching rankings:", error);
    return [];
  }

  return (data || []).map((item, index) => {
    const salaryStr = type === "average" ? item.top_average_salary : item.top_average_salary_30;
    // 給与文字列から数値を抽出（例: "1249万円" → 1249）
    const salaryMatch = salaryStr?.match(/[\d.]+/);
    const salaryNum = salaryMatch ? parseFloat(salaryMatch[0]) : 0;

    return {
      id: item.id,
      rank: index + 1,
      name: item.name,
      slug: item.slug,
      salary: salaryNum,
      salaryDisplay: salaryStr || "-",
    };
  });
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

  const supabase = await createClient();
  let query = supabase
    .from("company_full_info")
    .select("id, slug, name, industry, business_overview, average_salary, average_salary_30, has_housing_allowance, created_at");

  if (params.query) {
    query = query.or(
      `name.ilike.%${params.query}%,business_overview.ilike.%${params.query}%,industry.ilike.%${params.query}%`
    );
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    console.error("Error searching companies:", error);
    return [];
  }

  return (data || []).map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    description: item.business_overview || "",
    industry: item.industry || "-",
    averageSalary: item.average_salary,
    averageSalary30: item.average_salary_30,
    hasHousingAllowance: item.has_housing_allowance,
    created_at: item.created_at || new Date().toISOString(),
  }));
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

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("company_full_info")
    .select("*")
    .in("id", ids);

  if (error) {
    console.error("Error fetching companies for comparison:", error);
    return [];
  }

  return (data || []).map(transformSupabaseToCompany);
}

// 型の再エクスポート
export type { CompanySearchParams };
