import AnimatedBackground from "@/components/component/animated-background";
import { FpjsProvider } from "@fingerprintjs/fingerprintjs-pro-react";
import { sql } from "@vercel/postgres";
import dynamic from "next/dynamic";
const ErrorVote = dynamic(() => import("@/components/component/error-vote"), {
  ssr: false,
});

export const revalidate = 0;

export default async function Home() {
  async function loadVGI() {
    try {
      var result = await sql`
        CREATE TABLE IF NOT EXISTS votinggeneralinfo (votingset boolean, votingstart text, 
            votingend text, maxvotes smallint, name text, description text, daystarttime text, dayendtime text, existence boolean UNIQUE
        );`;
      await sql`
        INSERT INTO votinggeneralinfo VALUES (false, null, null, null, null, null, null, null, true) ON CONFLICT ON CONSTRAINT votinggeneralinfo_existence_key DO NOTHING;`;

      const { rows } = await sql`
        SELECT * FROM votinggeneralinfo;`;

      console.log(">>>");
      console.log(rows);
      return rows;

      // IDEA: order option tiles by 500*categoryORDER + optionORDER, with cOR:0-49 and oOR:0-499
      // in the option reorder menu, list all the items flatly but color each of them with its category theme color
    } catch (error) {
      console.log("Uh oh! loadVGI failed!");
      console.log(error);
    }
  }

  const loadV = loadVGI();
  const vgiAns = await loadV;

  return (
    <>
      <AnimatedBackground />
      <FpjsProvider
        loadOptions={{
          apiKey: process.env.FP_KEY ?? "NO ENV KEY AVAILABLE",
          region: "ap",
        }}
      >
        <ErrorVote receivedVGI={vgiAns} />
      </FpjsProvider>
    </>
  );
}
