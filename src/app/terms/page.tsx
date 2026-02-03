import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Header } from "@/features/top/components/header";
import { Footer } from "@/features/top/components/footer";
import { Card, CardContent } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* パンくず */}
      <div className="bg-white border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-primary hover:text-primary/80">
              ホーム
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">利用規約</span>
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold mb-8">利用規約</h1>

        <Card>
          <CardContent className="p-8 prose prose-sm max-w-none">
            <p className="text-muted-foreground mb-8">
              最終更新日: 2024年1月1日
            </p>

            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4">第1条（適用）</h2>
              <p className="text-foreground leading-relaxed">
                本規約は、リアル企業分析（以下「当サービス」）の利用条件を定めるものです。
                登録ユーザーの皆さま（以下「ユーザー」）には、本規約に従って、当サービスをご利用いただきます。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4">第2条（利用登録）</h2>
              <ol className="list-decimal list-inside space-y-2 text-foreground">
                <li>
                  当サービスにおいては、登録希望者が本規約に同意の上、当社の定める方法によって利用登録を申請し、
                  当社がこれを承認することによって、利用登録が完了するものとします。
                </li>
                <li>
                  当社は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、
                  その理由については一切の開示義務を負わないものとします。
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
                    <li>本規約に違反したことがある者からの申請である場合</li>
                    <li>その他、当社が利用登録を相当でないと判断した場合</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4">第3条（ユーザーIDおよびパスワードの管理）</h2>
              <ol className="list-decimal list-inside space-y-2 text-foreground">
                <li>
                  ユーザーは、自己の責任において、当サービスのユーザーIDおよびパスワードを適切に管理するものとします。
                </li>
                <li>
                  ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、
                  もしくは第三者と共用することはできません。
                </li>
                <li>
                  ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には、
                  そのユーザーIDを登録しているユーザー自身による利用とみなします。
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4">第4条（禁止事項）</h2>
              <p className="text-foreground mb-2">
                ユーザーは、当サービスの利用にあたり、以下の行為をしてはなりません。
              </p>
              <ul className="list-disc list-inside space-y-1 text-foreground">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>当社、当サービスの他のユーザー、または第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                <li>当サービスの運営を妨害するおそれのある行為</li>
                <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                <li>不正アクセスをし、またはこれを試みる行為</li>
                <li>他のユーザーに成りすます行為</li>
                <li>当サービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
                <li>当社、当サービスの他のユーザーまたは第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為</li>
                <li>その他、当社が不適切と判断する行為</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4">第5条（当サービスの提供の停止等）</h2>
              <ol className="list-decimal list-inside space-y-2 text-foreground">
                <li>
                  当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく
                  当サービスの全部または一部の提供を停止または中断することができるものとします。
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>当サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                    <li>地震、落雷、火災、停電または天災などの不可抗力により、当サービスの提供が困難となった場合</li>
                    <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                    <li>その他、当社が当サービスの提供が困難と判断した場合</li>
                  </ul>
                </li>
                <li>
                  当社は、当サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、
                  一切の責任を負わないものとします。
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4">第6条（著作権）</h2>
              <ol className="list-decimal list-inside space-y-2 text-foreground">
                <li>
                  当サービスに掲載されている情報、画像、その他のコンテンツの著作権は、当社または正当な権利を有する第三者に帰属します。
                </li>
                <li>
                  ユーザーは、当サービスのコンテンツを私的利用の範囲を超えて複製、転載、公衆送信等することはできません。
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4">第7条（免責事項）</h2>
              <ol className="list-decimal list-inside space-y-2 text-foreground">
                <li>
                  当社は、当サービスに掲載する情報の正確性、完全性、有用性等について、いかなる保証も行いません。
                </li>
                <li>
                  当サービスに掲載されている企業情報は、各種公開情報を基に作成していますが、
                  その正確性を保証するものではありません。就職活動等における意思決定は、
                  必ず公式情報をご確認の上、ご自身の責任で行ってください。
                </li>
                <li>
                  当社は、当サービスの利用により生じた損害について、一切の責任を負いません。
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4">第8条（サービス内容の変更等）</h2>
              <p className="text-foreground leading-relaxed">
                当社は、ユーザーに通知することなく、当サービスの内容を変更しまたは当サービスの提供を中止することができるものとし、
                これによってユーザーに生じた損害について一切の責任を負いません。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4">第9条（利用規約の変更）</h2>
              <p className="text-foreground leading-relaxed">
                当社は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。
                なお、本規約の変更後、当サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4">第10条（準拠法・裁判管轄）</h2>
              <ol className="list-decimal list-inside space-y-2 text-foreground">
                <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
                <li>
                  当サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
                </li>
              </ol>
            </section>

            <section>
              <p className="text-muted-foreground text-sm">
                以上
              </p>
            </section>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
