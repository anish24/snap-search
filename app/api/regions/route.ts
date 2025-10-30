import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("query");

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ regions: [] });
    }

    const response = await fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`
    );

    if (!response.ok) {
      throw new Error(`Photon API error: ${response.status}`);
    }

    const data = await response.json();

    const regions =
      data.features?.map((item: any) => ({
        name: item.properties.name,
        country: item.properties.country,
      })) ?? [];

    return NextResponse.json({ regions });
  } catch (error) {
    console.error("Failed to fetch regions:", error);
    return NextResponse.json({ regions: [] }, { status: 500 });
  }
}