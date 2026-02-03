import { Ranking } from "../types";
import { fetchMockRankings as fetchCompanyRankings } from "@/features/company/api/_mock";

/**
 * 企業データからランキングを生成
 */
export const fetchMockRankings = async (
  group: "average" | "30-average"
): Promise<Ranking[]> => {
  const companyRankings = await fetchCompanyRankings(group);

  return companyRankings.map((r) => ({
    id: r.id,
    rank: r.rank,
    name: r.name,
    salary: r.salary,
    rating: 4.5, // デフォルト値
    group,
  }));
};
