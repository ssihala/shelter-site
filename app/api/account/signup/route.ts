import supabase from "@/app/db/supabase";

export async function POST(req) {
  const { data, error } = await supabase.rpc('signup', { place_id: 'test123', name: 'test123', location: 'test123', phone_number: '555555555' });
  if (!error) {
    console.log(data);
  }

  return new Response(JSON.stringify(data), {});
}
