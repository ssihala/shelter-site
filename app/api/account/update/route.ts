import supabase from "@/app/db/supabase";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { param_name, param_importance, param_place_id } = await req.json();

  const { data, error } = await supabase.rpc("test_update", {
    update_item_name: param_name,
    new_importance: param_importance,
    update_place_id: param_place_id,
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