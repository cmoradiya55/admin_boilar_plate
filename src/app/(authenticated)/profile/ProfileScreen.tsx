"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/src/Components/ui/button";
import { Label } from "@/src/Components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/Components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/Components/ui/avatar";
import { TextInput } from "@/src/Components/FormComponents";
import {
  Save,
  Camera,
  User as UserIcon,
  Mail,
  Shield,
  Info,
} from "lucide-react";
import { LoadingSpinner, PageHeader } from "@/src/Components/common";
import { useToast } from "@/src/hooks/use-toast";

interface ProfileScreenProps {
  onBack: () => void;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  onUpdateUser?: (userData: { name: string; email: string }) => void;
}

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
}

export default function ProfileScreen({
  onBack,
  user,
  onUpdateUser,
}: ProfileScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(
    "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
  );
  const { toast } = useToast();

  const nameParts = user?.name?.split(" ") || ["John", "Smith"];
  const initialFirstName = nameParts[0] || "John";
  const initialLastName = nameParts.slice(1).join(" ") || "Smith";

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: initialFirstName,
      lastName: initialLastName,
      email: user?.email || "john.smith@email.com",
    },
  });

  // Reset form when user prop changes
  useEffect(() => {
    if (user) {
      const parts = user.name?.split(" ") || ["", ""];
      reset({
        firstName: parts[0] || "",
        lastName: parts.slice(1).join(" ") || "",
        email: user.email || "",
      });
    }
  }, [user, reset]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (onUpdateUser) {
        onUpdateUser({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
        });
      }

      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      toast({
        title: "Photo Updated",
        description: "Your profile photo has been changed.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile Settings"
        description="Manage your personal information and account settings."
        breadcrumbs={[
          { label: "Dashboard", href: "#" },
          { label: "Profile", href: "#" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Preview */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-border bg-card/40 backdrop-blur-md overflow-hidden shadow-xl">
            <div className="h-24 bg-primary-gradient opacity-80" />
            <CardContent className="p-6 -mt-12 text-center">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-primary-gradient rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <Avatar className="w-32 h-32 border-4 border-background relative shadow-2xl">
                    <AvatarImage
                      src={avatar}
                      alt={user?.name || "User"}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                      {user?.name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-1 right-1 rounded-xl w-10 h-10 p-0 bg-primary hover:bg-primary/90 shadow-xl text-primary-foreground border-2 border-background transition-transform hover:scale-110"
                  >
                    <Camera className="w-5 h-5" />
                  </Button>
                </div>

                <h2 className="mt-4 text-xl font-bold text-foreground">
                  {user?.name || `${initialFirstName} ${initialLastName}`}
                </h2>
                <p className="text-sm text-muted-foreground/60 flex items-center justify-center gap-1.5 mt-1">
                  <Mail className="w-3.5 h-3.5" />
                  {user?.email || "john.smith@email.com"}
                </p>

                {user?.role && (
                  <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold bg-primary/10 text-primary border border-primary/20 uppercase tracking-widest">
                    <Shield className="w-3.5 h-3.5" />
                    {user.role}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-primary/20">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" />
                Account Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground/60">Member since</span>
                  <span className="font-semibold">Jan 2024</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground/60">
                    Security level
                  </span>
                  <span className="font-semibold text-success">High</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground/60">Status</span>
                  <span className="font-semibold text-primary italic">
                    Verified Member
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Settings Form */}
        <div className="lg:col-span-2">
          <Card className="border-border shadow-md h-full flex flex-col">
            <CardHeader className="border-b border-border/50 bg-secondary/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <UserIcon className="w-4 h-4" />
                </div>
                <CardTitle className="text-base font-bold text-primary">
                  Personal Information
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8 flex-1">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8 h-full flex flex-col"
              >
                <div className="space-y-6 flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <TextInput
                      name="firstName"
                      control={control}
                      label="First Name"
                      placeholder="Enter your first name"
                      required
                      error={errors.firstName}
                    />

                    <TextInput
                      name="lastName"
                      control={control}
                      label="Last Name"
                      placeholder="Enter your last name"
                      required
                      error={errors.lastName}
                    />
                  </div>

                  <TextInput
                    name="email"
                    type="email"
                    control={control}
                    label="Email Address"
                    placeholder="Enter your email address"
                    required
                    error={errors.email}
                  />

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>

                <div className="flex items-center gap-4 pt-8 border-t border-border/50">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 h-12 bg-primary-gradient text-primary-foreground font-bold shadow-xl hover:shadow-primary/20 transition-all rounded-xl border-0"
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner className="mr-2" />
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={onBack}
                    disabled={isLoading}
                    className="h-12 px-8 border-border bg-secondary/20 text-foreground hover:bg-secondary/40 font-bold rounded-xl transition-all"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
