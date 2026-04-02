"use client";

import { useState } from "react";
import { Button } from "@/src/Components/ui/button";
import { Input } from "@/src/Components/ui/input";
import { Card, CardContent } from "@/src/Components/ui/card";
import { Badge } from "@/src/Components/ui/badge";
import { PageHeader } from "@/src/Components/common";
import {
  Bell,
  Search,
  Filter,
  Check,
  X,
  AlertCircle,
  Info,
  CheckCircle,
  AlertTriangle,
  Settings,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/Components/ui/dropdown-menu";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  timestamp: string;
  category: string;
}

// Mock notification data
const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "New Product Added",
    message: 'MacBook Pro 16" has been successfully added to your inventory.',
    type: "success",
    read: false,
    timestamp: "2024-01-15T10:30:00Z",
    category: "Products",
  },
  {
    id: 2,
    title: "Low Stock Alert",
    message:
      "Office Chair Pro is running low on stock. Only 3 items remaining.",
    type: "warning",
    read: false,
    timestamp: "2024-01-15T09:15:00Z",
    category: "Inventory",
  },
  {
    id: 3,
    title: "System Update",
    message: "System maintenance will be performed tonight at 2:00 AM EST.",
    type: "info",
    read: true,
    timestamp: "2024-01-14T16:45:00Z",
    category: "System",
  },
  {
    id: 4,
    title: "Order Processing Error",
    message: "Failed to process order #12345. Please check payment details.",
    type: "error",
    read: false,
    timestamp: "2024-01-14T14:20:00Z",
    category: "Orders",
  },
  {
    id: 5,
    title: "New User Registration",
    message: "John Doe has registered as a new tenant.",
    type: "info",
    read: true,
    timestamp: "2024-01-14T11:30:00Z",
    category: "Users",
  },
  {
    id: 6,
    title: "Payment Received",
    message: "Payment of $2,499.99 has been received for MacBook Pro order.",
    type: "success",
    read: true,
    timestamp: "2024-01-13T15:45:00Z",
    category: "Payments",
  },
  {
    id: 7,
    title: "Security Alert",
    message: "Multiple failed login attempts detected from IP 192.168.1.100.",
    type: "error",
    read: false,
    timestamp: "2024-01-13T08:22:00Z",
    category: "Security",
  },
  {
    id: 8,
    title: "Backup Completed",
    message: "Daily database backup has been completed successfully.",
    type: "success",
    read: true,
    timestamp: "2024-01-13T02:00:00Z",
    category: "System",
  },
];

interface NotificationScreenProps {
  onBack?: () => void;
}

export default function NotificationScreen({
  onBack,
}: NotificationScreenProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "unread" | "read">(
    "all",
  );
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const breadcrumbs = [
    { label: "Dashboard", href: "#" },
    { label: "Notifications", href: "#", current: true },
  ];

  const categories = [
    "all",
    ...Array.from(new Set(notifications.map((n) => n.category))),
  ];

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === "all" ||
      (filterType === "read" && notification.read) ||
      (filterType === "unread" && !notification.read);
    const matchesCategory =
      filterCategory === "all" || notification.category === filterCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Info className="w-5 h-5 text-primary" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case "success":
        return (
          <Badge variant="default" className="bg-success/10 text-success border-0">
            Success
          </Badge>
        );
      case "warning":
        return (
          <Badge variant="default" className="bg-warning/10 text-warning border-0">
            Warning
          </Badge>
        );
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return (
          <Badge variant="default" className="bg-primary/10 text-primary border-0">
            Info
          </Badge>
        );
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const markAsUnread = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: false }
          : notification,
      ),
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Stay updated with important alerts and system messages."
        breadcrumbs={breadcrumbs}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={clearAllNotifications}>
                  <X className="w-4 h-4 mr-2" />
                  Clear All
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
      />

      {/* Stats Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  Total Notifications
                </span>
                <Badge variant="secondary" className="bg-secondary text-secondary-foreground">{notifications.length}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                <span className="text-sm font-medium text-muted-foreground">
                  Unread
                </span>
                <Badge variant="destructive">{unreadCount}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) =>
                  setFilterType(e.target.value as "all" | "unread" | "read")
                }
                className="px-3 py-2 border border-border bg-background text-foreground rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-border bg-background text-foreground rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card className="border-border bg-card">
            <CardContent className="p-12 text-center">
              <Bell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No notifications found
              </h3>
              <p className="text-muted-foreground">
                {searchTerm || filterType !== "all" || filterCategory !== "all"
                  ? "Try adjusting your filters or search terms."
                  : "You're all caught up! No new notifications."}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all duration-200 border-border ${
                !notification.read
                  ? "border-l-4 border-l-primary bg-primary/[0.03] dark:bg-primary/[0.05]"
                  : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className={`font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-3">
                        {getNotificationBadge(notification.type)}
                        <Badge variant="outline" className="border-border text-muted-foreground">{notification.category}</Badge>
                        <span className="text-xs text-muted-foreground/60">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {notification.read ? (
                        <DropdownMenuItem
                          onClick={() => markAsUnread(notification.id)}
                        >
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Mark as Unread
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Mark as Read
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => deleteNotification(notification.id)}
                        className="text-destructive focus:text-destructive-foreground focus:bg-destructive"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
