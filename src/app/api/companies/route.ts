import { NextRequest, NextResponse } from "next/server";
import { searchCompanies, getCompanyListItems } from "@/features/company/api/getCompanies";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get("query") || undefined;
  const initialSalary400 = searchParams.get("initialSalary400") === "true";
  const salary30_800 = searchParams.get("salary30_800") === "true";
  const salary30_1000 = searchParams.get("salary30_1000") === "true";
  const hasHousingAllowance = searchParams.get("hasHousingAllowance") === "true";
  const employeeRange = searchParams.get("employeeRange") as
    | "0-499"
    | "500-999"
    | "1000-9999"
    | "10000+"
    | undefined;

  // 検索パラメータがない場合は全件取得
  const hasFilters =
    query ||
    initialSalary400 ||
    salary30_800 ||
    salary30_1000 ||
    hasHousingAllowance ||
    employeeRange;

  try {
    if (hasFilters) {
      const companies = await searchCompanies({
        query,
        initialSalary400,
        salary30_800,
        salary30_1000,
        hasHousingAllowance,
        employeeRange,
      });
      return NextResponse.json(companies);
    } else {
      const companies = await getCompanyListItems();
      return NextResponse.json(companies);
    }
  } catch (error) {
    console.error("Error in companies API:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}
