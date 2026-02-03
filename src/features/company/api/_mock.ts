import {
  Company,
  CompanyListItem,
  RankingCompany,
} from "../types";
import fs from "fs";
import path from "path";

// CSVの行をパースする関数（ダブルクォート対応）
const parseCSVLine = (line: string): string[] => {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  values.push(current.trim());
  return values;
};

// 社名からslugを生成（英数字のみ、日本語はハッシュ化）
const generateSlug = (name: string, index: number): string => {
  // 株式会社を除去
  const cleanName = name.replace(/株式会社/g, "").trim();

  // 英数字のみを抽出
  const alphanumeric = cleanName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  // 英数字が3文字以上あればそれを使用、なければcompany-indexを使用
  if (alphanumeric.length >= 3) {
    return alphanumeric.slice(0, 30);
  }
  return `company-${index + 1}`;
};

// CSVから企業データを読み込む
const parseCompaniesFromCSV = (): Company[] => {
  try {
    const csvPath = path.join(
      process.cwd(),
      "src/features/company/api/_mock_companies_data.csv"
    );
    const fileContent = fs.readFileSync(csvPath, "utf-8");

    const lines = fileContent.trim().split("\n");
    const header = lines.shift();

    if (!header) {
      return [];
    }

    const companies: Company[] = lines.map((line, index) => {
      const v = parseCSVLine(line);

      return {
        id: `company-${index + 1}`,
        slug: generateSlug(v[0] || `company-${index + 1}`, index),

        // トップページ用
        topPage: {
          name: v[0] || "",
          averageSalary: v[1] || "",
          averageSalary30: v[2] || "",
        },

        // 基本情報
        basicInfo: {
          industry: v[3] || "",
          foundedDate: v[4] || "",
          capital: v[5] || "",
          employeeCount: v[6] || "",
        },

        // 給与・待遇（一覧用）
        compensation: {
          averageSalary: v[7] || "",
          averageSalary30: v[8] || "",
          initialSalaryUndergrad: v[9] || "",
          initialSalaryGrad: v[10] || "",
          housingAllowance: v[11] || "",
        },

        // 業績（一覧用）
        performance: {
          revenue: v[12] || "",
          revenuePerEmployee: v[13] || "",
          ordinaryProfit: v[14] || "",
          ordinaryProfitPerEmployee: v[15] || "",
          ordinaryProfitMargin: v[16] || "",
        },

        // 働き方（一覧用）
        workStyle: {
          averageAge: v[17] || "",
          averageTenure: v[18] || "",
          newGradHiring: v[19] || "",
          paidLeaveDays: v[20] || "",
          overtimeHours: v[21] || "",
          turnoverRate3Year: v[22] || "",
          femaleRatio: v[23] || "",
        },

        // 企業レポート
        report: {
          summary: v[24] || "",
          vision: v[25] || "",
          businessModel: v[26] || "",
          strengths: v[27] || "",
          competitors: v[28] || "",
          risks: v[29] || "",
          challenges: v[30] || "",
        },

        // 企業詳細：概要
        overview: {
          name: v[31] || "",
          headquarters: v[32] || "",
          foundedDate: v[33] || "",
          capital: v[34] || "",
          representative: v[35] || "",
          employeeCount: v[36] || "",
          revenue: v[37] || "",
          businessSummary: v[38] || "",
        },

        // 企業詳細：事業内容
        business: {
          overview: v[39] || "",
          segments: v[40] || "",
          productsServices: v[41] || "",
        },

        // 企業詳細：業績サマリー
        financials: {
          revenue: v[42] || "",
          grossProfit: v[43] || "",
          grossProfitMargin: v[44] || "",
          operatingProfit: v[45] || "",
          operatingProfitMargin: v[46] || "",
          ordinaryProfit: v[47] || "",
          ordinaryProfitMargin: v[48] || "",
          netProfit: v[49] || "",
          netProfitMargin: v[50] || "",
          employeeCount: v[51] || "",
          revenuePerEmployee: v[52] || "",
          ordinaryProfitPerEmployee: v[53] || "",
          totalAssets: v[54] || "",
          netAssets: v[55] || "",
          equityRatio: v[56] || "",
          roe: v[57] || "",
          fixedRatio: v[58] || "",
        },

        // 企業詳細：給与・待遇
        detailedCompensation: {
          averageSalary: v[59] || "",
          averageSalary30: v[60] || "",
          initialSalaryUndergrad: v[61] || "",
          initialSalaryGrad: v[62] || "",
          housingAllowance: v[63] || "",
        },

        // 企業詳細：働き方
        detailedWorkStyle: {
          averageAge: v[64] || "",
          averageTenure: v[65] || "",
          newGradHiring: v[66] || "",
          paidLeaveDays: v[67] || "",
          overtimeHours: v[68] || "",
          turnoverRate3Year: v[69] || "",
          femaleRatio: v[70] || "",
        },

        // 企業詳細：中長期経営戦略
        strategy: {
          managementPolicy: v[71] || "",
          longTermStrategy: v[72] || "",
          kpi: v[73] || "",
          businessEnvironment: v[74] || "",
          rAndD: v[75] || "",
        },

        created_at: new Date().toISOString(),
      };
    });

    return companies;
  } catch (error) {
    console.error("Error reading or parsing CSV for mock data:", error);
    return [];
  }
};

