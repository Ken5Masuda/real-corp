import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { PickupSection } from "@/components/pickup-section"
import { InternSection } from "@/components/intern-section"
import { RankingSection } from "@/components/ranking-section"
import { RecommendedSection } from "@/components/recommended-section"
import { Footer } from "@/components/footer"

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
