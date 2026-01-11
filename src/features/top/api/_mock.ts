import { Ranking } from "../types";
import fs from "fs";
import path from "path";

const parseRankingsFromCSV = (): Ranking[] => {
  try {
    const csvPath = path.join(
      process.cwd(),
      "src/features/top/api/_mock_rankings_data.csv",
    );
    const fileContent = fs.readFileSync(csvPath, "utf-8");

    const lines = fileContent.trim().split("\n");
    const header = lines.shift();

    if (!header) {
      return [];
    }

    const rankings: Ranking[] = lines.map((line) => {
      const values = line.split(",");
      return {
        id: values[0],
        rank: parseInt(values[1], 10),
        name: values[2],
        salary: parseInt(values[3], 10),
        rating: parseFloat(values[4]),
        group: values[5] as "average" | "30-average",
      };
    });

    return rankings;
  } catch (error) {
    console.error("Error reading or parsing CSV for mock data:", error);
    return [];
  }
};

const rankings = parseRankingsFromCSV();

export const fetchMockRankings = async (
  group: "average" | "30-average",
): Promise<Ranking[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(rankings.filter((r) => r.group === group));
    }, 500);
  });
};
