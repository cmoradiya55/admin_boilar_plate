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
  Shield,
  Users,
  Building,
  Mail,
} from "lucide-react";

const staffData = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    status: "Active",
    joinDate: "Jan 15, 2024",
    lastLogin: "2 hours ago",
    role: "Property Manager",
    department: "Operations",
    permissions: "Full Access",
  },
  {
    id: 2,
    name: "David Brown",
    email: "david.brown@email.com",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    status: "Active",
    joinDate: "Mar 8, 2024",
    lastLogin: "5 minutes ago",
    role: "Maintenance Supervisor",
    department: "Maintenance",
    permissions: "Limited Access",
  },
  {
    id: 3,
    name: "John Smith",
    email: "john.smith@email.com",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    status: "Active",
    joinDate: "Nov 10, 2023",
    lastLogin: "30 minutes ago",
    role: "Admin",
    department: "IT",
    permissions: "Full Access",
  },
  {
    id: 4,
    name: "Alice Cooper",
    email: "alice.cooper@email.com",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    status: "Active",
    joinDate: "Feb 20, 2024",
    lastLogin: "1 hour ago",
    role: "HR Manager",
    department: "Human Resources",
    permissions: "Limited Access",
  },
];

export default function StaffManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  const statsData = [
    { title: "Total Staff", value: 28, icon: Shield },
    { title: "Active Members", value: 26, icon: Users },
    { title: "Departments", value: 6, icon: Building },
    { title: "Full Access", value: 12, icon: Mail },
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

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-primary/20 text-primary border-primary/20 font-bold";
      case "property manager":
      case "maintenance supervisor":
        return "bg-accent/20 text-accent-foreground border-accent/20";
      case "hr manager":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const filteredStaff = staffData.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <PageHeader
        title="Staff Management"
        actions={
          <Button className="bg-primary-gradient text-primary-foreground shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all duration-300 border-0 rounded-xl font-bold">
            <UserPlus className="mr-2 w-4 h-4" />
            Add Staff Member
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
          title="All Staff Members"
          description="A list of all staff members in your organization."
          searchComponent={
            <div className="relative group/search w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within/search:text-primary transition-colors w-4 h-4" />
              <Input
                placeholder="Search staff..."
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
                    Staff Member
                  </TableHead>
                  <TableHead className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-widest px-4 py-3">
                    Role
                  </TableHead>
                  <TableHead className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-widest px-4 py-3">
                    Department
                  </TableHead>
                  <TableHead className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-widest px-4 py-3">
                    Permissions
                  </TableHead>
                  <TableHead className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-widest px-4 py-3">
                    Status
                  </TableHead>
                  <TableHead className="w-12 px-4 py-3"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((staff) => (
                  <TableRow
                    key={staff.id}
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
                          <AvatarImage src={staff.avatar} alt={staff.name} />
                          <AvatarFallback className="bg-primary-gradient text-primary-foreground font-bold text-xs uppercase tracking-tighter">
                            {staff.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {staff.name}
                          </p>
                          <p className="text-xs text-muted-foreground/80 font-medium">
                            {staff.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(staff.role)}>
                        {staff.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs font-semibold text-muted-foreground/90 uppercase tracking-tight">
                      {staff.department}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 group/perm">
                        <div className="p-1.5 bg-primary/10 rounded-lg group-hover/perm:bg-primary transition-all">
                          <Shield className="w-3.5 h-3.5 text-primary group-hover/perm:text-primary-foreground transition-all" />
                        </div>
                        <span className="text-xs font-bold text-muted-foreground/80">
                          {staff.permissions}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(staff.status)}>
                        {staff.status}
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
