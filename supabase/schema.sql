-- リアル企業分析 正規化データベーススキーマ
-- Supabase PostgreSQL

-- 既存テーブルを削除（開発環境用）
DROP TABLE IF EXISTS company_strategy CASCADE;
DROP TABLE IF EXISTS company_business CASCADE;
DROP TABLE IF EXISTS company_reports CASCADE;
DROP TABLE IF EXISTS company_financials CASCADE;
DROP TABLE IF EXISTS company_work_style CASCADE;
DROP TABLE IF EXISTS company_compensation CASCADE;
DROP TABLE IF EXISTS rankings CASCADE;
DROP TABLE IF EXISTS companies CASCADE;

-- =========================================
-- 1. companies - 企業基本情報
-- =========================================
CREATE TABLE companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  industry VARCHAR(255),
  founded_date VARCHAR(100),
  capital VARCHAR(100),
  headquarters TEXT,
  representative VARCHAR(255),
  employee_count VARCHAR(100),
  revenue VARCHAR(100),
  business_overview TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_companies_slug ON companies(slug);
CREATE INDEX idx_companies_industry ON companies(industry);
CREATE INDEX idx_companies_name ON companies(name);

-- =========================================
-- 2. company_compensation - 給与・待遇情報
-- =========================================
CREATE TABLE company_compensation (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,

  -- トップページ用（ランキング表示）
  top_average_salary VARCHAR(100),
  top_average_salary_30 VARCHAR(100),

  -- 詳細情報
  average_salary VARCHAR(100),
  average_salary_30 VARCHAR(100),
  initial_salary_undergrad VARCHAR(100),
  initial_salary_grad VARCHAR(100),
  housing_allowance TEXT,
  has_housing_allowance BOOLEAN DEFAULT false,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(company_id)
);

CREATE INDEX idx_company_compensation_company_id ON company_compensation(company_id);

-- =========================================
-- 3. company_work_style - 働き方情報
-- =========================================
CREATE TABLE company_work_style (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,

  average_age VARCHAR(50),
  average_tenure VARCHAR(50),
  new_grad_hiring VARCHAR(100),
  paid_leave_days VARCHAR(50),
  overtime_hours VARCHAR(50),
  turnover_rate_3year VARCHAR(50),
  female_ratio VARCHAR(50),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(company_id)
);

CREATE INDEX idx_company_work_style_company_id ON company_work_style(company_id);

-- =========================================
-- 4. company_financials - 業績情報
-- =========================================
CREATE TABLE company_financials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,

  -- 基本業績
  revenue VARCHAR(100),
  revenue_per_employee VARCHAR(100),

  -- 利益情報
  gross_profit VARCHAR(100),
  gross_profit_margin VARCHAR(50),
  operating_profit VARCHAR(100),
  operating_profit_margin VARCHAR(50),
  ordinary_profit VARCHAR(100),
  ordinary_profit_margin VARCHAR(50),
  net_profit VARCHAR(100),
  net_profit_margin VARCHAR(50),

  -- 財務指標
  total_assets VARCHAR(100),
  net_assets VARCHAR(100),
  equity_ratio VARCHAR(50),
  roe VARCHAR(50),
  fixed_ratio VARCHAR(50),
  ordinary_profit_per_employee VARCHAR(100),
  employee_count VARCHAR(100),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(company_id)
);

CREATE INDEX idx_company_financials_company_id ON company_financials(company_id);

-- =========================================
-- 5. company_reports - 企業レポート
-- =========================================
CREATE TABLE company_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,

  summary TEXT,
  vision TEXT,
  business_model TEXT,
  strengths TEXT,
  competitors TEXT,
  risks TEXT,
  challenges TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(company_id)
);

CREATE INDEX idx_company_reports_company_id ON company_reports(company_id);

-- =========================================
-- 6. company_business - 事業内容
-- =========================================
CREATE TABLE company_business (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,

  overview TEXT,
  segments TEXT,
  products_services TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(company_id)
);

CREATE INDEX idx_company_business_company_id ON company_business(company_id);

