import { NextRequest } from "next/server";

interface ShelterDetails {
  name: string;
  formatted_address: string;
  formatted_phone_number: string;
  website: string;
  rating: number;
  user_ratings_total: number;
  current_opening_hours: {
    weekday_text: string[];
  };
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const place_id = params.get("place_id");

  if (!place_id) {
    return new Response(
      JSON.stringify({
        error: "No place_id provided",
      }),
      {
        status: 400,
      }
    );
  }

  const api_key = process.env.NEXT_PUBLIC_MAPS_API_KEY;
  const maps_query = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,current_opening_hours&key=${api_key}`;

  try {
    // Make a request to the Google Maps Geocoding API
    const response = await fetch(maps_query);

    const responseBody = await response.json();
    console.log(responseBody);
    const shelter = responseBody.result as ShelterDetails;
    const hours = shelter.current_opening_hours.weekday_text;

    // Return the shelter array
    return new Response(
      JSON.stringify({ ...shelter, current_opening_hours: hours }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error querying Google Maps:", error);
    return new Response(
      JSON.stringify({
        error: "Error querying Google Maps",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
