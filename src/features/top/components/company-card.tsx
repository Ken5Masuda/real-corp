import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface CompanyCardProps {
  name: string
  growth: string
  tags: string[]
}

export function CompanyCard({ name, growth, tags }: CompanyCardProps) {
  return (
    <div className="bg-white rounded-lg border border-border/50 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <div className="aspect-[4/3] bg-muted relative">
        <Image src="/office.png" alt={name} fill className="object-cover" />
      </div>
      <div className="p-3">
        <h3 className="font-bold text-sm text-foreground mb-1">{name}</h3>
        <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{growth}</p>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, i) => (
            <Badge
              key={i}
              variant="secondary"
              className="text-[10px] px-2 py-0 bg-primary/10 text-primary hover:bg-primary/20"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
