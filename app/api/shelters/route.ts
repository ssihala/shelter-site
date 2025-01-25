import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

interface ShelterResult {
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating: number;
  user_ratings_total: number;
  place_id: string;
}

export async function GET(req: NextRequest, res: NextApiResponse) {
  const params = req.nextUrl.searchParams;

  const city = params.get("city");
  const state = params.get("state");
  const zip = params.get("zip");

  if (!zip && !(city && state)) {
    return new Response(
      JSON.stringify({
        error:
          "Either zip must be present or both city and state must be present",
      }),
      {
        status: 400,
      }
    );
  }

  const api_key = process.env.NEXT_PUBLIC_MAPS_API_KEY;
  const location_query = zip ? zip : `${city}, ${state}`;
  const maps_query = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=homeless+shelters+near+${location_query}&key=${api_key}`;

  try {
    // Make a request to the Google Maps Geocoding API
    const response = await fetch(maps_query);

    const responseBody = await response.json();

    const shelters = responseBody.results.map((result: ShelterResult) => ({
      name: result.name,
      address: result.formatted_address,
      location: result.geometry.location,
      rating: result.rating,
      num_ratings: result.user_ratings_total,
      place_id: result.place_id,
    }));

    // Return the shelter array
    return new Response(JSON.stringify(shelters), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error querying Google Maps:", error);
    res.status(500).json({ error: "Failed to query Google Maps" });
  }
}
