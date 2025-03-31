import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const fetchEmployees = async () => {
  const { data, error } = await supabase.from("employees").select("*");
  if (error) throw error;
  return data;
};
