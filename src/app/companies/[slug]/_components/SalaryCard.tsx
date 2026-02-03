"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface SalaryCardProps {
  title: string;
  value: string;
  unit?: string;
  percentChange?: number;
  chartData?: { year: string; value: number }[];
  fullWidth?: boolean;
}

export function SalaryCard({
  title,
  value,
  unit = "万円",
  percentChange,
  chartData,
  fullWidth = false,
}: SalaryCardProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  // 数値を抽出（"1232万円" -> 1232）
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;

  // デフォルトのチャートデータ（過去3年分を生成）
  const defaultChartData = chartData || [
    { year: "2023年", value: Math.round(numericValue * 0.9) },
    { year: "2024年", value: Math.round(numericValue * 0.95) },
    { year: "2025年", value: numericValue },
  ];

  // 前年比を計算（指定がない場合）
  const calculatedChange =
    percentChange ??
    (defaultChartData.length >= 2
      ? Math.round(
          ((defaultChartData[defaultChartData.length - 1].value -
            defaultChartData[defaultChartData.length - 2].value) /
            defaultChartData[defaultChartData.length - 2].value) *
            100
        )
      : 0);

  const isPositive = calculatedChange >= 0;

  return (
    <Card className={`p-4 ${fullWidth ? "col-span-2" : ""}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">{title}</span>
        {calculatedChange !== 0 && (
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              isPositive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            前年比 {isPositive ? "+" : ""}
            {calculatedChange}%{isPositive ? "↑" : "↓"}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-3xl font-bold text-foreground">
          {value.replace(/万円|円|%|歳|年|名|人|時間/g, "")}
        </span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>

      <div className="h-24">
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={defaultChartData}>
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#888" }}
              />
              <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(val) => [`${val}${unit}`, ""]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: "#22c55e", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: "#22c55e" }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full bg-muted/20 rounded animate-pulse" />
        )}
      </div>
    </Card>
  );
}
