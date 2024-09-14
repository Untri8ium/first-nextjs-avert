import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  revalidatePath("/"); // INFINITELY IMPORTANT CODE

  var categories;
  try {
    categories = await sql`SELECT * FROM categories;`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ categories }, { status: 200 });
}
