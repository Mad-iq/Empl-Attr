import Image from "next/image" // Next.js component for optimized images
import { AlertCircle, Calendar, FileText, Plus, TrendingDown, TrendingUp, Users } from "lucide-react" // Icons for UI elements

import { Button } from "@/components/ui/button" // Custom button component
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card" // Card components for structured content
import { Progress } from "@/components/ui/progress" // Progress bar component

/**
 * DashboardPage Component
 *
 * This component renders the main dashboard page of the application, providing an overview
 * of organizational attrition metrics and related data. It includes various sections such as
 * key metrics, department-wise attrition heatmap, high-risk employees, quick actions, and
 * attrition trends.
 *
 * @returns {JSX.Element} The rendered dashboard page.
 *
 * ## Layout:
 * - **Header Section**: Displays the title "Dashboard" and a button to filter data by time range.
 * - **Key Metrics Section**: Shows cards with metrics like overall attrition rate, retention rate,
 *   high-risk employees, and total employees.
 * - **Heatmap Section**: Displays a department-wise attrition heatmap with progress bars.
 * - **High-Risk Employees Section**: Lists employees with high attrition risk scores.
 * - **Quick Actions Section**: Provides buttons for generating reports, scheduling meetings, and
 *   adding new employees.
 * - **Attrition Trends Section**: Displays a placeholder chart for monthly attrition trends.
 *
 * ## Components Used:
 * - `Button`: For interactive actions like filtering data or performing quick actions.
 * - `Card`: For displaying grouped information in a structured format.
 * - `CardHeader`, `CardContent`, `CardFooter`: Subcomponents for organizing card content.
 * - `Progress`: For visualizing percentage-based metrics.
 * - `Image`: For displaying the placeholder chart in the trends section.
 *
 * ## Props:
 * This component does not accept any props.
 *
 * ## Notes:
 * - The component uses Tailwind CSS classes for styling.
 * - Placeholder content (e.g., chart image) is used for demonstration purposes.
 */
