import { NextResponse } from "next/server";
import { fetchEmployees } from "@/lib/db";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Handles the GET request to fetch a list of employees.
 *
 * @async
 * @function
 * @returns {Promise<NextResponse>} A JSON response containing the list of employees
 * or an error message if the operation fails.
 *
 * @throws {Error} If there is an issue fetching the employees, it logs the error
 * and returns a 500 status with an error message.
 */
export async function GET() {
  try {
    const employees = await fetchEmployees();
    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 });
  }
}

/**
 * Handles the POST request to add a new employee to the database.
 *
 * @param req - The incoming HTTP request object.
 * @returns A JSON response indicating the result of the operation.
 *
 * @remarks
 * - The request body must include the following fields: `name`, `email`, `position`, and `department`.
 * - If any of the required fields are missing, a 400 Bad Request response is returned.
 * - The function inserts the employee data into the "employees" table in Supabase.
 * - If the insertion is successful, a 201 Created response is returned with the inserted employee data.
 * - If an error occurs during the insertion or processing, a 500 Internal Server Error response is returned.
 *
 * @throws Will throw an error if the Supabase insertion fails.
 */
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
