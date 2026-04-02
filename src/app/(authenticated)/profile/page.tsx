"use client";

import { useRouter } from "next/navigation";
import ProfileScreen from "./ProfileScreen";
import { useAuth } from "@/src/hooks/useAuth";

export default function ProfilePage() {
  const router = useRouter();
  const { authState, updateUser } = useAuth();

  return (
    <ProfileScreen
      onBack={() => router.push("/dashboard")}
      user={authState.user}
      onUpdateUser={(userData) => updateUser(userData)}
    />
  );
}
