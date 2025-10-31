"use client";

import { Button } from "@/components/ui/button";
//import * as Switch from '@radix-ui/react-switch';

//"use server"

import {
  JSX,
  SVGProps,
  useState,
  useEffect,
  useRef,
  useMemo,
  PureComponent,
} from "react";
import { format } from "date-fns";

import { Calendar as CalendarIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { Separator } from "@/components/ui/separator";

import {
  getLocalTimeZone,
  parseDate,
  ZonedDateTime,
  parseZonedDateTime,
  parseDateTime,
  parseAbsoluteToLocal,
  today,
  toCalendarDateTime,
} from "@internationalized/date";
import { Calendar } from "@/components/ui/calendar";
import { ja, lb } from "date-fns/locale";

import { DateTimePicker } from "@/components/ui/datetime-picker";

import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaptionLabel } from "react-day-picker";
import { useLabel, useLocale } from "react-aria";

import Image from "next/image";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Player } from "@lottiefiles/react-lottie-player";
// import Animation from "./animation.json";

import { Skeleton } from "@/components/ui/skeleton";

import Marquee from "react-fast-marquee";

import { revalidatePath } from "next/cache";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  LineChart,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  Tooltip,
  ResponsiveContainer,
  PolarRadiusAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

/*
Following is what this component used to return

<Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !votingDateS && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {votingDateS ? (
                format(votingDateS, "PPPP", { locale: ja })
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={votingDateS}
              onSelect={setvotingDateS}
              fromYear={2024}
              toYear={2099}
              locale={ja}
              className="rounded-md"
              title=""
              initialFocus
            />
          </PopoverContent>
        </Popover>
        */

import React, { useId } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "../SortableItem";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Input } from "@/components/ui/input";

import { BsSliders, BsTrash3, BsFillPlusCircleFill } from "react-icons/bs";
import { AdminOption } from "./admin-option";
import { eventNames } from "process";
import { Description } from "@radix-ui/react-dialog";
// import { AdminConfirm } from "./admin-confirm";
// import { NewAdminConfirm } from "./new-admin-confirm";
// import { StatsHeader } from "./stats-header";

import { QueryResultRow } from "@vercel/postgres";

import { Suspense } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import Loading from "@/app/stats/loading";

import { curveCardinal, curveCatmullRom } from "d3-shape";
import { Checkbox } from "../ui/checkbox";

