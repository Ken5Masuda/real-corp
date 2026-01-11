import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Rocket className="h-6 w-6" />
                    <span className="font-bold">NextStater</span>
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                    <Link href="#features" className="transition-colors hover:text-foreground/80 text-foreground/60">Features</Link>
                    <Link href="#pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">Pricing</Link>
                    <Link href="#about" className="transition-colors hover:text-foreground/80 text-foreground/60">About</Link>
                </nav>
                <div className="flex items-center space-x-4">
                    <Link href="/login">
                        <Button variant="ghost" size="sm">Log in</Button>
                    </Link>
                    <Link href="/signup">
                        <Button size="sm">Sign up</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
