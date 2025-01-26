import supabase from "@/app/db/supabase";
import { NextRequest } from "next/server";

//Request body: param_name, param_importance, param_place_id
export async function POST(req: NextRequest) {
  const { param_name, param_place_id } = await req.json();

  const { data, error } = await supabase.rpc("delete_item", {
    delete_item_name: param_name,
    delete_place_id: param_place_id
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