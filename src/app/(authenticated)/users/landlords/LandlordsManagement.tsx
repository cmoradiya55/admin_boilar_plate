"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/src/Components/ui/button";
import { Input } from "@/src/Components/ui/input";
import { Badge } from "@/src/Components/ui/badge";
import { Card, CardContent } from "@/src/Components/ui/card";
import { Alert, AlertDescription } from "@/src/Components/ui/alert";
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
  TextInput,
  SelectInput,
  MobileInput,
  TextArea,
} from "@/src/Components/FormComponents";
import {
  Search,
  UserPlus,
  Filter,
  Download,
  MoreHorizontal,
  Building,
  Home,
  Mail,
  ArrowLeft,
  CheckCircle,
  Save,
  ShieldCheck,
  User,
} from "lucide-react";

interface LandlordFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  properties: number;
  status: string;
}

const landlordsData = [
  {
    id: 1,
    name: "Mike Chen",
    email: "mike.chen@email.com",
    avatar: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg",
    status: "Active",
    joinDate: "Feb 3, 2024",
    lastLogin: "1 day ago",
    properties: 5,
    totalRevenue: "$8,500",
    occupancyRate: "95%",
  },
  {
    id: 2,
    name: "Robert Johnson",
    email: "robert.johnson@email.com",
    avatar:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
    status: "Active",
    joinDate: "Jan 5, 2024",
    lastLogin: "1 hour ago",
    properties: 12,
    totalRevenue: "$18,200",
    occupancyRate: "87%",
  },
  {
    id: 3,
    name: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    avatar: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg",
    status: "Active",
    joinDate: "Nov 15, 2023",
    lastLogin: "2 hours ago",
    properties: 8,
    totalRevenue: "$12,800",
    occupancyRate: "100%",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@email.com",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    status: "Active",
    joinDate: "Dec 8, 2023",
    lastLogin: "4 hours ago",
    properties: 3,
    totalRevenue: "$4,200",
    occupancyRate: "92%",
  },
];

