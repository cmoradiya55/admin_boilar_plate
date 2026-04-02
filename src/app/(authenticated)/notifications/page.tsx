"use client";

import { useRouter } from "next/navigation";
import NotificationScreen from "./NotificationScreen";

export default function NotificationsPage() {
  const router = useRouter();

  return <NotificationScreen onBack={() => router.push("/dashboard")} />;
}
