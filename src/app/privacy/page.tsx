import { Header } from "@/features/top/components/header";
import { Footer } from "@/features/top/components/footer";

export const metadata = {
  title: "プライバシーポリシー | リアル企業分析",
  description: "リアル企業分析のプライバシーポリシーです。",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">プライバシーポリシー</h1>
        <p className="text-sm text-muted-foreground mb-8">
          最終更新日：2026年1月31日
        </p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. はじめに</h2>
            <p className="text-muted-foreground leading-relaxed">
              リアル企業分析（以下「本サービス」）を運営するLifedge
              Inc.（以下「当社」）は、本サービスをご利用いただくお客様の個人情報の保護を重要な責務と認識し、個人情報の保護に関する法令等を遵守するとともに、以下のプライバシーポリシー（以下「本ポリシー」）に従って適切な個人情報の取扱いおよび保護に努めます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              2. 収集する情報および利用目的
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              当社は、本サービスの提供にあたり、以下の情報を収集することがあります。
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                <strong className="text-foreground">アカウント情報：</strong>
                メールアドレス、パスワード（暗号化して保存）、お名前
              </li>
              <li>
                <strong className="text-foreground">利用状況情報：</strong>
                アクセスログ、閲覧履歴、検索履歴、利用日時
              </li>
              <li>
                <strong className="text-foreground">端末情報：</strong>
                IPアドレス、ブラウザの種類およびバージョン、OS情報
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              収集した情報は、本サービスの提供・改善、お問い合わせへの対応、利用規約に違反する行為への対応、法令に基づく対応、および本サービスに関する重要なお知らせの送付に利用します。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. 情報の共有および開示</h2>
            <p className="text-muted-foreground leading-relaxed">
              当社は、お客様の個人情報を、お客様の同意なく第三者に提供することはありません。ただし、法令に基づく開示請求があった場合、人の生命・身体・財産の保護のために必要な場合、その他法令で認められる場合には、これに応じることがあります。本サービスの運営にあたり、業務委託先に必要な範囲で情報を預けることがあり、その際は委託先に対して適切な監督を行います。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Cookieおよび類似技術</h2>
            <p className="text-muted-foreground leading-relaxed">
              本サービスでは、利便性の向上および利用状況の把握のためにCookieを使用することがあります。Cookieはブラウザの設定により無効にすることができますが、その場合、本サービスの一部の機能が利用できなくなる可能性があります。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. 情報の保管およびセキュリティ</h2>
            <p className="text-muted-foreground leading-relaxed">
              当社は、お客様の個人情報への不正アクセス、紛失、破壊、改ざん、漏洩などを防止するため、適切な技術的および組織的なセキュリティ対策を講じます。個人情報の取扱いに関する規程を定め、従業員および委託先に対する教育・監督を行います。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. お客様の権利</h2>
            <p className="text-muted-foreground leading-relaxed">
              お客様は、当社が保有するご自身の個人情報について、開示、訂正、削除、利用停止等を請求することができます。ご請求の際は、本人確認のうえ、合理的な範囲・方法で対応いたします。請求方法の詳細は、本サービス内またはお問い合わせ窓口でご案内します。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. 本ポリシーの変更</h2>
            <p className="text-muted-foreground leading-relaxed">
              当社は、法令の変更や本サービスの内容変更等に応じて、本ポリシーを改定することがあります。重要な変更がある場合は、本サービス上での告知、メール通知等の方法でお知らせします。改定後のポリシーは、本ページに掲載した時点から効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">8. お問い合わせ</h2>
            <p className="text-muted-foreground leading-relaxed">
              本ポリシーおよび個人情報の取扱いに関するお問い合わせは、本サービス内のお問い合わせ窓口または当社が別途定める方法にてご連絡ください。
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Lifedge Inc.
              <br />
              以上
            </p>
          </section>
        </div>
      </article>
      <Footer />
    </main>
  );
}
