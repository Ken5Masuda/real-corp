/**
 * CSV to Supabase Import Script
 *
 * Usage:
 * 1. Set NEXT_PUBLIC_USE_MOCK_API=false in .env.local
 * 2. Run: npx ts-node scripts/import-csv.ts
 *    Or: npx tsx scripts/import-csv.ts
 *
 * Note: Requires the schema to be already created in Supabase
 */

import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";

// Load environment variables
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// CSV column mappings (Japanese headers → field names)
const COLUMN_MAP = {
  // Top Page
  "【学生サービスページトップ】社名": "topName",
  "【学生サービスページトップ】平均年収": "topAverageSalary",
  "【学生サービスページトップ】30歳平均年収": "topAverageSalary30",

  // Basic Info
  "【基本情報】業種": "industry",
  "【基本情報】設立年月日": "foundedDate",
  "【基本情報】資本金": "capital",
  "【基本情報】従業員数": "employeeCount",

  // Compensation (Basic)
  "【給与・待遇】平均年収": "avgSalary",
  "【給与・待遇】平均年収（30歳）": "avgSalary30",
  "【給与・待遇】初任給（月、大卒）": "initialSalaryUndergrad",
  "【給与・待遇】初任給（月、院卒）": "initialSalaryGrad",
  "【給与・待遇】住宅補助": "housingAllowance",

  // Performance (Basic)
  "【業績】売上高": "revenue",
  "【業績】一人あたり売上高": "revenuePerEmployee",
  "【業績】経常利益額": "ordinaryProfit",
  "【業績】一人あたり経常利益額": "ordinaryProfitPerEmployee",
  "【業績】経常利益率": "ordinaryProfitMargin",

  // Work Style (Basic)
  "【働き方】平均年齢": "averageAge",
  "【働き方】平均勤続年数": "averageTenure",
  "【働き方】新卒採用人数（予定）": "newGradHiring",
  "【働き方】有給休暇の平均取得日数": "paidLeaveDays",
  "【働き方】残業時間（月）": "overtimeHours",
  "【働き方】3年後離職率": "turnoverRate3Year",
  "【働き方】女性比率": "femaleRatio",

  // Report
  "【企業詳細：企業レポート】企業の特徴サマリ": "reportSummary",
  "【企業詳細：企業レポート】経営理念（ミッション、ビジョン）": "reportVision",
  "【企業詳細：企業レポート】ビジネスモデル（誰に何をどのように提供しているか）":
    "reportBusinessModel",
  "【企業詳細：企業レポート】特長・強み": "reportStrengths",
  "【企業詳細：企業レポート】競合・市場環境": "reportCompetitors",
  "【企業詳細：企業レポート】事業のリスク": "reportRisks",
  "【企業詳細：企業レポート】事業課題": "reportChallenges",

  // Company Overview
  "【企業詳細：概要】社名": "companyName",
  "【企業詳細：概要】本社所在地": "headquarters",
  "【企業詳細：概要】設立年月日": "detailFoundedDate",
  "【企業詳細：概要】資本金": "detailCapital",
  "【企業詳細：概要】代表者": "representative",
  "【企業詳細：概要】従業員数": "detailEmployeeCount",
  "【企業詳細：概要】売上高": "detailRevenue",
  "【企業詳細：概要】事業概要": "businessOverview",

  // Business
  "【企業詳細：事業内容】事業概要": "businessOverviewDetail",
  "【企業詳細：事業内容】事業セグメント情報": "businessSegments",
  "【企業詳細：事業内容】商品・サービス": "businessProductsServices",

  // Financial Summary
  "【企業詳細：業績サマリー】売上高": "financialRevenue",
  "【企業詳細：業績サマリー】売上総利益額": "grossProfit",
  "【企業詳細：業績サマリー】売上総利益率": "grossProfitMargin",
  "【企業詳細：業績サマリー】営業利益額": "operatingProfit",
  "【企業詳細：業績サマリー】営業利益率": "operatingProfitMargin",
  "【企業詳細：業績サマリー】経常利益額": "financialOrdinaryProfit",
  "【企業詳細：業績サマリー】経常利益率": "financialOrdinaryProfitMargin",
  "【企業詳細：業績サマリー】当期純利益額": "netProfit",
  "【企業詳細：業績サマリー】当期純利益率": "netProfitMargin",
  "【企業詳細：業績サマリー】従業員数": "financialEmployeeCount",
  "【企業詳細：業績サマリー】従業員一人当たり売上高":
    "financialRevenuePerEmployee",
  "【企業詳細：業績サマリー】従業員一人当たり経常利益額":
    "financialOrdinaryProfitPerEmployee",
  "【企業詳細：業績サマリー】総資産": "totalAssets",
  "【企業詳細：業績サマリー】純資産": "netAssets",
  "【企業詳細：業績サマリー】自己資本比率": "equityRatio",
  "【企業詳細：業績サマリー】ROE": "roe",
  "【企業詳細：業績サマリー】固定比率": "fixedRatio",

  // Detailed Compensation
  "【企業詳細：給与・待遇】平均年収（単位：万円。千円の位を四捨五入）":
    "detailAvgSalary",
  "【企業詳細：給与・待遇】30歳平均年収（単位：万円。千円の位を四捨五入）":
    "detailAvgSalary30",
  "【企業詳細：給与・待遇】初任給（月・大卒）": "detailInitialSalaryUndergrad",
  "【企業詳細：給与・待遇】初任給（月・院卒）": "detailInitialSalaryGrad",
  "【企業詳細：給与・待遇】住宅補助額": "detailHousingAllowance",

  // Detailed Work Style
  "【企業詳細：働き方】平均年齢": "detailAverageAge",
  "【企業詳細：働き方】平均勤続年数": "detailAverageTenure",
  "【企業詳細：働き方】新卒採用人数（予定）": "detailNewGradHiring",
  "【企業詳細：働き方】有給休暇の平均取得年数": "detailPaidLeaveDays",
  "【企業詳細：働き方】残業時間（月）": "detailOvertimeHours",
  "【企業詳細：働き方】３年後離職率": "detailTurnoverRate3Year",
  "【企業詳細：働き方】女性比率": "detailFemaleRatio",

  // Strategy
  "【企業詳細：中長期経営戦略】経営方針": "strategyManagementPolicy",
  "【企業詳細：中長期経営戦略】中長期経営戦略": "strategyLongTerm",
  "【企業詳細：中長期経営戦略】経営状況を判断する客観的指標": "strategyKpi",
  "【企業詳細：中長期経営戦略】経営環境": "strategyBusinessEnvironment",
  "【企業詳細：中長期経営戦略】研究開発（新規事業含む）": "strategyRAndD",
};

