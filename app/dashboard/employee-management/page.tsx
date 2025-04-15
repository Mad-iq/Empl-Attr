"use client"; // Indicates that this component is a client-side component

// Import necessary libraries and components
import { useRouter } from "next/navigation"; // Next.js router for navigation
import { useState, useEffect } from "react"; // React hooks for managing state and side effects
import AddEmployeeForm from "@/components/AddEmployeeForm"; // Component for adding a new employee
import { Eye, MoreHorizontal, Search, SlidersHorizontal, UserPlus } from "lucide-react"; // Icons for UI elements
import { Button } from "@/components/ui/button"; // Custom button component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Card components for structured content
import { ConfirmDeleteModal } from "@/components/confirmDeleteModal"; // Modal for confirming deletions
import EditEmployeeModal from "@/components/EditEmployeeModal"; // Modal for editing employee details
import { toast } from "sonner"; // Library for displaying notifications
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Dialog components for modals
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Dropdown menu components
import { Input } from "@/components/ui/input"; // Custom input component
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Select dropdown components
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Table components for displaying data
import { Badge } from "@/components/ui/badge"; // Badge component for status display
import { MoreVertical } from "lucide-react"; // Icon for dropdown menu trigger

// Define the Employee type for managing employee data
type Employee = {
  employeeid: number; // Unique ID of the employee
  name: string; // Name of the employee
  department: string; // Department the employee belongs to
  position: string; // Job position of the employee
  email: string; // Email address of the employee
  employmenttype: string; // Employment type (e.g., Full-time, Part-time)
};

/**
 * EmployeeManagementPage is a React component that provides a user interface for managing employees.
 * It allows users to view, search, filter, add, edit, and delete employee records.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {any} props.employee - The employee data passed to the component.
 * @param {any} props.refresh - A function to refresh the data.
 *
 * @returns {JSX.Element} The rendered Employee Management Page component.
 *
 * @remarks
 * - This component fetches employee data from an API and manages it in local state.
 * - It includes modals for adding and editing employees, as well as a confirmation dialog for deletions.
 * - The employee list can be filtered by department and searched by name.
 *
 * @example
 * ```tsx
 * <EmployeeManagementPage employee={employeeData} refresh={refreshFunction} />
 * ```
 */
export default function EmployeeManagementPage({ employee, refresh }: any) {
  const router = useRouter(); // Router instance for navigation
  const [employees, setEmployees] = useState<Employee[]>([]); // State to store the list of employees
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input
  const [selectedDepartment, setSelectedDepartment] = useState("all"); // State for the selected department filter
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false); // State to manage the Add Employee modal
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null); // State for the selected employee for editing
  const [editModalOpen, setEditModalOpen] = useState(false); // State to manage the Edit Employee modal

  // Fetch employees from the Supabase API
  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/employees"); // API call to fetch employees
      const data = await response.json(); // Parse the response JSON
      setEmployees(data); // Update the employees state
    } catch (error) {
      console.error("Error fetching employees:", error); // Log any errors
    }
  };

  // Fetch employees when the component mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Filter employees based on the search term and selected department
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) && // Filter by name
      (selectedDepartment === "all" || employee.department === selectedDepartment) // Filter by department
  );

  const [showConfirm, setShowConfirm] = useState(false); // State to manage the delete confirmation modal

  // Handle employee deletion
  const handleDelete = async (employeeId: number) => {
    try {
      const res = await fetch(`/api/employees/${employeeId}`, {
        method: "DELETE", // API call to delete the employee
      });

      if (res.ok) {
        toast.success("Employee deleted successfully!"); // Show success notification
        // Remove the deleted employee from state
        setEmployees((prev) => prev.filter((emp) => emp.employeeid !== employeeId));
      } else {
        toast.error("Failed to delete employee."); // Show error notification
      }
    } catch (error) {
      toast.error("Something went wrong."); // Show generic error notification
    }
  };

  // Handle opening the Edit Employee modal
  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee); // Set the selected employee
    setEditModalOpen(true); // Open the Edit Employee modal
  };

  // List of departments for the filter dropdown
  const departments = ["Engineering", "Sales", "Marketing", "Customer Support", "HR", "Finance", "Product"];

  return (
    <div className="flex-1 w-full h-full">
      <div className="w-full h-full px-4 py-6 md:px-6 lg:px-8">
        {/* Edit Employee Modal */}
        <EditEmployeeModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)} // Close the modal
          employee={selectedEmployee} // Pass the selected employee
          onUpdate={async () => {
            try {
              const res = await fetch("/api/employees"); // Fetch updated employees
              const data = await res.json();
              setEmployees(data); // Update the employees state
              toast.success("Employee updated successfully! 🎉"); // Show success notification
            } catch (error) {
              toast.error("Failed to fetch updated data."); // Show error notification
            }
          }}
        />

        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Employee Management</h2> {/* Page title */}
            <p className="text-muted-foreground mt-1">Add, edit, and manage employee information</p> {/* Subtitle */}
          </div>

          {/* Add Employee Dialog */}
          <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <UserPlus className="h-5 w-5" /> {/* Add Employee icon */}
                Add New Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle> {/* Modal title */}
                <DialogDescription>
                  Enter the employee details below to add them to your organization.
                </DialogDescription>
              </DialogHeader>
              <AddEmployeeForm
                onClose={() => setIsAddEmployeeOpen(false)} // Close the modal
                onAdd={fetchEmployees} // Refresh the employee list
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Employee Directory Section */}
        <Card className="shadow-sm w-full mt-6 overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Employee Directory</CardTitle> {/* Section title */}
            <CardDescription>Manage and view all employees in your organization</CardDescription> {/* Subtitle */}
            <div className="flex flex-col gap-4 pt-4 md:flex-row">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> {/* Search icon */}
                <Input
                  type="search"
                  placeholder="Search employees..."
                  className="pl-8"
                  value={searchTerm} // Bind to searchTerm state
                  onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state
                />
              </div>

              {/* Department Filter Dropdown */}
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem> {/* Default option */}
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept} {/* Department options */}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Filter Button */}
              <Button variant="outline" size="icon" className="h-10 w-10">
                <SlidersHorizontal className="h-4 w-4" /> {/* Filter icon */}
              </Button>
            </div>
          </CardHeader>

          {/* Employee Table */}
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
                    {/* Show message if no employees are found */}
                    {filteredEmployees.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No employees found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      // Render filtered employees
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
                              {employee.employmenttype} {/* Employment type */}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {/* Dropdown menu for actions */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="p-2 hover:bg-muted rounded-md">
                                  <MoreVertical className="h-5 w-5" /> {/* More options icon */}
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-40">
                                <DropdownMenuItem onSelect={() => router.push(`/employee/${employee.employeeid}/view`)}>
                                  View Profile {/* View profile action */}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleDelete(employee.employeeid)}>
                                  Delete {/* Delete action */}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleEdit(employee)}>
                                  Edit {/* Edit action */}
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
