import Image from "next/image";

export function RecommendedSection() {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <p className="text-xs text-primary font-medium mb-1">OSUSUME</p>
          <h2 className="text-xl font-bold text-foreground">
            おすすめサービス
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 border border-border/50 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="text-2xl font-bold text-primary">SIer</div>
                <div className="text-sm text-muted-foreground">
                  就活チャンネル
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  powered by スマート就活
                </div>
              </div>
              <div className="flex-1">
                <Image
                  src="/public/office.png"
                  alt="SIer就活チャンネル"
                  width={200}
                  height={100}
                  className="rounded"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-border/50 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-1">
                  登場キーワード集頂
                </p>
                <p className="text-lg font-bold text-foreground">
                  就活情報サイト
                </p>
                <p className="text-sm text-muted-foreground">
                  就活をもっとスマートに
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="bg-primary/10 rounded-lg p-3 text-center">
                  <p className="text-xs text-primary font-medium">
                    リリースしました！
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    スマートに内定をGETろう！
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
