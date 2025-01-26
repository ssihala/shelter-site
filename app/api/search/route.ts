import supabase from "@/app/db/supabase";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { param_query_item_name, param_place_ids } = await req.json();

  const { data, error } = await supabase.rpc("search_item_name", {
    query_item_name: param_query_item_name,
    query_place_ids: param_place_ids,
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
