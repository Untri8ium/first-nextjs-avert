import Image from "next/image";
// import { VotingCore, Tile } from "@/components/component/voting-core";
import { TopArea } from "@/components/component/top-area";
import { headers } from "next/headers";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import {
  FpjsProvider,
  // useVisitorData,
} from "@fingerprintjs/fingerprintjs-pro-react";

import dynamic from "next/dynamic";
import { BottomArea } from "@/components/component/bottom-area";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { validateLocKey } from "@/validatelockey";

const VotingCore = dynamic(() => import("@/components/component/voting-core"), {
  ssr: false,
});

export const revalidate = 0;

export default async function Home() {
  // {
  //   searchParams,
  // }: {
  //   searchParams: {
  //     lk: string}
  //   }
  // const header = headers();
  // const ip = (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];

  // const res = await fetch(`http://localhost:3000/api/getvotes`);

  // if (!res.ok) {
  //   throw new Error("Failed to fetch votes");
  // }

  // const data = await res.json();

  // console.log("API ANS INCOMING>>>>>>");
  // console.log(JSON.stringify(data.votingoptions.rows));
  // console.log("API ANS ENDING<<<<<<");

  if (!(await validateLocKey())) {
    redirect("/location-request");
  }

  // try{
  //   if(Date.parse(searchParams.lk) + 1000 * 10 < Date.now()){
  //     throw null;
  //   }
  // }
  // catch{
  //   router.replace("/loc");
  // }

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

      console.log("VGI>>>");
      console.log(rows);
      console.log("VGI<<<");

      return rows;

      // IDEA: order option tiles by 500*categoryORDER + optionORDER, with cOR:0-49 and oOR:0-499
      // in the option reorder menu, list all the items flatly but color each of them with its category theme color
    } catch (error) {
      console.log("Uh oh! loadVGI failed!");
      console.log(error);
    }
  }

  async function loadOPTS() {
    try {
      var result =
        await sql`CREATE TABLE IF NOT EXISTS votingoptions (id text, categoryid text, name text, 
            description text, orderno smallint
        );`;

      const { rows } = await sql`
        SELECT * FROM votingoptions;`;

      console.log("OPTS>>>");
      console.log(rows);
      console.log("OPTS<<<");

      return rows;

      // IDEA: order option tiles by 500*categoryORDER + optionORDER, with cOR:0-49 and oOR:0-499
      // in the option reorder menu, list all the items flatly but color each of them with its category theme color
    } catch (error) {
      console.log("Uh oh! loadOPTS failed!");
      //console.log(error);
    }
  }

  async function loadCATS() {
    try {
      var result =
        await sql`CREATE TABLE IF NOT EXISTS categories (id text, name text, orderno smallint);`;

      const { rows } = await sql`
        SELECT * FROM categories;`;

      console.log("CATS>>>");
      console.log(rows);
      console.log("CATS<<<");

      return rows;

      // IDEA: order option tiles by 500*categoryORDER + optionORDER, with cOR:0-49 and oOR:0-499
      // in the option reorder menu, list all the items flatly but color each of them with its category theme color
    } catch (error) {
      console.log("Uh oh! loadCATS failed!");
      //console.log(error);
    }
  }

  // async function loadVOTS() {
  //   try {
  //     var result =
  //       await sql`CREATE TABLE IF NOT EXISTS votes (id text, votetime text, voteoption text, entrycount smallint, ip text);`;

  //     const { rows } = await sql`
  //       SELECT * FROM votes;`;

  //     return rows;

  //     // IDEA: order option tiles by 500*categoryORDER + optionORDER, with cOR:0-49 and oOR:0-499
  //     // in the option reorder menu, list all the items flatly but color each of them with its category theme color
  //   } catch (error) {
  //     console.log("Uh oh! loadVOTS failed!");
  //     //console.log(error);
  //   }
  // }

  // async function loadVOTX() {
  //   try {
  //     var result =
  //       await sql`CREATE TABLE IF NOT EXISTS votesextra (id text, votetime text, qid text, qanswer varchar(65535), entrycount smallint, ip text);`; // what

  //     const { rows } = await sql`
  //       SELECT * FROM votes;`;

  //     return rows;

  //     // IDEA: order option tiles by 500*categoryORDER + optionORDER, with cOR:0-49 and oOR:0-499
  //     // in the option reorder menu, list all the items flatly but color each of them with its category theme color
  //   } catch (error) {
  //     console.log("Uh oh! loadVOTX failed!");
  //     //console.log(error);
  //   }
  // }

  async function loadEXQS() {
    try {
      var result =
        await sql`CREATE TABLE IF NOT EXISTS extraquestions (id text, name text, maxvotes smallint, orderno smallint);`;

      const { rows } = await sql`
        SELECT * FROM extraquestions;`;

      console.log("rows" + rows + "rowsEND");
      return rows;

      // IDEA: order option tiles by 500*categoryORDER + optionORDER, with cOR:0-49 and oOR:0-499
      // in the option reorder menu, list all the items flatly but color each of them with its category theme color
    } catch (error) {
      console.log("Uh oh! EXQS failed!");
      //console.log(error);
    }
  }

  async function loadEXOP() {
    try {
      var result =
        await sql`CREATE TABLE IF NOT EXISTS extraoptions (id text, qid text, name text, orderno smallint);`;

      const { rows } = await sql`
        SELECT * FROM extraoptions;`;

      return rows;

      // IDEA: order option tiles by 500*categoryORDER + optionORDER, with cOR:0-49 and oOR:0-499
      // in the option reorder menu, list all the items flatly but color each of them with its category theme color
    } catch (error) {
      console.log("Uh oh! EXOP failed!");
      //console.log(error);
    }
  }

  const loadV = loadVGI();
  const vgiAns = await loadV;

  const loadO = loadOPTS();
  const optsAns = await loadO;

  const loadC = loadCATS();
  const catsAns = await loadC;

  // const loadVO = loadVOTS();
  // const votsAns = await loadVO;

  // const loadVX = loadVOTX();
  // const votxAns = await loadVX;

  const loadXQ = loadEXQS();
  const exqsAns = await loadXQ;

  const loadXO = loadEXOP();
  const exopAns = await loadXO;

  var chkAns = undefined;

  if (!vgiAns![0].votingset) {
    redirect("/error-vote?e=cl");
  }

  /*const tileList: Tile[] = [
    {
      id: "firstone",
      name: ip,
      description: "Lorem",
    },
    {
      id: "secondone",
      name: "あいうえお「かきくけこ」さしすせそ！たちつてと",
      description: "あいうえおかきくけこさしすせそたちつてと",
    },
  ];*/

  // console.log("<<<" + vgiAns![0] + ">>>");

  // async function handleCheckTop() {
  // "use server";

  // async function checkIfStillVotable() {
  //   try {
  //     await sql`SELECT * FROM votinggeneralinfo;`;
  //     const { rows } = await sql`
  //   SELECT * FROM votinggeneralinfo;`;
  //     return rows;
  //   } catch (error) {
  //     console.log("Uh oh! checkIfStillVotable failed!");
  //     console.log(error);
  //     return null;
  //   }
  // }

  // const loadCH = checkIfStillVotable();

  // chkAns = await loadCH;
  // }

  /*async function handleVoteSubmitTop(
    votingSet: boolean,
    votingName: string,
    votingDescription: string,
    votingDateS: string,
    votingDateE: string,
    options: any,
    categories: any
  ) {
    "use server";
  }*/

  // console.log(error ? error.message : JSON.stringify(data, null, 2));

  console.log(process.env.FP_KEY + "<< FP_KEY");

  return (
    <main>
      {vgiAns![0].votingset ? (
        <>
          <TopArea
            title={vgiAns![0].name}
            description={vgiAns![0].description}
            colorFrom={""}
            colorTo={""}
            envFrom={process.env.NEXT_PUBLIC_COLOR_HEADER_1 ?? ""}
            envTo={process.env.NEXT_PUBLIC_COLOR_HEADER_2 ?? ""}
          />
          {/* <Suspense fallback={<div>ローディング中</div>}> */}
          <FpjsProvider
            loadOptions={{
              apiKey: "wjpmOzc5YTaAjohHVgPC",
              region: "ap",
            }}
          >
            <VotingCore
              receivedVGI={vgiAns}
              receivedOPTS={optsAns}
              receivedCATS={catsAns}
              // receivedVOTX={votxAns}
              receivedEXQS={exqsAns}
              receivedEXOP={exopAns}
              news={vgiAns![0].description}
              //receivedVOTS={votsAns}
              // checkCalledByChild={handleCheckTop}
              //submitCalledByChild={handleVoteSubmitTop}
              // checkAns={chkAns}
            />
          </FpjsProvider>
          {/* </Suspense> */}
          <BottomArea />
        </>
      ) : null}
    </main>
  );
}
