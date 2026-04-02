"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Shield,
  Home,
  Building,
  ChevronDown,
  User,
  Settings,
  Key,
  Package,
  Wrench,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/Components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/Components/ui/dropdown-menu";

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onLogout: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    id: "users",
    label: "Users",
    icon: Users,
    subItems: [
      { id: "tenants", label: "Tenants", icon: Home },
      { id: "landlords", label: "Landlords", icon: Building },
      { id: "staff", label: "Staff", icon: Shield },
    ],
  },
  { id: "products", label: "Products", icon: Package },
  { id: "profile", label: "Profile", icon: User },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    subItems: [
      { id: "settings", label: "Settings", icon: Wrench },
      { id: "change-password", label: "Change Password", icon: Key },
    ],
  },
];

// Helper to clean up rendered tooltips
function SidebarTooltip({
  children,
  label,
  subItemCount,
}: {
  children: React.ReactNode;
  label: string;
  subItemCount?: number;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side="right"
        sideOffset={12}
        className="font-medium bg-popover text-popover-foreground border-border flex items-center gap-1.5 shadow-xl"
      >
        {label}
        {!!subItemCount && (
          <span className="text-muted-foreground text-[11px] bg-secondary px-1.5 py-0.5 rounded-md">
            {subItemCount}
          </span>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

export default function Sidebar({
  currentPage,
  onPageChange,
  collapsed,
  onToggleCollapse,
  onLogout,
  isMobileOpen = false,
  onCloseMobile,
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) =>
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );

  useEffect(() => {
    if (collapsed) {
      setExpandedItems([]);
      return;
    }
    const parents = menuItems
      .filter((item) => item.subItems?.some((sub) => sub.id === currentPage))
      .map((item) => item.id);
    setExpandedItems(parents);
  }, [collapsed, currentPage]);

  const isSubMenuActive = (parentId: string) =>
    menuItems
      .find((item) => item.id === parentId)
      ?.subItems?.some((sub) => sub.id === currentPage) || false;

  const navigate = (page: string) => {
    if (page === "logout") {
      onLogout();
    } else {
      onPageChange(page);
    }
    onCloseMobile?.();
  };

  return (
    <TooltipProvider delayDuration={0}>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={cn(
          "flex flex-col bg-background border-r border-border h-full select-none z-50",
          "transition-all duration-300 ease-in-out",
          collapsed ? "w-[72px]" : "w-[260px]",
          "max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-50 max-md:w-[260px] max-md:shadow-2xl",
          !isMobileOpen && "max-md:-translate-x-full",
        )}
      >
        {/*  Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-primary-gradient flex items-center justify-center shrink-0 shadow-sm">
              <Shield className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-[15px] text-foreground whitespace-nowrap animate-in fade-in-0 slide-in-from-left-2 duration-300">
              AdminPro
            </span>
          </div>
        </div>

        {/*  Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3">
          <div className="space-y-1.5 flex flex-col items-center">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              const hasSubItems = !!item.subItems?.length;
              const isExpanded = expandedItems.includes(item.id);
              const isSubActive = isSubMenuActive(item.id);
              const activeState = isActive || (hasSubItems && isSubActive);

              const buttonClass = cn(
                "flex items-center rounded-xl text-[13.5px] font-medium transition-all duration-200 outline-none relative",
                collapsed
                  ? "w-10 h-10 justify-center px-0"
                  : "w-full h-10 px-3 gap-3",
                activeState
                  ? "bg-primary-gradient text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary-background hover:text-foreground hover:shadow-sm",
              );

              const handleItemClick = () => {
                if (hasSubItems && !collapsed) toggleExpanded(item.id);
                else if (hasSubItems && collapsed) {
                } else navigate(item.id);
              };

              const buttonContent = (
                <button className={buttonClass} onClick={handleItemClick}>
                  <Icon
                    className={cn(
                      "shrink-0 transition-colors duration-300",
                      collapsed ? "w-[20px] h-[20px]" : "w-[18px] h-[18px]",
                      activeState
                        ? "text-primary-foreground"
                        : "text-muted-foreground font-medium",
                    )}
                  />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left whitespace-nowrap">
                        {item.label}
                      </span>
                      {hasSubItems && (
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 text-muted-foreground transition-transform duration-200",
                            isExpanded && "rotate-180",
                            activeState && "text-primary-foreground",
                          )}
                        />
                      )}
                    </>
                  )}
                </button>
              );

              // Sub-menu popup dropdown when collapsed
              const renderCollapsedWithDropdown = () => (
                <DropdownMenu>
                  <SidebarTooltip
                    label={item.label}
                    subItemCount={item.subItems?.length}
                  >
                    <DropdownMenuTrigger asChild>
                      {buttonContent}
                    </DropdownMenuTrigger>
                  </SidebarTooltip>
                  <DropdownMenuContent
                    side="right"
                    sideOffset={12}
                    className="w-48 bg-background shadow-xl z-50 rounded-xl border border-border p-1"
                  >
                    <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {item.label}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-border mb-1" />
                    {item.subItems?.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubItemActive = currentPage === subItem.id;
                      return (
                        <DropdownMenuItem
                          key={subItem.id}
                          onClick={() => navigate(subItem.id)}
                          className={cn(
                            "flex items-center px-3 py-2 text-[13px] font-medium cursor-pointer rounded-lg mb-1 last:mb-0 transition-colors",
                            isSubItemActive
                              ? "bg-primary/10 text-primary focus:bg-primary/10 focus:text-primary"
                              : "text-muted-foreground focus:bg-secondary focus:text-foreground hover:bg-secondary",
                          )}
                        >
                          <SubIcon
                            className={cn(
                              "w-4 h-4 mr-2.5",
                              isSubItemActive
                                ? "text-primary"
                                : "text-muted-foreground",
                            )}
                          />
                          {subItem.label}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              );

              return (
                <div key={item.id} className="w-full">
                  {collapsed ? (
                    <div className="w-full flex justify-center">
                      {hasSubItems ? (
                        renderCollapsedWithDropdown()
                      ) : (
                        <SidebarTooltip label={item.label}>
                          {buttonContent}
                        </SidebarTooltip>
                      )}
                    </div>
                  ) : (
                    buttonContent
                  )}

                  {/* Sub-items with smooth expand/collapse */}
                  {hasSubItems && !collapsed && (
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        isExpanded
                          ? "max-h-48 opacity-100"
                          : "max-h-0 opacity-0",
                      )}
                    >
                      <div className="pl-4 pr-3 mt-1 space-y-1">
                        {item.subItems?.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubItemActive = currentPage === subItem.id;
                          return (
                            <button
                              key={subItem.id}
                              className={cn(
                                "w-full flex items-center gap-3 rounded-lg h-[34px] px-3 text-[13px] font-medium transition-all duration-200 outline-none",
                                isSubItemActive
                                  ? "text-primary bg-secondary-background"
                                  : "text-muted-foreground hover:text-foreground hover:bg-secondary-background",
                              )}
                              onClick={() => navigate(subItem.id)}
                            >
                              <SubIcon
                                className={cn(
                                  "w-[15px] h-[15px] shrink-0 transition-colors duration-200",
                                  isSubItemActive
                                    ? "text-primary"
                                    : "text-muted-foreground",
                                )}
                              />
                              <span className="whitespace-nowrap">
                                {subItem.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* ── Footer / Logout ─────────────────────────── */}
        <div className="shrink-0 p-3 border-t border-border w-full flex justify-center">
          {collapsed ? (
            <SidebarTooltip label="Logout">
              <button
                className="flex items-center justify-center w-11 h-11 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 outline-none hover:shadow-sm"
                onClick={() => navigate("logout")}
              >
                <LogOut className="w-[20px] h-[20px]" />
              </button>
            </SidebarTooltip>
          ) : (
            <button
              className="w-full flex items-center gap-3 rounded-xl h-10 px-3 text-[13.5px] font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 outline-none hover:shadow-sm"
              onClick={() => navigate("logout")}
            >
              <LogOut className="w-[18px] h-[18px]" />
              <span className="whitespace-nowrap">Logout</span>
            </button>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
