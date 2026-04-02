"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/src/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/Components/ui/card";
import { Alert, AlertDescription } from "@/src/Components/ui/alert";
import { PageHeader, LoadingSpinner } from "@/src/Components/common";
import { TextInput } from "@/src/Components/FormComponents";
import { CheckCircle, ArrowLeft, Key, ShieldCheck, Lock, RefreshCw, Type, Hash } from "lucide-react";
import { useToast } from "@/src/hooks/use-toast";

interface ChangePasswordScreenProps {
  onBack?: () => void;
}

interface ChangePasswordFormData {
  currentPassword: "";
  newPassword: "";
  confirmPassword: "";
}

export default function ChangePasswordScreen({
  onBack,
}: ChangePasswordScreenProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const onSubmit = async (data: ChangePasswordFormData) => {
    setIsLoading(true);
    setSuccess(false);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(true);
      reset();

      toast({
        title: "Password Changed",
        description: "Your password has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
      <div className="flex items-center gap-4">
        {onBack && (
          <Button
            variant="outline"
            size="icon"
            onClick={onBack}
            className="rounded-xl border-border bg-card/50 hover:bg-secondary transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </Button>
        )}
        <PageHeader
          title="Security Center"
          description="Protect your account by regularly updating your credentials."
          breadcrumbs={[
            { label: "Settings", href: "#" },
            { label: "Security", href: "#" },
            { label: "Change Password" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Security Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border bg-card shadow-xl overflow-hidden border-t-4 border-t-primary">
            <CardHeader className="p-8 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-[10px] font-bold uppercase tracking-widest mb-3 border border-success/20">
                    <ShieldCheck className="w-3 h-3" />
                    Secure Connection
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    Update Security Key
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/60 text-sm mt-1">
                    Your password must be at least 8 characters long and include a variety of characters.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {success && (
                  <Alert className="border-success/20 bg-success/5 animate-in zoom-in-95 duration-500">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-success" />
                      </div>
                      <AlertDescription className="text-success font-semibold">
                        Your password was successfully updated. You're all set!
                      </AlertDescription>
                    </div>
                  </Alert>
                )}

                <div className="space-y-8">
                  {/* Authentication Section */}
                  <div className="p-5 rounded-2xl bg-secondary/10 border border-border/50">
                     <div className="flex items-center gap-3 mb-5">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                           <Lock className="w-4 h-4 text-primary" />
                        </div>
                        <h4 className="text-sm font-bold text-foreground italic">Current Authentication</h4>
                     </div>
                    <TextInput
                      name="currentPassword"
                      type="password"
                      control={control}
                      label="Your Current Password"
                      placeholder="••••••••••••"
                      required
                      error={errors.currentPassword}
                    />
                  </div>

                  {/* New Credentials Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                           <RefreshCw className="w-4 h-4 text-primary" />
                        </div>
                        <h4 className="text-sm font-bold text-foreground italic">New Security Credentials</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <TextInput
                        name="newPassword"
                        type="password"
                        control={control}
                        label="New Password"
                        placeholder="••••••••••••"
                        required
                        rules={{
                          minLength: {
                            value: 8,
                            message: "Minimum 8 characters required",
                          },
                          validate: (value: string) =>
                            value !== watch("currentPassword") ||
                            "New password must be different",
                        }}
                        error={errors.newPassword}
                      />

                      <TextInput
                        name="confirmPassword"
                        type="password"
                        control={control}
                        label="Confirm New Password"
                        placeholder="••••••••••••"
                        required
                        rules={{
                          validate: (value: string) =>
                            value === watch("newPassword") ||
                            "Passwords do not match",
                        }}
                        error={errors.confirmPassword}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-8 border-t border-border">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 h-12 bg-primary-gradient text-primary-foreground font-bold shadow-xl hover:shadow-primary/20 transition-all rounded-xl border-0"
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner className="mr-2" />
                        Updating Key...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        Confirm Security Change
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => reset()}
                    disabled={isLoading}
                    className="h-12 px-8 border-border bg-secondary/20 text-foreground hover:bg-secondary/40 font-bold rounded-xl transition-all"
                  >
                    Clear Form
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Security Sidebar */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-muted-foreground/60 uppercase tracking-widest pl-1 mb-2">
            Security Guidelines
          </h3>
          
          <Card className="border-success/20 bg-success/[0.02] shadow-sm hover:bg-success/[0.05] transition-colors group">
            <CardContent className="p-5 flex items-start gap-4">
               <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center border border-success/20 group-hover:scale-110 transition-transform">
                  <Type className="w-5 h-5 text-success" />
               </div>
               <div>
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-tight">Mix Characters</h4>
                  <p className="text-[11px] text-muted-foreground/60 mt-1 leading-relaxed">
                    Use combinations of uppercase, lowercase, numbers, and symbols.
                  </p>
               </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/[0.02] shadow-sm hover:bg-primary/[0.05] transition-colors group">
            <CardContent className="p-5 flex items-start gap-4">
               <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                  <Key className="w-5 h-5 text-primary" />
               </div>
               <div>
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-tight">Length Matters</h4>
                  <p className="text-[11px] text-muted-foreground/60 mt-1 leading-relaxed">
                    At least 8 characters is standard, but 12+ is significantly more secure.
                  </p>
               </div>
            </CardContent>
          </Card>

          <Card className="border-warning/20 bg-warning/[0.02] shadow-sm hover:bg-warning/[0.05] transition-colors group">
            <CardContent className="p-5 flex items-start gap-4">
               <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center border border-warning/20 group-hover:scale-110 transition-transform">
                  <Hash className="w-5 h-5 text-warning" />
               </div>
               <div>
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-tight">Unique Passwords</h4>
                  <p className="text-[11px] text-muted-foreground/60 mt-1 leading-relaxed">
                    Avoid using passwords you use for email, banking, or social media.
                  </p>
               </div>
            </CardContent>
          </Card>

          <div className="p-6 rounded-2xl border border-dashed border-border flex items-center gap-4 mt-6">
             <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-muted-foreground/40" />
             </div>
             <p className="text-[10px] text-muted-foreground italic leading-tight">
                All passwords are encrypted with AES-256 before being stored in our secure vault.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
