Supabaseに新しい`companies`テーブルを作成する必要があります。以下のスキーマを参考にしてください。

テーブル名: `companies`

カラム:

- `id`: UUID (Primary Key, Default: `uuid_generate_v4()`, Read-only)
- `name`: TEXT
- `slug`: TEXT (Unique Index, for URL)
- `description`: TEXT
- `industry`: TEXT
- `logo_url`: TEXT (Nullable)
- `founded_year`: INT4 (Nullable)
- `employee_count`: INT4 (Nullable)
- `website_url`: TEXT (Nullable)
- `created_at`: TIMESTAMPZ (Default: `now()`, Read-only)

テーブル作成後、`rankings`テーブルと同様にRLSポリシーを設定し、`anon`ロールが`SELECT`操作を実行できるようにしてください。そうしないと、データが取得できません。
