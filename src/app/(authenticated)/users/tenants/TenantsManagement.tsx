"use client";

import { useState } from "react";
import { Button } from "@/src/Components/ui/button";
import { Input } from "@/src/Components/ui/input";
import { Badge } from "@/src/Components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/Components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/Components/ui/table";
import {
  StatCard,
  PageHeader,
  DataTableWrapper,
} from "@/src/Components/common";
import {
  Search,
  UserPlus,
  Filter,
  Download,
  MoreHorizontal,
  Home,
  Calendar,
  Mail,
  MapPin,
} from "lucide-react";

const tenantsData = [
  {
    id: 1,
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    status: "Active",
    joinDate: "Dec 20, 2023",
    lastLogin: "1 week ago",
    property: "Sunset Apartments #304",
    rentAmount: "$1,200",
    leaseEnd: "Dec 2024",
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    email: "maria.rodriguez@email.com",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    status: "Active",
    joinDate: "Feb 28, 2024",
    lastLogin: "3 hours ago",
    property: "Ocean View Tower #1205",
    rentAmount: "$1,800",
    leaseEnd: "Feb 2025",
  },
  {
    id: 3,
    name: "John Carter",
    email: "john.carter@email.com",
    avatar:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
    status: "Pending",
    joinDate: "Mar 10, 2024",
    lastLogin: "Never",
    property: "Green Valley House #12",
    rentAmount: "$950",
    leaseEnd: "Mar 2025",
  },
  {
    id: 4,
    name: "Sarah Davis",
    email: "sarah.davis@email.com",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    status: "Active",
    joinDate: "Jan 15, 2024",
    lastLogin: "2 days ago",
    property: "City Center Loft #890",
    rentAmount: "$2,100",
    leaseEnd: "Jan 2025",
  },
];

export default function TenantsManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  const statsData = [
    { title: "Total Tenants", value: 156, icon: Home },
    { title: "Active Leases", value: 142, icon: Calendar },
    { title: "Pending Applications", value: 14, icon: Mail },
    { title: "Avg. Rent", value: "$1,350", icon: UserPlus },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-success/10 text-success border-success/20";
      case "inactive":
        return "bg-muted text-muted-foreground border-border";
      case "pending":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const filteredTenants = tenantsData.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <PageHeader
        title="Tenants Management"
        actions={
          <Button className="bg-primary-gradient text-primary-foreground shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all duration-300 border-0 rounded-xl font-bold">
            <UserPlus className="mr-2 w-4 h-4" />
            Add Tenant
          </Button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Data Table */}
      <div className="border rounded-lg">
        <DataTableWrapper
          title="All Tenants"
          description="A list of all tenants in your platform."
          searchComponent={
            <div className="relative group/search w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within/search:text-primary transition-colors w-4 h-4" />
              <Input
                placeholder="Search tenants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full h-10 bg-secondary/50 border-border focus:border-primary/50 focus:ring-primary/10 transition-all duration-200 rounded-xl"
              />
            </div>
          }
          actions={
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="h-10 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 rounded-xl px-4 flex-1 sm:flex-none"
              >
                <Filter className="w-4 h-4 mr-2 text-primary" />
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-10 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 rounded-xl px-4 flex-1 sm:flex-none"
              >
                <Download className="w-4 h-4 mr-2 text-primary" />
                Export
              </Button>
            </div>
          }
        >
          <div className="overflow-x-auto border rounded-xl scrollbar-thin scrollbar-thumb-muted">
            <Table className="min-w-[800px]">
              <TableHeader className="bg-secondary/30">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      className="rounded border-border bg-secondary/50 focus:ring-primary/20 h-4 w-4"
                    />
                  </TableHead>
                  <TableHead className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-widest px-4 py-3">
                    Tenant
                  </TableHead>
                  <TableHead className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-widest px-4 py-3">
                    Property
                  </TableHead>
                  <TableHead className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-widest px-4 py-3">
                    Rent
                  </TableHead>
                  <TableHead className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-widest px-4 py-3">
                    Lease End
                  </TableHead>
                  <TableHead className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-widest px-4 py-3">
                    Status
                  </TableHead>
                  <TableHead className="w-12 px-4 py-3"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.map((tenant) => (
                  <TableRow
                    key={tenant.id}
                    className="hover:bg-primary/5 transition-all duration-200 group border-b border-border/40"
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        className="rounded border-border bg-secondary/50 h-4 w-4 focus:ring-primary/20"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3 group">
                        <Avatar className="w-10 h-10 border-2 border-primary/10 shadow-sm transition-transform group-hover:scale-105 duration-300">
                          <AvatarImage src={tenant.avatar} alt={tenant.name} />
                          <AvatarFallback className="bg-primary-gradient text-primary-foreground font-bold text-xs uppercase tracking-tighter">
                            {tenant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {tenant.name}
                          </p>
                          <p className="text-xs text-muted-foreground/80 font-medium">
                            {tenant.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 group/prop">
                        <div className="p-1.5 bg-primary/10 rounded-lg group-hover/prop:bg-primary transition-all">
                          <MapPin className="w-3.5 h-3.5 text-primary group-hover/prop:text-primary-foreground transition-all" />
                        </div>
                        <span className="text-xs font-bold text-muted-foreground/80">
                          {tenant.property}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-success text-base">
                      {tenant.rentAmount}
                    </TableCell>
                    <TableCell className="text-xs font-bold text-muted-foreground/70 uppercase tracking-tight">
                      {tenant.leaseEnd}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(tenant.status)}>
                        {tenant.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="p-1">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DataTableWrapper>
      </div>
    </div>
  );
}
