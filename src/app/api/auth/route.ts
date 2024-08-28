import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const fakeUser = {
    email: "user@user.com",
    password: "12345678",
  };

  if (email === fakeUser.email && password === fakeUser.password) {
    return NextResponse.json({
      status: "success",
      data: {
        email: fakeUser.email,
      },
    });
  } else {
    return NextResponse.json(
      { status: "error", message: "Invalid email or password" },
      { status: 401 }
    );
  }
}
