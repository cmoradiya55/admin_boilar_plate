"use client";

import AuthenticatedLayout from "@/src/app/Component/AuthenticatedLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
