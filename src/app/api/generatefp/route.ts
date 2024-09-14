// import { NextResponse } from "next/server";
// import { revalidatePath } from "next/cache";

// export async function POST(req: Request) {
//   revalidatePath("/"); // INFINITELY IMPORTANT CODE
//   const { argument } = await req.json();

//   // Perform transformation on the server side
//   const transformedArgument = argument.toUpperCase(); // Example transformation

//   // Fetch data based on the transformed argument (e.g., from a database)
//   const data = await fetchData(transformedArgument);

//   return NextResponse.json({ data });
// }

// async function fetchData(transformedArgument: string) {
//   // Fetch logic here (e.g., database query, API call)
//   return { message: `Data for ${transformedArgument}` };
// }
