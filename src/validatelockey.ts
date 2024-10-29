import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function validateLocKey() {
  const cookieStore = await cookies();
  const locKey = cookieStore.get("locKey");

  return locKey?.value === process.env.LOC_KEY;
}
