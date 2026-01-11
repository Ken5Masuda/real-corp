"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface RankingSectionProps {
  title: string
  linkText: string
  showPopup?: boolean
}

const rankings = [
  { rank: 1, name: "BofA証券株式会社", salary: "2,219", rating: 4.0 },
  { rank: 2, name: "BofA証券株式会社", salary: "2,219", rating: 4.0 },
  { rank: 3, name: "BofA証券株式会社", salary: "2,219", rating: 4.0 },
  { rank: 4, name: "BofA証券株式会社", salary: "2,219", rating: 4.0 },
  { rank: 5, name: "BofA証券株式会社", salary: "2,219", rating: 4.0 },
]

export function RankingSection({ title, linkText, showPopup }: RankingSectionProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5

  return (
    <section className="py-12 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <p className="text-xs text-primary font-medium mb-1">RANKING</p>
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {String(currentPage).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-transparent"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-transparent"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {rankings.map((item) => (
            <RankingCard key={item.rank} {...item} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="outline" className="rounded-full px-8 bg-transparent">
            {linkText} →
          </Button>
        </div>
      </div>
    </section>
  )
}

function RankingCard({
  rank,
  name,
  salary,
  rating,
}: {
  rank: number
  name: string
  salary: string
  rating: number
}) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-500"
    if (rank === 2) return "bg-gray-400"
    if (rank === 3) return "bg-amber-600"
    return "bg-muted"
  }

  return (
    <div className="bg-white rounded-lg border border-border/50 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <div className="aspect-[4/3] bg-muted relative">
        <div
          className={`absolute top-2 left-2 w-8 h-8 ${getRankColor(rank)} rounded-full flex items-center justify-center text-white font-bold text-sm`}
        >
          {rank}
        </div>
        <Image src="/office.png" alt={name} fill className="object-cover" />
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs">ログインすると、</div>
      </div>
      <div className="p-3">
        <h3 className="font-bold text-sm text-foreground mb-1">{name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <span className="text-xs text-muted-foreground">30歳の推定年...</span>
          <span className="font-bold text-primary">{salary}</span>
          <span className="text-xs text-muted-foreground">万円</span>
        </div>
        <div className="flex items-center gap-1 mb-2">
          <span className="text-xs text-muted-foreground">待遇面の充実</span>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-muted"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">{rating.toFixed(1)}</span>
        </div>
        <div className="mt-3 pt-3 border-t border-border/50">
          <Badge variant="outline" className="text-[10px] mr-1">
            給与制度
          </Badge>
          <div className="flex gap-1 mt-2">
            <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary">
              年収・給与を見る
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
