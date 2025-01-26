import { NextRequest } from "next/server";
import supabase from "@/app/db/supabase";

export async function POST(req: NextRequest) {
    const param_place_id = req.nextUrl.searchParams.get("place_id");

    const { data, error } = await supabase.rpc("list_of_items", {
        place_id: param_place_id,
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

