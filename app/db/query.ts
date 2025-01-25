import supabase from "@/app/db/supabase";

export async function POST(req) {
  const { data, error } = await supabase.from("shelter").select("*");

  if (!error) {
    console.log(data);
  }

  return new Response(JSON.stringify(data), {});
}
