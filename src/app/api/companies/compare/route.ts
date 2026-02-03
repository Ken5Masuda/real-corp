import { NextRequest, NextResponse } from "next/server";
import { getCompaniesForComparison } from "@/features/company/api/getCompanies";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const ids = searchParams.get("ids");

  if (!ids) {
    return NextResponse.json(
      { error: "ids parameter is required" },
      { status: 400 }
    );
  }

  const idArray = ids.split(",").filter((id) => id.trim());

  if (idArray.length === 0) {
    return NextResponse.json(
      { error: "At least one id is required" },
      { status: 400 }
    );
  }

  if (idArray.length > 5) {
    return NextResponse.json(
      { error: "Maximum 5 companies can be compared" },
      { status: 400 }
    );
  }

  try {
    const companies = await getCompaniesForComparison(idArray);
    return NextResponse.json(companies);
  } catch (error) {
    console.error("Error in compare API:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies for comparison" },
      { status: 500 }
    );
  }
}
