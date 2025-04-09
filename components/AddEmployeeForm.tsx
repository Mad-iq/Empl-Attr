"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function AddEmployeeForm({ onClose, onAdd }: { onClose: () => void; onAdd: () => void }) {
  type EmployeeFormData = {
    name: string;
    email: string;
    phone: string;
    dob: string | null; // Fix: Allow null for date fields
    gender: string;
    department: string;
    position: string;
    startdate: string | null; // Fix: Allow null for date fields
    employeeid: string;
    manager: string;
    employmenttype: string;
    salary: string; // Kept as string since input fields return strings
    skills: string;
    education: string;
    certifications: string;
    keyskills: string;
    performancerating: string;
    goals: string;
    location: string;
  };

  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    email: "",
    phone: "",
    dob: null, // Fix: Initialize as null
    gender: "",
    department: "",
    position: "",
    startdate: null, // Fix: Initialize as null
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hrEmployees, setHrEmployees] = useState<string[]>([]);

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
  }, [supabase]); // Fix: Added dependency

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as keyof EmployeeFormData]: value,
    }));
  };
  

  const handleSelectChange = <K extends keyof EmployeeFormData>(name: K, value: EmployeeFormData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.name || !formData.email || !formData.department) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // Convert empty fields to null or proper types before submission
    const dataToSubmit = {
      name: formData.name.trim() || null,
      email: formData.email.trim() || null,
      phone: formData.phone.trim() || null,
      dob: formData.dob || null,
      gender: formData.gender?.trim() || null, // Ensuring it's valid
      department: formData.department?.trim() || null,
      position: formData.position?.trim() || null,
      startdate: formData.startdate || null, // Allow PostgreSQL to set default
      manager: formData.manager?.trim() || null,
      employeeid: formData.employeeid?.trim() || null,
      employmenttype: ["Full-time", "Part-time", "Contract", "Intern"].includes(formData.employmenttype) 
        ? formData.employmenttype 
        : null, // Prevent constraint errors
      salary: formData.salary ? parseInt(formData.salary) : null, // Ensure it's an integer
      skills: formData.skills?.trim() || null,
      education: formData.education?.trim() || null,
      certifications: formData.certifications?.trim() || null,
      keyskills: formData.keyskills?.trim() || null,
      performancerating: formData.performancerating ? parseInt(formData.performancerating) : null,
      goals: formData.goals?.trim() || null,
      location: formData.location?.trim() || null,
    };
    

    const { error } = await supabase.from("employees").insert([dataToSubmit]);

    setLoading(false);

    if (error) {
      console.log(JSON.stringify(dataToSubmit, null, 2));
      setError(error.message);
      return;
    }

    toast.success("Employee added successfully!");
    onAdd(); // Refetch the employee list
    onClose();
    
  };
  
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
        </TabsList>

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

        <TabsContent value="employment" className="space-y-4">
          <Label htmlFor="employeeid">Employee ID</Label>
          <Input id="employeeid" name="employeeid" value={formData.employeeid} onChange={handleChange} required />
          
          <Label htmlFor="department">Department</Label>
          <Select value={formData.department} onValueChange={(value) => handleSelectChange("department", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {["Engineering", "Sales", "Marketing", "Customer Support", "HR", "Finance", "Product"].map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Label htmlFor="position">Position</Label>
          <Input id="position" name="position" value={formData.position} onChange={handleChange} required />

          <Label htmlFor="startdate">Start Date</Label>
          <Input
            id="startdate"
            name="startdate"
            type="date"
            value={formData.startdate || ""}
            onChange={handleChange}
          />


          <Label htmlFor="manager">Reporting Manager</Label>
          <Select value={formData.manager} onValueChange={(value) => handleSelectChange("manager", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select manager" />
            </SelectTrigger>
            <SelectContent>
              {hrEmployees.map((hr, index) => (
                <SelectItem key={index} value={hr}>{hr}</SelectItem>
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
          <Select value={formData.performancerating} onValueChange={(value) => handleSelectChange("performancerating", value)}>
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
          <Input id="goals" name="goals" value={formData.goals} onChange={handleChange} placeholder="e.g., Increase team productivity by 15%" />

        </TabsContent>
      </Tabs>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Adding..." : "Add Employee"}
      </Button>
    </form>
  )
}
