/**
 * 企業情報の型定義
 */
export type Company = {
  id: string;
  name: string;
  slug: string;
  description: string;
  industry: string;
  logo_url?: string; // オプション: 企業ロゴのURL
  founded_year?: number; // オプション: 設立年
  employee_count?: number; // オプション: 従業員数
  website_url?: string; // オプション: 公式サイトURL
  created_at: string; // ISO 8601形式の文字列を想定
};