// Generate URL-safe slug from company name
function generateSlug(name: string): string {
  // Remove common suffixes and clean up
  let slug = name
    .replace(/株式会社/g, "")
    .replace(/（株）/g, "")
    .replace(/\(株\)/g, "")
    .replace(/有限会社/g, "")
    .replace(/合同会社/g, "")
    .trim();

  // For Japanese names, use a hash-based approach or romanization
  // Simple approach: use the name as-is with URL encoding
  // Better approach: use a romanization library

  // For now, create a simple slug from the name
  // Replace spaces and special characters
  slug = slug
    .toLowerCase()
    .replace(/[\s　]+/g, "-")
    .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3400-\u4DBF-]/g, "");

  // If slug is empty or only contains special chars, use timestamp
  if (!slug) {
    slug = `company-${Date.now()}`;
  }

  return slug;
}

// Parse CSV row to mapped object
function parseRow(
  row: Record<string, string>
): Record<string, string | undefined> {
  const result: Record<string, string | undefined> = {};

  for (const [csvHeader, fieldName] of Object.entries(COLUMN_MAP)) {
    const value = row[csvHeader];
    result[fieldName] =
      value && value !== "データ不足" && value.trim() !== ""
        ? value.trim()
        : undefined;
  }

  return result;
}

async function importData() {
  console.log("Starting CSV import...\n");

  // Read CSV file
  const csvPath = path.join(
    __dirname,
    "../src/features/company/api/_mock_companies_data.csv"
  );

  if (!fs.existsSync(csvPath)) {
    console.error(`CSV file not found: ${csvPath}`);
    process.exit(1);
  }

  const csvContent = fs.readFileSync(csvPath, "utf-8");
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    bom: true,
  });

  console.log(`Found ${records.length} companies to import\n`);

  // Track used slugs to avoid duplicates
  const usedSlugs = new Set<string>();

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < records.length; i++) {
    const row = records[i];
    const parsed = parseRow(row);

    // Get company name (prefer detail name, fallback to top name)
    const companyName = parsed.companyName || parsed.topName;

    if (!companyName) {
      console.log(`Row ${i + 1}: Skipping - no company name`);
      errorCount++;
      continue;
    }

    // Generate unique slug
    let slug = generateSlug(companyName);
    let slugSuffix = 1;
    while (usedSlugs.has(slug)) {
      slug = `${generateSlug(companyName)}-${slugSuffix}`;
      slugSuffix++;
    }
    usedSlugs.add(slug);

    try {
      // 1. Insert company
      const { data: company, error: companyError } = await supabase
        .from("companies")
        .insert({
          slug,
          name: companyName,
          industry: parsed.industry,
          founded_date: parsed.detailFoundedDate || parsed.foundedDate,
          capital: parsed.detailCapital || parsed.capital,
          headquarters: parsed.headquarters,
          representative: parsed.representative,
          employee_count: parsed.detailEmployeeCount || parsed.employeeCount,
          revenue: parsed.detailRevenue || parsed.revenue,
          business_overview: parsed.businessOverview,
        })
        .select("id")
        .single();

      if (companyError) {
        console.error(
          `Row ${i + 1} (${companyName}): Company insert error:`,
          companyError.message
        );
        errorCount++;
        continue;
      }

      const companyId = company.id;

      // 2. Insert compensation
      await supabase.from("company_compensation").insert({
        company_id: companyId,
        top_average_salary: parsed.topAverageSalary,
        top_average_salary_30: parsed.topAverageSalary30,
        average_salary: parsed.detailAvgSalary || parsed.avgSalary,
        average_salary_30: parsed.detailAvgSalary30 || parsed.avgSalary30,
        initial_salary_undergrad:
          parsed.detailInitialSalaryUndergrad || parsed.initialSalaryUndergrad,
        initial_salary_grad:
          parsed.detailInitialSalaryGrad || parsed.initialSalaryGrad,
        housing_allowance:
          parsed.detailHousingAllowance || parsed.housingAllowance,
        has_housing_allowance: !!(
          parsed.detailHousingAllowance || parsed.housingAllowance
        ),
      });

      // 3. Insert work style
      await supabase.from("company_work_style").insert({
        company_id: companyId,
        average_age: parsed.detailAverageAge || parsed.averageAge,
        average_tenure: parsed.detailAverageTenure || parsed.averageTenure,
        new_grad_hiring: parsed.detailNewGradHiring || parsed.newGradHiring,
        paid_leave_days: parsed.detailPaidLeaveDays || parsed.paidLeaveDays,
        overtime_hours: parsed.detailOvertimeHours || parsed.overtimeHours,
        turnover_rate_3year:
          parsed.detailTurnoverRate3Year || parsed.turnoverRate3Year,
        female_ratio: parsed.detailFemaleRatio || parsed.femaleRatio,
      });

      // 4. Insert financials
      await supabase.from("company_financials").insert({
        company_id: companyId,
        revenue: parsed.financialRevenue || parsed.revenue,
        revenue_per_employee:
          parsed.financialRevenuePerEmployee || parsed.revenuePerEmployee,
        gross_profit: parsed.grossProfit,
        gross_profit_margin: parsed.grossProfitMargin,
        operating_profit: parsed.operatingProfit,
        operating_profit_margin: parsed.operatingProfitMargin,
        ordinary_profit:
          parsed.financialOrdinaryProfit || parsed.ordinaryProfit,
        ordinary_profit_margin:
          parsed.financialOrdinaryProfitMargin || parsed.ordinaryProfitMargin,
        net_profit: parsed.netProfit,
        net_profit_margin: parsed.netProfitMargin,
        total_assets: parsed.totalAssets,
        net_assets: parsed.netAssets,
        equity_ratio: parsed.equityRatio,
        roe: parsed.roe,
        fixed_ratio: parsed.fixedRatio,
        ordinary_profit_per_employee:
          parsed.financialOrdinaryProfitPerEmployee ||
          parsed.ordinaryProfitPerEmployee,
        employee_count: parsed.financialEmployeeCount || parsed.employeeCount,
      });

      // 5. Insert reports
      await supabase.from("company_reports").insert({
        company_id: companyId,
        summary: parsed.reportSummary,
        vision: parsed.reportVision,
        business_model: parsed.reportBusinessModel,
        strengths: parsed.reportStrengths,
        competitors: parsed.reportCompetitors,
        risks: parsed.reportRisks,
        challenges: parsed.reportChallenges,
      });

      // 6. Insert business
      await supabase.from("company_business").insert({
        company_id: companyId,
        overview: parsed.businessOverviewDetail || parsed.businessOverview,
        segments: parsed.businessSegments,
        products_services: parsed.businessProductsServices,
      });

      // 7. Insert strategy
      await supabase.from("company_strategy").insert({
        company_id: companyId,
        management_policy: parsed.strategyManagementPolicy,
        long_term_strategy: parsed.strategyLongTerm,
        kpi: parsed.strategyKpi,
        business_environment: parsed.strategyBusinessEnvironment,
        r_and_d: parsed.strategyRAndD,
      });

      successCount++;
      console.log(`✓ ${i + 1}/${records.length}: ${companyName} (${slug})`);
    } catch (error) {
      console.error(`Row ${i + 1} (${companyName}): Error:`, error);
      errorCount++;
    }
  }

  console.log("\n=== Import Complete ===");
  console.log(`Success: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Total: ${records.length}`);
}

// Run import
importData().catch(console.error);