export default function LandlordsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LandlordFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      properties: 1,
      status: "active",
    },
  });

  const statsData = [
    { title: "Total Landlords", value: 45, icon: Building },
    { title: "Active Properties", value: 234, icon: Home },
    { title: "Total Revenue", value: "$156k", icon: Mail },
    { title: "Avg. Occupancy", value: "92%", icon: UserPlus },
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

  const onSubmit = async (data: LandlordFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("New Landlord Data:", data);
      setShowSuccess(true);
      reset();
    } catch (error) {
      console.error("Error adding landlord:", error);
    }
  };

  const filteredLandlords = landlordsData.filter(
    (landlord) =>
      landlord.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      landlord.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (showSuccess) {
    return (
      <div className="space-y-8 animate-in fade-in-0 duration-500 max-w-4xl mx-auto">
        <PageHeader
          title="Landlord Added"
          description="Your new property owner has been successfully added to the platform."
          breadcrumbs={[
            {
              label: "Landlords",
              href: "#",
              onClick: () => setShowSuccess(false),
            },
            { label: "Success" },
          ]}
        />

        <Card className="border-0 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
          <div className="h-2 bg-success shadow-[0_0_15px_rgba(var(--success),0.4)]" />
          <CardContent className="p-16 text-center space-y-8">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                <CheckCircle className="w-12 h-12 text-success" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary-gradient rounded-full" />
            </div>

            <div className="space-y-4">
              <h3 className="text-3xl font-extrabold text-foreground tracking-tight">
                Welcome to the Platform!
              </h3>
              <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                The landlord profile has been created. An invitation email has
                been sent to the registered email address.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button
                onClick={() => {
                  setShowSuccess(false);
                  setIsAdding(false);
                }}
                className="bg-primary-gradient text-primary-foreground border-0 h-12 px-10 rounded-2xl shadow-xl hover:shadow-primary/30 transition-all font-bold group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to List
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowSuccess(false);
                  setIsAdding(true);
                  reset();
                }}
                className="border-primary/20 h-12 px-10 rounded-2xl text-primary font-bold hover:bg-primary/5"
              >
                Add Another
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isAdding) {
    return (
      <div className="space-y-8 animate-in fade-in-0 slide-in-from-right-4 duration-500">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsAdding(false)}
            className="rounded-full hover:bg-primary/5 text-primary"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <PageHeader
            title="Add New Landlord"
            description="Create a new property owner profile to manage their properties and tenants."
            breadcrumbs={[
              {
                label: "Landlords",
                href: "#",
                onClick: () => setIsAdding(false),
              },
              { label: "Add New" },
            ]}
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-5xl mx-auto space-y-8 pb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Visual Guide Card */}
            <Card className="lg:col-span-1 border-border shadow-xl h-fit sticky top-6">
              <CardContent className="p-8 space-y-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary-gradient rounded-3xl rotate-12 flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Building className="w-10 h-10 text-primary-foreground -rotate-12" />
                  </div>
                  <h3 className="font-bold text-xl text-foreground">
                    Property Owner
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 font-medium">
                    Standard Landlord Account
                  </p>
                </div>

                <div className="space-y-6 pt-6 border-t border-border">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <ShieldCheck className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        Full Permissions
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        Can manage their own properties and see tenant reports.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        Email Invite
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        The landlord will receive a secure login link instantly.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Form Fields */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-border shadow-xl overflow-hidden">
                <div className="bg-primary-gradient h-1.5 w-full opacity-80" />
                <CardContent className="p-8 space-y-10">
                  <div className="space-y-8">
                    <h3 className="text-base font-bold text-foreground flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <TextInput
                        name="firstName"
                        control={control}
                        label="First Name"
                        placeholder="e.g. Michael"
                        required
                        error={errors.firstName}
                        icon={<User className="w-3 h-3" />}
                      />
                      <TextInput
                        name="lastName"
                        control={control}
                        label="Last Name"
                        placeholder="e.g. Chen"
                        required
                        error={errors.lastName}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                      <TextInput
                        name="email"
                        control={control}
                        label="Email Address"
                        type="email"
                        placeholder="m.chen@example.com"
                        required
                        error={errors.email}
                        icon={<Mail className="w-3 h-3" />}
                      />
                      <MobileInput
                        name="mobile"
                        control={control}
                        label="WhatsApp / Mobile"
                        required
                        error={errors.mobile}
                      />
                    </div>
                  </div>

                  <div className="space-y-8 pt-10 border-t border-border/60">
                    <h3 className="text-base font-bold text-foreground flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Account Configuration
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <TextInput
                        name="properties"
                        control={control}
                        label="Initial Property Count"
                        type="number"
                        placeholder="1"
                        required
                        error={errors.properties}
                        icon={<Building className="w-3 h-3" />}
                      />
                      <SelectInput
                        name="status"
                        control={control}
                        label="Initial Account Status"
                        required
                        error={errors.status}
                        options={[
                          { value: "active", label: "Active (Instant Access)" },
                          { value: "pending", label: "Pending (Admin Review)" },
                        ]}
                      />
                    </div>
                  </div>

                  <div className="pt-10 flex flex-col sm:flex-row items-center gap-4 border-t border-border/60">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:flex-1 h-12 bg-primary-gradient text-primary-foreground border-0 font-bold shadow-xl hover:shadow-primary/30 rounded-2xl group transition-all"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          Creating Landlord...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          Register Landlord
                        </span>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setIsAdding(false)}
                      className="w-full sm:w-auto h-12 px-8 rounded-2xl font-bold hover:bg-secondary/50"
                    >
                      Discard Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <PageHeader
        title="Landlords Management"
        actions={
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-primary-gradient text-primary-foreground shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all duration-300 border-0 rounded-xl font-bold"
          >
            <UserPlus className="mr-2 w-4 h-4" />
            Add Landlord
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
            className="hover:shadow-lg transition-all duration-300 group"
          />
        ))}
      </div>

      {/* Data Table */}
      <div className="border rounded-lg overflow-hidden">
        <DataTableWrapper
          title="All Landlords"
          description="A list of all property owners in your platform."
          searchComponent={
            <div className="relative group/search w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within/search:text-primary transition-colors w-4 h-4" />
              <Input
                placeholder="Search landlords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full h-10 bg-secondary/50 border-border focus:border-primary/50 focus:ring-primary/10 transition-all duration-200 rounded-xl"
              />
            </div>
          }
          actions={
            <div className="flex flex-wrap items-center gap-3">
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
                    Landlord
                  </TableHead>
                  <TableHead className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-widest px-4 py-3">
                    Properties
                  </TableHead>
                  <TableHead className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-widest px-4 py-3">
                    Monthly Revenue
                  </TableHead>
                  <TableHead className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-widest px-4 py-3">
                    Occupancy Rate
                  </TableHead>
                  <TableHead className="text-muted-foreground/60 text-[10px] font-bold uppercase tracking-widest px-4 py-3">
                    Status
                  </TableHead>
                  <TableHead className="w-12 px-4 py-3"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLandlords.map((landlord) => (
                  <TableRow
                    key={landlord.id}
                    className="hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10 border-2 border-primary/10 shadow-sm transition-transform group-hover:scale-105 duration-300">
                          <AvatarImage
                            src={landlord.avatar}
                            alt={landlord.name}
                          />
                          <AvatarFallback className="bg-primary-gradient text-primary-foreground font-bold text-xs uppercase tracking-tighter">
                            {landlord.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {landlord.name}
                          </p>
                          <p className="text-xs text-muted-foreground/80 font-medium">
                            {landlord.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-primary/10 rounded-lg">
                          <Building className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="font-semibold text-muted-foreground/90">
                          {landlord.properties} properties
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-success text-base">
                      {landlord.totalRevenue}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full shadow-[0_0_8px_rgba(var(--success),0.5)]"></div>
                        <span className="text-sm font-semibold text-foreground">
                          {landlord.occupancyRate}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(landlord.status)}>
                        {landlord.status}
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
