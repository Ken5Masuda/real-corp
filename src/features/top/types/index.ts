/**
 * ランキングアイテムの型定義
 */
export type Ranking = {
  id: string;
  rank: number;
  name: string;
  salary: number;
  rating: number;
  group: "average" | "30-average";
};
