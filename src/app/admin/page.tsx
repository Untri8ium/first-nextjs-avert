import { headers } from "next/headers";
import { QueryResult, QueryResultRow, sql } from "@vercel/postgres";

import Image from "next/image";
import { VotingCore, Tile } from "@/components/component/voting-core";
import { TopArea } from "@/components/component/top-area";
import { Settings } from "@/components/component/settings";

import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
} from "react";

export default async function Home() {
  const header = headers();
  const ip = (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];

  async function loadVGI() {
    try {
      var result = await sql`
        CREATE TABLE IF NOT EXISTS votinggeneralinfo (votingset boolean, votingstart varchar(255), 
            votingend varchar(255), maxvotes smallint, name varchar(255), description varchar(255), existence boolean UNIQUE
        );`;

      const { rows } = await sql`
        SELECT * FROM votinggeneralinfo;`;

      return rows;

      // IDEA: order option tiles by 500*categoryORDER + optionORDER, with cOR:0-49 and oOR:0-499
      // in the option reorder menu, list all the items flatly but color each of them with its category theme color
    } catch (error) {
      console.log("Uh oh! loadVGI failed!");
      //console.log(error);
    }
  }

  async function loadOPTS() {
    try {
      var result =
        await sql`CREATE TABLE IF NOT EXISTS votingoptions (id varchar(255), categoryid smallint, name varchar(255), 
            description varchar(255), orderno smallint
        );`;

      const { rows } = await sql`
        SELECT * FROM votingoptions;`;

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
        await sql`CREATE TABLE IF NOT EXISTS categories (id varchar(255), name varchar(255), orderno smallint);`;

      const { rows } = await sql`
        SELECT * FROM categories;`;

      return rows;

      // IDEA: order option tiles by 500*categoryORDER + optionORDER, with cOR:0-49 and oOR:0-499
      // in the option reorder menu, list all the items flatly but color each of them with its category theme color
    } catch (error) {
      console.log("Uh oh! loadCATS failed!");
      //console.log(error);
    }
  }

  const loadV = loadVGI();
  const vgiAns = await loadV;

  const loadO = loadOPTS();
  const optsAns = await loadO;

  const loadC = loadCATS();
  const catsAns = await loadC;

  console.log(vgiAns && vgiAns[0]?.votingset);
  //console.log(optsAns && optsAns[0]?.aaa);
  //console.log(catsAns && catsAns[0]?.bbb);

  return (
    <main>
      <TopArea
        title="管理者パネル"
        description="「適用」を押すまで、変更は反映されません。"
        colorFrom="from-[#F18643]"
        colorTo="to-[#F64C6B]"
      />
      <Settings
        receivedVGI={vgiAns}
        receivedOPTS={optsAns}
        receivedCATS={catsAns}
      />
    </main>
  );
}
