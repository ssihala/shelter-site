import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Invalid Supabase URL or Key");
}
// Create and export a Supabase client instance
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
