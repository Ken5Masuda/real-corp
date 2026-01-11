import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">アカウント情報</h1>
      <div className="p-4 border rounded-md bg-foreground/5">
        <p>
          <span className="font-bold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-bold">User ID:</span> {user.id}
        </p>
      </div>
    </div>
  );
}
