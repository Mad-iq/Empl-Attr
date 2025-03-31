import { NextResponse } from "next/server";
import { fetchEmployees } from "@/lib/db";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    const employees = await fetchEmployees();
    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, position, department } = body;

    if (!name || !email || !position || !department) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert data into Supabase
    const { data, error } = await supabase
      .from("employees")
      .insert([{ name, email, position, department }])
      .select()
      .single(); // Return the inserted row

    if (error) throw error;

    return NextResponse.json(
      { message: "Employee added successfully", employee: data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding employee:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
