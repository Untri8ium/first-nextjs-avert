import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  var votes;
  revalidatePath("/");
  try {
    votes = await sql`SELECT * FROM votes;`;
    console.log(Object.keys(votes.rows).length);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ votes }, { status: 200 });
}
