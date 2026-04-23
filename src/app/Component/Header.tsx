"use client";

import { useState } from "react";
import { Button } from "@/src/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/Components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/Components/ui/avatar";
import { Input } from "@/src/Components/ui/input";
import {
  Menu,
  Bell,
  Search,
  Settings,
  User,
  LogOut,
  Sun,
  Moon,
  ArrowLeft,
  X,
  PanelLeft,
  PanelLeftClose,
} from "lucide-react";
import { useToast } from "@/src/hooks/use-toast";
import { useTheme } from "next-themes";

interface HeaderProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onLogout: () => void;
  onProfileClick: () => void;
  onNotificationClick?: () => void;
  onSettingsClick?: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
  backButtonLabel?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
}

export default function Header({
  sidebarCollapsed,
  onToggleSidebar,
  onLogout,
  onProfileClick,
  onNotificationClick,
  onSettingsClick,
  showBackButton = false,
  onBackClick,
  backButtonLabel = "Back",
  user,
}: HeaderProps) {
  const [notifications] = useState(3);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { toast } = useToast();

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleThemeClick = () => {
    toggleTheme();
  };

  return (
    <header className="bg-background/80 glass border-b border-border px-4 py-3 shadow-sm sticky top-0 z-[45] transition-colors duration-500">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {showBackButton && onBackClick ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackClick}
              className="flex items-center gap-2 p-2 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{backButtonLabel}</span>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200 shrink-0"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <div className="md:hidden">
                <Menu className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <div className="hidden md:block">
                {sidebarCollapsed ? (
                  <PanelLeft className="w-4 h-4" strokeWidth={1.75} />
                ) : (
                  <PanelLeftClose className="w-4 h-4" strokeWidth={1.75} />
                )}
              </div>
            </Button>
          )}

          {/* Search Bar - Desktop */}
          {/* <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64 h-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            />
          </div> */}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 hover:bg-secondary transition-colors"
          >
            {searchOpen ? (
              <X className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Search className="w-5 h-5 text-muted-foreground" />
            )}
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onNotificationClick}
            className="relative p-2 hover:bg-secondary transition-colors"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center animate-pulse">
                {notifications}
              </span>
            )}
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-2 hover:bg-secondary transition-colors"
            title="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full hover:bg-secondary transition-all duration-200 hover:scale-105"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                    alt={user?.name || "Profile"}
                  />
                  <AvatarFallback className="bg-primary-gradient text-primary-foreground">
                    {user?.name
                      ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      : "JD"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 mt-2 animate-in fade-in-0 slide-in-from-top-2 duration-200"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name || "John Doe"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || "john.doe@company.com"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={onProfileClick}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={onSettingsClick}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={handleThemeClick}
              >
                <Sun className="mr-2 h-4 w-4 dark:hidden" />
                <Moon className="mr-2 h-4 w-4 hidden dark:block" />
                <span>Theme ({theme === "dark" ? "Dark" : "Light"})</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive-foreground focus:bg-destructive transition-colors"
                onClick={onLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search Bar - Expandable */}
      {searchOpen && (
        <div className="md:hidden mt-3 animate-in slide-in-from-top-2 fade-in-0 duration-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full h-10 bg-secondary/50 border-border focus:bg-background transition-colors"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
