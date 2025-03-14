"use client"

import type React from "react"

import { useState } from "react"
import { Eye, MoreHorizontal, Search, SlidersHorizontal, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock data for employees
const employees = [
  {
    id: 1,
    name: "Jane Miller",
    department: "Engineering",
    position: "Senior Developer",
    email: "jane.miller@company.com",
    startDate: "2020-01-15",
    status: "Full-time",
  },
  {
    id: 2,
    name: "Tom Smith",
    department: "Sales",
    position: "Account Executive",
    email: "tom.smith@company.com",
    startDate: "2021-03-22",
    status: "Full-time",
  },
  {
    id: 3,
    name: "Alex Johnson",
    department: "Marketing",
    position: "Manager",
    email: "alex.johnson@company.com",
    startDate: "2019-11-05",
    status: "Full-time",
  },
  {
    id: 4,
    name: "Rachel Brown",
    department: "Customer Support",
    position: "Lead",
    email: "rachel.brown@company.com",
    startDate: "2022-02-10",
    status: "Full-time",
  },
  {
    id: 5,
    name: "Michael Chen",
    department: "Engineering",
    position: "Developer",
    email: "michael.chen@company.com",
    startDate: "2021-07-18",
    status: "Full-time",
  },
  {
    id: 6,
    name: "Sarah Wilson",
    department: "HR",
    position: "Specialist",
    email: "sarah.wilson@company.com",
    startDate: "2020-09-30",
    status: "Part-time",
  },
  {
    id: 7,
    name: "David Lee",
    department: "Finance",
    position: "Analyst",
    email: "david.lee@company.com",
    startDate: "2022-01-05",
    status: "Full-time",
  },
  {
    id: 8,
    name: "Emily Davis",
    department: "Product",
    position: "Manager",
    email: "emily.davis@company.com",
    startDate: "2019-05-12",
    status: "Full-time",
  },
]

export default function EmployeeManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false)

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDepartment === "all" || employee.department === selectedDepartment),
  )

  const departments = ["Engineering", "Sales", "Marketing", "Customer Support", "HR", "Finance", "Product"]

  return (
    <div className="flex-1 w-full h-full">
      <div className="w-full h-full px-4 py-6 md:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Employee Management</h2>
            <p className="text-muted-foreground mt-1">Add, edit, and manage employee information</p>
          </div>
          <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <UserPlus className="h-5 w-5" />
                Add New Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>
                  Enter the employee details below to add them to your organization.
                </DialogDescription>
              </DialogHeader>
              <AddEmployeeForm onClose={() => setIsAddEmployeeOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <Card className="shadow-sm w-full mt-6 overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Employee Directory</CardTitle>
            <CardDescription>Manage and view all employees in your organization</CardDescription>
            <div className="flex flex-col gap-4 pt-4 md:flex-row">
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
              <Select value={selectedDepartment} onValueChange={(value) => setSelectedDepartment(value)}>
                <SelectTrigger className="w-full md:w-[200px]">
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
              <Button variant="outline" size="icon" className="h-10 w-10">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-hidden rounded-md border">
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead className="hidden md:table-cell">Email</TableHead>
                      <TableHead className="hidden md:table-cell">Start Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No employees found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEmployees.map((employee) => (
                        <TableRow key={employee.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{employee.name}</TableCell>
                          <TableCell>{employee.department}</TableCell>
                          <TableCell>{employee.position}</TableCell>
                          <TableCell className="hidden md:table-cell">{employee.email}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {new Date(employee.startDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={employee.status === "Full-time" ? "default" : "secondary"}
                              className="whitespace-nowrap"
                            >
                              {employee.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <div>
                Showing {filteredEmployees.length} of {employees.length} employees
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AddEmployeeForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    startDate: "",
    employeeId: "",
    manager: "",
    employmentType: "",
    salary: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would handle form submission here
    console.log(formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="skills">Skills & Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" name="dob" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select onValueChange={(value) => handleSelectChange("gender", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="non-binary">Non-binary</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
        <TabsContent value="employment" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select onValueChange={(value) => handleSelectChange("department", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Customer Support">Customer Support</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input id="position" name="position" value={formData.position} onChange={handleChange} required />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employmentType">Employment Type</Label>
              <Select onValueChange={(value) => handleSelectChange("employmentType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Intern">Intern</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="manager">Reporting Manager</Label>
              <Select onValueChange={(value) => handleSelectChange("manager", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select manager" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="John Smith">John Smith</SelectItem>
                  <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                  <SelectItem value="Michael Brown">Michael Brown</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary">Salary</Label>
            <Input id="salary" name="salary" type="number" value={formData.salary} onChange={handleChange} />
          </div>
        </TabsContent>
        <TabsContent value="skills" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="education">Education</Label>
            <Input id="education" name="education" placeholder="e.g., Bachelor's in Computer Science" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="certifications">Certifications</Label>
            <Input id="certifications" name="certifications" placeholder="e.g., AWS Certified Developer" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skills">Key Skills</Label>
            <Input id="skills" name="skills" placeholder="e.g., JavaScript, React, Node.js" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="performanceRating">Last Performance Rating</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 - Exceptional</SelectItem>
                <SelectItem value="4">4 - Exceeds Expectations</SelectItem>
                <SelectItem value="3">3 - Meets Expectations</SelectItem>
                <SelectItem value="2">2 - Needs Improvement</SelectItem>
                <SelectItem value="1">1 - Unsatisfactory</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="goals">Goals/KPIs</Label>
            <Input id="goals" name="goals" placeholder="e.g., Increase team productivity by 15%" />
          </div>
        </TabsContent>
      </Tabs>
      <DialogFooter className="mt-6">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Add Employee</Button>
      </DialogFooter>
    </form>
  )
}

