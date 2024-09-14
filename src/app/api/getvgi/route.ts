import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  var vgi;
  var removeDuplicatesResult;
  revalidatePath("/");
  try {
    vgi = await sql`SELECT * FROM votinggeneralinfo;`;
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
  return NextResponse.json({ vgi }, { status: 200 });
}
