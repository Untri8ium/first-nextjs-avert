import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
  //   revalidatePath("/"); // INFINITELY IMPORTANT CODE
  try {
    const { cjsfp } = await req.json(); // assuming the input is a JSON body
    // console.log(cjsfp);

    // Use SELECT EXISTS for a more efficient query
    const query =
      await sql`SELECT EXISTS (SELECT 1 FROM votes WHERE ip = ${cjsfp}) as exists`;

    // Extract the boolean from the query result
    const found = query.rows[0].exists;

    return NextResponse.json({ found }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
