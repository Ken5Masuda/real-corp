import { createClient } from "@/lib/supabase/server";
import { Ranking } from "../types";
import { fetchMockRankings } from "./_mock";

/**
 * ランキングデータを取得する関数
 * @param group - 取得するランキングのグループ ("average" | "30-average")
 */
export const getRankings = async (
  group: "average" | "30-average",
): Promise<Ranking[]> => {
  // 環境変数に応じてモックを使用するかどうかを決定
  if (process.env.NEXT_PUBLIC_USE_MOCK_API === "true") {
    return fetchMockRankings(group);
  }

  // Supabaseからデータを取得
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("rankings")
    .select("id, rank, name, salary, rating, group")
    .eq("group", group)
    .order("rank", { ascending: true })
    .limit(5);

  if (error) {
    console.error("Error fetching rankings:", error);
    // エラー発生時は空の配列を返すか、エラーハンドリング戦略に応じて変更
    return [];
  }

  // データが見つからない場合は空の配列を返す
  if (!data) {
    return [];
  }

  // Supabaseからのデータは型チェックが必要なため、asでキャスト
  // より厳密にする場合は、zodなどでのバリデーションを推奨
  return data as Ranking[];
};
