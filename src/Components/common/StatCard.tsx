"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/Components/ui/card";
import { cn } from "@/src/lib/utils";
import { LucideIcon } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    type: "up" | "down" | "neutral";
    label?: string;
  };
  className?: string;
  onClick?: () => void;
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  onClick,
}: StatCardProps) {
  const trendColors = {
    up: "text-success",
    down: "text-destructive",
    neutral: "text-muted-foreground",
  };

  const trendIcons = {
    up: "↗",
    down: "↘",
    neutral: "→",
  };

  return (
    <Card
      className={cn(
        "shadow-md border transition-all duration-200",
        onClick && "cursor-pointer hover:shadow-lg hover:-translate-y-1",
        className,
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground/60">
          {title}
        </CardTitle>
        {Icon && (
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/10 group-hover:bg-primary/20 transition-all duration-300">
            <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-1 group-hover:text-primary transition-colors">
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>

        {(trend || description) && (
          <div className="flex items-center justify-between">
            {trend && (
              <div
                className={cn(
                  "flex items-center text-sm font-medium",
                  trendColors[trend.type],
                )}
              >
                <span className="mr-1">{trendIcons[trend.type]}</span>
                <span>{trend.value}</span>
                {trend.label && (
                  <span className="text-muted-foreground/60 ml-1">
                    {trend.label}
                  </span>
                )}
              </div>
            )}

            {description && !trend && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
