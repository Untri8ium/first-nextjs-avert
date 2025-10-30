import { headers } from "next/headers";
import { QueryResult, QueryResultRow, sql } from "@vercel/postgres";

import Image from "next/image";
// import VotingCore from "@/components/component/voting-core";
import { TopArea } from "@/components/component/top-area";
import { Settings } from "@/components/component/settings";

import { Skeleton } from "@/components/ui/skeleton";

import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
  Suspense,
} from "react";
import { BottomArea } from "@/components/component/bottom-area";

export default async function Home() {
  var loading = 0;

  const header = headers();
  const ip = (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];

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

      console.log("///");
      console.log(rows);

      return rows;

      // IDEA (not sure if this was implemented after all): order option tiles by 500*categoryORDER + optionORDER, with cOR:0-49 and oOR:0-499
      // in the option reorder menu, list all the items flatly but color each of them with its category theme color
    } catch (error) {
      console.log("Uh oh! loadVGI failed!");
      console.log(error);
    }
  }

  async function loadOPTS() {
    try {
      var result =
        await sql`CREATE TABLE IF NOT EXISTS votingoptions (id text PRIMARY KEY, categoryid text, name text, 
            description text, orderno smallint
        );`;

      const { rows } = await sql`
        SELECT * FROM votingoptions;`;

      console.log("SERVERFUNCLEVELopts: " + JSON.stringify(rows));

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
        await sql`CREATE TABLE IF NOT EXISTS categories (id text PRIMARY KEY, name text, orderno smallint);`;

      const { rows } = await sql`
        SELECT * FROM categories;`;

      console.log("SERVERFUNCLEVELcats: " + JSON.stringify(rows));

      return rows;

      // IDEA: order option tiles by 500*categoryORDER + optionORDER, with cOR:0-49 and oOR:0-499
      // in the option reorder menu, list all the items flatly but color each of them with its category theme color
    } catch (error) {
      console.log("Uh oh! loadCATS failed!");
      //console.log(error);
    }
  }

  async function loadVOTS() {
    try {
      var result =
        await sql`CREATE TABLE IF NOT EXISTS votes (id text PRIMARY KEY, votetime text, voteoption text, entrycount smallint, ip text);`;

      const { rows } = await sql`
        SELECT * FROM votes;`;

      return rows;

      // IDEA: order option tiles by 500*categoryORDER + optionORDER, with cOR:0-49 and oOR:0-499
      // in the option reorder menu, list all the items flatly but color each of them with its category theme color
    } catch (error) {
      console.log("Uh oh! loadVOTS failed!");
      //console.log(error);
    }
  }

  async function loadVOTX() {
    try {
      var result =
        await sql`CREATE TABLE IF NOT EXISTS votesextra (id text PRIMARY KEY, votetime text, qid text, qanswer varchar(65535), entrycount smallint, ip text);`; // what

      const { rows } = await sql`
        SELECT * FROM votes;`;

      return rows;

      // IDEA: order option tiles by 500*categoryORDER + optionORDER, with cOR:0-49 and oOR:0-499
      // in the option reorder menu, list all the items flatly but color each of them with its category theme color
    } catch (error) {
      console.log("Uh oh! loadVOTX failed!");
      //console.log(error);
    }
  }

  async function loadEXQS() {
    try {
      var result =
        await sql`CREATE TABLE IF NOT EXISTS extraquestions (id text PRIMARY KEY, name text, maxvotes smallint, orderno smallint);`;

      const { rows } = await sql`
        SELECT * FROM extraquestions;`;

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
        await sql`CREATE TABLE IF NOT EXISTS extraoptions (id text PRIMARY KEY, name text, orderno smallint);`;

      const { rows } = await sql`
        SELECT * FROM extraoptions;`;

      return rows;

      // IDEA: order option tiles by 500*categoryORDER + optionORDER, with cOR:0-49 and oOR:0-499
      // in the option reorder menu, list all the items flatly but color each of them with its category theme color
    } catch (error) {
      console.log("Uh oh! EXOO failed!");
      //console.log(error);
    }
  }

  const loadV = loadVGI();
  const vgiAns = await loadV;

  const loadO = loadOPTS();
  const optsAns = await loadO;

  const loadC = loadCATS();
  const catsAns = await loadC;

  const loadVO = loadVOTS();
  const votsAns = await loadVO;

  const loadVX = loadVOTX();
  const votxAns = await loadVX;

  const loadXQ = loadEXQS();
  const exqsAns = await loadXQ;

  const loadXO = loadEXOP();
  const exopAns = await loadXO;

  console.log(vgiAns && vgiAns[0]?.votingset);

  console.log("SERVERLEVELoptsAns: " + JSON.stringify(optsAns));
  // console.log(optsAns && optsAns[0]?.aaa);
  //console.log(catsAns && catsAns[0]?.bbb);

  async function handleSubmitTop(
    votingSet: boolean,
    maxvotes: number,
    votingName: string,
    votingDescription: string,
    votingDateS: string,
    votingDateE: string,
    options: any,
    categories: any,
    dayStartTime: string,
    dayEndTime: string
    // extraquestions: any
  ) {
    "use server";

    //loading = 1;

    let submitting = false;

    async function actuallySubmit() {
      try {
        submitting = true;
        await sql`INSERT INTO votinggeneralinfo VALUES (${votingSet}, ${votingDateS}, ${votingDateE}, 
          ${maxvotes}, ${votingName}, ${votingDescription}, ${dayStartTime}, ${dayEndTime}, true) 
          ON CONFLICT ON CONSTRAINT votinggeneralinfo_existence_key DO UPDATE SET "votingset" = ${votingSet}, 
          "votingstart" = ${votingDateS}, "votingend" = ${votingDateE}, "maxvotes" = ${maxvotes}, 
          "name" = ${votingName}, "description" = ${votingDescription}, "daystarttime" = ${dayStartTime}, "dayendtime" = ${dayEndTime}, "existence" = true;`;

        // Begin a transaction
        await sql`BEGIN;`;

        // Truncate the tables first
        await sql`TRUNCATE TABLE votingoptions;`;
        await sql`TRUNCATE TABLE categories;`;

        // === INSERT OPTIONS IN PARALLEL ===
        if (options.length > 0) {
          await Promise.all(
            options.map(
              (o: any) =>
                sql`
          INSERT INTO votingoptions (id, categoryid, name, description, orderno)
          VALUES (${o.ID}, ${o.catID}, ${o.name}, ${o.description}, ${o.orderNo});
        `
            )
          );
        }

        // === INSERT CATEGORIES IN PARALLEL ===
        if (categories.length > 0) {
          await Promise.all(
            categories.map(
              (c: any) =>
                sql`
          INSERT INTO categories (id, name, orderno)
          VALUES (${c.ID}, ${c.name}, ${c.orderNo});
        `
            )
          );
        }

        // === Deduplicate ===
        await sql`
    WITH duplicates AS (
      SELECT id, ROW_NUMBER() OVER (PARTITION BY id ORDER BY id) AS row_num
      FROM votingoptions
    )
    DELETE FROM votingoptions
    WHERE id IN (SELECT id FROM duplicates WHERE row_num > 1);
  `;

        await sql`
    WITH duplicates AS (
      SELECT id, ROW_NUMBER() OVER (PARTITION BY id ORDER BY id) AS row_num
      FROM categories
    )
    DELETE FROM categories
    WHERE id IN (SELECT id FROM duplicates WHERE row_num > 1);
  `;

        await sql`COMMIT;`;
      } catch (error) {
        await sql`ROLLBACK;`;
        console.error("Error replacing database:", error);
        throw error;
      }
    }

    const loadACTS = actuallySubmit();
    //loading = await loadACTS;
  }

  return (
    <>
      <TopArea
        title="管理者パネル"
        description="「確定」を押すまで適用されません。"
        colorFrom="from-[#F18643]"
        colorTo="to-[#F64C6B]"
        envFrom=""
        envTo=""
      />
      <Suspense>
        <Settings
          receivedVGI={vgiAns}
          receivedOPTS={optsAns}
          receivedCATS={catsAns}
          receivedVOTS={votsAns}
          receivedEXQS={exqsAns}
          submitCalledByChild={handleSubmitTop}
          loadingState={0}
        />
      </Suspense>
      <BottomArea />
    </>
  );
}
