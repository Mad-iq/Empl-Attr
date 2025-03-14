import Image from "next/image"
import { AlertCircle, Calendar, FileText, Plus, TrendingDown, TrendingUp, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Overview of your organization&apos;s attrition metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 days
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Attrition Rate</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-destructive">+2.1%</span> from last month
            </p>
            <Progress value={12.5} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+1.2%</span> from last month
            </p>
            <Progress value={87.5} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Employees</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-destructive">+5</span> from last month
            </p>
            <Progress value={24} max={200} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+12</span> new this month
            </p>
            <Progress value={1284} max={1500} className="mt-2" />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Department-wise Attrition Heatmap</CardTitle>
            <CardDescription>Attrition rates across different departments in your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-destructive"></div>
                    <span className="text-sm font-medium">Engineering</span>
                  </div>
                  <span className="text-sm font-medium">18.2%</span>
                </div>
                <Progress value={18.2} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    <span className="text-sm font-medium">Sales</span>
                  </div>
                  <span className="text-sm font-medium">15.7%</span>
                </div>
                <Progress value={15.7} className="h-2 bg-muted" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    <span className="text-sm font-medium">Marketing</span>
                  </div>
                  <span className="text-sm font-medium">12.3%</span>
                </div>
                <Progress value={12.3} className="h-2 bg-muted" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium">Customer Support</span>
                  </div>
                  <span className="text-sm font-medium">10.8%</span>
                </div>
                <Progress value={10.8} className="h-2 bg-muted" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">HR</span>
                  </div>
                  <span className="text-sm font-medium">5.2%</span>
                </div>
                <Progress value={5.2} className="h-2 bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent High-Risk Employees</CardTitle>
            <CardDescription>Employees with high attrition risk scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-medium">JM</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Jane Miller</p>
                  <p className="text-xs text-muted-foreground">Engineering • Senior Developer</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/20 text-destructive">
                  <span className="text-xs font-medium">92%</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-medium">TS</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Tom Smith</p>
                  <p className="text-xs text-muted-foreground">Sales • Account Executive</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/20 text-destructive">
                  <span className="text-xs font-medium">87%</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-medium">AJ</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Alex Johnson</p>
                  <p className="text-xs text-muted-foreground">Marketing • Manager</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/20 text-destructive">
                  <span className="text-xs font-medium">85%</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-medium">RB</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Rachel Brown</p>
                  <p className="text-xs text-muted-foreground">Customer Support • Lead</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                  <span className="text-xs font-medium">78%</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All High-Risk Employees
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
            <Button className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" />
              Add New Employee
            </Button>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Attrition Trends</CardTitle>
            <CardDescription>Monthly attrition rate over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <Image
                src="/placeholder.svg?height=200&width=800"
                alt="Attrition Trends Chart"
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