export default function DashboardPage() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2> {/* Dashboard title */}
          <p className="text-muted-foreground">Overview of your organization&apos;s attrition metrics</p> {/* Subtitle */}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" /> {/* Calendar icon */}
            Last 30 days {/* Time range filter */}
          </Button>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Overall Attrition Rate Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Attrition Rate</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" /> {/* Downward trend icon */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div> {/* Attrition rate */}
            <p className="text-xs text-muted-foreground">
              <span className="text-destructive">+2.1%</span> from last month {/* Change from last month */}
            </p>
            <Progress value={12.5} className="mt-2" /> {/* Progress bar */}
          </CardContent>
        </Card>

        {/* Retention Rate Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" /> {/* Upward trend icon */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5%</div> {/* Retention rate */}
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+1.2%</span> from last month {/* Change from last month */}
            </p>
            <Progress value={87.5} className="mt-2" /> {/* Progress bar */}
          </CardContent>
        </Card>

        {/* High Risk Employees Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Employees</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" /> {/* Alert icon */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div> {/* Number of high-risk employees */}
            <p className="text-xs text-muted-foreground">
              <span className="text-destructive">+5</span> from last month {/* Change from last month */}
            </p>
            <Progress value={24} max={200} className="mt-2" /> {/* Progress bar */}
          </CardContent>
        </Card>

        {/* Total Employees Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" /> {/* Users icon */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div> {/* Total employees */}
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+12</span> new this month {/* Change from last month */}
            </p>
            <Progress value={1284} max={1500} className="mt-2" /> {/* Progress bar */}
          </CardContent>
        </Card>
      </div>

      {/* Heatmap Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Department-wise Attrition Heatmap</CardTitle> {/* Heatmap title */}
            <CardDescription>Attrition rates across different departments in your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Engineering Department */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-destructive"></div> {/* Red indicator */}
                    <span className="text-sm font-medium">Engineering</span>
                  </div>
                  <span className="text-sm font-medium">18.2%</span> {/* Attrition rate */}
                </div>
                <Progress value={18.2} className="h-2" /> {/* Progress bar */}
              </div>

              {/* Sales Department */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500"></div> {/* Amber indicator */}
                    <span className="text-sm font-medium">Sales</span>
                  </div>
                  <span className="text-sm font-medium">15.7%</span> {/* Attrition rate */}
                </div>
                <Progress value={15.7} className="h-2 bg-muted" /> {/* Progress bar */}
              </div>

              {/* Marketing Department */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div> {/* Yellow indicator */}
                    <span className="text-sm font-medium">Marketing</span>
                  </div>
                  <span className="text-sm font-medium">12.3%</span> {/* Attrition rate */}
                </div>
                <Progress value={12.3} className="h-2 bg-muted" /> {/* Progress bar */}
              </div>

              {/* Customer Support Department */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div> {/* Blue indicator */}
                    <span className="text-sm font-medium">Customer Support</span>
                  </div>
                  <span className="text-sm font-medium">10.8%</span> {/* Attrition rate */}
                </div>
                <Progress value={10.8} className="h-2 bg-muted" /> {/* Progress bar */}
              </div>

              {/* HR Department */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div> {/* Green indicator */}
                    <span className="text-sm font-medium">HR</span>
                  </div>
                  <span className="text-sm font-medium">5.2%</span> {/* Attrition rate */}
                </div>
                <Progress value={5.2} className="h-2 bg-muted" /> {/* Progress bar */}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* High-Risk Employees Section */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent High-Risk Employees</CardTitle> {/* Section title */}
            <CardDescription>Employees with high attrition risk scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Employee 1 */}
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-medium">JM</span> {/* Employee initials */}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Jane Miller</p> {/* Employee name */}
                  <p className="text-xs text-muted-foreground">Engineering • Senior Developer</p> {/* Department and role */}
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/20 text-destructive">
                  <span className="text-xs font-medium">92%</span> {/* Risk score */}
                </div>
              </div>

              {/* Employee 2 */}
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-medium">TS</span> {/* Employee initials */}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Tom Smith</p> {/* Employee name */}
                  <p className="text-xs text-muted-foreground">Sales • Account Executive</p> {/* Department and role */}
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/20 text-destructive">
                  <span className="text-xs font-medium">87%</span> {/* Risk score */}
                </div>
              </div>

              {/* Employee 3 */}
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-medium">AJ</span> {/* Employee initials */}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Alex Johnson</p> {/* Employee name */}
                  <p className="text-xs text-muted-foreground">Marketing • Manager</p> {/* Department and role */}
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/20 text-destructive">
                  <span className="text-xs font-medium">85%</span> {/* Risk score */}
                </div>
              </div>

              {/* Employee 4 */}
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-medium">RB</span> {/* Employee initials */}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Rachel Brown</p> {/* Employee name */}
                  <p className="text-xs text-muted-foreground">Customer Support • Lead</p> {/* Department and role */}
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                  <span className="text-xs font-medium">78%</span> {/* Risk score */}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All High-Risk Employees {/* Button to view all */}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Actions and Attrition Trends Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions Section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Quick Actions</CardTitle> {/* Section title */}
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" /> {/* File icon */}
              Generate Report {/* Button label */}
            </Button>
            <Button className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" /> {/* Calendar icon */}
              Schedule Meeting {/* Button label */}
            </Button>
            <Button className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" /> {/* Plus icon */}
              Add New Employee {/* Button label */}
            </Button>
          </CardContent>
        </Card>

        {/* Attrition Trends Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Attrition Trends</CardTitle> {/* Section title */}
            <CardDescription>Monthly attrition rate over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <Image
                src="/placeholder.svg?height=200&width=800" // Placeholder image
                alt="Attrition Trends Chart" // Alt text for the image
                width={800}
                height={200}
                className="object-cover"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

