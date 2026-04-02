"use client";

import { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-12 px-4",
        className,
      )}
    >
      {icon && <div className="mb-4 opacity-50">{icon}</div>}

      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>

      {description && (
        <p className="text-muted-foreground max-w-md mb-6">{description}</p>
      )}

      {action && action}
    </div>
  );
}
