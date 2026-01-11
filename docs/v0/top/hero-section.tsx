import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/90 via-primary to-emerald-500 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-white space-y-4">
            <p className="text-lg">行きたい企業の全てがわかる！</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              企業研究サイト
            </h1>
            <p className="text-2xl md:text-3xl font-bold">人気IT企業の〜〜〜</p>
          </div>

          <div className="relative">
            <div className="bg-white rounded-lg shadow-2xl p-2 transform rotate-3 hover:rotate-0 transition-transform">
              <Image
                src="/public/office.png"
                alt="企業分析ダッシュボード"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-lg font-bold text-foreground">
              リアル企業分析では
            </h2>
            <span className="text-sm text-muted-foreground">
              こんなことができます
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FeatureItem
              icon="📊"
              title="給与・待遇データの"
              highlight="企業比較"
              sub="ができる"
            />
            <FeatureItem
              icon="📈"
              title="各企業の"
              highlight="5年分の業績"
              sub="がわかる"
            />
            <FeatureItem
              icon="🎬"
              title="各企業の"
              highlight="Q&A問題動画"
              sub="が見れる"
            />
            <FeatureItem
              icon="📝"
              title="先輩就活生の"
              highlight="選考情報(ES・面接)"
              sub="が見れる"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({
  icon,
  title,
  highlight,
  sub,
}: {
  icon: string;
  title: string;
  highlight: string;
  sub: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="text-2xl">{icon}</div>
      <div className="text-sm">
        <p className="text-muted-foreground">{title}</p>
        <p className="font-bold text-foreground">
          {highlight}
          <span className="font-normal text-muted-foreground">{sub}</span>
        </p>
      </div>
    </div>
  );
}
