"use client";
import {useRouter} from "next/navigation";
import { useState, useEffect } from "react";
import AddEmployeeForm from "@/components/AddEmployeeForm";
import { Eye, MoreHorizontal, Search, SlidersHorizontal, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfirmDeleteModal } from "@/components/confirmDeleteModal";
import EditEmployeeModal from "@/components/EditEmployeeModal";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreVertical } from "lucide-react"
type Employee = {
  employeeid: number;
  name: string;
  department: string;
  position: string;
  email: string;
  employmenttype: string;
};

export default function EmployeeManagementPage({ employee, refresh }: any) {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);


  // Fetch employees from Supabase API
  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  
  useEffect(() => {
    fetchEmployees();
  }, []);  

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDepartment === "all" || employee.department === selectedDepartment)
  );

  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async (employeeId: number) => {
    try {
      const res = await fetch(`/api/employees/${employeeId}`, {
        method: "DELETE",
      });
  
      if (res.ok) {
        toast.success("Employee deleted successfully!");
        // Remove the deleted employee from state
        setEmployees((prev) => prev.filter(emp => emp.employeeid !== employeeId));
      } else {
        toast.error("Failed to delete employee.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  
  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setEditModalOpen(true);
  };

  const departments = ["Engineering", "Sales", "Marketing", "Customer Support", "HR", "Finance", "Product"];

  return (
    <div className="flex-1 w-full h-full">
      <div className="w-full h-full px-4 py-6 md:px-6 lg:px-8">
      <EditEmployeeModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        employee={selectedEmployee}
        onUpdate={async () => {
          try {
            const res = await fetch("/api/employees");
            const data = await res.json();
            setEmployees(data);
            toast.success("Employee updated successfully! 🎉");
          } catch (error) {
            toast.error("Failed to fetch updated data.");
          }
        }}
      />
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
              <AddEmployeeForm
                onClose={() => setIsAddEmployeeOpen(false)}
                onAdd={fetchEmployees}
              />
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
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
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
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No employees found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEmployees.map((employee) => (
                        <TableRow key={employee.employeeid} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{employee.name}</TableCell>
                          <TableCell>{employee.department}</TableCell>
                          <TableCell>{employee.position}</TableCell>
                          <TableCell className="hidden md:table-cell">{employee.email}</TableCell>
                          <TableCell>
                            <Badge
                              variant={employee.employmenttype === "Full-time" ? "default" : "secondary"}
                              className="whitespace-nowrap"
                            >
                              {employee.employmenttype}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="p-2 hover:bg-muted rounded-md">
                                <MoreVertical className="h-5 w-5" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-40">
                            <DropdownMenuItem onSelect={() => router.push(`/employee/${employee.employeeid}/view`)}>
                              View Profile
                            </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDelete(employee.employeeid)}
                              >
                                Delete
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleEdit(employee)}
                              >
                                Edit
                              </DropdownMenuItem>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
