"use client" // Indicates that this component is a client-side component

// Import necessary libraries and components
import type React from "react" // Type import for React
import { useState } from "react" // React hook for managing state
import Image from "next/image" // Next.js component for optimized images
import Link from "next/link" // Next.js component for client-side navigation
import { Users } from "lucide-react" // Icon component for the app logo
import { supabase } from "@/lib/supabase" // Supabase client for authentication
import { Button } from "@/components/ui/button" // Custom button component
import { Checkbox } from "@/components/ui/checkbox" // Custom checkbox component
import { Input } from "@/components/ui/input" // Custom input component
import { Label } from "@/components/ui/label" // Custom label component

/**
 * LoginPage component renders a login form for user authentication.
 * 
 * This component includes fields for email, password, and a "remember me" checkbox.
 * It also provides links for creating a new account and resetting the password.
 * On successful login, the user is redirected to the dashboard.
 * 
 * @component
 * 
 * @returns {JSX.Element} The rendered login page component.
 * 
 * @remarks
 * - Uses `useState` to manage form state for email, password, and remember me checkbox.
 * - Handles form submission with `handleSubmit` function, which integrates with Supabase for authentication.
 * - Includes Tailwind CSS classes for styling.
 * - Redirects to `/dashboard` upon successful login.
 * 
 * @dependencies
 * - `supabase.auth.signInWithPassword` for authentication.
 * - `Link` for navigation between pages.
 * - `Input`, `Label`, `Checkbox`, and `Button` components for form elements.
 * - `Image` for displaying a background image on larger screens.
 * 
 * @example
 * ```tsx
 * import LoginPage from './login/page';
 * 
 * function App() {
 *   return <LoginPage />;
 * }
 * ```
 */
export default function LoginPage() {
  // State variables to manage form inputs
  const [email, setEmail] = useState("") // State for email input
  const [password, setPassword] = useState("") // State for password input
  const [rememberMe, setRememberMe] = useState(false) // State for "remember me" checkbox

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent default form submission behavior

    // Call Supabase's signInWithPassword method to authenticate the user
    const { data, error } = await supabase.auth.signInWithPassword({
      email, // Email entered by the user
      password, // Password entered by the user
    })

    // Handle errors during login
    if (error) {
      alert(error.message) // Show an alert with the error message
      return
    }

    // Redirect to the dashboard on successful login
    window.location.href = "/dashboard"
  }

  // Render the login page UI
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
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Or{" "}
              <Link href="/signup" className="font-medium text-primary hover:underline">
                create a new account
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

              {/* Remember me checkbox and forgot password link */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)} // Update remember me state
                  />
                  <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                    Remember me
                  </Label>
                </div>

                <div className="text-sm">
                  <Link href="#" className="font-medium text-primary hover:underline">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              {/* Submit button */}
              <Button type="submit" className="w-full">
                Sign in
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
          alt="Employee collaboration" // Alt text for the image
          width={1920}
          height={1080}
        />
      </div>
    </div>
  )
}

