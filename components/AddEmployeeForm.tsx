"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase"

export default function AddEmployeeForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    position: "",
    email: "",
    startdate: "",
    status: "Full-time",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Insert data into Supabase
    const { error } = await supabase.from("employees").insert([formData])

    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }

    // Close modal and reset form
    onClose()
    setFormData({
      name: "",
      department: "",
      position: "",
      email: "",
      startdate: "",
      status: "Full-time",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="department">Department</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, department: value })}>
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
      </div>

      <div>
        <Label htmlFor="position">Position</Label>
        <Input id="position" name="position" value={formData.position} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="startdate">Start Date</Label>
        <Input id="startdate" name="startdate" type="date" value={formData.startdate} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, status: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Adding..." : "Add Employee"}
      </Button>
    </form>
  )
}
