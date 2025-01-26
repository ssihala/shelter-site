import supabase from "@/app/db/supabase";

export async function POST(req) {
  const { data, error } = await supabase.rpc('delete_row', { update_item_name: 'test123', update_place_id: 'test123' });
  if (!error) {
    console.log(data);
  }

  return new Response(JSON.stringify(data), {});
}
