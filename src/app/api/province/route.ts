import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  try {
    const { data } = await axios.get(`${baseURL}province`, {
      headers: {
        key: apiKey,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching city data:", error);
    return NextResponse.json(
      { error: "Failed to fetch city data" },
      { status: 500 }
    );
  }
}
