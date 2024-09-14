import { headers } from "next/headers";
import { QueryResult, QueryResultRow, sql } from "@vercel/postgres";

import Image from "next/image";
// import { VotingCore, Tile } from "@/components/component/voting-core";
import { TopArea } from "@/components/component/top-area";
import { Settings } from "@/components/component/settings";

import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
} from "react";
import { Stats } from "@/components/component/stats";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Label } from "@/components/ui/label";

export default async function Home() {
  class IndivOption {
    ID: string;
    catID: string;
    name: string;
    description: string;
    orderNo: number;

    constructor(
      ID: string,
      catID: string,
      name: string,
      description: string,
      orderNo: number
    ) {
      this.ID = ID;
      this.catID = catID;
      this.name = name;
      this.description = description;
      this.orderNo = orderNo;
    }
  }

  class IndivCat {
    ID: string;
    name: string;
    maxvotes: number;
    orderNo: number;

    constructor(ID: string, name: string, maxvotes: number, orderNo: number) {
      this.ID = ID;
      this.name = name;
      this.maxvotes = maxvotes;
      this.orderNo = orderNo;
    }
  }

  class IndivExtraQuestion {
    ID: string;
    name: string;
    maxVotes: number;
    orderNo: number;

    constructor(ID: string, name: string, maxVotes: number, orderNo: number) {
      this.ID = ID;
      this.name = name;
      this.maxVotes = maxVotes;
      this.orderNo = orderNo;
    }
  }

  class IndivExtraOption {
    ID: string;
    QID: string;
    name: string;
    orderNo: number;

    constructor(ID: string, QID: string, name: string, orderNo: number) {
      this.ID = ID;
      this.QID = QID;
      this.name = name;
      this.orderNo = orderNo;
    }
  }

  function sortOptionsCore(a: IndivOption, b: IndivOption) {
    return a.orderNo - b.orderNo;
  }
  function sortOptions(optionArray: IndivOption[]): IndivOption[] {
    optionArray
      .sort(sortOptionsCore)
      .forEach((option, index) => (option.orderNo = index));
    return optionArray;
  }

  function sortCatsCore(a: IndivCat, b: IndivCat) {
    return a.orderNo - b.orderNo;
  }
  function sortCats(catArray: IndivCat[]): IndivCat[] {
    catArray.sort(sortCatsCore).forEach((cat, index) => (cat.orderNo = index));
    return catArray;
  }

  function renumberOptions(optionArray: IndivOption[]): IndivOption[] {
    let arrayToReturn: IndivOption[] = [];
    optionArray.map((option, index) =>
      arrayToReturn.push(
        new IndivOption(
          option.ID,
          option.catID,
          option.name,
          option.description,
          index
        )
      )
    );
    return arrayToReturn;
  }

  function renumberCats(catArray: IndivCat[]): IndivCat[] {
    let arrayToReturn: IndivCat[] = [];
    catArray.map((cat, index) =>
      arrayToReturn.push(new IndivCat(cat.ID, cat.name, cat.maxvotes, index))
    );
    return arrayToReturn;
  }

  const transformPlainObjectToOptions = (obj: QueryResultRow[]) => {
    var listToReturn: IndivOption[] = [];
    obj.forEach((element) => {
      listToReturn.push(
        new IndivOption(
          element.id,
          element.categoryid,
          element.name,
          element.description,
          element.orderno
        )
      );
    });
    return listToReturn;
  };

  const transformPlainObjectToCategories = (obj: QueryResultRow[]) => {
    var listToReturn: IndivCat[] = [];
    obj.forEach((element) => {
      listToReturn.push(
        new IndivCat(
          element.id,
          element.name,
          element.maxvotes,
          element.orderno
        )
      );
    });
    return listToReturn;
  };

  const transformPlainObjectToExtraQuestions = (obj: QueryResultRow[]) => {
    var listToReturn: IndivExtraQuestion[] = [];
    obj.forEach((element) => {
      listToReturn.push(
        new IndivExtraQuestion(
          element.id,
          element.name,
          element.maxvotes,
          element.orderno
        )
      );
    });
    return listToReturn;
  };

  const transformPlainObjectToExtraOptions = (obj: QueryResultRow[]) => {
    var listToReturn: IndivExtraOption[] = [];
    obj.forEach((element) => {
      listToReturn.push(
        new IndivExtraOption(
          element.id,
          element.qid,
          element.name,
          //element.maxvotes,
          element.orderno
        )
      );
    });
    return listToReturn;
  };

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
        await sql`CREATE TABLE IF NOT EXISTS votes (id text, votetime text, voteoption text, entrycount smallint, ip text);`;

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
        await sql`CREATE TABLE IF NOT EXISTS votesextra (id text, votetime text, qid text, qanswer varchar(65535), entrycount smallint, ip text);`; // what

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
        await sql`CREATE TABLE IF NOT EXISTS extraquestions (id text, name text, maxvotes smallint, orderno smallint);`;

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
        await sql`CREATE TABLE IF NOT EXISTS extraoptions (id text, name text, orderno smallint);`;

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

  // console.log(votsAns);

  console.log(vgiAns && vgiAns[0]?.votingset);
  //console.log(optsAns && optsAns[0]?.aaa);
  //console.log(catsAns && catsAns[0]?.bbb);

  const handleActionTop = (arg: any) => {
    console.log(`Got a weird one: ${arg}`);
  };

  var data = "INIT";

  // const upTest = () => {
  //   data = Date.now().toString();
  //   // console.log(data);
  // };

  // setInterval(upTest, 1000);

  return (
    <main>
      {vgiAns && vgiAns[0]?.votingset ? (
        <>
          <TopArea
            title="集計パネル"
            description="自動で更新されます。"
            colorFrom="from-[#F1A335]"
            colorTo="to-[#F35928]"
          />
          <Stats
            receivedVGI={vgiAns}
            receivedOPTS={optsAns}
            receivedCATS={catsAns}
            receivedVOTS={votsAns}
            receivedVOTX={votxAns}
            receivedEXQS={exqsAns}
            receivedEXOP={exopAns}
            dateData={data}
          />
        </>
      ) : null}
    </main>
  );
}
