import { Header } from "@/features/top/components/header"
import { HeroSection } from "@/features/top/components/hero-section"
import { FeaturesSection } from "@/features/top/components/features-section"
import { PickupSection } from "@/features/top/components/pickup-section"
import { InternSection } from "@/features/top/components/intern-section"
import { RankingSection } from "@/features/top/components/ranking-section"
import { RecommendedSection } from "@/features/top/components/recommended-section"
import { Footer } from "@/features/top/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <PickupSection />
      <InternSection />
      <RankingSection title="平均年収ランキング" linkText="平均年収ランキングを見る" />
      <RankingSection title="30歳平均年収ランキング" linkText="30歳平均年収ランキングを見る" showPopup />
      <RecommendedSection />
      <Footer />
    </main>
  )
}
