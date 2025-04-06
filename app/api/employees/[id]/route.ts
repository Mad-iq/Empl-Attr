// File: app/api/employees/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// DELETE /api/employees/:id
export async function DELETE(req: NextRequest, context: any) {
    const id = context?.params?.id;  
  
    if (!id) {
      return NextResponse.json({ error: "Missing employee ID" }, { status: 400 });
    }
  
    try {
      const { error } = await supabase.from("employees").delete().eq("employeeid", id);
  
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
  
      return NextResponse.json({ message: "Employee deleted successfully" });
    } catch (err) {
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }
  
  

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await req.json();
  
    if (!id) {
      return NextResponse.json({ error: "Missing employee ID" }, { status: 400 });
    }
  
    const { error, data } = await supabase.from("employees").update(body).eq("employeeid", id).select().single();
  
    if (error) {
      console.error("Error updating employee:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
    return NextResponse.json({ message: "Employee updated successfully", employee: data }, { status: 200 });
  }
  