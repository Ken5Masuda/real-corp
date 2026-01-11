import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github } from 'lucide-react';

export function Hero() {
    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex max-w-[980px] flex-col items-start gap-4">
                <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
                    Launch your next big idea <br className="hidden sm:inline" />
                    with speed and confidence.
                </h1>
                <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
                    The ultimate starter kit including Next.js 15, Supabase, Shadcn UI, and
                    Bulletproof React architecture. Ready for Vercel deployment.
                </p>
            </div>
            <div className="flex gap-4">
                <Link href="/login">
                    <Button size="lg">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
                <Link href="https://github.com/vercel/next.js" target="_blank" rel="noreferrer">
                    <Button variant="outline" size="lg">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                    </Button>
                </Link>
            </div>
            <div className="mx-auto mt-10 w-full max-w-5xl rounded-lg border bg-background p-2 shadow-2xl sm:p-8">
                {/* Placeholder for Hero Image - simulating a dashboard or app UI */}
                <div className="aspect-video w-full rounded bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-20"></div>
            </div>
        </section>
    );
}