// 企業データをCompanyListItem形式に変換
const toListItem = (company: Company): CompanyListItem => {
  const salaryNum = parseInt(company.topPage.averageSalary.replace(/[^\d]/g, ""), 10);
  const hasHousingAllowance =
    company.compensation.housingAllowance &&
    !company.compensation.housingAllowance.includes("データ不足") &&
    !company.compensation.housingAllowance.includes("なし")
      ? true
      : false;

  const tags: string[] = [];
  if (salaryNum >= 1000) {
    tags.push("平均年収1000万↑");
  }
  if (hasHousingAllowance) {
    tags.push("家賃補助あり");
  }

  const employeeStr = company.basicInfo.employeeCount || "";
  const employeeMatch = employeeStr.match(/[\d,]+/);
  const employeeCount = employeeMatch
    ? parseInt(employeeMatch[0].replace(/,/g, ""), 10)
    : undefined;

  const foundedMatch = company.basicInfo.foundedDate?.match(/(\d{4})/);
  const foundedYear = foundedMatch ? parseInt(foundedMatch[1], 10) : undefined;

  return {
    id: company.id,
    name: company.topPage.name,
    slug: company.slug,
    description: company.report.summary?.slice(0, 200) || company.overview.businessSummary?.slice(0, 200) || "",
    industry: company.basicInfo.industry,
    logo_url: undefined,
    founded_year: foundedYear,
    employee_count: employeeCount,
    website_url: undefined,
    averageSalary: company.topPage.averageSalary,
    averageSalary30: company.topPage.averageSalary30,
    hasHousingAllowance,
    tags,
    created_at: company.created_at,
  };
};

// キャッシュ
let companiesCache: Company[] | null = null;

const getCompanies = (): Company[] => {
  if (!companiesCache) {
    companiesCache = parseCompaniesFromCSV();
  }
  return companiesCache;
};

// モック企業データ取得（全件）
export async function fetchMockCompanies(): Promise<Company[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getCompanies());
    }, 100);
  });
}

// モック企業データ取得（slug指定）
export async function fetchMockCompanyBySlug(
  slug: string
): Promise<Company | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const company = getCompanies().find((c) => c.slug === slug);
      resolve(company);
    }, 100);
  });
}

// 一覧用データ取得
export async function fetchMockCompanyListItems(): Promise<CompanyListItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getCompanies().map(toListItem));
    }, 100);
  });
}

