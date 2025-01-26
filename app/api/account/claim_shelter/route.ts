import supabase from "@/app/db/supabase";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const {param_place_id, param_name, param_location, param_phone_number} = await req.json();

  const { data, error } = await supabase.rpc("sign_up", {
    signup_id: param_place_id,
    signup_name: param_name,
    signup_location: param_location,
    signup_phone_number: param_phone_number,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
  return new Response(JSON.stringify(data), {
    status: 200,
  });
}