/**
 * SignupPage Component
 *
 * This component renders a signup page for user registration. It includes a form
 * where users can input their email, password, and confirm their password to create
 * an account. The form validates that the passwords match before submitting the data
 * to the Supabase authentication service.
 *
 * Features:
 * - Email, password, and confirm password input fields.
 * - Password matching validation.
 * - Integration with Supabase for user signup.
 * - Redirects to the login page upon successful signup.
 * - Displays error messages for invalid inputs or signup errors.
 * - Includes a link to navigate to the login page for existing users.
 *
 * @component
 * @returns {JSX.Element} The rendered signup page component.
 *
 * @example
 * ```tsx
 * import SignupPage from "@/app/signup/page";
 *
 * export default function App() {
 *   return <SignupPage />;
 * }
 * ```
 */
"use client"; // Indicates that this component is a client-side component

// Import necessary libraries and components
import type React from "react"; // Type import for React
import { useState } from "react"; // React hook for managing state
import Image from "next/image"; // Next.js component for optimized images
import Link from "next/link"; // Next.js component for client-side navigation
import { Users } from "lucide-react"; // Icon component for the app logo
import { supabase } from "@/lib/supabase"; // Supabase client for authentication
import { Button } from "@/components/ui/button"; // Custom button component
import { Input } from "@/components/ui/input"; // Custom input component
import { Label } from "@/components/ui/label"; // Custom label component

// Main SignupPage component
export default function SignupPage() {
  // State variables to manage form inputs
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password input

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!"); // Show an alert if passwords don't match
      return;
    }

    // Call Supabase's signUp method to create a new user
    const { data, error } = await supabase.auth.signUp({
      email, // Email entered by the user
      password, // Password entered by the user
    });

    // Handle errors during signup
    if (error) {
      alert(error.message); // Show an alert with the error message
      return;
    }

    // Show success message and redirect to the login page
    alert("Signup successful! Check your email for confirmation.");
    window.location.href = "/login"; // Redirect to the login page
  };

  // Render the signup page UI
  return (
    <div className="flex min-h-screen">
      {/* Left section: Form container */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Header section with logo and title */}
          <div className="flex flex-col items-center">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
              <Users className="h-6 w-6 text-primary" /> {/* App logo */}
              <span>RetainIQ</span> {/* App name */}
            </Link>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Or{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                sign in to your account
              </Link>
            </p>
          </div>

          {/* Form section */}
          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email input field */}
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                  required
                  className="mt-1"
                />
              </div>

              {/* Password input field */}
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                  required
                  className="mt-1"
                />
              </div>

              {/* Confirm password input field */}
              <div>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
                  required
                  className="mt-1"
                />
              </div>

              {/* Submit button */}
              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Right section: Image container */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="/placeholder.svg?height=1080&width=1920" // Placeholder image
          alt="Employee engagement" // Alt text for the image
          width={1920}
          height={1080}
        />
      </div>
    </div>
  );
}

