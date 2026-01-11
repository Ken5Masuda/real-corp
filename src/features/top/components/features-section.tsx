export function FeaturesSection() {
  return (
    <section className="py-4 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FeatureCard title="給与・待遇データの" highlight="企業比較ができる" />
          <FeatureCard title="各企業の" highlight="5年分の業績がわかる" />
          <FeatureCard title="各企業の" highlight="最新採用情報が見れる" />
          <FeatureCard title="わかりやすい" highlight="決算資料の解説が見れる" />
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ title, highlight }: { title: string; highlight: string }) {
  return (
    <div className="bg-white rounded-lg p-4 border border-border/50 hover:border-primary/30 transition-colors">
      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
        <div className="w-5 h-5 bg-primary/30 rounded" />
      </div>
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="text-sm font-medium text-foreground">{highlight}</p>
    </div>
  )
}
