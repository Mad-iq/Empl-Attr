"use client"

import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for employee profiles
const employees = [
  {
    id: 1,
    name: "Jane Miller",
    department: "Engineering",
    position: "Senior Developer",
    riskScore: 92,
    avatar: "JM",
  },
  {
    id: 2,
    name: "Tom Smith",
    department: "Sales",
    position: "Account Executive",
    riskScore: 87,
    avatar: "TS",
  },
  {
    id: 3,
    name: "Alex Johnson",
    department: "Marketing",
    position: "Manager",
    riskScore: 85,
    avatar: "AJ",
  },
  {
    id: 4,
    name: "Rachel Brown",
    department: "Customer Support",
    position: "Lead",
    riskScore: 78,
    avatar: "RB",
  },
  {
    id: 5,
    name: "Michael Chen",
    department: "Engineering",
    position: "Developer",
    riskScore: 45,
    avatar: "MC",
  },
  {
    id: 6,
    name: "Sarah Wilson",
    department: "HR",
    position: "Specialist",
    riskScore: 32,
    avatar: "SW",
  },
  {
    id: 7,
    name: "David Lee",
    department: "Finance",
    position: "Analyst",
    riskScore: 28,
    avatar: "DL",
  },
  {
    id: 8,
    name: "Emily Davis",
    department: "Product",
    position: "Manager",
    riskScore: 22,
    avatar: "ED",
  },
]

