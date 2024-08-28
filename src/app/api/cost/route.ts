import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const body = await req.json();
  const { origin, destination, weight, courier } = body;

  try {
    const { data } = await axios.post(
      `${baseURL}cost`,
      new URLSearchParams({
        origin: origin.toString(),
        destination: destination.toString(),
        weight: weight.toString(),
        courier: courier,
      }),
      {
        headers: {
          key: apiKey,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching cost data:", error);
    return NextResponse.json(
      { error: "Failed to fetch cost data" },
      { status: 500 }
    );
  }
}
