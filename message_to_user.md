Supabaseに新しい`articles`テーブルを作成する必要があります。以下のスキーマを参考にしてください。

テーブル名: `articles`

カラム:

- `id`: UUID (Primary Key)
- `title`: TEXT
- `content`: TEXT
- `slug`: TEXT (Unique Index, for URL)
- `image_url`: TEXT (Nullable)
- `created_at`: TIMESTAMPZ (Default: `now()`, Read-only)
- `category`: TEXT (Nullable)

テーブル作成後、`rankings`テーブルと同様にRLSポリシーを設定し、`anon`ロールが`SELECT`操作を実行できるようにしてください。そうしないと、データが取得できません。
