import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const { searchParams } = new URL(request.url);
  const provinceId = searchParams.get("provinceId");

  try {
    const { data } = await axios.get(`${baseURL}city`, {
      params: {
        province: provinceId,
      },
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
