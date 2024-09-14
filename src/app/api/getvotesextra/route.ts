import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  var votesextra;
  revalidatePath("/");
  try {
    votesextra = await sql`SELECT * FROM votesextra;`;
    // console.log(votesextra);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ votesextra }, { status: 200 });
}
