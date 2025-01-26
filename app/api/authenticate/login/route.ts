import supabase from "@/app/db/supabase";
import { NextRequest } from "next/server";

//Logs in a user
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
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
    return new Response((error as Error).message, {
      status: 500,
    });
  }
}
