import Image from "next/image";
// import VotingCore from "@/components/component/voting-core";
import { TopArea } from "@/components/component/top-area";
import { headers } from "next/headers";
import { QueryResult, QueryResultRow, sql } from "@vercel/postgres";
import { Validation } from "@/components/component/validation";
import { parseDateTime } from "@internationalized/date";
import { sq } from "date-fns/locale";

import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { validateLocKey } from "@/validatelockey";

export async function POST(request: Request) {
  revalidatePath("/");

  setTimeout(() => {
    return NextResponse.json({ error: "timeout" }, { status: 504 });
  }, 10000);

  if (!(await validateLocKey())) {
    redirect("/location-request");
  }

  //   const header = headers();
  //   const ip = (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];

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

  const loadVO = loadVOTS();
  const votsAns = await loadVO;

  const loadVX = loadVOTX();
  const votxAns = await loadVX;

  const loadXQ = loadEXQS();
  const exqsAns = await loadXQ;

  const loadXO = loadEXOP();
  const exopAns = await loadXO;

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
    //maxvotes: number;
    orderNo: number;

    constructor(
      ID: string,
      name: string,
      /*maxvotes: number,*/ orderNo: number
    ) {
      this.ID = ID;
      this.name = name;
      //this.maxvotes = maxvotes;
      this.orderNo = orderNo;
    }
  }

  class IndivVote {
    ID: string;
    votetime: string;
    voteoption: string;
    entrycount: number;
    IP: string;

    constructor(
      ID: string,
      votetime: string,
      voteoption: string,
      entrycount: number,
      IP: string
    ) {
      this.ID = ID;
      this.votetime = votetime;
      this.voteoption = voteoption;
      this.entrycount = entrycount;
      this.IP = IP;
    }
  }

  class IndivVoteX {
    ID: string;
    votetime: string;
    qid: string;
    qans: string;
    entrycount: number;
    IP: string;

    constructor(
      ID: string,
      votetime: string,
      qid: string,
      qans: string,
      entrycount: number,
      IP: string
    ) {
      this.ID = ID;
      this.votetime = votetime;
      this.qid = qid;
      this.qans = qans;
      this.entrycount = entrycount;
      this.IP = IP;
    }
  }

  /*const router = useRouter();
  const jumpVoting = () => {
    var queries = "";
    router.replace("/validation?" + queries);
  };*/

  if (!vgiAns || !optsAns || !catsAns || !votsAns || !votxAns) {
  } // DATA UNFETCHED

  var votingPermission = false;

  const votingSet = vgiAns![0].votingset;
  const votingDateS = vgiAns![0].votingstart;
  const votingDateE = vgiAns![0].votingend;

  const maxVotes = vgiAns![0].maxvotes;

  const votingName = vgiAns![0].name;
  const votingDescription = vgiAns![0].description;

  const dayStartTime = vgiAns![0].daystarttime;
  const dayEndTime = vgiAns![0].dayendtime;

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
          //element.maxvotes,
          element.orderno
        )
      );
    });
    return listToReturn;
  };

  const transformPlainObjectToVotes = (obj: QueryResultRow[]) => {
    var listToReturn: IndivVote[] = [];
    obj.forEach((element) => {
      listToReturn.push(
        new IndivVote(
          element.id,
          element.votetime,
          element.voteoption,
          element.entrycount,
          element.ip
        )
      );
    });
    return listToReturn;
  };

  const transformPlainObjectToVoteX = (obj: QueryResultRow[]) => {
    var listToReturn: IndivVoteX[] = [];
    obj.forEach((element) => {
      listToReturn.push(
        new IndivVoteX(
          element.id,
          element.votetime,
          element.qid,
          element.qanswer,
          element.entrycount,
          element.ip
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

  const options = transformPlainObjectToOptions(optsAns!);
  const categories = transformPlainObjectToCategories(catsAns!);
  const votes = transformPlainObjectToVotes(votsAns!);
  const voteX = transformPlainObjectToVoteX(votxAns!);
  const extraQuestions = transformPlainObjectToExtraQuestions(exqsAns!);
  const extraOptions = transformPlainObjectToExtraOptions(exopAns!);

  const { opts, votopts, extraopts, votextraopts, fp } = await request.json();

  //   const opts = searchParams.opt;
  //   const votopts = searchParams.votopt;
  //   const extraopts = searchParams.extraopt;
  //   const votextraopts = searchParams.votextraopt;
  //   const fp = searchParams.fp;

  const optionnames = options.reduce((objAcc: any, option) => {
    objAcc.push(option.ID);
    return objAcc;
  }, []);

  // var testFailedRedirectDest: string | null = null;

  try {
    if (!votingSet) {
      throw "cl";
      // redirect("/error-vote?e=cl");
    }

    var optMatchTest =
      opts &&
      votopts &&
      optionnames &&
      opts.toString() == optionnames.toString(); // options matching test (only fails if option existence or order has changed)

    if (!optMatchTest) {
      throw "mc";
      // redirect("/error-vote?e=mc");
      // throw "optMatchTest";
    }

    /*var inCatVoteCountTest = categories.reduce((objAcc: boolean, category) => {
      // Make this area TRY / CATCH later
      var inCategoryVotedCount = 0;
      options
        .filter((eachOption) => eachOption.catID == category.ID)
        .forEach((option) => {
          if (votopts.includes(option.ID)) {
            inCategoryVotedCount++;
          }
        });
      objAcc =
        objAcc &&
        //inCategoryVotedCount <= category.maxvotes &&
        inCategoryVotedCount >= 0; // incat vote count test (in category >=0)
      return objAcc;
    }, true);*/

    // // Use SELECT EXISTS for a more efficient query
    // const query =
    //   await sql`SELECT EXISTS (SELECT 1 FROM votes WHERE ip = ${fp}) as exists`;

    // // Extract the boolean from the query result
    // const found = query.rows[0].exists;

    var inCatVoteCountTest = votextraopts
      ? extraQuestions.reduce((objAcc: boolean, extraQuestion) => {
          // Make this area TRY / CATCH later
          var inCategoryVotedCount = 0;
          extraOptions
            .filter(
              (eachExtraOption) => eachExtraOption.QID == extraQuestion.ID
            )
            .forEach((extraOption) => {
              if (votextraopts.includes(extraOption.ID)) {
                inCategoryVotedCount++;
              }
            });
          var inCategoryCount = 0;
          extraOptions
            .filter(
              (eachExtraOption) => eachExtraOption.QID == extraQuestion.ID
            )
            .forEach((extraOption) => {
              inCategoryCount++;
            });
          objAcc = extraQuestion.maxVotes
            ? objAcc &&
              inCategoryVotedCount <= extraQuestion.maxVotes &&
              inCategoryVotedCount <= inCategoryCount
            : objAcc && inCategoryVotedCount <= inCategoryCount; // incat vote count test (in category >=0)
          return objAcc;
        }, true)
      : true;

    var maxVotesTest =
      categories.reduce((objAcc: number, category) => {
        // we dont really need to use categories.reduce but its easier this way because I ctrl+v'd
        options
          .filter((eachOption) => eachOption.catID == category.ID)
          .forEach((option) => {
            if (votopts.includes(option.ID)) {
              // vote count test (total <= maxvotes)
              objAcc++;
            }
          });
        return objAcc;
      }, 0) <= maxVotes;

    var zeroVotesTest =
      categories.reduce((objAcc: number, category) => {
        // we dont really need to use categories.reduce but its easier this way because I ctrl+v'd
        options
          .filter((eachOption) => eachOption.catID == category.ID)
          .forEach((option) => {
            if (votopts.includes(option.ID)) {
              // vote count test (total <= maxvotes)
              objAcc++;
            }
          });
        return objAcc;
      }, 0) > 0;

    var voteDupliTest = !votes.find((eachVote) => eachVote.IP == fp); // IP hit test

    var votingOpenTest =
      votingSet &&
      new Date(votingDateS) <= new Date() &&
      new Date(votingDateE) > new Date() &&
      (new Date(dayStartTime).setUTCFullYear(1970, 0, 1) <
      new Date(dayEndTime).setUTCFullYear(1970, 0, 1)
        ? new Date().setUTCFullYear(1970, 0, 1) >=
            new Date(dayStartTime).setUTCFullYear(1970, 0, 1) &&
          new Date().setUTCFullYear(1970, 0, 1) <
            new Date(dayEndTime).setUTCFullYear(1970, 0, 1)
        : new Date().setUTCFullYear(1970, 0, 1) >=
            new Date(dayStartTime).setUTCFullYear(1970, 0, 1) ||
          new Date().setUTCFullYear(1970, 0, 1) <
            new Date(dayEndTime).setUTCFullYear(1970, 0, 1));

    if (!maxVotesTest) {
      throw "mv";
      // redirect("/error-vote?e=mv");
      // throw "maxVotesTest";
    } else if (!zeroVotesTest) {
      throw "0v";
      // redirect("/error-vote?e=0v");
      // throw "zeroVotesTest";
    }
    // if (!maxVotesTest) {
    //   redirect("/error-vote?e=mv")
    //   throw "totalVoteCountTest";
    // }
    else if (!inCatVoteCountTest) {
      throw "ic";
      // redirect("/error-vote?e=ic");
      // throw "inCatVoteCountTest";
    } else if (!votingOpenTest) {
      console.log(
        votingSet,
        new Date(votingDateS),
        new Date(),
        new Date(votingDateE),
        new Date(new Date().setFullYear(1970, 0, 1)),
        new Date(dayStartTime),
        new Date(dayEndTime)
      );
      throw "op";
      // redirect("/error-vote?e=op");
      // throw "votingOpenTest";
    } else if (!voteDupliTest) {
      throw "ed";
      // redirect("/error-vote?e=ed");
      // throw "voteDupliTest";
    }

    // TEST PASSED BELOW
    else {
      votingPermission = true;
    }

    // TEST PASSED ABOVE
  } catch (e) {
    if (e instanceof Error) {
      console.log("regular error" + e.message);
      //   return `[CE-VA] 致命的なエラーが発生しました。${e.message}`;
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      console.log(e);
      return NextResponse.json({ error: e }, { status: 400 });
      //   redirect("/error-vote?e=" + e);
    }
  }

  if (votingPermission) {
    try {
      const now = new Date().toISOString();

      // === VOTES ===
      if (typeof votopts === "string") {
        await sql`
        INSERT INTO votes (id, created_at, option_id, weight, fingerprint)
        VALUES (${crypto.randomUUID()}, ${now}, ${votopts}, 1, ${fp});
      `;
      } else if (Array.isArray(votopts) && votopts.length > 0) {
        // Build a VALUES clause dynamically and join it as one SQL string
        const voteRows = votopts
          .map(
            (opt) =>
              `('${crypto.randomUUID()}', '${now}', '${opt}', ${
                votopts.length
              }, '${fp}')`
          )
          .join(", ");

        await sql`
        
        INSERT INTO votes (id, created_at, option_id, weight, fingerprint)
           VALUES ${voteRows}
        
      `;
      }

      // === EXTRA VOTES ===
      if (typeof votextraopts === "string") {
        const questionID =
          extraQuestions.find(
            (q) => q.ID === extraOptions.find((o) => o.ID === votextraopts)?.QID
          )?.ID ?? null;

        await sql`
        INSERT INTO votesextra (id, created_at, question_id, option_id, weight, fingerprint)
        VALUES (${crypto.randomUUID()}, ${now}, ${questionID}, ${votextraopts}, 1, ${fp});
      `;
      } else if (Array.isArray(votextraopts) && votextraopts.length > 0) {
        const extraRows = votextraopts
          .map((opt) => {
            const questionID =
              extraQuestions.find(
                (q) => q.ID === extraOptions.find((o) => o.ID === opt)?.QID
              )?.ID ?? null;

            return `('${crypto.randomUUID()}', '${now}', '${questionID}', '${opt}', ${
              votextraopts.length
            }, '${fp}')`;
          })
          .join(", ");

        await sql`
          INSERT INTO votesextra (id, created_at, question_id, option_id, weight, fingerprint)
           VALUES ${extraRows}
        
      `;
      }

      return NextResponse.json({ message: "ok" }, { status: 200 });
    } catch (error) {
      console.error("Uh oh! actuallyVote failed!", error);
      return NextResponse.json({ message: "error", error }, { status: 500 });
    } finally {
      votingPermission = false;
    }
  }

  /*async function actuallyVote() {
    try {
      if (typeof votopts == "string") {
        await sql`INSERT INTO votes VALUES (${crypto.randomUUID()}, ${new Date().toISOString()}, ${votopts}, 1, ${crypto.randomUUID()});`; // HERE AND DOWN THERE: IP IS REPLACED!
        console.log("it worked ig");
      } else {
        for (const votopt in votopts) {
          await sql`INSERT INTO votes VALUES (${crypto.randomUUID()}, ${new Date().toISOString()}, ${votopt}, 1, ${crypto.randomUUID()});`;
        }
      }

      redirectDest = "./";
      console.log(redirectDest);

      // IDEA: order option tiles by 500*categoryORDER + optionORDER, with cOR:0-49 and oOR:0-499
      // in the option reorder menu, list all the items flatly but color each of them with its category theme color
    } catch (error) {
      console.log("Uh oh! actuallyVote failed!");
      console.log(error);
    }

    if (redirectDest) {
      redirect(redirectDest);
    }
  }*/

  //   return NextResponse.json({ message: "success" }, { status: 200 });
}
