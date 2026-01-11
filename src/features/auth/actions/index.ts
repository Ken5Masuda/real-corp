"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // フォームからメールアドレスとパスワードを取得
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Supabaseでサインイン
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // エラーがあればリダイレクトしてエラーメッセージを表示
  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }

  // パスを再検証してキャッシュをクリア
  revalidatePath("/", "layout");
  // ログイン後はアカウントページにリダイレクト
  redirect("/account");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // 確認メール内のリンクをクリックした後のリダイレクト先
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  });
  if (error) {
    console.error("Signup error:", error);
    return redirect("/login?message=Could not authenticate user");
  }

  // メール確認を促すメッセージと共にリダイレクト
  return redirect("/login?message=Check email to continue sign in process");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
