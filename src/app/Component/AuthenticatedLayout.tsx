"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { LoadingSpinner } from "@/src/Components/common";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { authState, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!authState.isLoading && !authState.isAuthenticated) {
      router.push("/");
    }
  }, [authState.isLoading, authState.isAuthenticated, router]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const handlePageChange = (page: string) => {
    const routeMap: { [key: string]: string } = {
      dashboard: "/dashboard",
      tenants: "/users/tenants",
      landlords: "/users/landlords",
      staff: "/users/staff",
      products: "/products",
      profile: "/profile",
      settings: "/settings",
      "change-password": "/settings/change-password",
      notifications: "/notifications",
    };

    const route = routeMap[page] || "/dashboard";
    router.push(route);
  };

  // Map current path to sidebar page for highlighting
  const getCurrentPage = () => {
    if (pathname === "/dashboard") return "dashboard";
    if (pathname === "/users/tenants") return "tenants";
    if (pathname === "/users/landlords") return "landlords";
    if (pathname === "/users/staff") return "staff";
    if (pathname === "/users") return "tenants"; // Default to tenants
    if (pathname === "/products") return "products";
    if (pathname.startsWith("/products/")) return "products"; // For product detail pages
    if (pathname === "/profile") return "profile";
    if (pathname === "/settings/change-password") return "change-password";
    if (pathname === "/settings") return "settings";
    if (pathname === "/notifications") return "notifications";
    return "dashboard";
  };

  const getBackButtonProps = () => {
    if (pathname === "/settings/change-password") {
      return {
        showBackButton: true,
        onBackClick: () => router.push("/settings"),
        backButtonLabel: "Back to Settings",
      };
    }
    if (pathname === "/notifications") {
      return {
        showBackButton: true,
        onBackClick: () => router.push("/dashboard"),
        backButtonLabel: "Back to Dashboard",
      };
    }
    if (pathname.startsWith("/products/")) {
      return {
        showBackButton: true,
        onBackClick: () => router.push("/products"),
        backButtonLabel: "Back to Products",
      };
    }
    return {
      showBackButton: false,
    };
  };

  // Show loading spinner while checking auth
  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Return null if not authenticated (will redirect in useEffect)
  if (!authState.isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        currentPage={getCurrentPage()}
        onPageChange={handlePageChange}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onLogout={handleLogout}
        isMobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => {
            // On mobile: toggle the mobile overlay sidebar
            // On desktop: toggle collapsed state
            if (typeof window !== "undefined" && window.innerWidth < 768) {
              setMobileOpen(!mobileOpen);
            } else {
              setSidebarCollapsed(!sidebarCollapsed);
            }
          }}
          onLogout={handleLogout}
          onProfileClick={handleProfileClick}
          onNotificationClick={() => router.push("/notifications")}
          onSettingsClick={() => router.push("/settings")}
          user={authState.user}
          {...getBackButtonProps()}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="animate-in fade-in-0 slide-in-from-right-4 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
