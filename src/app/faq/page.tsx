import { Header } from "@/features/top/components/header";
import { Footer } from "@/features/top/components/footer";

export const metadata = {
  title: "よくある質問 | リアル企業分析",
  description:
    "リアル企業分析に関するよくある質問と回答です。IT企業を目指す学生のための就職活動サイトです。",
};

const faqItems = [
  {
    question: "リアル企業分析とはどのようなサービスですか？",
    answer:
      "リアル企業分析は、IT企業を目指す学生のための就職活動サイトです。企業情報の閲覧、ランキング、ES・体験記の参照、企業比較など、就活に役立つ情報をまとめてご利用いただけます。",
  },
  {
    question: "会員登録は必要ですか？",
    answer:
      "企業一覧の閲覧やランキングの確認など、一部の機能は会員登録なしでご利用いただけます。企業の詳細情報の保存や比較機能の利用など、より便利に使うには会員登録（無料）をおすすめします。",
  },
  {
    question: "利用料金はかかりますか？",
    answer:
      "基本的なサービスは無料でご利用いただけます。将来的に有料プランを提供する場合は、事前にサービス内でお知らせいたします。",
  },
  {
    question: "掲載されている企業情報はどのように収集していますか？",
    answer:
      "公開情報や企業からの提供情報、選考体験記などを基に掲載しています。情報は定期的に更新していますが、最新の採用状況は各企業の公式情報をご確認ください。",
  },
  {
    question: "アカウントを削除したい場合はどうすればよいですか？",
    answer:
      "アカウント設定画面から削除手続きが可能です。削除後は登録情報が消去され、復元はできません。削除方法の詳細は、ログイン後のアカウントページをご確認ください。",
  },
  {
    question: "個人情報の取り扱いは安全ですか？",
    answer:
      "はい。当社では個人情報の保護に関する法令を遵守し、適切なセキュリティ対策を講じています。詳細はプライバシーポリシーページをご覧ください。",
  },
  {
    question: "お問い合わせはどこにすればよいですか？",
    answer:
      "サービス内のお問い合わせ窓口、または当社が別途定める方法にてご連絡ください。回答までにお時間をいただく場合があります。",
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">よくある質問</h1>
        <p className="text-sm text-muted-foreground mb-10">
          リアル企業分析に関するよくある質問と回答をまとめています。
        </p>

        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <section
              key={index}
              className="rounded-lg border border-border/50 bg-card p-6"
            >
              <h2 className="text-base font-semibold text-foreground mb-3 flex items-start gap-2">
                <span className="flex-shrink-0 size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                  Q
                </span>
                {item.question}
              </h2>
              <div className="pl-8">
                <p className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </section>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mt-10 text-center">
          上記にないご質問は、お問い合わせ窓口よりお寄せください。
        </p>
      </article>
      <Footer />
    </main>
  );
}
