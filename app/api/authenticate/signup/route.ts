/* eslint-disable @typescript-eslint/no-unused-vars */
import supabase from "@/app/db/supabase";
import { NextRequest } from "next/server";

// Sign up a new user
export async function POST(req: NextRequest) {
  const { email, password, param_place_id } = await req.json();
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    // Insert owner data into the shelter table
    const { data: signupData, error: signupError } = await supabase.rpc(
      "shelter_sign_up",
      {
        signup_id: param_place_id,
        signup_email: email,
      }
    );

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
