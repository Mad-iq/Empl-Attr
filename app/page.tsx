import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart3, Brain, Check, LineChart, Menu, Users } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-center px-4 md:px-8">
          <div className="flex w-full max-w-6xl items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">RetainIQ</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
                How It Works
              </Link>
              <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  Login
                </Button>
              </Link>
              <Button size="sm" className="hidden sm:flex">
                Request Demo
              </Button>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-6">
        <section className="w-full py-12 md:py-20 lg:py-28 bg-gradient-to-b from-background to-muted/50">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="flex flex-col items-center space-y-8 text-center">
              <Badge className="px-3 py-1 text-sm" variant="secondary">
                AI-Powered Retention Platform
              </Badge>
              <div className="space-y-2 max-w-4xl">
                <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-5xl">
                  Reduce Employee Attrition with AI-Powered Insights
                </h1>
                <p className="mx-auto max-w-[800px] text-muted-foreground text-lg md:text-xl">
                  Identify at-risk employees, understand key attrition factors, and implement effective retention
                  strategies with our AI-driven platform.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 min-w-[200px]">
                <Button size="lg" className="inline-flex items-center px-8">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="px-8">
                  Learn More
                </Button>
              </div>
              <div className="relative w-full max-w-4xl mt-8 aspect-video rounded-xl shadow-2xl">
                <Image
                  src="/dashboard.png"
                  alt="RetainIQ Dashboard Preview"
                  width={1280}
                  height={800}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-20 bg-background">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Badge className="px-3 py-1 text-sm" variant="outline">
                Key Features
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">Powerful Tools to Reduce Attrition</h2>
              <p className="max-w-[800px] text-muted-foreground text-lg">
                Our platform provides comprehensive tools to help you understand and reduce employee attrition.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 p-4">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI-Driven Prediction</h3>
                <p className="text-center text-muted-foreground">
                  Predict which employees are at risk of leaving before they do.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 p-4">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Real-time Dashboard</h3>
                <p className="text-center text-muted-foreground">
                  Monitor key metrics and trends in real-time with interactive dashboards.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 p-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Employee Profiles</h3>
                <p className="text-center text-muted-foreground">
                  Deep dive into individual employee profiles to understand risk factors.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 p-4">
                  <LineChart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Feedback Analysis</h3>
                <p className="text-center text-muted-foreground">
                  Analyze employee feedback to identify improvement areas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-20 bg-muted/50">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Badge className="px-3 py-1 text-sm" variant="outline">
                Simple Process
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">How It Works</h2>
              <p className="max-w-[800px] text-muted-foreground text-lg">
                Our simple process helps you identify and address attrition risks.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-8 md:grid-cols-3">
              <div className="relative flex flex-col items-center space-y-4 rounded-xl border bg-card p-8 shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="text-xl font-bold">Connect Your Data</h3>
                <p className="text-center text-muted-foreground">
                  Integrate with your HRIS or upload employee data to get started.
                </p>
                <div className="hidden md:block absolute -right-12 top-1/2 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-8 w-8 text-muted-foreground/30" />
                </div>
              </div>
              <div className="relative flex flex-col items-center space-y-4 rounded-xl border bg-card p-8 shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  2
                </div>
                <h3 className="text-xl font-bold">AI Analysis</h3>
                <p className="text-center text-muted-foreground">
                  Our AI analyzes patterns and identifies employees at risk of leaving.
                </p>
                <div className="hidden md:block absolute -right-12 top-1/2 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-8 w-8 text-muted-foreground/30" />
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-xl border bg-card p-8 shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Take Action</h3>
                <p className="text-center text-muted-foreground">
                  Implement recommended retention strategies to reduce attrition.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-20 bg-background">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Badge className="px-3 py-1 text-sm" variant="outline">
                Pricing
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">Pricing Plans</h2>
              <p className="max-w-[800px] text-muted-foreground text-lg">
                Choose the plan that's right for your organization.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-8 md:grid-cols-3">
              <div className="flex flex-col rounded-xl border bg-card p-8 shadow-sm transition-all hover:shadow-md">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Starter</h3>
                  <p className="text-muted-foreground">For small teams getting started</p>
                </div>
                <div className="mt-6 flex items-baseline text-4xl font-bold">
                  $99<span className="text-muted-foreground text-sm font-normal ml-1">/month</span>
                </div>
                <ul className="mt-8 space-y-4 text-sm">
                  <li className="flex items-start">
                    <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Up to 50 employees</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Basic dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Button className="mt-8 w-full">Get Started</Button>
              </div>
              <div className="flex flex-col rounded-xl border-2 border-primary bg-card p-8 shadow-md relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="px-3 py-1 text-sm bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Professional</h3>
                  <p className="text-muted-foreground">For growing organizations</p>
                </div>
                <div className="mt-6 flex items-baseline text-4xl font-bold">
                  $299<span className="text-muted-foreground text-sm font-normal ml-1">/month</span>
                </div>
                <ul className="mt-8 space-y-4 text-sm">
                  <li className="flex items-start">
                    <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Up to 250 employees</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Advanced dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Custom reports</span>
                  </li>
                </ul>
                <Button className="mt-8 w-full">Get Started</Button>
              </div>
              <div className="flex flex-col rounded-xl border bg-card p-8 shadow-sm transition-all hover:shadow-md">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <p className="text-muted-foreground">For large organizations</p>
                </div>
                <div className="mt-6 flex items-baseline text-4xl font-bold">
                  Custom<span className="text-muted-foreground text-sm font-normal ml-1">/month</span>
                </div>
                <ul className="mt-8 space-y-4 text-sm">
                  <li className="flex items-start">
                    <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Unlimited employees</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Advanced analytics</span>
                  </li>
                </ul>
                <Button className="mt-8 w-full">Contact Sales</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 bg-muted/50">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Badge className="px-3 py-1 text-sm" variant="outline">
                Testimonials
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">Trusted by HR Leaders</h2>
              <p className="max-w-[800px] text-muted-foreground text-lg">
                See what our customers have to say about RetainIQ.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-medium">JD</span>
                  </div>
                  <div>
                    <p className="font-medium">Jane Doe</p>
                    <p className="text-sm text-muted-foreground">HR Director, Tech Co.</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "RetainIQ has helped us reduce our attrition rate by 35% in just six months. The AI predictions are remarkably accurate."
                </p>
              </div>
              <div className="flex flex-col rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-medium">MS</span>
                  </div>
                  <div>
                    <p className="font-medium">Michael Smith</p>
                    <p className="text-sm text-muted-foreground">CHRO, Finance Inc.</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "The insights we've gained from RetainIQ have transformed our retention strategies. Worth every penny."
                </p>
              </div>
              <div className="flex flex-col rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-medium">AL</span>
                  </div>
                  <div>
                    <p className="font-medium">Amanda Lee</p>
                    <p className="text-sm text-muted-foreground">People Ops, Startup XYZ</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "Even as a small startup, RetainIQ has been invaluable. We've saved thousands in recruitment costs."
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="w-full py-12 md:py-20 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
                Ready to Reduce Employee Attrition?
              </h2>
              <p className="max-w-[800px] text-primary-foreground/80 text-lg">
                Join hundreds of companies that have transformed their retention strategies with RetainIQ.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" className="px-8">
                  Request Demo
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10 px-8">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-12 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">RetainIQ</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                AI-powered employee attrition management platform helping organizations reduce turnover and build stronger teams.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-bold">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-bold">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-bold">Connect</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} RetainIQ. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}