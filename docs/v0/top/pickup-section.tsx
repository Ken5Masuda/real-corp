"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CompanyCard } from "@/components/company-card"

const companies = [
  { name: "AlphaSights", growth: "CAGR(年平均成長率): 70%...", tags: ["面接あり", "面談あり", "お小りく"] },
  { name: "AlphaSights", growth: "CAGR(年平均成長率): 70%...", tags: ["面接あり", "面談あり", "お小りく"] },
  { name: "AlphaSights", growth: "CAGR(年平均成長率): 70%...", tags: ["面接あり", "面談あり", "お小りく"] },
  { name: "AlphaSights", growth: "CAGR(年平均成長率): 70%...", tags: ["面接あり", "面談あり", "お小りく"] },
  { name: "AlphaSights", growth: "CAGR(年平均成長率): 70%...", tags: ["面接あり", "面談あり", "お小りく"] },
]

export function PickupSection() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-primary font-medium mb-1">PICKUP</p>
            <h2 className="text-xl font-bold text-foreground">ピックアップ</h2>
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
          {companies.map((company, i) => (
            <CompanyCard key={i} {...company} />
          ))}
        </div>
      </div>
    </section>
  )
}
