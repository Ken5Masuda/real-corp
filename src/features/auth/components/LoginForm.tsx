"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/features/auth/actions";
import Link from "next/link";

export function LoginForm() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">ログイン</CardTitle>
          <CardDescription>
            メールアドレスとパスワードを入力してアカウントにログインします
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    パスワードを忘れましたか?
                  </Link>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              <Button formAction={login} type="submit" className="w-full">
                ログイン
              </Button>
            </form>
          </div>
          <div className="mt-4 text-center text-sm">
            アカウントをお持ちでないですか?{" "}
            <Link href="/signup" className="underline">
              サインアップ
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
