"use client";

import { useState, useEffect } from "react";
import { Search, X, Plus, Building2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CompanyListItem, Company } from "@/features/company/types";

export function CompareSearch() {
  const [companies, setCompanies] = useState<CompanyListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CompanyListItem[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // 企業データの取得（検索用）
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("/api/companies");
        const data = await res.json();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  // 検索結果のフィルタリング
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const filtered = companies.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q)
    );
    setSearchResults(filtered.slice(0, 10));
  }, [searchQuery, companies]);

  // 企業を選択
  const addCompany = async (company: CompanyListItem) => {
    if (selectedCompanies.length >= 5) {
      alert("比較できる企業は最大5社までです");
      return;
    }
    if (selectedCompanies.some((c) => c.id === company.id)) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/companies/compare?ids=${company.id}`);
      const data = await res.json();
      if (data.length > 0) {
        setSelectedCompanies((prev) => [...prev, data[0]]);
      }
    } catch (error) {
      console.error("Error fetching company details:", error);
    } finally {
      setLoading(false);
      setSearchQuery("");
      setShowResults(false);
    }
  };

  // 企業を削除
  const removeCompany = (id: string) => {
    setSelectedCompanies((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* 企業選択エリア */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">比較する企業を選択</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="企業名で検索..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              className="pl-10"
            />
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                {searchResults.map((company) => (
                  <button
                    key={company.id}
                    onClick={() => addCompany(company)}
                    className="w-full px-4 py-2 text-left hover:bg-muted flex items-center justify-between"
                    disabled={selectedCompanies.some((c) => c.id === company.id)}
                  >
                    <span className="font-medium">{company.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {company.industry}
                    </Badge>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 選択済み企業 */}
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedCompanies.map((company) => (
              <Badge
                key={company.id}
                variant="secondary"
                className="px-3 py-1 flex items-center gap-2"
              >
                {company.topPage.name}
                <button
                  onClick={() => removeCompany(company.id)}
                  className="hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {selectedCompanies.length < 5 && (
              <Badge
                variant="outline"
                className="px-3 py-1 flex items-center gap-1 text-muted-foreground"
              >
                <Plus className="h-3 w-3" />
                企業を追加 (残り{5 - selectedCompanies.length}社)
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 比較テーブル */}
      {selectedCompanies.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">企業比較</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground w-40">
                    項目
                  </th>
                  {selectedCompanies.map((company) => (
                    <th
                      key={company.id}
                      className="text-left py-3 px-4 font-bold"
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        {company.topPage.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {/* 業種 */}
                <tr className="hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium text-muted-foreground">
                    業種
                  </td>
                  {selectedCompanies.map((company) => (
                    <td key={company.id} className="py-3 px-4">
                      {company.basicInfo.industry}
                    </td>
                  ))}
                </tr>

                {/* 平均年収 */}
                <tr className="hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium text-muted-foreground">
                    平均年収
                  </td>
                  {selectedCompanies.map((company) => (
                    <td key={company.id} className="py-3 px-4 font-bold text-primary">
                      {company.compensation.averageSalary}
                    </td>
                  ))}
                </tr>

                {/* 30歳平均年収 */}
                <tr className="hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium text-muted-foreground">
                    30歳平均年収
                  </td>
                  {selectedCompanies.map((company) => (
                    <td key={company.id} className="py-3 px-4 font-bold text-primary">
                      {company.compensation.averageSalary30}
                    </td>
                  ))}
                </tr>

                {/* 初任給（大卒） */}
                <tr className="hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium text-muted-foreground">
                    初任給（大卒）
                  </td>
                  {selectedCompanies.map((company) => (
                    <td key={company.id} className="py-3 px-4">
                      {company.compensation.initialSalaryUndergrad}
                    </td>
                  ))}
                </tr>

                {/* 住宅補助 */}
                <tr className="hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium text-muted-foreground">
                    住宅補助
                  </td>
                  {selectedCompanies.map((company) => (
                    <td key={company.id} className="py-3 px-4">
                      {company.compensation.housingAllowance}
                    </td>
                  ))}
                </tr>

                {/* 従業員数 */}
                <tr className="hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium text-muted-foreground">
                    従業員数
                  </td>
                  {selectedCompanies.map((company) => (
                    <td key={company.id} className="py-3 px-4">
                      {company.basicInfo.employeeCount}
                    </td>
                  ))}
                </tr>

                {/* 平均年齢 */}
                <tr className="hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium text-muted-foreground">
                    平均年齢
                  </td>
                  {selectedCompanies.map((company) => (
                    <td key={company.id} className="py-3 px-4">
                      {company.workStyle.averageAge}
                    </td>
                  ))}
                </tr>

                {/* 平均勤続年数 */}
                <tr className="hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium text-muted-foreground">
                    平均勤続年数
                  </td>
                  {selectedCompanies.map((company) => (
                    <td key={company.id} className="py-3 px-4">
                      {company.workStyle.averageTenure}
                    </td>
                  ))}
                </tr>

                {/* 残業時間 */}
                <tr className="hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium text-muted-foreground">
                    残業時間（月）
                  </td>
                  {selectedCompanies.map((company) => (
                    <td key={company.id} className="py-3 px-4">
                      {company.workStyle.overtimeHours}
                    </td>
                  ))}
                </tr>

                {/* 有給休暇 */}
                <tr className="hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium text-muted-foreground">
                    有給休暇取得日数
                  </td>
                  {selectedCompanies.map((company) => (
                    <td key={company.id} className="py-3 px-4">
                      {company.workStyle.paidLeaveDays}
                    </td>
                  ))}
                </tr>

                {/* 3年後離職率 */}
                <tr className="hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium text-muted-foreground">
                    3年後離職率
                  </td>
                  {selectedCompanies.map((company) => (
                    <td key={company.id} className="py-3 px-4">
                      {company.workStyle.turnoverRate3Year}
                    </td>
                  ))}
                </tr>

                {/* 女性比率 */}
                <tr className="hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium text-muted-foreground">
                    女性比率
                  </td>
                  {selectedCompanies.map((company) => (
                    <td key={company.id} className="py-3 px-4">
                      {company.workStyle.femaleRatio}
                    </td>
                  ))}
                </tr>

                {/* 売上高 */}
                <tr className="hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium text-muted-foreground">
                    売上高
                  </td>
                  {selectedCompanies.map((company) => (
                    <td key={company.id} className="py-3 px-4">
                      {company.performance.revenue}
                    </td>
                  ))}
                </tr>

                {/* 経常利益率 */}
                <tr className="hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium text-muted-foreground">
                    経常利益率
                  </td>
                  {selectedCompanies.map((company) => (
                    <td key={company.id} className="py-3 px-4">
                      {company.performance.ordinaryProfitMargin}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      ) : (
        <Card className="py-12">
          <CardContent className="text-center">
            <Building2 className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">
              比較する企業を選択してください
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              最大5社まで同時に比較できます
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