// ランキングデータ取得
export async function fetchMockRankings(
  type: "average" | "30-average"
): Promise<RankingCompany[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const companies = getCompanies();
      const sorted = [...companies].sort((a, b) => {
        const salaryA =
          type === "average"
            ? parseInt(a.topPage.averageSalary.replace(/[^\d]/g, ""), 10) || 0
            : parseInt(a.topPage.averageSalary30.replace(/[^\d]/g, ""), 10) || 0;
        const salaryB =
          type === "average"
            ? parseInt(b.topPage.averageSalary.replace(/[^\d]/g, ""), 10) || 0
            : parseInt(b.topPage.averageSalary30.replace(/[^\d]/g, ""), 10) || 0;
        return salaryB - salaryA;
      });

      const rankings: RankingCompany[] = sorted.slice(0, 10).map((c, index) => {
        const salary =
          type === "average"
            ? parseInt(c.topPage.averageSalary.replace(/[^\d]/g, ""), 10) || 0
            : parseInt(c.topPage.averageSalary30.replace(/[^\d]/g, ""), 10) || 0;
        return {
          id: c.id,
          rank: index + 1,
          name: c.topPage.name,
          slug: c.slug,
          salary,
          salaryDisplay:
            type === "average"
              ? c.topPage.averageSalary
              : c.topPage.averageSalary30,
        };
      });

      resolve(rankings);
    }, 100);
  });
}

// 検索・フィルター用
export type CompanySearchParams = {
  query?: string;
  initialSalary400?: boolean; // 初年度年収400万以上
  salary30_800?: boolean; // 30歳平均年収800万以上
  salary30_1000?: boolean; // 30歳平均年収1000万以上
  hasHousingAllowance?: boolean; // 住宅補助あり
  employeeRange?: "0-499" | "500-999" | "1000-9999" | "10000+";
};

export async function searchMockCompanies(
  params: CompanySearchParams
): Promise<CompanyListItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let items = getCompanies().map(toListItem);

      // フリーテキスト検索
      if (params.query) {
        const q = params.query.toLowerCase();
        items = items.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.industry.toLowerCase().includes(q)
        );
      }

      // こだわり条件: 初年度年収400万以上
      if (params.initialSalary400) {
        items = items.filter((item) => {
          const company = getCompanies().find((c) => c.id === item.id);
          if (!company) return false;
          const salary = parseInt(
            company.compensation.initialSalaryUndergrad.replace(/[^\d]/g, ""),
            10
          );
          return salary >= 400000; // 月収40万 = 年収480万相当
        });
      }

      // こだわり条件: 30歳平均年収800万以上
      if (params.salary30_800) {
        items = items.filter((item) => {
          const salary = parseInt(
            (item.averageSalary30 || "").replace(/[^\d]/g, ""),
            10
          );
          return salary >= 800;
        });
      }

      // こだわり条件: 30歳平均年収1000万以上
      if (params.salary30_1000) {
        items = items.filter((item) => {
          const salary = parseInt(
            (item.averageSalary30 || "").replace(/[^\d]/g, ""),
            10
          );
          return salary >= 1000;
        });
      }

      // こだわり条件: 住宅補助あり
      if (params.hasHousingAllowance) {
        items = items.filter((item) => item.hasHousingAllowance);
      }

      // 従業員数フィルター
      if (params.employeeRange) {
        items = items.filter((item) => {
          const count = item.employee_count || 0;
          switch (params.employeeRange) {
            case "0-499":
              return count < 500;
            case "500-999":
              return count >= 500 && count < 1000;
            case "1000-9999":
              return count >= 1000 && count < 10000;
            case "10000+":
              return count >= 10000;
            default:
              return true;
          }
        });
      }

      resolve(items);
    }, 100);
  });
}

// 比較用企業データ取得
export async function fetchMockCompaniesForComparison(
  ids: string[]
): Promise<Company[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const companies = getCompanies().filter((c) => ids.includes(c.id));
      resolve(companies);
    }, 100);
  });
}
