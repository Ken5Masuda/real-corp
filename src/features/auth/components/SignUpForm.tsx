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
import { signup } from "@/features/auth/actions";
import Link from "next/link";

export function SignUpForm() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">サインアップ</CardTitle>
          <CardDescription>
            以下に情報を入力してアカウントを作成します
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" required />
            </div>
            <Button formAction={signup} type="submit" className="w-full">
              アカウント作成
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            すでにアカウントをお持ちですか?{" "}
            <Link href="/login" className="underline">
              ログイン
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
