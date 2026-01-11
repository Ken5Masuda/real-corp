import { LoginForm } from "@/features/auth/components/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  return (
    <div className="container mx-auto p-4">
      <LoginForm />
      {resolvedSearchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {resolvedSearchParams.message}
        </p>
      )}
    </div>
  );
}
