import { Company } from "../types";
import fs from "fs";
import path from "path";

const parseCompaniesFromCSV = (): Company[] => {
  try {
    const csvPath = path.join(
      process.cwd(),
      "src/features/company/api/_mock_companies_data.csv",
    );
    const fileContent = fs.readFileSync(csvPath, "utf-8");

    const lines = fileContent.trim().split("\n");
    const header = lines.shift();

    if (!header) {
      return [];
    }

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
          values.push(current);
          current = "";
          continue;
        }
        current += char;
      }
      values.push(current);
      return values;
    };

    const companies: Company[] = lines.map((line) => {
      const values = parseCSVLine(line);
      return {
        id: values[0],
        name: values[1],
        slug: values[2],
        description: values[3],
        industry: values[4],
        logo_url: values[5],
        founded_year: parseInt(values[6], 10),
        employee_count: parseInt(values[7], 10),
        website_url: values[8],
        created_at: values[9],
      };
    });

    return companies;
  } catch (error) {
    console.error("Error reading or parsing CSV for mock data:", error);
    return [];
  }
};

const companies = parseCompaniesFromCSV();

export async function fetchMockCompanies(
  slug?: string,
): Promise<Company | Company[] | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (slug) {
        const company = companies.find((c) => c.slug === slug);
        resolve(company);
      } else {
        resolve(companies);
      }
    }, 500);
  });
}
