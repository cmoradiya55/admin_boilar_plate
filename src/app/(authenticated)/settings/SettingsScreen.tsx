"use client";

import { useRouter } from "next/navigation";
import { LoadingSpinner, PageHeader } from "@/src/Components/common";
import { Button } from "@/src/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/Components/ui/card";
import { Badge } from "@/src/Components/ui/badge";
import { Separator } from "@/src/Components/ui/separator";
import {
  Settings as SettingsIcon,
  Shield,
  Bell,
  Palette,
  Database,
  Users,
  Lock,
  ChevronRight,
  Globe,
  Mail,
  Smartphone,
} from "lucide-react";

export default function SettingsScreen() {
  const router = useRouter();

  const settingsCategories = [
    {
      title: "General",
      description: "Basic application settings and preferences",
      icon: SettingsIcon,
      items: [
        {
          name: "Application Settings",
          description: "General app configuration",
          badge: null,
        },
        {
          name: "Language & Region",
          description: "Set your language and timezone",
          badge: "EN",
        },
        {
          name: "Date & Time Format",
          description: "Customize date and time display",
          badge: null,
        },
      ],
    },
    {
      title: "Security & Privacy",
      description: "Manage your security settings and privacy preferences",
      icon: Shield,
      items: [
        {
          name: "Password & Authentication",
          description: "Change password and setup 2FA",
          badge: "2FA Off",
        },
        {
          name: "Login Sessions",
          description: "Manage active sessions",
          badge: "3 Active",
        },
        {
          name: "Privacy Settings",
          description: "Control data sharing and privacy",
          badge: null,
        },
      ],
    },
    {
      title: "Notifications",
      description: "Configure notification preferences",
      icon: Bell,
      items: [
        {
          name: "Email Notifications",
          description: "Configure email alerts",
          badge: "On",
        },
        {
          name: "Push Notifications",
          description: "Mobile and browser notifications",
          badge: "Off",
        },
        {
          name: "Notification Frequency",
          description: "How often you receive updates",
          badge: "Daily",
        },
      ],
    },
    {
      title: "Appearance",
      description: "Customize the look and feel of your dashboard",
      icon: Palette,
      items: [
        {
          name: "Theme Settings",
          description: "Light, dark, or auto theme",
          badge: "Auto",
        },
        {
          name: "Layout Preferences",
          description: "Sidebar and layout options",
          badge: null,
        },
        {
          name: "Color Scheme",
          description: "Accent colors and branding",
          badge: "Blue",
        },
      ],
    },
    {
      title: "User Management",
      description: "Settings for managing users and permissions",
      icon: Users,
      items: [
        {
          name: "User Roles & Permissions",
          description: "Configure user access levels",
          badge: null,
        },
        {
          name: "Invitation Settings",
          description: "How new users are invited",
          badge: null,
        },
        {
          name: "User Registration",
          description: "Public registration settings",
          badge: "Disabled",
        },
      ],
    },
    {
      title: "System & Integration",
      description: "System settings and third-party integrations",
      icon: Database,
      items: [
        {
          name: "API Configuration",
          description: "API keys and webhooks",
          badge: "3 Keys",
        },
        {
          name: "Backup Settings",
          description: "Data backup configuration",
          badge: "Weekly",
        },
        {
          name: "Integration Settings",
          description: "Third-party service connections",
          badge: "5 Connected",
        },
      ],
    },
  ];

  const handleSettingClick = (categoryTitle: string, itemName: string) => {
    if (itemName === "Password & Authentication") {
      router.push("/settings/change-password");
    } else {
      // For now, just show that these are placeholders
      console.log(`Navigate to: ${categoryTitle} -> ${itemName}`);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in-0 duration-500">
      <PageHeader
        title="Settings"
        description="Manage your application settings, preferences, and configurations."
        actions={
          <Button
            variant="outline"
            className="border-primary/20 hover:bg-primary/5 text-primary"
          >
            <Database className="mr-2 w-4 h-4" />
            Export Settings
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {settingsCategories.map((category, categoryIndex) => (
          <Card
            key={categoryIndex}
            className="hover:shadow-xl transition-all duration-300 border-border bg-card overflow-hidden group"
          >
            <CardHeader className="bg-primary-gradient border-b border-white/10">
              <div className="flex items-center space-x-4">
                <div className="p-1.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <category.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-primary-foreground leading-tight">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-primary-foreground/80 text-[12px]">
                    {category.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="group/item">
                  <div
                    className="flex items-center justify-between rounded-xl cursor-pointer transition-all duration-200 border border-transparent hover:border-primary/10"
                    onClick={() =>
                      handleSettingClick(category.title, item.name)
                    }
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground text-sm group-hover/item:text-primary transition-colors">
                          {item.name}
                        </h4>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="text-[10px] uppercase tracking-wider font-bold bg-primary/10 text-primary border-primary/20"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground/60 mt-1.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="ml-4 p-1.5 rounded-full bg-secondary/30 text-muted-foreground group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-200">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  {itemIndex < category.items.length - 1 && (
                    <Separator className="mt-2 bg-border/40" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="border-border bg-card shadow-lg animate-in slide-in-from-bottom-4 duration-700">
        <CardHeader className="border-b border-border bg-secondary/30">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-destructive/10 rounded-lg">
              <Shield className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <CardTitle className="text-foreground font-bold text-lg">
                System Security & Quick Actions
              </CardTitle>
              <CardDescription className="text-muted-foreground/60 text-[12px]">
                Critical administrative tasks and secure configuration shortcuts
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Change Password",
                icon: Lock,
                onClick: () => router.push("/settings/change-password"),
                themeColor: "primary",
              },
              {
                label: "Domain Settings",
                icon: Globe,
                themeColor: "success",
              },
              {
                label: "Email Config",
                icon: Mail,
                themeColor: "primary",
              },
              {
                label: "Mobile App",
                icon: Smartphone,
                themeColor: "primary",
              },
            ].map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className={`h-auto p-4 flex flex-col items-center space-y-3 border-border hover:border-${action.themeColor}/50 hover:bg-${action.themeColor}/5 group transition-all duration-300 rounded-2xl`}
                onClick={action.onClick}
              >
                <div
                  className={`p-3 bg-${action.themeColor}/10 rounded-full group-hover:scale-110 transition-transform duration-300`}
                >
                  <action.icon
                    className={`w-6 h-6 text-${action.themeColor}`}
                  />
                </div>
                <span className="text-sm font-bold text-foreground">
                  {action.label}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
