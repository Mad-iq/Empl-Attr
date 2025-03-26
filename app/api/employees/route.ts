import { NextResponse } from "next/server";
import { query } from "@/lib/db";


export async function GET() {
  try {
    const result = await query("SELECT * FROM employees");
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, position, department } = await req.json();

    if (!name || !email || !position || !department) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await query(
      "INSERT INTO employees (name, email, position, department) VALUES ($1, $2, $3, $4)",
      [name, email, position, department]
    );

    return NextResponse.json({ message: "Employee added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding employee:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
