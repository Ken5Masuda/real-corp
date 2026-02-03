"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Building2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { CompanyListItem } from "@/features/company/types";

// 検索パラメータの型
type SearchParams = {
  query: string;
  initialSalary400: boolean;
  salary30_800: boolean;
  salary30_1000: boolean;
  hasHousingAllowance: boolean;
  employeeRange: "" | "0-499" | "500-999" | "1000-9999" | "10000+";
};

export function CompaniesSearch() {
  const [companies, setCompanies] = useState<CompanyListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    initialSalary400: false,
    salary30_800: false,
    salary30_1000: false,
    hasHousingAllowance: false,
    employeeRange: "",
  });

  // 企業データの取得
  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchParams.query) params.set("query", searchParams.query);
      if (searchParams.initialSalary400) params.set("initialSalary400", "true");
      if (searchParams.salary30_800) params.set("salary30_800", "true");
      if (searchParams.salary30_1000) params.set("salary30_1000", "true");
      if (searchParams.hasHousingAllowance)
        params.set("hasHousingAllowance", "true");
      if (searchParams.employeeRange)
        params.set("employeeRange", searchParams.employeeRange);

      const res = await fetch(`/api/companies?${params.toString()}`);
      const data = await res.json();
      setCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCompanies();
  };

  const handleCheckboxChange = (key: keyof SearchParams) => {
    setSearchParams((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const handleEmployeeRangeChange = (
    range: "" | "0-499" | "500-999" | "1000-9999" | "10000+"
  ) => {
    setSearchParams((prev) => ({
      ...prev,
      employeeRange: prev.employeeRange === range ? "" : range,
    }));
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">企業検索・企業一覧</h1>

      {/* 検索エリア */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <form onSubmit={handleSearch}>
            {/* フリーテキスト検索 */}
            <div className="mb-6">
              <Label htmlFor="search" className="text-sm font-medium mb-2 block">
                フリーワード検索
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    type="text"
                    placeholder="企業名、業種などで検索..."
                    value={searchParams.query}
                    onChange={(e) =>
                      setSearchParams((prev) => ({
                        ...prev,
                        query: e.target.value,
                      }))
                    }
                    className="pl-10"
                  />
                </div>
                <Button type="submit">検索</Button>
              </div>
            </div>

            {/* こだわり条件 */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">
                こだわり条件
              </Label>
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={searchParams.initialSalary400}
                    onChange={() => handleCheckboxChange("initialSalary400")}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">初年度年収（推定）400万円以上</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={searchParams.salary30_800}
                    onChange={() => handleCheckboxChange("salary30_800")}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">30歳平均年収（推定）800万円以上</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={searchParams.salary30_1000}
                    onChange={() => handleCheckboxChange("salary30_1000")}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">
                    30歳平均年収（推定）1,000万円以上
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={searchParams.hasHousingAllowance}
                    onChange={() => handleCheckboxChange("hasHousingAllowance")}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">住宅補助・社宅制度あり</span>
                </label>
              </div>
            </div>

            {/* 従業員数 */}
            <div>
              <Label className="text-sm font-medium mb-3 block">従業員数</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "0-499" as const, label: "0〜499人" },
                  { value: "500-999" as const, label: "500〜999人" },
                  { value: "1000-9999" as const, label: "1,000〜9,999人" },
                  { value: "10000+" as const, label: "10,000人〜" },
                ].map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    variant={
                      searchParams.employeeRange === option.value
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => handleEmployeeRangeChange(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 企業一覧 */}
      <div className="mb-4 text-sm text-muted-foreground">
        {loading ? "読み込み中..." : `${companies.length}件の企業が見つかりました`}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-32 bg-muted rounded mb-4" />
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <Link key={company.id} href={`/companies/${company.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  {/* 企業画像 */}
                  <div className="relative h-32 bg-muted rounded mb-4 overflow-hidden">
                    {company.logo_url ? (
                      <Image
                        src={company.logo_url}
                        alt={company.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Building2 className="h-12 w-12 text-muted-foreground/50" />
                      </div>
                    )}
                  </div>

                  {/* 企業名 */}
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">
                    {company.name}
                  </h3>

                  {/* 業種・年収情報 */}
                  <p className="text-sm text-muted-foreground mb-2">
                    {company.industry}
                  </p>
                  {company.averageSalary && (
                    <p className="text-sm text-primary font-medium mb-2">
                      平均年収: {company.averageSalary}
                    </p>
                  )}

                  {/* 企業概要 */}
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {company.description}
                  </p>

                  {/* タグ */}
                  {company.tags && company.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {company.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {!loading && companies.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">
            条件に一致する企業が見つかりませんでした
          </p>
        </div>
      )}
    </>
  );
}
