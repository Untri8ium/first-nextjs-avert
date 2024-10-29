import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse> {
  await cookies().set("locKey", process.env.LOC_KEY ?? "", {
    secure: true,
    httpOnly: true,
    maxAge: 900,
  });

  return NextResponse.json(
    {},
    {
      status: 200,
    }
  );
}
