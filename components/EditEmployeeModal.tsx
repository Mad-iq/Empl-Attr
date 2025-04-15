"use client";
import { toast } from "sonner";   
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase"; 

export default function EditEmployeeModal({ isOpen, onClose, employee, onUpdate }: any) {
  const [formData, setFormData] = useState<any>({});
  const [hrEmployees, setHrEmployees] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (employee) setFormData({ ...employee });
  }, [employee]);

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
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const predictAttritionRisk = async (employeeData: { [key: string]: any }) => {
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });
  
      const result = await response.json();
      console.log("Attrition Risk on Update:", result);
  
      if (result.risk_score !== undefined) {
        // Update the employee with the new risk score in Supabase
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

        const supabaseRes = await fetch(
          `https://saunhcpgpeibfakyrhrq.supabase.co/rest/v1/employees?employeeid=eq.${employeeData.employeeid}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
            body: JSON.stringify({ riskscore: parseFloat((result.risk_score * 100).toFixed(4)) }),
          }
        );

        const supabaseResBody = await supabaseRes.text();
        console.log("🔁 Supabase Response:", supabaseRes.status, supabaseResBody);

        if (!supabaseRes.ok) {
          toast.error("⚠️ Risk score update failed in database.");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to predict attrition risk.");
    }
  };
  

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { employeeid, ...rest } = formData;
  
    try {
      // 1. Predict Attrition Risk
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("🧠 Attrition Prediction Result:", result);
  
      if (result.risk_score !== undefined) {
        rest.riskscore = parseFloat((result.risk_score * 100).toFixed(4));
      }
  
      // 2. PUT updated formData including risk to your backend API
      const res = await fetch(`/api/employees/${employeeid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rest),
      });
  
      const data = await res.json();
      if (res.ok) {
        await onUpdate();
        toast.success("Employee & risk score updated!");
        onClose();
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error(err);
      setError("Update failed.");
      toast.error("Update failed.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
        </DialogHeader>
        {error && <p className="text-red-500">{error}</p>}

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="employment">Employment</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={formData.name || ""} onChange={handleChange} />

            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email || ""} onChange={handleChange} />

            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" value={formData.phone || ""} onChange={handleChange} />

            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" name="dob" type="date" value={formData.dob || ""} onChange={handleChange} />

            <Label htmlFor="gender">Gender</Label>
            <Select value={formData.gender} onValueChange={(val) => handleSelectChange("gender", val)}>
              <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="non-binary">Non-binary</SelectItem>
              </SelectContent>
            </Select>
          </TabsContent>

          <TabsContent value="employment" className="space-y-4">
            <Label htmlFor="employeeid">Employee ID</Label>
            <Input id="employeeid" name="employeeid" value={formData.employeeid || ""} onChange={handleChange} disabled />

            <Label htmlFor="department">Department</Label>
            <Select value={formData.department} onValueChange={(val) => handleSelectChange("department", val)}>
              <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
              <SelectContent>
                {["Engineering", "Sales", "Marketing", "Customer Support", "HR", "Finance", "Product"].map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label htmlFor="position">Position</Label>
            <Input id="position" name="position" value={formData.position || ""} onChange={handleChange} />

            <Label htmlFor="startdate">Start Date</Label>
            <Input id="startdate" name="startdate" type="date" value={formData.startdate || ""} onChange={handleChange} />

            <Label htmlFor="manager">Reporting Manager</Label>
            <Select value={formData.manager} onValueChange={(val) => handleSelectChange("manager", val)}>
              <SelectTrigger><SelectValue placeholder="Select manager" /></SelectTrigger>
              <SelectContent>
                {hrEmployees.map((hr, i) => (
                  <SelectItem key={i} value={hr}>{hr}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label htmlFor="location">Location</Label>
            <Input
              name="location"
              placeholder="Location"
              value={formData.location || ""}
              onChange={handleChange}
            />

            <Label htmlFor="employmentType">Employment Type</Label>
            <Select value={formData.employmenttype} onValueChange={(val) => handleSelectChange("employmenttype", val)}>
              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
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
            <Input id="salary" name="salary" type="number" value={formData.salary || ""} onChange={handleChange} />

            <Label htmlFor="skills">Skills</Label>
            <Input id="skills" name="skills" value={formData.skills || ""} onChange={handleChange} />

            <Label htmlFor="education">Education</Label>
            <Input id="education" name="education" value={formData.education || ""} onChange={handleChange} />

            <Label htmlFor="certifications">Certifications</Label>
            <Input id="certifications" name="certifications" value={formData.certifications || ""} onChange={handleChange} />

            <Label htmlFor="keyskills">Key Skills</Label>
            <Input id="keyskills" name="keyskills" value={formData.keyskills || ""} onChange={handleChange} />

            <Label htmlFor="performancerating">Last Performance Rating</Label>
            <Select value={formData.performancerating} onValueChange={(val) => handleSelectChange("performancerating", val)}>
              <SelectTrigger><SelectValue placeholder="Rating" /></SelectTrigger>
              <SelectContent>
                {["5", "4", "3", "2", "1"].map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label htmlFor="goals">Goals/KPIs</Label>
            <Input id="goals" name="goals" value={formData.goals || ""} onChange={handleChange} />
          </TabsContent>
        </Tabs>

        <Button onClick={handleSubmit} disabled={loading} className="w-full">
          {loading ? "Updating..." : "Update Employee"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}