import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  var extraoptions;
  revalidatePath("/");
  try {
    extraoptions = await sql`SELECT * FROM extraoptions;`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ extraoptions }, { status: 200 });
}
