"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormattedTextProps {
  text: string;
  maxLines?: number;
}

// マークダウンを除去してプレーンテキストに変換
function removeMarkdown(text: string): string {
  let result = text;

  // 見出し（# ## ### など）を除去
  result = result.replace(/^#{1,6}\s+/gm, "");

  // 太字（**text** または __text__）を除去
  result = result.replace(/\*\*([^*]+)\*\*/g, "$1");
  result = result.replace(/__([^_]+)__/g, "$1");

  // イタリック（*text* または _text_）を除去
  result = result.replace(/\*([^*]+)\*/g, "$1");
  result = result.replace(/(?<![a-zA-Z])_([^_]+)_(?![a-zA-Z])/g, "$1");

  // インラインコード（`code`）を除去
  result = result.replace(/`([^`]+)`/g, "$1");

  // リンク（[text](url)）をテキストのみに
  result = result.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  // 画像（![alt](url)）を除去
  result = result.replace(/!\[([^\]]*)\]\([^)]+\)/g, "");

  // 水平線（--- または ***）を除去
  result = result.replace(/^[-*]{3,}$/gm, "");

  // 箇条書き記号（- または * または +）を除去して改行
  result = result.replace(/^[\s]*[-*+]\s+/gm, "\n• ");

  // 番号付きリスト（1. 2. など）を整形
  result = result.replace(/^[\s]*(\d+)\.\s+/gm, "\n$1. ");

  // 引用（> ）を除去
  result = result.replace(/^>\s*/gm, "");

  // コードブロック（```）を除去
  result = result.replace(/```[\s\S]*?```/g, "");

  return result;
}

// 就活ポイントの内容を整形
function formatJobHuntingPoint(text: string): string {
  let result = text;
  // ①②③④などで改行を入れる
  result = result.replace(/([①②③④⑤⑥⑦⑧⑨⑩])/g, "\n  $1");
  // 先頭の改行を除去
  result = result.replace(/^\n+/, "");
  return result;
}

export function FormattedText({ text, maxLines = 5 }: FormattedTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return <p className="text-muted-foreground">データなし</p>;

  // テキストを整形
  const formatText = (content: string) => {
    // 最初にリテラル\nを実際の改行に変換（最優先）
    let formatted = content.replace(/\\n/g, "\n");

    // マークダウンを除去
    formatted = removeMarkdown(formatted);

    // 出典部分を抽出（複数行対応、|区切りも含む）
    const sourceMatch = formatted.match(/（出典：[\s\S]*?）(?=\s*$|\n|$)/);
    const source = sourceMatch ? sourceMatch[0] : null;
    if (source) {
      formatted = formatted.replace(source, "");
    }

    // 就活ポイントを抽出（改行を含む場合にも対応）
    const pointMatch = formatted.match(/就活に役立つポイント[^：]*：[\s\S]*?(?=（出典|$)/);
    let point: string | null = null;
    if (pointMatch) {
      point = pointMatch[0].trim();
      formatted = formatted.replace(pointMatch[0], "");
      // 末尾の不要な文字を除去
      point = point.replace(/\s*$/, "");
    }

    // 番号付きリストを検出して整形（①②③など）- 前に改行を追加
    formatted = formatted.replace(/([①②③④⑤⑥⑦⑧⑨⑩])/g, "\n\n$1");

    // 「。」の後に改行を追加（ただし既に改行がある場合や末尾は除く）
    formatted = formatted.replace(/。(?!\n)(?!）)(?!$)/g, "。\n");

    // 「また、」「さらに、」「加えて、」などの前で改行
    formatted = formatted.replace(/(また、|さらに、|加えて、|一方、|なお、|具体的には、|例えば、|特に、|その結果、|これにより、|直近の|2\d{3}年)/g, "\n\n$1");

    // 連続する改行を整理（3つ以上の改行を2つに）
    formatted = formatted.replace(/\n{3,}/g, "\n\n");

    // 先頭の改行を除去
    formatted = formatted.replace(/^\n+/, "");

    return { main: formatted.trim(), source, point };
  };

  const { main, source, point } = formatText(text);
  const lines = main.split("\n").filter((line) => line.trim());
  const shouldTruncate = lines.length > maxLines;
  const displayLines = isExpanded ? lines : lines.slice(0, maxLines);

  // 箇条書きかどうかを判定（①②③も含む）
  const isBulletPoint = (line: string) => {
    const trimmed = line.trim();
    return trimmed.startsWith("•") ||
           /^\d+\.\s/.test(trimmed) ||
           /^[①②③④⑤⑥⑦⑧⑨⑩]/.test(trimmed);
  };

  return (
    <div className="space-y-4">
      {/* メインテキスト */}
      <div className="text-sm leading-relaxed text-foreground space-y-3">
        {displayLines.map((line, index) => {
          const trimmedLine = line.trim();
          if (isBulletPoint(trimmedLine)) {
            return (
              <p key={index} className="pl-4 py-1 bg-muted/30 rounded text-justify">
                {trimmedLine}
              </p>
            );
          }
          return (
            <p key={index} className="text-justify leading-7">
              {trimmedLine}
            </p>
          );
        })}
      </div>

      {/* 続きを読むボタン */}
      {shouldTruncate && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary hover:text-primary/80 p-0 h-auto"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              閉じる
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              続きを読む（残り{lines.length - maxLines}段落）
            </>
          )}
        </Button>
      )}

      {/* 就活ポイント */}
      {point && isExpanded && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
          <p className="text-sm font-bold text-blue-800 mb-2">💡 就活に役立つポイント</p>
          <div className="text-sm text-blue-700 space-y-1">
            {formatJobHuntingPoint(point.replace(/就活に役立つポイント[^：]*：/, ""))
              .split("\n")
              .filter((line) => line.trim())
              .map((line, index) => (
                <p key={index} className={line.trim().startsWith("①") || line.trim().startsWith("②") || line.trim().startsWith("③") || line.trim().startsWith("④") ? "pl-2" : ""}>
                  {line.trim()}
                </p>
              ))}
          </div>
        </div>
      )}

      {/* 出典 */}
      {source && isExpanded && (
        <div className="text-xs text-muted-foreground border-t pt-3">
          <span className="font-medium">📚 出典：</span>
          <span className="break-all">
            {source.replace(/（出典：/, "").replace(/）$/, "")}
          </span>
        </div>
      )}
    </div>
  );
}
