"use client";

// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

// Main component for adding a new employee
export default function AddEmployeeForm({ onClose, onAdd }: { onClose: () => void; onAdd: () => void }) {
  /**
   * Represents the data structure for an employee form.
   * This type is used to capture and validate employee details in the form.
   */
  type EmployeeFormData = {
    name: string; // Full name of the employee
    email: string; // Email address of the employee
    phone: string; // Phone number of the employee
    dob: string | null; // Date of birth of the employee (nullable)
    gender: string; // Gender of the employee
    department: string; // Department the employee belongs to
    position: string; // Job title or position of the employee
    startdate: string | null; // Start date of employment (nullable)
    employeeid: string; // Unique identifier for the employee
    manager: string; // Name of the employee's reporting manager
    employmenttype: string; // Type of employment (e.g., full-time, part-time)
    salary: string; // Salary of the employee as a string
    skills: string; // Skills possessed by the employee
    education: string; // Educational qualifications of the employee
    certifications: string; // Certifications obtained by the employee
    keyskills: string; // Key skills of the employee
    performancerating: string; // Last performance rating of the employee
    goals: string; // Goals or KPIs set for the employee
    location: string; // Location of the employee
  };

  // State to manage the form data
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    email: "",
    phone: "",
    dob: null,
    gender: "",
    department: "",
    position: "",
    startdate: null,
    employeeid: "",
    manager: "",
    employmenttype: "Full-time",
    salary: "",
    skills: "",
    education: "",
    certifications: "",
    keyskills: "",
    performancerating: "",
    goals: "",
    location: "",
  });

  // State to manage loading state during form submission
  const [loading, setLoading] = useState(false);

  // State to manage error messages
  const [error, setError] = useState<string | null>(null);

  // State to store a list of HR employees for the manager dropdown
  const [hrEmployees, setHrEmployees] = useState<string[]>([]);

  // Fetch HR employees from the database when the component mounts
  useEffect(() => {
    const fetchHrEmployees = async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("name")
        .or("position.ilike.%HR%,position.ilike.%HR Manager%");

      if (!error && data) {
        setHrEmployees(data.map((emp) => emp.name));
      }
    };
    fetchHrEmployees();
  }, [supabase]);

  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as keyof EmployeeFormData]: value,
    }));
  };

  // Handle changes in dropdown/select fields
  const handleSelectChange = <K extends keyof EmployeeFormData>(name: K, value: EmployeeFormData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.department) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // Prepare data for submission by converting empty fields to null
    const dataToSubmit = {
      name: formData.name.trim() || null,
      email: formData.email.trim() || null,
      phone: formData.phone.trim() || null,
      dob: formData.dob || null,
      gender: formData.gender?.trim() || null,
      department: formData.department?.trim() || null,
      position: formData.position?.trim() || null,
      startdate: formData.startdate || null,
      manager: formData.manager?.trim() || null,
      employeeid: formData.employeeid?.trim() || null,
      employmenttype: ["Full-time", "Part-time", "Contract", "Intern"].includes(formData.employmenttype)
        ? formData.employmenttype
        : null,
      salary: formData.salary ? parseInt(formData.salary) : null,
      skills: formData.skills?.trim() || null,
      education: formData.education?.trim() || null,
      certifications: formData.certifications?.trim() || null,
      keyskills: formData.keyskills?.trim() || null,
      performancerating: formData.performancerating ? parseInt(formData.performancerating) : null,
      goals: formData.goals?.trim() || null,
      location: formData.location?.trim() || null,
    };

    // Insert the employee data into the database
    const { error } = await supabase.from("employees").insert([dataToSubmit]);

    if (error) {
      console.log(JSON.stringify(dataToSubmit, null, 2));
      setError(error.message);
      setLoading(false);
      return;
    }

    // Predict attrition risk for the employee
    await predictAttritionRisk(dataToSubmit);

    // Show success message and trigger parent callbacks
    toast.success("Employee added successfully!");
    onAdd(); // Refetch the employee list
    onClose();
    setLoading(false);
  };

  // Predict attrition risk using an external API
  const predictAttritionRisk = async (employeeData: any) => {
    try {
      const age = calculateAge(employeeData.dob);
      const modelInput = {
        Age: age,
        Department: employeeData.department,
        Education: employeeData.education,
        Gender: employeeData.gender,
        JobRole: employeeData.position,
        MonthlyIncome: parseInt(employeeData.salary),
        PerformanceRating: parseInt(employeeData.performancerating),
      };

      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modelInput),
      });

      const result = await response.json();
      console.log("Attrition Risk:", result);

      if (result.risk_score !== undefined) {
        // Save the risk score to the database
        const { error } = await supabase
          .from("employees")
          .update({ riskscore: result.risk_score })
          .eq("employeeid", employeeData.employeeid);

        if (error) {
          toast.error("Risk score update failed");
          console.error(error.message);
        } else {
          toast.success(`Attrition Risk Score: ${result.risk_score}`);
        }
      }
    } catch (err) {
      toast.error("Failed to predict attrition risk.");
      console.error(err);
    }
  };

  // Helper function to calculate age from the date of birth
  const calculateAge = (dobStr: string) => {
    const dob = new Date(dobStr);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    return m < 0 || (m === 0 && today.getDate() < dob.getDate()) ? age - 1 : age;
  };

  // Render the form UI
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Display error message if any */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Tabs for organizing form sections */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal" className="space-y-4">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />

          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />

          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />

          <Label htmlFor="dob">Date of Birth</Label>
          <Input id="dob" name="dob" type="date" value={formData.dob || ""} onChange={handleChange} />

          <Label htmlFor="gender">Gender</Label>
          <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="non-binary">Non-binary</SelectItem>
            </SelectContent>
          </Select>
        </TabsContent>

        {/* Employment Tab */}
        <TabsContent value="employment" className="space-y-4">
          <Label htmlFor="employeeid">Employee ID</Label>
          <Input id="employeeid" name="employeeid" value={formData.employeeid} onChange={handleChange} required />

          <Label htmlFor="department">Department</Label>
          <Select value={formData.department} onValueChange={(value) => handleSelectChange("department", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {["Engineering", "Sales", "Marketing", "Customer Support", "HR", "Finance", "Product"].map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label htmlFor="position">Position</Label>
          <Input id="position" name="position" value={formData.position} onChange={handleChange} required />

          <Label htmlFor="startdate">Start Date</Label>
          <Input id="startdate" name="startdate" type="date" value={formData.startdate || ""} onChange={handleChange} />

          <Label htmlFor="manager">Reporting Manager</Label>
          <Select value={formData.manager} onValueChange={(value) => handleSelectChange("manager", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select manager" />
            </SelectTrigger>
            <SelectContent>
              {hrEmployees.map((hr, index) => (
                <SelectItem key={index} value={hr}>
                  {hr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            placeholder="e.g., Bangalore"
            value={formData.location}
            onChange={handleChange}
          />

          <Label htmlFor="employmentType">Employment Type</Label>
          <Select value={formData.employmenttype} onValueChange={(value) => handleSelectChange("employmenttype", value)}>
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
        </TabsContent>

        {/* Professional Tab */}
        <TabsContent value="professional" className="space-y-4">
          <Label htmlFor="salary">Salary</Label>
          <Input id="salary" name="salary" type="number" value={formData.salary} onChange={handleChange} />

          <Label htmlFor="skills">Skills (comma-separated)</Label>
          <Input id="skills" name="skills" value={formData.skills} onChange={handleChange} />

          <Label htmlFor="education">Education</Label>
          <Input id="education" name="education" value={formData.education} onChange={handleChange} required />

          <Label htmlFor="certifications">Certifications</Label>
          <Input id="certifications" name="certifications" value={formData.certifications} onChange={handleChange} required />

          <Label htmlFor="performancerating">Last Performance Rating</Label>
          <Select
            value={formData.performancerating}
            onValueChange={(value) => handleSelectChange("performancerating", value)}
          >
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

          <Label htmlFor="goals">Goals/KPIs</Label>
          <Input
            id="goals"
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            placeholder="e.g., Increase team productivity by 15%"
          />
        </TabsContent>
      </Tabs>

      {/* Submit button */}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Adding..." : "Add Employee"}
      </Button>
    </form>
  );
}