-- =========================================
-- 7. company_strategy - 中長期経営戦略
-- =========================================
CREATE TABLE company_strategy (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,

  management_policy TEXT,
  long_term_strategy TEXT,
  kpi TEXT,
  business_environment TEXT,
  r_and_d TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(company_id)
);

CREATE INDEX idx_company_strategy_company_id ON company_strategy(company_id);

-- =========================================
-- 8. rankings - ランキング情報
-- =========================================
CREATE TABLE rankings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  rank_group VARCHAR(50) NOT NULL, -- 'average', '30-average', etc.
  rank_position INTEGER NOT NULL,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(company_id, rank_group)
);

CREATE INDEX idx_rankings_group ON rankings(rank_group);
CREATE INDEX idx_rankings_position ON rankings(rank_position);

-- =========================================
-- Row Level Security (RLS)
-- =========================================
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_compensation ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_work_style ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_financials ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_business ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_strategy ENABLE ROW LEVEL SECURITY;
ALTER TABLE rankings ENABLE ROW LEVEL SECURITY;

-- 公開読み取りポリシー
CREATE POLICY "Allow public read" ON companies FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON company_compensation FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON company_work_style FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON company_financials FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON company_reports FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON company_business FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON company_strategy FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON rankings FOR SELECT USING (true);

-- =========================================
-- updated_at 自動更新トリガー
-- =========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_compensation_updated_at
  BEFORE UPDATE ON company_compensation
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_work_style_updated_at
  BEFORE UPDATE ON company_work_style
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_financials_updated_at
  BEFORE UPDATE ON company_financials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_reports_updated_at
  BEFORE UPDATE ON company_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_business_updated_at
  BEFORE UPDATE ON company_business
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_strategy_updated_at
  BEFORE UPDATE ON company_strategy
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rankings_updated_at
  BEFORE UPDATE ON rankings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =========================================
-- 便利なビュー: 企業全情報を結合
-- =========================================
CREATE OR REPLACE VIEW company_full_info AS
SELECT
  c.*,
  cc.top_average_salary,
  cc.top_average_salary_30,
  cc.average_salary,
  cc.average_salary_30,
  cc.initial_salary_undergrad,
  cc.initial_salary_grad,
  cc.housing_allowance,
  cc.has_housing_allowance,
  cw.average_age,
  cw.average_tenure,
  cw.new_grad_hiring,
  cw.paid_leave_days,
  cw.overtime_hours,
  cw.turnover_rate_3year,
  cw.female_ratio,
  cf.revenue AS financial_revenue,
  cf.revenue_per_employee,
  cf.gross_profit,
  cf.gross_profit_margin,
  cf.operating_profit,
  cf.operating_profit_margin,
  cf.ordinary_profit,
  cf.ordinary_profit_margin,
  cf.net_profit,
  cf.net_profit_margin,
  cf.total_assets,
  cf.net_assets,
  cf.equity_ratio,
  cf.roe,
  cf.fixed_ratio,
  cf.ordinary_profit_per_employee,
  cr.summary AS report_summary,
  cr.vision AS report_vision,
  cr.business_model AS report_business_model,
  cr.strengths AS report_strengths,
  cr.competitors AS report_competitors,
  cr.risks AS report_risks,
  cr.challenges AS report_challenges,
  cb.overview AS business_overview_detail,
  cb.segments AS business_segments,
  cb.products_services AS business_products_services,
  cs.management_policy AS strategy_management_policy,
  cs.long_term_strategy AS strategy_long_term,
  cs.kpi AS strategy_kpi,
  cs.business_environment AS strategy_business_environment,
  cs.r_and_d AS strategy_r_and_d
FROM companies c
LEFT JOIN company_compensation cc ON c.id = cc.company_id
LEFT JOIN company_work_style cw ON c.id = cw.company_id
LEFT JOIN company_financials cf ON c.id = cf.company_id
LEFT JOIN company_reports cr ON c.id = cr.company_id
LEFT JOIN company_business cb ON c.id = cb.company_id
LEFT JOIN company_strategy cs ON c.id = cs.company_id;
