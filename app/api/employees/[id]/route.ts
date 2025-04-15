// File: app/api/employees/[id]/route.ts

import { NextRequest, NextResponse } from "next/server"; // Import Next.js server-side utilities
import { createClient } from "@supabase/supabase-js"; // Import Supabase client for database operations

// Initialize Supabase client with environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, // Supabase project URL
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Supabase anonymous key
);

// DELETE /api/employees/:id
/**
 * Handles the DELETE request to remove an employee record by ID.
 *
 * @param req - The incoming Next.js request object.
 * @param context - The context object containing route parameters.
 * @returns A JSON response indicating the result of the operation.
 *
 * @remarks
 * - If the `id` parameter is missing, a 400 status response is returned with an error message.
 * - If the deletion operation encounters an error, a 500 status response is returned with the error details.
 * - On successful deletion, a success message is returned.
 *
 * @throws Returns a 500 status response if an unexpected server error occurs.
 */
export async function DELETE(req: NextRequest, context: any) {
  const id = context?.params?.id; // Extract the employee ID from the route parameters

  // Check if the ID is missing
  if (!id) {
    return NextResponse.json({ error: "Missing employee ID" }, { status: 400 }); // Return 400 error if ID is missing
  }

  try {
    // Attempt to delete the employee record from the database
    const { error } = await supabase.from("employees").delete().eq("employeeid", id);

    // Handle database errors
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 }); // Return 500 error if deletion fails
    }

    // Return success response if deletion is successful
    return NextResponse.json({ message: "Employee deleted successfully" });
  } catch (err) {
    // Handle unexpected server errors
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT /api/employees/:id — update employee
/**
 * Handles the HTTP PUT request to update an employee's details in the database.
 *
 * @param req - The incoming HTTP request object of type `NextRequest`.
 *              It contains the request body with the updated employee data.
 * @param context - The context object containing route parameters, including the employee ID.
 *                  The `id` parameter is extracted from `context.params.id`.
 *
 * @returns A `NextResponse` object:
 *          - On success: Returns a JSON response with a success message and the updated employee data.
 *          - On failure:
 *              - If the `id` parameter is missing, returns a 400 status with an error message.
 *              - If there is a database error, returns a 500 status with the error message.
 *              - If an unexpected server error occurs, returns a 500 status with a generic error message.
 *
 * @throws Will catch and handle any errors during the request processing or database interaction.
 */
export async function PUT(req: NextRequest, context: any) {
  const id = context?.params?.id; // Extract the employee ID from the route parameters

  // Check if the ID is missing
  if (!id) {
    return NextResponse.json({ error: "Missing employee ID" }, { status: 400 }); // Return 400 error if ID is missing
  }

  try {
    // Parse the request body to get the updated employee data
    const body = await req.json();

    // Attempt to update the employee record in the database
    const { error, data } = await supabase
      .from("employees")
      .update(body) // Update the employee record with the provided data
      .eq("employeeid", id) // Match the record by employee ID
      .select() // Select the updated record
      .single(); // Ensure only one record is returned

    // Handle database errors
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 }); // Return 500 error if update fails
    }

    // Return success response with the updated employee data
    return NextResponse.json({ message: "Employee updated successfully", employee: data });
  } catch (err) {
    // Handle unexpected server errors
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
