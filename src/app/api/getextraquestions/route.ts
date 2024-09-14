import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  var extraquestions;
  revalidatePath("/");
  try {
    extraquestions = await sql`SELECT * FROM extraquestions;`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json({ extraquestions }, { status: 200 });
}
