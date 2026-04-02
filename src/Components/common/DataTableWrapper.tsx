"use client";

import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/Components/ui/card";
import { Button } from "@/src/Components/ui/button";
import { cn } from "@/src/lib/utils";

interface DataTableWrapperProps {
  title: string;
  description?: string;
  searchComponent?: ReactNode;
  filterComponent?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
}

export default function DataTableWrapper({
  title,
  description,
  searchComponent,
  filterComponent,
  actions,
  children,
  className,
  isLoading = false,
  error,
  onRetry,
}: DataTableWrapperProps) {
  if (error) {
    return (
      <Card className={cn("shadow-md border", className)}>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-destructive"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Error Loading Data
            </h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            {onRetry && (
              <Button onClick={onRetry} variant="outline">
                Try Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("shadow-md border-0", className)}>
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold text-foreground">{title}</CardTitle>
            {description && <CardDescription className="text-xs sm:text-sm">{description}</CardDescription>}
          </div>

          {(searchComponent || filterComponent || actions) && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
               {searchComponent && <div className="flex-1 lg:flex-initial">{searchComponent}</div>}
               <div className="flex items-center gap-2 flex-wrap">
                  {filterComponent}
                  {actions}
               </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-muted-foreground">Loading...</span>
            </div>
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}
