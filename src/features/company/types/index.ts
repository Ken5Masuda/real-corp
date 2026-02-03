/**
 * 企業情報の型定義
 */

// 学生サービスページトップ用の基本情報
export type CompanyTopPageInfo = {
  name: string; // 社名
  averageSalary: string; // 平均年収
  averageSalary30: string; // 30歳平均年収
};

// 基本情報
export type CompanyBasicInfo = {
  industry: string; // 業種
  foundedDate: string; // 設立年月日
  capital: string; // 資本金
  employeeCount: string; // 従業員数
};

// 給与・待遇
export type CompanyCompensation = {
  averageSalary: string; // 平均年収
  averageSalary30: string; // 平均年収（30歳）
  initialSalaryUndergrad: string; // 初任給（月、大卒）
  initialSalaryGrad: string; // 初任給（月、院卒）
  housingAllowance: string; // 住宅補助
};

// 業績
export type CompanyPerformance = {
  revenue: string; // 売上高
  revenuePerEmployee: string; // 一人あたり売上高
  ordinaryProfit: string; // 経常利益額
  ordinaryProfitPerEmployee: string; // 一人あたり経常利益額
  ordinaryProfitMargin: string; // 経常利益率
};

// 働き方
export type CompanyWorkStyle = {
  averageAge: string; // 平均年齢
  averageTenure: string; // 平均勤続年数
  newGradHiring: string; // 新卒採用人数（予定）
  paidLeaveDays: string; // 有給休暇の平均取得日数
  overtimeHours: string; // 残業時間（月）
  turnoverRate3Year: string; // 3年後離職率
  femaleRatio: string; // 女性比率
};

// 企業レポート
export type CompanyReport = {
  summary: string; // 企業の特徴サマリ
  vision: string; // 経営理念（ミッション、ビジョン）
  businessModel: string; // ビジネスモデル
  strengths: string; // 特長・強み
  competitors: string; // 競合・市場環境
  risks: string; // 事業のリスク
  challenges: string; // 事業課題
};

// 企業詳細：概要
export type CompanyOverview = {
  name: string; // 社名
  headquarters: string; // 本社所在地
  foundedDate: string; // 設立年月日
  capital: string; // 資本金
  representative: string; // 代表者
  employeeCount: string; // 従業員数
  revenue: string; // 売上高
  businessSummary: string; // 事業概要
};

// 企業詳細：事業内容
export type CompanyBusiness = {
  overview: string; // 事業概要
  segments: string; // 事業セグメント情報
  productsServices: string; // 商品・サービス
};

// 企業詳細：業績サマリー
export type CompanyFinancials = {
  revenue: string; // 売上高
  grossProfit: string; // 売上総利益額
  grossProfitMargin: string; // 売上総利益率
  operatingProfit: string; // 営業利益額
  operatingProfitMargin: string; // 営業利益率
  ordinaryProfit: string; // 経常利益額
  ordinaryProfitMargin: string; // 経常利益率
  netProfit: string; // 当期純利益額
  netProfitMargin: string; // 当期純利益率
  employeeCount: string; // 従業員数
  revenuePerEmployee: string; // 従業員一人当たり売上高
  ordinaryProfitPerEmployee: string; // 従業員一人当たり経常利益額
  totalAssets: string; // 総資産
  netAssets: string; // 純資産
  equityRatio: string; // 自己資本比率
  roe: string; // ROE
  fixedRatio: string; // 固定比率
};

// 企業詳細：給与・待遇
export type CompanyDetailedCompensation = {
  averageSalary: string; // 平均年収
  averageSalary30: string; // 30歳平均年収
  initialSalaryUndergrad: string; // 初任給（月・大卒）
  initialSalaryGrad: string; // 初任給（月・院卒）
  housingAllowance: string; // 住宅補助額
};

// 企業詳細：働き方
export type CompanyDetailedWorkStyle = {
  averageAge: string; // 平均年齢
  averageTenure: string; // 平均勤続年数
  newGradHiring: string; // 新卒採用人数（予定）
  paidLeaveDays: string; // 有給休暇の平均取得年数
  overtimeHours: string; // 残業時間（月）
  turnoverRate3Year: string; // ３年後離職率
  femaleRatio: string; // 女性比率
};

// 企業詳細：中長期経営戦略
export type CompanyStrategy = {
  managementPolicy: string; // 経営方針
  longTermStrategy: string; // 中長期経営戦略
  kpi: string; // 経営状況を判断する客観的指標
  businessEnvironment: string; // 経営環境
  rAndD: string; // 研究開発（新規事業含む）
};

// 統合された企業データ型
export type Company = {
  id: string;
  slug: string;

  // トップページ用
  topPage: CompanyTopPageInfo;

  // 基本情報
  basicInfo: CompanyBasicInfo;

  // 給与・待遇（一覧用）
  compensation: CompanyCompensation;

  // 業績（一覧用）
  performance: CompanyPerformance;

  // 働き方（一覧用）
  workStyle: CompanyWorkStyle;

  // 企業詳細
  report: CompanyReport;
  overview: CompanyOverview;
  business: CompanyBusiness;
  financials: CompanyFinancials;
  detailedCompensation: CompanyDetailedCompensation;
  detailedWorkStyle: CompanyDetailedWorkStyle;
  strategy: CompanyStrategy;

  // メタ情報
  created_at: string;
};

// 旧型式との互換性のための簡易型（一覧表示用）
export type CompanyListItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  industry: string;
  logo_url?: string;
  founded_year?: number;
  employee_count?: number;
  website_url?: string;
  averageSalary?: string;
  averageSalary30?: string;
  hasHousingAllowance?: boolean;
  tags?: string[];
  created_at: string;
};

// ランキング用の型
export type RankingCompany = {
  id: string;
  rank: number;
  name: string;
  slug: string;
  salary: number;
  salaryDisplay: string;
};

// 企業比較用の型
export type CompanyComparison = {
  id: string;
  name: string;
  slug: string;
  basicInfo: CompanyBasicInfo;
  compensation: CompanyCompensation;
  performance: CompanyPerformance;
  workStyle: CompanyWorkStyle;
};
