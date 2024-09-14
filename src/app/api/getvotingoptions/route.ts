import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  var votingoptions;
  revalidatePath("/");
  try {
    votingoptions = await sql`SELECT * FROM votingoptions;`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ votingoptions }, { status: 200 });
}
