import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  var votes,
    categories,
    extraoptions,
    extraquestions,
    vgi,
    votesextra,
    votingoptions,
    removeDuplicatesResult;
  revalidatePath("/");
  try {
    votes = await sql`SELECT * FROM votes;`;
    categories = await sql`SELECT * FROM categories;`;
    extraoptions = await sql`SELECT * FROM extraoptions;`;
    extraquestions = await sql`SELECT * FROM extraquestions;`;
    vgi = await sql`SELECT * FROM votinggeneralinfo;`;
    votesextra = await sql`SELECT * FROM votesextra;`;
    votingoptions = await sql`SELECT * FROM votingoptions;`;

    removeDuplicatesResult = await sql`WITH DuplicateRecords AS (
  SELECT id,
         ROW_NUMBER() OVER (PARTITION BY voteoption, ip ORDER BY id) AS row_num
  FROM votes
)
DELETE FROM votes
WHERE id IN (
  SELECT id
  FROM DuplicateRecords
  WHERE row_num > 1
);
`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(
    {
      votes,
      categories,
      extraoptions,
      extraquestions,
      vgi,
      votesextra,
      votingoptions,
    },
    { status: 200 }
  );
}
