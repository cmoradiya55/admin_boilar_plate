"use client";

import { useState } from "react";
import { Button } from "@/src/Components/ui/button";
import { Input } from "@/src/Components/ui/input";
import { Label } from "@/src/Components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/Components/ui/card";
import { LoadingSpinner } from "@/src/Components/common";
import { ArrowLeft, Mail, Shield, CheckCircle } from "lucide-react";

interface ForgotPasswordScreenProps {
  onBackToLogin: () => void;
}

export default function ForgotPasswordScreen({
  onBackToLogin,
}: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setIsEmailSent(true);
  };

  const handleResendEmail = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-background bg-grid-pattern bg-mesh flex items-center justify-center p-4 transition-colors duration-500">
        <Card className="w-full max-w-md shadow-2xl border-0 glass animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-4 w-16 h-16 bg-success rounded-2xl flex items-center justify-center shadow-lg">
              <CheckCircle className="w-8 h-8 text-success-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Check Your Email
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Password reset instructions have been sent
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                <Mail className="w-6 h-6 text-success mx-auto mb-2" />
                <p className="text-sm text-success">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
              </div>

              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or try again.
              </p>

              <Button
                onClick={handleResendEmail}
                variant="outline"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <LoadingSpinner size="sm" />
                    <span>Resending...</span>
                  </div>
                ) : (
                  "Resend Email"
                )}
              </Button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Button
                onClick={onBackToLogin}
                variant="ghost"
                className="w-full text-primary hover:text-primary/90 hover:bg-primary/10"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-grid-pattern bg-mesh flex items-center justify-center p-4 transition-colors duration-500">
      <Card className="w-full max-w-md shadow-2xl border-0 glass animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Reset Password
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Enter your email to receive reset instructions
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground/80"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <LoadingSpinner size="sm" color="white" />
                  <span>Sending Reset Link...</span>
                </div>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <Button
              onClick={onBackToLogin}
              variant="ghost"
              className="w-full text-primary hover:text-primary/90 hover:bg-primary/10 transition-colors"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Sign In
            </Button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Remember your password?
              <button
                onClick={onBackToLogin}
                className="text-primary hover:text-primary/90 ml-1 font-medium transition-colors"
              >
                Sign in instead
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