export function Stats(props: {}) {
  const startHour = 8;
  const totalHalfHours = 24;

  // MAGIC NUMBERS EXTRACTED ABOVE

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

  class IndivVote {
    ID: string;
    voteTime: string;
    voteOption: string;
    entryCount: number;
    IP: string;

    constructor(
      ID: string,
      voteTime: string,
      voteOption: string,
      entryCount: number,
      IP: string
    ) {
      this.ID = ID;
      this.voteTime = voteTime;
      this.voteOption = voteOption;
      this.entryCount = entryCount;
      this.IP = IP;
    }
  }

  class IndivVoteExtra {
    ID: string;
    voteTime: string;
    QID: string;
    Qanswer: string;
    entryCount: number;
    IP: string;

    constructor(
      ID: string,
      voteTime: string,
      QID: string,
      Qanswer: string,
      entryCount: number,
      IP: string
    ) {
      this.ID = ID;
      this.voteTime = voteTime;
      this.QID = QID;
      this.Qanswer = Qanswer;
      this.entryCount = entryCount;
      this.IP = IP;
    }
  }

  class OptionAndCount {
    option: IndivOption;
    count: number;
    rank: number;

    constructor(option: IndivOption, count: number, rank: number) {
      this.option = option;
      this.count = count;
      this.rank = rank;
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

  function sortOptionsAndCountsCore(a: OptionAndCount, b: OptionAndCount) {
    return b.count - a.count;
  }
  function sortOptionsAndCounts(
    optionAndCountArray: OptionAndCount[]
  ): OptionAndCount[] {
    optionAndCountArray.sort(sortOptionsAndCountsCore);
    return optionAndCountArray;
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

  const transformPlainObjectToVotesExtra = (obj: QueryResultRow[]) => {
    var listToReturn: IndivVoteExtra[] = [];
    obj.forEach((element) => {
      listToReturn.push(
        new IndivVoteExtra(
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

  const transformOptionsToPlainObject = (options: IndivOption[]) => {
    return options.map((option) => ({
      ID: option.ID,
      catID: option.catID,
      name: option.name,
      description: option.description,
      orderNo: option.orderNo,
    }));
  };

  const transformCategoriesToPlainObject = (categories: IndivCat[]) => {
    return categories.map((category) => ({
      ID: category.ID,
      name: category.name,
      maxvotes: category.maxvotes,
      orderNo: category.orderNo,
    }));
  };

  // --- START OF REWRITE ---

  // Centralized voting data shape
  interface VotingData {
    err: any[];
    categories: IndivCat[];
    options: IndivOption[];
    votes: IndivVote[];
    extraQuestions: IndivExtraQuestion[];
    extraOptions: IndivExtraOption[];
    votesExtra: IndivVoteExtra[];
    vgi: any[];
    time: Date | undefined;
  }

  const [fetchedStuff, setFetchedStuff] = useState<VotingData>({
    err: [],
    categories: [],
    options: [],
    votes: [],
    extraQuestions: [],
    extraOptions: [],
    votesExtra: [],
    vgi: [],
    time: undefined,
  });

  const [studentType, setStudentType] = useState<any>("ns");
  const [isFetching, setIsFetching] = useState(false);
  const previousFetchedStuffRef = useRef<VotingData | null>(null);

  /**
   * Fetch and normalize all voting data.
   * Automatically updates only when valid payload is returned.
   */
  const fetchAll = async () => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const res = await fetch("/api/getvotes", { cache: "no-store" });
      if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);
      const raw = await res.json();

      const newFetchedStuff: VotingData = {
        err: [],
        categories: transformPlainObjectToCategories(raw.categories.rows ?? []),
        options: transformPlainObjectToOptions(raw.votingoptions.rows ?? []),
        votes: transformPlainObjectToVotes(raw.votes.rows ?? []),
        extraQuestions: transformPlainObjectToExtraQuestions(
          raw.extraquestions.rows ?? []
        ),
        extraOptions: transformPlainObjectToExtraOptions(
          raw.extraoptions.rows ?? []
        ),
        votesExtra: transformPlainObjectToVotesExtra(raw.votesextra.rows ?? []),
        vgi: raw.vgi.rows ?? [],
        time: new Date(),
      };

      // Always refresh the visible state so non-vote props update
      setFetchedStuff(newFetchedStuff);

      // Only advance the "good fallback" when votes are non-empty (or improving)
      const hadVotesBefore = previousFetchedStuffRef.current?.votes.length ?? 0;
      const hasVotesNow = newFetchedStuff.votes.length;
      if (hasVotesNow > 0 || hasVotesNow >= hadVotesBefore) {
        previousFetchedStuffRef.current = newFetchedStuff;
      } else {
        console.warn(
          "New fetch has empty/poorer votes — keeping previous snapshot for fallback."
        );
      }
    } catch (err) {
      console.error("❌ Error while fetching:", err);
      setFetchedStuff((prev) => ({ ...prev, err: [...prev.err, err] }));
    } finally {
      setIsFetching(false);
    }
  };

  // Fetch once on mount and then every 10 seconds
  useEffect(() => {
    fetchAll();
    // const interval = setInterval(fetchAll, 10_000);
    // return () => clearInterval(interval);
  }, []);

  // Compute a "read-only" snapshot that auto-rolls back if the last fetch failed or was empty
  const fetchedStuffToRead = useMemo(() => {
    if (fetchedStuff.err.length && previousFetchedStuffRef.current) {
      return previousFetchedStuffRef.current;
    }
    if (!fetchedStuff.votes.length && previousFetchedStuffRef.current) {
      console.warn("Using previous snapshot (empty votes)");
      return previousFetchedStuffRef.current;
    }
    return fetchedStuff;
  }, [fetchedStuff]);

  // --- END OF REWRITE ---

  console.log(fetchedStuffToRead.votes);
  console.log(fetchedStuffToRead);

  const sortedOptions = useMemo(
    () => sortOptions([...fetchedStuffToRead.options]),
    [fetchedStuffToRead.options]
  );

  // When cloning, also base it on fetchedStuffToRead
  const clonedFetchedStuff = useMemo(() => {
    const targetQ = fetchedStuffToRead.extraQuestions?.[2]; // assuming this exists in your data

    // Clone arrays
    let votesExtra = [...fetchedStuffToRead.votesExtra];
    let votes = [...fetchedStuffToRead.votes];

    // Apply the same filtering logic
    votesExtra = votesExtra.filter(
      (vx) =>
        vx.QID === targetQ.ID ||
        !votesExtra.find((e) => e.IP === vx.IP && e.QID === targetQ.ID)
    );

    votes = votes.filter(
      (v) => !votesExtra.find((e) => e.IP === v.IP && e.QID === targetQ.ID)
    );

    return {
      ...fetchedStuffToRead,
      votes,
      votesExtra,
    };
  }, [fetchedStuffToRead]);

  console.log(clonedFetchedStuff);

  const targetQ = fetchedStuffToRead.extraQuestions?.[2]; // see guard below
  // const filtered = useMemo(() => {
  //   let votesExtra = [...fetchedStuffToRead.votesExtra];
  //   let votes = [...fetchedStuffToRead.votes];

  //   if (!targetQ) return { votesExtra, votes }; // nothing to filter against yet

  //   if (studentType === "ns") {
  //     votesExtra = votesExtra.filter(
  //       (vx) =>
  //         vx.QID === targetQ.ID ||
  //         !votesExtra.find((e) => e.IP === vx.IP && e.QID === targetQ.ID)
  //     );
  //     votes = votes.filter(
  //       (v) => !votesExtra.find((e) => e.IP === v.IP && e.QID === targetQ.ID)
  //     );
  //   } else if (studentType === "s") {
  //     votesExtra = votesExtra.filter(
  //       (vx) =>
  //         vx.QID === targetQ.ID ||
  //         votesExtra.find((e) => e.IP === vx.IP && e.QID === targetQ.ID)
  //     );
  //     votes = votes.filter((v) =>
  //       votesExtra.find((e) => e.IP === v.IP && e.QID === targetQ.ID)
  //     );
  //   } else {
  //     votesExtra = votesExtra.filter(
  //       (vx) =>
  //         vx.QID === targetQ.ID ||
  //         votesExtra.find(
  //           (e) =>
  //             e.IP === vx.IP &&
  //             e.QID === targetQ.ID &&
  //             e.Qanswer === studentType
  //         )
  //     );
  //     votes = votes.filter((v) =>
  //       votesExtra.find(
  //         (e) =>
  //           e.IP === v.IP && e.QID === targetQ.ID && e.Qanswer === studentType
  //       )
  //     );
  //   }

  //   return { votesExtra, votes };
  // }, [
  //   fetchedStuffToRead.votes,
  //   fetchedStuffToRead.votesExtra,
  //   targetQ?.ID,
  //   studentType,
  // ]);

  const optionsAndCounts = clonedFetchedStuff?.options
    ? sortOptionsAndCounts(
        clonedFetchedStuff.options.map(
          (eachOption) =>
            new OptionAndCount(
              eachOption,
              clonedFetchedStuff?.votes
                ? clonedFetchedStuff.votes.reduce(
                    (accCount: number, curVote) =>
                      accCount + (eachOption.ID == curVote.voteOption ? 1 : 0),
                    0
                  )
                : 0,
              0
            )
        )
      )
    : [];

  console.log(optionsAndCounts);

  const myRef = useRef();
  // setPreviousOptionsAndCounts(optionsAndCounts)
  // console.log(optionsAndCounts);

  var rankingPreviousCount = Infinity;
  var rankingPreviousRank = 0;
  clonedFetchedStuff?.categories?.map((eachFetchedCategory) =>
    optionsAndCounts
      .filter(
        (eachOptionAndCount) =>
          eachOptionAndCount.option.catID == eachFetchedCategory.ID
      )
      .forEach((eachOptionAndCount, index) => {
        const foundOptionAndCountIndex = optionsAndCounts.findIndex(
          (optionAndCount) =>
            optionAndCount.option.ID == eachOptionAndCount.option.ID
        );
        if (index == 0) {
          optionsAndCounts[foundOptionAndCountIndex].rank = 1;
        } else if (eachOptionAndCount.count < rankingPreviousCount) {
          optionsAndCounts[foundOptionAndCountIndex].rank = index + 1;
        } else {
          optionsAndCounts[foundOptionAndCountIndex].rank = rankingPreviousRank;
        }
        rankingPreviousCount = eachOptionAndCount.count;
        rankingPreviousRank = optionsAndCounts[foundOptionAndCountIndex].rank;
      })
  );

  const previousOptionsAndCountsRef = useRef<OptionAndCount[] | undefined>();
  const previousOptionsAndCounts = previousOptionsAndCountsRef.current;

  return (
    <div
      className="space-y-3 px-[20px] md:px-[30px] py-[20px]"
      // style={{ marginTop: "20px", marginLeft: "20px", marginRight: "20px" }}
    >
      {/* <Suspense fallback={<Skeleton />}> */}
      {/* <pre>{fetchedStuff.categories && JSON.stringify(fetchedStuff.categories)}</pre>
          <pre>{fetchedStuff.votes && JSON.stringify(fetchedStuff.votes)}</pre>
          <pre>{optionsAndCounts.length}</pre>
          <pre>
            {optionsAndCounts.map(
              (eachOaC) => eachOaC.option.name + ": " + eachOaC.count + ", "
            )}
          </pre>
          <pre>{fetchedStuff.options && fetchedStuff.options.length}</pre> */}
      {/* </Suspense> */}

      {/* <pre>{err}</pre> */}

      <div className="flex items-center">
        <Label
          className="text-3xl font-bold"
          style={{ verticalAlign: "middle", marginBottom: "2px" }}
        >
          {/* {"全" + clonedFetchedStuff?.categories?.length + "カテゴリ"} */}
          ランキング
        </Label>
        {/* <pre>{JSON.stringify(fetchedStuff)}</pre> */}

        {fetchedStuff?.err.length == 0 ? (
          <>
            <Label
              className="ml-2 text-gray-500 font-normal text-sm"
              style={{}}
            >
              {new Date().toLocaleTimeString() + " 更新"}
            </Label>
          </>
        ) : (
          <Label className="ml-2 text-gray-500 font-normal text-sm" style={{}}>
            {new Date().toLocaleTimeString() + " 更新失敗"}
          </Label>
        )}
      </div>
      {/* <div className="">
        <Label className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-pre-line">
          票の種類
        </Label>
        <Select
          onValueChange={setStudentType}
          defaultValue={"ns"}
          value={studentType}
        >
          <SelectTrigger className="w-[180px]" style={{ marginBottom: "10px" }}>
            <SelectValue placeholder="選択..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all" key="all">
                全て
              </SelectItem>
              <SelectItem value="ns" key="ns">
                非生徒
              </SelectItem>
              <SelectItem value="s" key="s">
                生徒
              </SelectItem>
              {clonedFetchedStuff.extraOptions
                .filter(
                  (eachExtraOption) =>
                    eachExtraOption.QID ==
                    clonedFetchedStuff.extraQuestions[2].ID
                )
                .map((eachExtraOptionQ3: any) => (
                  <SelectItem
                    value={eachExtraOptionQ3.ID}
                    key={eachExtraOptionQ3.ID}
                  >
                    {eachExtraOptionQ3.name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {clonedFetchedStuff?.categories?.map((eachFetchedCategory) => (
          <label
            key={eachFetchedCategory.ID}
            //className="option-tile bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer w-full border border-gray-200 dark:border-gray-700"
            className={
              "bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full border relative " +
              (fetchedStuff.err.length == 0 ? "border-dead" : "border-dead")
            }
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-lg font-semibold text-center">
                {eachFetchedCategory.name}
              </h3>
            </div>
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">順位</TableHead>
                  <TableHead>団体名</TableHead>
                  <TableHead className="text-right">票数</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {optionsAndCounts
                  .filter(
                    (eachOptionAndCount) =>
                      eachOptionAndCount.option.catID == eachFetchedCategory.ID
                  )
                  .map((optionAndCount, index) => (
                    <TableRow key={optionAndCount.option.ID}>
                      <TableCell
                        className={
                          (optionAndCount.rank <= 1
                            ? "font-bold text-lg pt-2 pb-2 "
                            : "font-medium text-sm pt-1 pb-1 ") +
                          (optionAndCount.rank <
                          (previousOptionsAndCounts?.find(
                            (eachPreviousOptionAndCount) =>
                              eachPreviousOptionAndCount.option.ID ==
                              optionAndCount.option.ID
                          )?.rank ?? 0)
                            ? "flash-up "
                            : optionAndCount.rank >
                              (previousOptionsAndCounts?.find(
                                (eachPreviousOptionAndCount) =>
                                  eachPreviousOptionAndCount.option.ID ==
                                  optionAndCount.option.ID
                              )?.rank ?? Infinity)
                            ? "flash-down "
                            : "")
                        }
                      >
                        {optionAndCount.rank}
                      </TableCell>
                      <TableCell
                        className={
                          (optionAndCount.rank <= 1
                            ? "font-bold text-lg pt-2 pb-2 leading-snug "
                            : "font-medium text-sm pt-1 pb-1 leading-snug ") +
                          (optionAndCount.rank <
                          (previousOptionsAndCounts?.find(
                            (eachPreviousOptionAndCount) =>
                              eachPreviousOptionAndCount.option.ID ==
                              optionAndCount.option.ID
                          )?.rank ?? 0)
                            ? "flash-up "
                            : optionAndCount.rank >
                              (previousOptionsAndCounts?.find(
                                (eachPreviousOptionAndCount) =>
                                  eachPreviousOptionAndCount.option.ID ==
                                  optionAndCount.option.ID
                              )?.rank ?? Infinity)
                            ? "flash-down "
                            : "")
                        }
                      >
                        {optionAndCount.option.name}
                      </TableCell>
                      <TableCell
                        className={"text-right font-medium text-md pt-1 pb-1"}
                      >
                        {optionAndCount.count}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {/* <label className="bottom-3 inset-x-0 flex justify-center absolute text-gray-400 font-light">
                  123
                </label> */}
          </label>
        ))}
      </div>
    </div>
  );
}