export default function EmployeeProfilesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDepartment === "all" || employee.department === selectedDepartment),
  )

  const departments = ["Engineering", "Sales", "Marketing", "Customer Support", "HR", "Finance", "Product"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Employee Profiles</h2>
          <p className="text-muted-foreground">View and manage employee profiles and attrition risk</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-1/3">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search employees..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <Select value={selectedDepartment} onValueChange={(value) => setSelectedDepartment(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  {filteredEmployees.map((employee) => (
                    <div
                      key={employee.id}
                      className={`flex cursor-pointer items-center gap-4 rounded-lg p-3 transition-colors ${
                        selectedEmployee === employee.id ? "bg-muted" : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedEmployee(employee.id)}
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">{employee.avatar}</span>
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{employee.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {employee.department} • {employee.position}
                        </p>
                      </div>
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                          employee.riskScore > 80
                            ? "bg-destructive/20 text-destructive"
                            : employee.riskScore > 60
                              ? "bg-amber-500/20 text-amber-500"
                              : employee.riskScore > 40
                                ? "bg-yellow-500/20 text-yellow-500"
                                : "bg-green-500/20 text-green-500"
                        }`}
                      >
                        {employee.riskScore}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-2/3">
          {selectedEmployee ? (
            <EmployeeDetail employee={employees.find((e) => e.id === selectedEmployee)!} />
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border border-dashed p-8">
              <div className="text-center">
                <h3 className="text-lg font-medium">No Employee Selected</h3>
                <p className="text-muted-foreground">Select an employee from the list to view their details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function EmployeeDetail({ employee }: { employee: (typeof employees)[0] }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xl font-medium">{employee.avatar}</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold">{employee.name}</h3>
            <p className="text-muted-foreground">
              {employee.department} • {employee.position}
            </p>
          </div>
          <div className="ml-auto">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-medium ${
                employee.riskScore > 80
                  ? "bg-destructive/20 text-destructive"
                  : employee.riskScore > 60
                    ? "bg-amber-500/20 text-amber-500"
                    : employee.riskScore > 40
                      ? "bg-yellow-500/20 text-yellow-500"
                      : "bg-green-500/20 text-green-500"
              }`}
            >
              {employee.riskScore}%
            </div>
          </div>
        </div>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="risk-factors">Risk Factors</TabsTrigger>
            <TabsTrigger value="retention">Retention Strategies</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium">Personal Information</h4>
                <div className="rounded-lg border p-3">
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                      <dd className="text-sm">{employee.name.toLowerCase().replace(" ", ".")}@company.com</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                      <dd className="text-sm">(555) 123-4567</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-muted-foreground">Location</dt>
                      <dd className="text-sm">San Francisco, CA</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-muted-foreground">Hire Date</dt>
                      <dd className="text-sm">Jan 15, 2020</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Employment Details</h4>
                <div className="rounded-lg border p-3">
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-muted-foreground">Department</dt>
                      <dd className="text-sm">{employee.department}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-muted-foreground">Position</dt>
                      <dd className="text-sm">{employee.position}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-muted-foreground">Manager</dt>
                      <dd className="text-sm">John Smith</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                      <dd className="text-sm">Full-time</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Skills & Qualifications</h4>
              <div className="rounded-lg border p-3">
                <div className="flex flex-wrap gap-2">
                  <div className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium">JavaScript</div>
                  <div className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium">React</div>
                  <div className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium">Node.js</div>
                  <div className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium">TypeScript</div>
                  <div className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium">AWS</div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="performance" className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Performance Metrics</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-3">
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm font-medium">Last Review Score</span>
                    <span className="text-sm font-medium">3.8/5</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "76%" }}></div>
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm font-medium">Goal Completion</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "65%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Performance History</h4>
              <div className="rounded-lg border p-3">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Q1 2023 Review</p>
                      <p className="text-xs text-muted-foreground">Exceeded expectations in project delivery</p>
                    </div>
                    <div className="text-sm font-medium">4.2/5</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Q4 2022 Review</p>
                      <p className="text-xs text-muted-foreground">Met expectations but missed one key goal</p>
                    </div>
                    <div className="text-sm font-medium">3.8/5</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Q3 2022 Review</p>
                      <p className="text-xs text-muted-foreground">Strong performance across all areas</p>
                    </div>
                    <div className="text-sm font-medium">4.5/5</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="risk-factors" className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Attrition Risk Factors</h4>
              <div className="rounded-lg border p-3">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Compensation Satisfaction</span>
                      <span className="text-sm font-medium text-destructive">High Risk</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-destructive" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Work-Life Balance</span>
                      <span className="text-sm font-medium text-amber-500">Medium Risk</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-amber-500" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Career Growth</span>
                      <span className="text-sm font-medium text-destructive">High Risk</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-destructive" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Manager Relationship</span>
                      <span className="text-sm font-medium text-green-500">Low Risk</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Recent Feedback</h4>
              <div className="rounded-lg border p-3">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm italic">
                      "I feel like I've hit a ceiling in my current role and don't see a clear path forward."
                    </p>
                    <p className="text-xs text-muted-foreground">From last 1:1 meeting - 2 weeks ago</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm italic">
                      "The compensation doesn't seem to match the market rate for my skills and experience."
                    </p>
                    <p className="text-xs text-muted-foreground">From annual review - 1 month ago</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="retention" className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Recommended Retention Strategies</h4>
              <div className="rounded-lg border p-3">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-primary"
                      >
                        <path d="M12 2v20" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Compensation Review</p>
                      <p className="text-xs text-muted-foreground">
                        Conduct a market analysis and adjust compensation to be competitive
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-500">
                        Medium Priority
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-primary"
                      >
                        <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                        <path d="M21 8V5a2 2 0 0 0-2-2h-5.5" />
                        <path d="M3 16v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" />
                        <path d="M3 12h18" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Career Development Plan</p>
                      <p className="text-xs text-muted-foreground">
                        Create a clear growth path with specific milestones and opportunities
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span className="rounded-full bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive">
                        High Priority
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-primary"
                      >
                        <path d="M2 3h20" />
                        <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
                        <path d="m7 21 5-5 5 5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Work-Life Balance Improvement</p>
                      <p className="text-xs text-muted-foreground">
                        Review workload and consider flexible work arrangements
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-500">
                        Medium Priority
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Schedule Retention Meeting</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

