import supabase from "@/app/db/supabase";
import { NextRequest } from "next/server";

// Sign up a new user
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
