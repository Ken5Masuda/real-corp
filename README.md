# Next.js + Supabase + Vercel Starter

This is a starter template for Next.js App Router with Supabase authentication and shadcn/ui.

## Features

- **Next.js 15** (App Router)
- **Supabase** (Auth, Database, Realtime) - via `@supabase/ssr`
- **shadcn/ui** - Reusable components
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **Feature-based Architecture** (Bulletproof React style)

## Getting Started

1. Copy the example environment file:

   ```bash
   cp .env.local.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Directory Structure

```
src/
  app/              # Next.js App Router
  components/
    ui/             # shadcn/ui components
    layouts/        # Shared layouts
  features/         # Feature-based modules (Auth, etc.)
  lib/              # Library configurations
    supabase/       # Supabase client setup
  types/            # Shared types
```

## Deployment on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a Git repository.
2. Import the project into Vercel.
3. ⚠️ **Important**: Add your Supabase environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the Vercel Project Settings.
4. Deploy!
