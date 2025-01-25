import supabase from "@/app/db/supabase";

export async function POST(req) {
  const { data, error } = await supabase.rpc('add_item', {item_name: 'test123', importance: '123', place_id: 'test123'});
  if (!error) {
    console.log(data);
  }

  return new Response(JSON.stringify(data), {});
}
