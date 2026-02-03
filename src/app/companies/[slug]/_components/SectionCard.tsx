import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface SectionCardProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}

export function SectionCard({ title, icon: Icon, children }: SectionCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground py-4">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
}
