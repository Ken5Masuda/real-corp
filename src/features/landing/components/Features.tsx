import {
  Zap,
  Shield,
  Smartphone,
  Layout,
  Database,
  Globe,
  LucideIcon,
} from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export function Features() {
  const features = [
    {
      icon: Zap,
      title: "Fast Performance",
      description:
        "Built on Next.js 15 App Router for blazing fast server-side rendering and static generation.",
    },
    {
      icon: Database,
      title: "Supabase Backend",
      description:
        "Complete backend with Postgres, Auth, and Realtime subscriptions out of the box.",
    },
    {
      icon: Layout,
      title: "Modern UI",
      description:
        "Beautiful, accessible components using Shadcn UI and Tailwind CSS v4.",
    },
    {
      icon: Shield,
      title: "Authentication",
      description:
        "Secure user authentication with Supabase Auth, including social logins and email.",
    },
    {
      icon: Globe,
      title: "Edge Ready",
      description:
        "Designed to be deployed on Vercel Edge Network for global low-latency access.",
    },
    {
      icon: Smartphone,
      title: "Responsive",
      description:
        "Fully responsive design that looks great on desktop, tablet, and mobile devices.",
    },
  ];

  return (
    <section id="features" className="container py-12 md:py-24 lg:py-32">
      <div className="mx-auto mb-12 max-w-[58rem] text-center">
        <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
          Features
        </h2>
        <p className="text-muted-foreground md:text-xl">
          Everything you need to build your SaaS, startup, or side project.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
