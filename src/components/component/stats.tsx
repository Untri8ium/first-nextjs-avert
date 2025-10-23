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

  {
    /*const [votingSet, setVotingSet] = useState<boolean>(
    props.receivedVGI[0].votingset
  );
  const [votingDateS, setVotingDateS] = useState<string>(
    props.receivedVGI[0].votingstart
  );
  const [votingDateE, setVotingDateE] = useState<string>(
    props.receivedVGI[0].votingend
  );
  const [votingName, setVotingName] = useState<string>(
    props.receivedVGI[0].name
  );
  const [votingDescription, setVotingDescription] = useState<string>(
    props.receivedVGI[0].description
  );
  const [options, setOptions] = useState<IndivOption[]>(
    sortOptions(transformPlainObjectToOptions(props.receivedOPTS))
  );
  const [categories, setCategories] = useState<IndivCat[]>(
    sortCats(transformPlainObjectToCategories(props.receivedCATS))
  );

  const [newItemName, setNewItemName] = useState<string>();

  const [newItemDesc, setNewItemDesc] = useState<string>();

  const [newItemCatSelection, setNewItemCatSelection] = useState<string>();

  const [newItemPlaceSelection, setNewItemPlaceSelection] = useState<string>();

  const [newItemNewCatName, setNewItemNewCatName] = useState<string>();

  const [newItemNewCatMaxVotes, setNewItemNewCatMaxVotes] = useState<number>();

  const [newItemError, setNewItemError] = useState<string>();

  const [newItemOpenOne, setNewItemOpenOne] = useState<string>();

  const [editCatName, setEditCatName] = useState<string>();

  const [editCatPlaceSelection, setEditCatPlaceSelection] = useState<string>();

  const [editCatMaxVotes, setEditCatMaxVotes] = useState<number>();

  const [editCatError, setEditCatError] = useState<string>();

  const [editCatOpenOne, setEditCatOpenOne] = useState<string>();

  const [nameError, setNameError] = useState<string>();

  const [dateSError, setDateSError] = useState<string>();

  const [dateEError, setDateEError] = useState<string>();

  const [optionsError, setOptionsError] = useState<string>();

  const [categoriesError, setCategoriesError] = useState<string>();

  const [submitText, setSubmitText] = useState<string>();*/
  }

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
    const interval = setInterval(fetchAll, 10_000);
    return () => clearInterval(interval);
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
  const clonedFetchedStuff = useMemo(
    () => ({
      ...fetchedStuffToRead,
      votes: [...fetchedStuffToRead.votes],
      votesExtra: [...fetchedStuffToRead.votesExtra],
    }),
    [fetchedStuffToRead]
  );

  console.log(clonedFetchedStuff);

  const targetQ = fetchedStuffToRead.extraQuestions?.[2]; // see guard below
  const filtered = useMemo(() => {
    let votesExtra = [...fetchedStuffToRead.votesExtra];
    let votes = [...fetchedStuffToRead.votes];

    if (!targetQ) return { votesExtra, votes }; // nothing to filter against yet

    if (studentType === "ns") {
      votesExtra = votesExtra.filter(
        (vx) =>
          vx.QID === targetQ.ID ||
          !votesExtra.find((e) => e.IP === vx.IP && e.QID === targetQ.ID)
      );
      votes = votes.filter(
        (v) => !votesExtra.find((e) => e.IP === v.IP && e.QID === targetQ.ID)
      );
    } else if (studentType === "s") {
      votesExtra = votesExtra.filter(
        (vx) =>
          vx.QID === targetQ.ID ||
          votesExtra.find((e) => e.IP === vx.IP && e.QID === targetQ.ID)
      );
      votes = votes.filter((v) =>
        votesExtra.find((e) => e.IP === v.IP && e.QID === targetQ.ID)
      );
    } else {
      votesExtra = votesExtra.filter(
        (vx) =>
          vx.QID === targetQ.ID ||
          votesExtra.find(
            (e) =>
              e.IP === vx.IP &&
              e.QID === targetQ.ID &&
              e.Qanswer === studentType
          )
      );
      votes = votes.filter((v) =>
        votesExtra.find(
          (e) =>
            e.IP === v.IP && e.QID === targetQ.ID && e.Qanswer === studentType
        )
      );
    }

    return { votesExtra, votes };
  }, [
    fetchedStuffToRead.votes,
    fetchedStuffToRead.votesExtra,
    targetQ?.ID,
    studentType,
  ]);

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

  // const previousOptionsAndCountsToRead = previousOptionsAndCounts;

  // const ultraPreviousOptionsAndCountsRef = useRef<
  //   OptionAndCount[] | undefined
  // >();
  // const ultraPreviousOptionsAndCounts =
  //   ultraPreviousOptionsAndCountsRef.current;

  useEffect(() => {
    // Compare previous and current optionsAndCounts
    // const areEqual =
    //   JSON.stringify(previousOptionsAndCounts) ===
    //   JSON.stringify(optionsAndCounts);

    // if (!areEqual) {
    //   // Update previousOptionsAndCountsRef only if the values differ
    // }

    previousOptionsAndCountsRef.current = optionsAndCounts;
  }, [optionsAndCounts]); // Update the ref whenever optionsAndCounts changes

  useEffect(() => {
    if (fetchedStuff.err.length === 0 && fetchedStuff.votes.length > 0) {
      previousFetchedStuffRef.current = fetchedStuff;
    }
  }, [fetchedStuff]);

  // console.log(
  //   optionsAndCounts.map(
  //     (eachOptionAndCount) =>
  //       eachOptionAndCount.count ==
  //       previousOptionsAndCounts?.find(
  //         (eachPreviousOptionAndCount) =>
  //           eachPreviousOptionAndCount.option.ID == eachOptionAndCount.option.ID
  //       )?.count
  //   )
  // );
  // console.log(
  //   optionsAndCounts.map(
  //     (optionAndCount) =>
  //       optionAndCount.rank <
  //       (previousOptionsAndCounts?.find(
  //         (eachPreviousOptionAndCount) =>
  //           eachPreviousOptionAndCount.option.ID == optionAndCount.option.ID
  //       )?.rank ?? Infinity)
  //   ) +
  //     ", " +
  //     new Date().toTimeString()
  // );

  // if (err.length != 0) console.log(err);

  // console.log(fetchedStuff);
  // console.log(fetchedStuff.votes.length);
  // console.log([...fetchedStuff.votes]);
  // console.log(previousFetchedStuffRef.current);
  // console.log(clonedFetchedStuff);

  interface PreliminaryTimeCharts {
    [key: string]: Object;
  }

  let votesCopy = [...clonedFetchedStuff.votes];
  const timeCharts = clonedFetchedStuff.options.reduce(
    (
      preliminaryTimeCharts: {
        [key: string]: Object;
      },
      eachOption
    ) => {
      console.log(clonedFetchedStuff.votes.length);
      console.log(votesCopy.length);
      console.log(eachOption.ID);
      preliminaryTimeCharts[eachOption.ID] = new Array(totalHalfHours)
        .fill(null)
        .map((empty, halfHoursElapsedFrom0800) =>
          Object.assign(
            {
              hour:
                halfHoursElapsedFrom0800 % 2 == 0
                  ? `${Math.floor(
                      halfHoursElapsedFrom0800 / 2 + startHour
                    )}時台前半`
                  : `${Math.floor(
                      halfHoursElapsedFrom0800 / 2 + startHour
                    )}時台後半`,
            },
            new Array(
              Math.round(
                (new Date(
                  new Date(
                    new Date(clonedFetchedStuff.vgi[0].votingend).getTime() - 1
                  ).setHours(0, 0, 0, 0)
                ).getTime() -
                  new Date(
                    new Date(clonedFetchedStuff.vgi[0].votingstart).setHours(
                      0,
                      0,
                      0,
                      0
                    )
                  ).getTime()) /
                  86400000
              ) + 1
            )
              .fill(null)
              .reduce((dateVoteCounts, empty, index) => {
                const tempFiltered = votesCopy.filter((eachVote) => {
                  return (
                    eachVote.voteOption == eachOption.ID &&
                    new Date(eachVote.voteTime) >=
                      new Date(
                        new Date(
                          new Date(
                            clonedFetchedStuff.vgi[0].votingstart
                          ).setDate(
                            new Date(
                              clonedFetchedStuff.vgi[0].votingstart
                            ).getDate() + index
                          )
                        ).setHours(
                          halfHoursElapsedFrom0800 / 2 + startHour,
                          (halfHoursElapsedFrom0800 * 30) % 60,
                          0,
                          0
                        )
                      ) &&
                    new Date(eachVote.voteTime) <
                      new Date(
                        new Date(
                          new Date(
                            clonedFetchedStuff.vgi[0].votingstart
                          ).setDate(
                            new Date(
                              clonedFetchedStuff.vgi[0].votingstart
                            ).getDate() + index
                          )
                        ).setHours(
                          halfHoursElapsedFrom0800 / 2 + startHour + 1 / 2,
                          (halfHoursElapsedFrom0800 * 30 + 30) % 60,
                          0,
                          0
                        )
                      )
                  );
                });
                dateVoteCounts[
                  new Date(
                    new Date(clonedFetchedStuff.vgi[0].votingstart).setDate(
                      new Date(
                        clonedFetchedStuff.vgi[0].votingstart
                      ).getDate() + index
                    )
                  ).setHours(0, 0, 0, 0)
                ] =
                  tempFiltered.length >= 1
                    ? tempFiltered.reduce((hitVoteCount, eachHitVote) => {
                        hitVoteCount++;
                        votesCopy.splice(votesCopy.indexOf(eachHitVote), 1);
                        return hitVoteCount;
                      }, 0)
                    : 0;
                return dateVoteCounts;
              }, {})
          )
        );
      // console.log(JSON.stringify(preliminaryTimeCharts));
      return preliminaryTimeCharts;
    },
    {}
  );

  console.log(JSON.stringify(timeCharts));
  // const timeCharts: {
  //   [x: string]: Object;
  // } = JSON.parse(JSON.stringify(timeCharts));
  // console.log(
  //   timeCharts
  // );

  const arrayed = (obj: Object) => {
    return Array.isArray(obj) ? [...obj] : [];
  };

  var allOptionsTimeCharts = arrayed(Object.values(timeCharts)[0]);
  // Object.values(a)
  Object.values(timeCharts)
    .splice(1)
    .forEach((eachOptionTimeChart, optionIndexMinusOne) => {
      arrayed(eachOptionTimeChart).forEach((eachHourObject, hourIndex) => {
        Object.entries(eachHourObject).forEach((eachEntry) => {
          if (eachEntry[0] != "hour") {
            allOptionsTimeCharts[hourIndex][eachEntry[0]] += eachEntry[1];
          }
        });
      });
    });

  console.log(allOptionsTimeCharts);

  // const a = fetchedStuff.vgi[0];
  // const c: any = "a";
  // console.log(c.aaa);
  // console.log(fetchedStuff.vgi[0]?.votingend);

  const totalDays =
    Math.round(
      (new Date(
        new Date(
          new Date(clonedFetchedStuff.vgi[0]?.votingend).getTime() - 1
        ).setHours(0, 0, 0, 0)
      ).getTime() -
        new Date(
          new Date(clonedFetchedStuff.vgi[0]?.votingstart).setHours(0, 0, 0, 0)
        ).getTime()) /
        86400000
    ) + 1;

  console.log(totalDays);

  // const aConfig = isNaN(totalDays)
  //   ? undefined
  //   : (new Array(totalDays)
  //       .fill(null)
  //       .reduce((dateVoteCounts, empty, index) => {
  //         dateVoteCounts[
  //           new Date(
  //             new Date(fetchedStuff.vgi[0]?.votingstart).setDate(
  //               new Date(fetchedStuff.vgi[0]?.votingstart).getDate() + index
  //             )
  //           ).toDateString()
  //         ] = {
  //           label: new Date(
  //             new Date(fetchedStuff.vgi[0]?.votingstart).setDate(
  //               new Date(fetchedStuff.vgi[0]?.votingstart).getDate() + index
  //             )
  //           ).toDateString(),
  //           color: "hsl(0 100% 50%)",
  //         };
  //         return dateVoteCounts;
  //       }, {}) satisfies ChartConfig);

  // console.log(aConfig);

  // console.log(a);
  // var b = a[fetchedStuff.options[0] && fetchedStuff.options[0].ID];
  // console.log(Array.isArray(b) && [...b]);

  // const chartData = [
  //   { month: "January", desktop: 186, mobile: 80 },
  //   { month: "February", desktop: 305, mobile: 200 },
  //   { month: "March", desktop: 237, mobile: 120 },
  //   { month: "April", desktop: 73, mobile: 190 },
  //   { month: "May", desktop: 209, mobile: 130 },
  //   { month: "June", desktop: 214, mobile: 140 },
  // ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const customizedAxisTick = ({
    x,
    y,
    dx = 6,
    payload,
    rotateAngle = 90,
  }: {
    x?: number;
    y?: number;
    dx?: number;
    payload?: any;
    rotateAngle?: number;
  }) => {
    // const isLargeOrWider = window.matchMedia("(min-width: 1024px)").matches;
    // const textAnchorValue = window.matchMedia("(min-width: 1280px)").matches
    //   ? "start"
    //   : "start";
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dx={window.matchMedia("(min-width: 768px)").matches ? dx : 0}
          dy={window.matchMedia("(min-width: 768px)").matches ? 0 : -dx}
          textAnchor={"start"}
          fill="#666"
          className={`transform rotate-90 md:rotate-0 md:translate-y-2`}
        >
          {
            /* {window.matchMedia("(min-width: 768px)").matches
            ? payload.value
            : */ payload.value.includes("後半")
              ? parseInt(payload.value.split("時")[0]) + 1 ==
                startHour + totalHalfHours / 2
                ? null
                : parseInt(payload.value.split("時")[0]) + 1 + ":00"
              : null
          }
        </text>
      </g>
    );
  };

  const AllOptionsCustomizedAxisTick = ({
    x,
    y,
    dx = 6,
    payload,
    rotateAngle = 90,
  }: {
    x?: number;
    y?: number;
    dx?: number;
    payload?: any;
    rotateAngle?: number;
  }) => {
    // const isLargeOrWider = window.matchMedia("(min-width: 1024px)").matches;
    // const textAnchorValue = window.matchMedia("(min-width: 1280px)").matches
    //   ? "start"
    //   : "start";
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dx={window.matchMedia("(min-width: 768px)").matches ? dx + 2 : 0}
          dy={window.matchMedia("(min-width: 768px)").matches ? 0 : -dx}
          textAnchor={"start"}
          fill="#666"
          className={`transform rotate-90 md:rotate-0 md:translate-y-2`}
        >
          {
            /* {window.matchMedia("(min-width: 768px)").matches
            ? payload.value
            : */ payload.value.includes("後半")
              ? parseInt(payload.value.split("時")[0]) + 1 ==
                startHour + totalHalfHours / 2
                ? null
                : parseInt(payload.value.split("時")[0]) + 1 + ":00"
              : null
          }
        </text>
      </g>
    );
  };

  const customizedRadarAxisTick = ({
    x,
    y,
    dx,
    payload,
  }: {
    x?: number;
    y?: number;
    dx?: number;
    payload?: any;
  }) => {
    // const isLargeOrWider = window.matchMedia("(min-width: 1024px)").matches;
    // const textAnchorValue = window.matchMedia("(min-width: 1280px)").matches
    //   ? "start"
    //   : "start";
    return (
      <g transform={`translate(${x},${y})`}>
        {y && y > 100 && y < 160 ? (
          <foreignObject x={-32} y={0} width={64} height={90} className="flex">
            <span
              className={`transform whitespace-normal overflow-visible text-[#666] justify-center text-center`}
            >
              {payload.value.replaceAll("・", "・\n")}
            </span>
          </foreignObject>
        ) : (
          <foreignObject x={-64} y={0} width={128} height={90} className="flex">
            <span
              className={`transform overflow-hidden text-[#666] justify-center text-center`}
            >
              {payload.value}
            </span>
          </foreignObject>
        )}
      </g>
    );
  };

  const isDark =
    window.matchMedia && // ARE WE ACTUALLY GONNA KEEP THIS YAPPIN IN CONSOLE
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const renderWeightedLegend = (value: string, entry: any) => {
    const { color } = entry;

    return (
      <span style={{ color }} className="font-medium">
        {value}
      </span>
    );
  };

  const [activeLinesForEachOption, setActiveLinesForEachOption] = useState<{
    [key: string]: Object;
  }>({});

  const [activeLinesOV, setActiveLinesOV] = useState<string[]>([]);

  useEffect(() => {
    if (
      (clonedFetchedStuff &&
        JSON.stringify(activeLinesForEachOption) == "{}") ||
      activeLinesOV.length == 0
    ) {
      const initialActiveLinesForEachOption = clonedFetchedStuff.options.reduce(
        (
          preliminaryActiveLinesForEachOption: { [key: string]: Object },
          eachOption
        ) => {
          const allDaysList = Object.keys(
            arrayed(timeCharts[eachOption.ID])[0]
          ).filter((eachProperty) => eachProperty != "hour");
          preliminaryActiveLinesForEachOption[eachOption.ID] = {
            votesChart: allDaysList,
            // q1Chart: allDaysList, // MMM HARD CODED, LOVELY
          };
          return preliminaryActiveLinesForEachOption;
        },
        {}
      );
      console.log(
        initialActiveLinesForEachOption,
        arrayed(
          (
            Object.values(initialActiveLinesForEachOption)[0] as {
              votesChart: any;
            }
          )?.votesChart
        )
      );
      setActiveLinesForEachOption(initialActiveLinesForEachOption);
      setActiveLinesOV(
        arrayed(
          (
            Object.values(initialActiveLinesForEachOption)[0] as {
              votesChart: any;
            }
          )?.votesChart
        )
      );
    }
  }, [clonedFetchedStuff]);

  const combinedTimeCharts = Object.fromEntries(
    Object.entries(timeCharts).map((eachOptionTimeChart) => [
      // THIS HAS TO REMAIN AS timeCharts FOR SOME REASON
      eachOptionTimeChart[0],
      arrayed(eachOptionTimeChart[1]).map((eachHourObject) => ({
        hour: eachHourObject["hour"],
        total: Object.entries(eachHourObject).reduce(
          (hourCombinedVotes, eachProperty: any) => {
            if (eachProperty[0] == "hour") return hourCombinedVotes;
            else return hourCombinedVotes + eachProperty[1];
          },
          0
        ),
      })),
    ])
  );

  var days: number[] = [];
  var voterDateOnlyCharts: { [day: string]: number } = {};
  var voterCount: number = 0;

  var dateOnlyCharts: { [key: string]: { [key: number]: number } } = {};
  var q1ExtraOptions: IndivExtraOption[] = [];
  var dateOnlyQ1Charts: { [key: string]: Object } = {};
  var combinedQ1Charts: { [x: string]: { head: any; total: number }[] };
  var dateOnlyPercentQ1Charts: { [x: string]: { head: any }[] };
  var combinedPercentQ1Charts: { [x: string]: { head: any; total: number }[] };
  var allOptionsCombinedTimeCharts;
  var allOptionsDateOnlyCharts: { [day: string]: number } = {};

  var allOptionsDateOnlyQ1Charts: {
    [day: number]: {
      [extraOptionID: string]: { head: string; total: number };
    };
  } = {};
  var allOptionsDateOnlyPercentQ1Charts: {
    [day: number]: { head: string; total: number }[];
  } = {};
  var allOptionsCombinedPercentQ1Charts: { head: string; total: number }[] = [];
  // var preliminaryAllOptionsCombinedQ1Charts: {
  //   [extraOptionID: string]: { head: string; total: number };
  // } = {};
  var allOptionsCombinedQ1Charts: { head: string; total: number }[] = [];

  var q2ExtraOptions: IndivExtraOption[] = [];
  var dateOnlyQ2Charts: { [key: string]: Object } = {};
  var combinedQ2Charts: { [x: string]: { head: any; total: number }[] };
  var allOptionsDateOnlyQ2Charts: {
    [day: number]: {
      [extraOptionID: string]: { head: string; total: number };
    };
  } = {};
  var allOptionsDateOnlyPercentQ2Charts: {
    [day: number]: { head: string; total: number }[];
  } = {};
  var allOptionsCombinedPercentQ2Charts: { head: string; total: number }[] = [];
  // var preliminaryAllOptionsCombinedQ2Charts: {
  //   [extraOptionID: string]: { head: string; total: number };
  // } = {};
  var allOptionsCombinedQ2Charts: { head: string; total: number }[] = [];

  try {
    days = Object.keys(arrayed(Object.values(timeCharts)[0])[0]).reduce(
      (acc, cur) => {
        if (cur == "hour") return acc;
        else {
          acc.push(parseInt(cur));
          return acc;
        }
      },
      [] as number[]
    );
    q1ExtraOptions = clonedFetchedStuff.extraOptions.filter(
      (eachExtraOption) =>
        eachExtraOption.QID == clonedFetchedStuff.extraQuestions[0].ID
    );
    q2ExtraOptions = clonedFetchedStuff.extraOptions.filter(
      (eachExtraOption) =>
        eachExtraOption.QID == clonedFetchedStuff.extraQuestions[1].ID
    );
    const byOptionVotesList: { [key: string]: Object } =
      clonedFetchedStuff.options.reduce(
        (acc, eachOption) => ({
          ...acc,
          [eachOption.ID]: clonedFetchedStuff.votes.filter(
            (eachVote) => eachVote.voteOption == eachOption.ID
          ),
        }),
        {}
      );

    var preliminaryAppearedVoteIP: string[] = [];
    voterDateOnlyCharts = days.reduce(
      (preliminaryVoterDateOnlyCharts: { [day: string]: number }, eachDay) => {
        preliminaryVoterDateOnlyCharts[eachDay] =
          clonedFetchedStuff.votes.reduce((preliminaryVoterCount, eachVote) => {
            if (
              !preliminaryAppearedVoteIP.includes(eachVote.IP) &&
              new Date(eachVote.voteTime) >= new Date(eachDay) &&
              new Date(eachVote.voteTime) <
                new Date(
                  new Date(eachDay).setDate(new Date(eachDay).getDate() + 1)
                )
            ) {
              preliminaryVoterCount++;
              preliminaryAppearedVoteIP.push(eachVote.IP);
            }
            return preliminaryVoterCount;
          }, 0);
        preliminaryAppearedVoteIP = [];
        return preliminaryVoterDateOnlyCharts;
      },
      {}
    );

    voterCount = clonedFetchedStuff.votes.reduce(
      (preliminaryVoterCount, eachVote) => {
        if (!preliminaryAppearedVoteIP.includes(eachVote.IP)) {
          preliminaryVoterCount++;
          preliminaryAppearedVoteIP.push(eachVote.IP);
        }
        return preliminaryVoterCount;
      },
      0
    );

    console.warn(voterDateOnlyCharts);
    console.warn(voterCount);

    // dateOnlyQ1Charts = new Array(totalDays).map(empty => clonedFetchedStuff.extraOptions.filter(eachExtraOption => eachExtraOption.QID == clonedFetchedStuff.extraQuestions[0].ID)?.reduce((preliminaryChart, extraOption) => (fetchedStuff.votes.filter(eachVote => eachVote.voteOption == )),{})
    dateOnlyCharts = clonedFetchedStuff.options.reduce(
      (preliminaryEntireCharts, eachOption) => ({
        ...preliminaryEntireCharts,
        [eachOption.ID]: days.reduce(
          (preliminaryOptionCharts, eachDay, index) => ({
            ...preliminaryOptionCharts,
            [eachDay]: clonedFetchedStuff.votes.reduce(
              (dayVoteCount, eachVote) => {
                if (
                  eachVote.voteOption == eachOption.ID &&
                  new Date(eachVote.voteTime) >= new Date(eachDay) &&
                  new Date(eachVote.voteTime) <
                    new Date(
                      new Date(eachDay).setDate(new Date(eachDay).getDate() + 1)
                    )
                )
                  return dayVoteCount + 1;
                else return dayVoteCount;
              },
              0
            ),
          }),
          {}
        ),
      }),
      {}
    );
    console.dir(dateOnlyCharts);

    // Iterate through the days in the first option (assuming all options have the same days)
    days.forEach((eachDay) => {
      allOptionsDateOnlyCharts[eachDay] = Object.keys(dateOnlyCharts).reduce(
        (dayTotal, eachOptionID) => {
          return dayTotal + dateOnlyCharts[eachOptionID][eachDay];
        },
        0 // Starting point for the summation
      );
    });

    console.dir(allOptionsDateOnlyCharts);

    dateOnlyQ1Charts = clonedFetchedStuff.options.reduce(
      (preliminaryEntireCharts, eachOption) => ({
        ...preliminaryEntireCharts,
        [eachOption.ID]: q1ExtraOptions.map((eachExtraOption) => ({
          head: eachExtraOption.name,
          ...days.reduce(
            (preliminaryDayChart, eachDay) => ({
              ...preliminaryDayChart,
              [eachDay]: arrayed(byOptionVotesList[eachOption.ID])
                .filter(
                  (eachHitVote: IndivVote) =>
                    new Date(eachHitVote.voteTime) >= new Date(eachDay) &&
                    new Date(eachHitVote.voteTime) <
                      new Date(
                        new Date(eachDay).setDate(
                          new Date(eachDay).getDate() + 1
                        )
                      )
                )
                .reduce((preliminaryExtraVotesCount, eachHitVote) => {
                  if (
                    clonedFetchedStuff.votesExtra.some(
                      (eachVoteExtra) =>
                        eachVoteExtra.IP == eachHitVote.IP &&
                        eachVoteExtra.Qanswer == eachExtraOption.ID
                    )
                  )
                    return preliminaryExtraVotesCount + 1;
                  else return preliminaryExtraVotesCount;
                }, 0),
            }),
            {}
          ),
        })),
      }),
      {}
    );

    allOptionsCombinedTimeCharts = allOptionsTimeCharts.map((value, hour) => ({
      hour: value.hour, // Assuming `hour` is a string, convert it back to number
      total: days.reduce((hourTotal, eachDay) => {
        const singleValue = value[eachDay.toString()];
        return hourTotal + (singleValue ?? -20000);
      }, 0),
    }));

    console.log(allOptionsCombinedTimeCharts);

    // Initialize the structure
    days.forEach((day) => {
      // allOptionsDateOnlyQ1Charts[day] = q1ExtraOptions.reduce(
      //   (result, extraOption, index) => {
      //     // Aggregate totals for each extra option
      //     const total = Object.entries(dateOnlyQ1Charts).reduce(
      //       (sum, [optionID, dayCounts]) => {
      //         // Assert the type of dayCounts to avoid TypeScript error
      //         // const {head, ...headLessDayCounts} = dayCounts ;
      //         const counts = arrayed(dayCounts)[index] as {
      //           [key: number]: number;
      //         };
      //         // console.warn(counts);
      //         // console.log(sum, day, counts[day]);
      //         return sum + (counts[day] ?? -99999);
      //       },
      //       0
      //     );

      //     return {
      //       ...result,
      //       [extraOption.ID]: { head: extraOption.name, total },
      //     };
      //   },
      //   {}
      // );

      allOptionsDateOnlyQ1Charts[day] = q1ExtraOptions.reduce(
        (result, extraOption, index) => {
          // Aggregate totals for each extra option
          const total = clonedFetchedStuff.votesExtra.reduce(
            (preliminaryTotal, eachVoteExtra) => {
              if (
                eachVoteExtra.Qanswer == extraOption.ID &&
                new Date(eachVoteExtra.voteTime) >= new Date(day) &&
                new Date(eachVoteExtra.voteTime) <
                  new Date(new Date(day).setDate(new Date(day).getDate() + 1))
              )
                preliminaryTotal++;
              return preliminaryTotal;
            },
            0
          );

          return {
            ...result,
            [extraOption.ID]: { head: extraOption.name, total },
          };
        },
        {}
      );
    });

    console.dir(allOptionsDateOnlyQ1Charts);

    combinedQ1Charts = Object.fromEntries(
      Object.entries(dateOnlyQ1Charts).map(([optionID, extraOptionsArray]) => [
        optionID,
        arrayed(extraOptionsArray).map((extraOptionObj) => {
          const { head, ...dayCounts } = extraOptionObj;
          const total = (Object.values(dayCounts) as number[]).reduce(
            (sum, count) => sum + count,
            0
          );
          return { head, total };
        }),
      ])
    );

    // combinedQ1Charts = Object.fromEntries(
    //   q1ExtraOptions.reduce((result: any[], extraOption, index) => {
    //     // Aggregate totals for each extra option
    //     const total = clonedFetchedStuff.votesExtra.reduce(
    //       (preliminaryTotal, eachVoteExtra) => {
    //         if (eachVoteExtra.Qanswer == extraOption.ID) preliminaryTotal++;
    //         return preliminaryTotal;
    //       },
    //       0
    //     );

    //     result.push({ [extraOption.ID]: { head: extraOption.name, total } });
    //     return result;
    //   }, [])
    // );

    console.log(combinedQ1Charts);

    // Iterate through combinedQ1Charts for each option
    // Object.keys(combinedQ1Charts).forEach((optionID) => {
    //   combinedQ1Charts[optionID].forEach((extraOptionObj, index) => {
    //     const { head, total } = extraOptionObj;

    //     if (!preliminaryAllOptionsCombinedQ1Charts[q1ExtraOptions[index].ID]) {
    //       // Initialize if not already present
    //       preliminaryAllOptionsCombinedQ1Charts[q1ExtraOptions[index].ID] = {
    //         head,
    //         total,
    //       };
    //     } else {
    //       // Add up the totals if already present
    //       preliminaryAllOptionsCombinedQ1Charts[
    //         q1ExtraOptions[index].ID
    //       ].total += total;
    //     }
    //   });
    // });
    // allOptionsCombinedQ1Charts = Object.values(
    //   preliminaryAllOptionsCombinedQ1Charts
    // );

    allOptionsCombinedQ1Charts = clonedFetchedStuff.extraOptions
      .filter(
        (eachExtraOption) =>
          eachExtraOption.QID == clonedFetchedStuff.extraQuestions[0].ID
      )
      .map((eachExtraOption) => ({
        head: eachExtraOption.name,
        total: clonedFetchedStuff.votesExtra.reduce(
          (preliminaryTotal, eachVoteExtra) => {
            if (eachVoteExtra.Qanswer == eachExtraOption.ID) preliminaryTotal++;
            return preliminaryTotal;
          },
          0
        ),
      }));

    // console.dir(preliminaryAllOptionsCombinedQ1Charts);
    console.log(allOptionsCombinedQ1Charts);

    dateOnlyPercentQ1Charts = Object.fromEntries(
      Object.entries(dateOnlyQ1Charts).map(([optionID, extraOptionsArray]) => [
        optionID,
        (extraOptionsArray as any[]).map(
          (extraOptionObj: { [x: string]: any; head: any }) => {
            const { head, ...restExtraOptionObj } = extraOptionObj;
            const updatedDayCounts = Object.fromEntries(
              Object.entries(restExtraOptionObj).map(([day, count]) => [
                day,
                Math.round(
                  (count / dateOnlyCharts[optionID][parseInt(day)]) * 10000
                ) / 100, // Divide by 3, multiply by 100, round to nearest 1/100
              ])
            );
            return { head, ...updatedDayCounts };
          }
        ),
      ])
    );
    // Iterate over each day in allOptionsDateOnlyQ1Charts
    Object.keys(allOptionsDateOnlyQ1Charts).forEach((eachDay) => {
      const dayAsNumber = parseInt(eachDay);

      // Initialize the structure for the day
      //   allOptionsDateOnlyPercentQ1Charts[dayAsNumber] = Object.keys(
      //     allOptionsDateOnlyQ1Charts[dayAsNumber]
      //   ).reduce((result, eachExtraOptionID) => {
      //     const originalTotal =
      //       allOptionsDateOnlyQ1Charts[dayAsNumber][eachExtraOptionID].total;
      //     const head =
      //       allOptionsDateOnlyQ1Charts[dayAsNumber][eachExtraOptionID].head;

      //     // Get the corresponding total for the day from allOptionsDateOnlyCharts
      //     const dayTotal = allOptionsDateOnlyCharts[eachDay];

      //     // Avoid division by zero
      //     const percentTotal =
      //       dayTotal > 0
      //         ? Math.round((originalTotal / dayTotal) * 10000) / 100
      //         : 0;

      //     return {
      //       ...result,
      //       [eachExtraOptionID]: { head, total: percentTotal },
      //     };
      //   }, {});
      // });

      allOptionsDateOnlyPercentQ1Charts[dayAsNumber] = Object.keys(
        allOptionsDateOnlyQ1Charts[dayAsNumber]
      ).map((eachExtraOptionID) => {
        const originalTotal =
          allOptionsDateOnlyQ1Charts[dayAsNumber][eachExtraOptionID].total;
        const head =
          allOptionsDateOnlyQ1Charts[dayAsNumber][eachExtraOptionID].head;

        // Get the corresponding total for the day from allOptionsDateOnlyCharts
        // const dayTotal = allOptionsDateOnlyCharts[eachDay];
        const dayVoterTotal = voterDateOnlyCharts[eachDay];

        // Avoid division by zero
        const percentTotal =
          dayVoterTotal > 0
            ? Math.round((originalTotal / dayVoterTotal) * 10000) / 100
            : 0; // we just accidentally ruled that 0 divided by 0 is 0

        return { head, total: percentTotal };
      }, []);
    });

    console.dir(allOptionsDateOnlyPercentQ1Charts);

    combinedPercentQ1Charts = Object.fromEntries(
      Object.entries(combinedQ1Charts).map(([optionID, extraOptionsArray]) => [
        optionID,
        extraOptionsArray.map((extraOptionObj) => ({
          head: extraOptionObj.head,
          total:
            Math.round(
              (extraOptionObj.total /
                arrayed(byOptionVotesList[optionID]).length) * // WAIT THIS ONE'S DIVIDING BY UNFILTERED (filtered by option tho) VOTE COUNT, WE GOTTA CHECK THIS LATER
                10000
            ) / 100, // Divide by 3, multiply by 100, round to nearest 1/10
        })),
      ])
    );

    console.log(combinedPercentQ1Charts);

    console.log(dateOnlyPercentQ1Charts);

    // First, calculate the total sum of allOptionsDateOnlyCharts
    const totalSumAllOptions = Object.values(allOptionsDateOnlyCharts).reduce(
      (sum, dayTotal) => sum + dayTotal,
      0
    );

    // Now, iterate over allOptionsCombinedQ1Charts and compute the percentages
    Object.keys(allOptionsCombinedQ1Charts).forEach((unused, index) => {
      const { head, total } = allOptionsCombinedQ1Charts[index];

      // Compute the percentage by dividing the total by the overall total sum
      // const percentTotal =
      //   totalSumAllOptions > 0
      //     ? Math.round((total / totalSumAllOptions) * 10000) / 100
      //     : 0;

      const percentTotal =
        voterCount > 0 ? Math.round((total / voterCount) * 10000) / 100 : 0;

      // Store the result in allOptionsCombinedPercentQ1Charts
      allOptionsCombinedPercentQ1Charts[index] = {
        head,
        total: percentTotal,
      };
    });

    console.dir(allOptionsCombinedPercentQ1Charts);

    // console.dir(clonedFetchedStuff.votesExtra);
    console.log(byOptionVotesList);
    console.log(q1ExtraOptions);
    console.dir(dateOnlyQ1Charts);
    console.dir(combinedQ1Charts);

    dateOnlyQ2Charts = clonedFetchedStuff.options.reduce(
      (preliminaryEntireCharts, eachOption) => ({
        ...preliminaryEntireCharts,
        [eachOption.ID]: q2ExtraOptions.map((eachExtraOption) => ({
          head: eachExtraOption.name,
          ...days.reduce(
            (preliminaryDayChart, eachDay) => ({
              ...preliminaryDayChart,
              [eachDay]: arrayed(byOptionVotesList[eachOption.ID])
                .filter(
                  (eachHitVote: IndivVote) =>
                    new Date(eachHitVote.voteTime) >= new Date(eachDay) &&
                    new Date(eachHitVote.voteTime) <
                      new Date(
                        new Date(eachDay).setDate(
                          new Date(eachDay).getDate() + 1
                        )
                      )
                )
                .reduce((preliminaryExtraVotesCount, eachHitVote) => {
                  if (
                    clonedFetchedStuff.votesExtra.some(
                      (eachVoteExtra) =>
                        eachVoteExtra.IP == eachHitVote.IP &&
                        eachVoteExtra.Qanswer == eachExtraOption.ID
                    )
                  )
                    return preliminaryExtraVotesCount + 1;
                  else return preliminaryExtraVotesCount;
                }, 0),
            }),
            {}
          ),
        })),
      }),
      {}
    );

    allOptionsCombinedTimeCharts = allOptionsTimeCharts.map((value, hour) => ({
      hour: value.hour, // Assuming `hour` is a string, convert it back to number
      total: days.reduce((hourTotal, eachDay) => {
        const singleValue = value[eachDay.toString()];
        return hourTotal + (singleValue ?? -20000);
      }, 0),
    }));

    console.log(allOptionsCombinedTimeCharts);
    console.warn(allOptionsDateOnlyQ2Charts);

    // Initialize the structure
    days.forEach((day) => {
      // allOptionsDateOnlyQ2Charts[day] = q2ExtraOptions.reduce(
      //   (result, extraOption, index) => {
      //     // Aggregate totals for each extra option
      //     const total = Object.entries(dateOnlyQ2Charts).reduce(
      //       (sum, [optionID, dayCounts]) => {
      //         // Assert the type of dayCounts to avoid TypeScript error
      //         // const {head, ...headLessDayCounts} = dayCounts ;
      //         const counts = arrayed(dayCounts)[index] as {
      //           [key: number]: number;
      //         };
      //         // console.warn(counts);
      //         // console.log(sum, day, counts[day]);
      //         return sum + (counts[day] ?? -99999);
      //       },
      //       0
      //     );

      //     return {
      //       ...result,
      //       [extraOption.ID]: { head: extraOption.name, total },
      //     };
      //   },
      //   {}
      // );

      allOptionsDateOnlyQ2Charts[day] = q2ExtraOptions.reduce(
        (result, extraOption, index) => {
          // Aggregate totals for each extra option
          const total = clonedFetchedStuff.votesExtra.reduce(
            (preliminaryTotal, eachVoteExtra) => {
              if (
                eachVoteExtra.Qanswer == extraOption.ID &&
                new Date(eachVoteExtra.voteTime) >= new Date(day) &&
                new Date(eachVoteExtra.voteTime) <
                  new Date(new Date(day).setDate(new Date(day).getDate() + 1))
              )
                preliminaryTotal++;
              return preliminaryTotal;
            },
            0
          );

          return {
            ...result,
            [extraOption.ID]: { head: extraOption.name, total },
          };
        },
        {}
      );
      //   },
      //   {}
      // );
    });

    console.dir(allOptionsDateOnlyQ2Charts);

    combinedQ2Charts = Object.fromEntries(
      Object.entries(dateOnlyQ2Charts).map(([optionID, extraOptionsArray]) => [
        optionID,
        arrayed(extraOptionsArray).map((extraOptionObj) => {
          const { head, ...dayCounts } = extraOptionObj;
          const total = (Object.values(dayCounts) as number[]).reduce(
            (sum, count) => sum + count,
            0
          );
          return { head, total };
        }),
      ])
    );

    // combinedQ2Charts = Object.fromEntries(
    //   q2ExtraOptions.reduce((result: any[], extraOption, index) => {
    //     // Aggregate totals for each extra option
    //     const total = clonedFetchedStuff.votesExtra.reduce(
    //       (preliminaryTotal, eachVoteExtra) => {
    //         if (eachVoteExtra.Qanswer == extraOption.ID) preliminaryTotal++;
    //         return preliminaryTotal;
    //       },
    //       0
    //     );

    //     result.push({ [extraOption.ID]: { head: extraOption.name, total } });
    //     return result;
    //   }, [])
    // );

    console.log(combinedQ2Charts);

    // Iterate through combinedQ2Charts for each option
    // Object.keys(combinedQ2Charts).forEach((optionID) => {
    //   combinedQ2Charts[optionID].forEach((extraOptionObj, index) => {
    //     const { head, total } = extraOptionObj;

    //     if (!preliminaryAllOptionsCombinedQ2Charts[q2ExtraOptions[index].ID]) {
    //       // Initialize if not already present
    //       preliminaryAllOptionsCombinedQ2Charts[q2ExtraOptions[index].ID] = {
    //         head,
    //         total,
    //       };
    //     } else {
    //       // Add up the totals if already present
    //       preliminaryAllOptionsCombinedQ2Charts[
    //         q2ExtraOptions[index].ID
    //       ].total += total;
    //     }
    //   });
    // });
    // allOptionsCombinedQ2Charts = Object.values(
    //   preliminaryAllOptionsCombinedQ2Charts
    // );

    allOptionsCombinedQ2Charts = clonedFetchedStuff.extraOptions
      .filter(
        (eachExtraOption) =>
          eachExtraOption.QID == clonedFetchedStuff.extraQuestions[1].ID
      )
      .map((eachExtraOption) => ({
        head: eachExtraOption.name,
        total: clonedFetchedStuff.votesExtra.reduce(
          (preliminaryTotal, eachVoteExtra) => {
            if (eachVoteExtra.Qanswer == eachExtraOption.ID) preliminaryTotal++;
            return preliminaryTotal;
          },
          0
        ),
      }));

    // console.dir(preliminaryAllOptionsCombinedQ2Charts);
    console.log(allOptionsCombinedQ2Charts);

    // Iterate over each day in allOptionsDateOnlyQ2Charts
    Object.keys(allOptionsDateOnlyQ2Charts).forEach((eachDay) => {
      const dayAsNumber = parseInt(eachDay);

      // Initialize the structure for the day
      //   allOptionsDateOnlyPercentQ2Charts[dayAsNumber] = Object.keys(
      //     allOptionsDateOnlyQ2Charts[dayAsNumber]
      //   ).reduce((result, eachExtraOptionID) => {
      //     const originalTotal =
      //       allOptionsDateOnlyQ2Charts[dayAsNumber][eachExtraOptionID].total;
      //     const head =
      //       allOptionsDateOnlyQ2Charts[dayAsNumber][eachExtraOptionID].head;

      //     // Get the corresponding total for the day from allOptionsDateOnlyCharts
      //     const dayTotal = allOptionsDateOnlyCharts[eachDay];

      //     // Avoid division by zero
      //     const percentTotal =
      //       dayTotal > 0
      //         ? Math.round((originalTotal / dayTotal) * 10000) / 100
      //         : 0;

      //     return {
      //       ...result,
      //       [eachExtraOptionID]: { head, total: percentTotal },
      //     };
      //   }, {});
      // });

      allOptionsDateOnlyPercentQ2Charts[dayAsNumber] = Object.keys(
        allOptionsDateOnlyQ2Charts[dayAsNumber]
      ).map((eachExtraOptionID) => {
        const originalTotal =
          allOptionsDateOnlyQ2Charts[dayAsNumber][eachExtraOptionID].total;
        const head =
          allOptionsDateOnlyQ2Charts[dayAsNumber][eachExtraOptionID].head;

        // Get the corresponding total for the day from allOptionsDateOnlyCharts
        // const dayTotal = allOptionsDateOnlyCharts[eachDay];
        const dayVoterTotal = voterDateOnlyCharts[eachDay];

        // Avoid division by zero
        const percentTotal =
          dayVoterTotal > 0
            ? Math.round((originalTotal / dayVoterTotal) * 10000) / 100
            : 0;

        return { head, total: percentTotal };
      }, []);
    });

    console.dir(allOptionsDateOnlyPercentQ2Charts);

    // Now, iterate over allOptionsCombinedQ2Charts and compute the percentages
    Object.keys(allOptionsCombinedQ2Charts).forEach((unused, index) => {
      const { head, total } = allOptionsCombinedQ2Charts[index];

      // Compute the percentage by dividing the total by the overall total sum
      const percentTotal =
        voterCount > 0 ? Math.round((total / voterCount) * 10000) / 100 : 0;

      // Store the result in allOptionsCombinedPercentQ1Charts
      allOptionsCombinedPercentQ2Charts[index] = {
        head,
        total: percentTotal,
      };
    });
    console.log(q2ExtraOptions);
    console.log(combinedQ2Charts);
    console.log(dateOnlyQ2Charts);
    console.log(allOptionsCombinedQ2Charts);
    console.log(allOptionsDateOnlyQ2Charts);
    console.log(allOptionsCombinedPercentQ2Charts);
    console.log(allOptionsDateOnlyPercentQ2Charts);
    // console.log(preliminaryAllOptionsCombinedQ2Charts);
  } catch (e) {
    console.log(`oh hell naw ${e}`);
  }
  console.log(combinedTimeCharts);

  console.log(activeLinesForEachOption);

  return (
    <Tabs defaultValue="leaderboards" className="">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="leaderboards">ランキング</TabsTrigger>
        <TabsTrigger value="overview">全体分析</TabsTrigger>
        <TabsTrigger value="individual">選択肢分析</TabsTrigger>
      </TabsList>
      <TabsContent value="leaderboards">
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
                <div
                  style={{
                    position: "relative",
                    height: "25px",
                    width: "25px",
                    overflow: "hidden", // Prevents overflow
                    display: "inline-block", // Makes sure it doesn’t take full width
                    verticalAlign: "bottom",
                    marginLeft: "4px",
                  }}
                >
                  <Player
                    autoplay
                    loop
                    src="https://lottie.host/97b480b2-fb57-453a-9ae1-461c6e10acf3/FATnPCeQqy.json"
                    style={{
                      height: "100%", // Ensures the Lottie player respects parent height
                      width: "100%", // Ensures the Lottie player respects parent width
                      marginTop: "0.5px",
                    }}
                  />
                </div>
                <Label className="text-red-500 font-bold text-sm">LIVE</Label>
                <Label
                  className="ml-2 text-gray-500 font-normal text-sm"
                  style={{}}
                >
                  {new Date().toLocaleTimeString() + " 更新"}
                </Label>
              </>
            ) : (
              <Label
                className="ml-2 text-gray-500 font-normal text-sm"
                style={{}}
              >
                {new Date().toLocaleTimeString() + " 更新失敗"}
              </Label>
            )}
          </div>
          <div className="">
            <Label className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-pre-line">
              票の種類
            </Label>
            <Select
              onValueChange={setStudentType}
              defaultValue={"ns"}
              value={studentType}
            >
              <SelectTrigger
                className="w-[180px]"
                style={{ marginBottom: "10px" }}
              >
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
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {clonedFetchedStuff?.categories?.map((eachFetchedCategory) => (
              <label
                key={eachFetchedCategory.ID}
                //className="option-tile bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer w-full border border-gray-200 dark:border-gray-700"
                className={
                  "bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full border relative " +
                  (fetchedStuff.err.length == 0
                    ? "border-glow-red"
                    : "border-dead")
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
                          eachOptionAndCount.option.catID ==
                          eachFetchedCategory.ID
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
                            className={
                              "text-right font-medium text-md pt-1 pb-1"
                            }
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
      </TabsContent>

      <TabsContent value="overview">
        <div className="px-[20px] md:px-[30px] py-[20px] grid grid-cols-1 gap-4">
          <div className="gap-0">
            <Label className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-pre-line">
              票の種類
            </Label>
            <Select
              onValueChange={setStudentType}
              defaultValue={"ns"}
              value={studentType}
            >
              <SelectTrigger
                className="w-[180px]"
                style={{ marginBottom: "10px" }}
              >
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
          </div>
          {clonedFetchedStuff.options.length == 0 ? null : (
            <Card
              className={
                "mb-4 dark:border-gray-700 border-2 " +
                (fetchedStuff.err.length == 0
                  ? "border-glow-red-pn"
                  : "border-dead-pn")
              }
            >
              <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 p-5 md:p-6">
                  <CardTitle className="tracking-normal">全体</CardTitle>
                  <CardDescription>全選択肢の合計です。</CardDescription>
                </div>

                <div className="flex">
                  {new Array(totalDays == 1 ? totalDays : totalDays + 1)
                    .fill(null)
                    .map((empty, dayNo) => {
                      const dayPropertiesThisButtonSets =
                        dayNo == 0
                          ? Object.keys(allOptionsTimeCharts[0]).filter(
                              (eachProperty) => eachProperty != "hour"
                            )
                          : [Object.keys(allOptionsTimeCharts[0])[dayNo]];
                      console.log(dayNo, dayPropertiesThisButtonSets);
                      return (
                        <button
                          key={dayPropertiesThisButtonSets.toString()}
                          data-active={
                            JSON.stringify(activeLinesOV) ==
                            JSON.stringify(dayPropertiesThisButtonSets)
                          }
                          className="relative z-30 flex flex-1 flex-col justify-center border-t px-3 py-2 text-left border-l first:border-l-0 sm:first:border-l data-[active=true]:bg-[#d0d0d0] data-[active=true]:dark:bg-[#303030] sm:px-5 sm:py-4 min-w-max"
                          onClick={() => {
                            console.log(
                              JSON.stringify(activeLinesOV) ==
                                JSON.stringify(dayPropertiesThisButtonSets)
                            );
                            setActiveLinesOV(dayPropertiesThisButtonSets);
                          }}
                        >
                          <span className="text-xs text-muted-foreground">
                            {dayPropertiesThisButtonSets?.length == 1
                              ? new Date(
                                  parseInt(dayPropertiesThisButtonSets[0])
                                ).toLocaleDateString("ja-JP", {
                                  month: "numeric",
                                  day: "numeric",
                                  weekday: "short",
                                })
                              : "全日合計"}
                          </span>
                          <span className="text-lg font-bold leading-none sm:text-3xl">
                            {dayPropertiesThisButtonSets?.length == 1
                              ? allOptionsDateOnlyCharts[
                                  dayPropertiesThisButtonSets[0]
                                ]
                              : Object.values(allOptionsDateOnlyCharts).reduce(
                                  (sum, val) => sum + val,
                                  0
                                )}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </CardHeader>
              <CardContent className="p-3 lg:p-6">
                <div className="">
                  <div className="w-full">
                    <ChartContainer
                      className="mx-auto min-h-[300px] h-[300px] w-full"
                      config={chartConfig}
                    >
                      <LineChart
                        accessibilityLayer
                        data={
                          activeLinesOV
                            ? arrayed(activeLinesOV).length == 1
                              ? allOptionsTimeCharts
                              : allOptionsCombinedTimeCharts
                            : undefined
                        }
                        margin={{
                          left: 12,
                          right: 12,
                        }}
                        {...{ overflow: "visible" }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="hour"
                          tickLine={false}
                          axisLine={true}
                          // mirror={true}
                          // tickMargin={0}
                          tickFormatter={(value) => value}
                          interval={0}
                          tick={AllOptionsCustomizedAxisTick}
                        />
                        <YAxis width={20} allowDecimals={false} />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent />}
                        />
                        {activeLinesOV ? (
                          activeLinesOV.length == 1 ? (
                            <Line
                              name={new Date(
                                parseInt(activeLinesOV[0])
                              ).toLocaleDateString("ja-JP", {
                                month: "numeric",
                                day: "numeric",
                                weekday: "short",
                              })}
                              dataKey={activeLinesOV[0]}
                              type={curveCatmullRom.alpha(0.5)}
                              // type={"natural"}
                              stroke={
                                isDark
                                  ? `hsl(200 80% 55% / 0.8)`
                                  : `hsl(218 80% 40% / 0.8)`
                              }
                              strokeWidth={2}
                              dot={false}
                              unit={"票"}
                            />
                          ) : (
                            <Line
                              name={"全日合計"}
                              dataKey={"total"}
                              type={curveCatmullRom.alpha(0.5)}
                              stroke={
                                isDark
                                  ? `hsl(0 80% 55% / 0.8)`
                                  : `hsl(0 80% 40% / 0.8)`
                              }
                              strokeWidth={2}
                              dot={false}
                              hide={false}
                              unit={"票"}
                            />
                          )
                        ) : null}
                      </LineChart>
                    </ChartContainer>
                  </div>
                  {/* <div> */}
                  {/* </div> */}
                  <div className="lg:flex lg:justify-evenly">
                    <div className="w-full my-4 lg:w-1/6 flex justify-center items-center">
                      <Card className="">
                        <CardHeader>投票者数</CardHeader>
                        <CardContent className="text-3xl font-bold">
                          {activeLinesOV.length == 1
                            ? voterDateOnlyCharts[activeLinesOV[0]]
                            : voterCount}
                        </CardContent>
                      </Card>
                    </div>
                    <div className="w-full mt-4 lg:w-1/3">
                      <ChartContainer
                        config={chartConfig}
                        className="min-h-[260px] h-[260px] lg:min-h-[300px] lg:h-[300px] w-full"
                      >
                        <RadarChart
                          accessibilityLayer
                          data={
                            activeLinesOV
                              ? activeLinesOV.length == 1
                                ? arrayed(
                                    allOptionsDateOnlyPercentQ1Charts[
                                      parseInt(activeLinesOV[0])
                                    ]
                                  )
                                : arrayed(allOptionsCombinedPercentQ1Charts)
                              : undefined
                          }
                          {...{ overflow: "visible" }}
                        >
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                            labelFormatter={(value) => `${value} (%)`}
                          />
                          <PolarAngleAxis dataKey="head" />
                          <PolarRadiusAxis
                            angle={90 - 360 / q1ExtraOptions.length}
                            domain={[0, 40]}
                          />
                          <PolarGrid />
                          {/* <Radar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      fillOpacity={0.6}
                    /> */}
                          {activeLinesOV.length == 1 ? (
                            <Radar
                              name={new Date(
                                parseInt(activeLinesOV[0])
                              ).toLocaleDateString("ja-JP", {
                                month: "numeric",
                                day: "numeric",
                                weekday: "short",
                              })}
                              dataKey={"total"}
                              // type={curveCatmullRom.alpha(0.5)}
                              fill={
                                isDark
                                  ? `hsl(200 80% 55% / 0.8)`
                                  : `hsl(218 80% 40% / 0.8)`
                              }
                              // strokeWidth={2}
                              dot={true}
                              stroke={
                                isDark
                                  ? `hsl(200 80% 55% / 0.8)`
                                  : `hsl(218 80% 40% / 0.8)`
                              } // Border color
                              strokeWidth={2} // Border thickness
                            />
                          ) : (
                            <Radar
                              name={"全日合計"}
                              dataKey={"total"}
                              fill={
                                isDark
                                  ? `hsl(0 80% 55% / 0.8)`
                                  : `hsl(0 80% 40% / 0.8)`
                              }
                              dot={true}
                              stroke={
                                isDark
                                  ? `hsl(0 80% 55% / 0.8)`
                                  : `hsl(0 80% 40% / 0.8)`
                              } // Border color
                              strokeWidth={2} // Border thickness
                              // strokeWidth={2}
                            />
                          )}
                        </RadarChart>
                      </ChartContainer>
                    </div>
                    <div className="w-full mt-4 lg:w-1/3">
                      <ChartContainer
                        config={chartConfig}
                        className="min-h-[260px] h-[260px] lg:min-h-[300px] lg:h-[300px] w-full"
                      >
                        <RadarChart
                          accessibilityLayer
                          data={
                            activeLinesOV
                              ? activeLinesOV.length == 1
                                ? arrayed(
                                    allOptionsDateOnlyPercentQ2Charts[
                                      parseInt(activeLinesOV[0])
                                    ]
                                  )
                                : arrayed(allOptionsCombinedPercentQ2Charts)
                              : undefined
                          }
                          {...{ overflow: "visible" }}
                        >
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                            labelFormatter={(value) => `${value} (%)`}
                          />
                          <PolarAngleAxis
                            dataKey="head"
                            // tick={customizedRadarAxisTick}
                          />
                          <PolarRadiusAxis
                            angle={90 - 360 / q2ExtraOptions.length}
                          />
                          <PolarGrid />
                          {/* <Radar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      fillOpacity={0.6}
                    /> */}
                          {activeLinesOV.length == 1 ? (
                            <Radar
                              name={new Date(
                                parseInt(activeLinesOV[0])
                              ).toLocaleDateString("ja-JP", {
                                month: "numeric",
                                day: "numeric",
                                weekday: "short",
                              })}
                              dataKey={"total"}
                              // type={curveCatmullRom.alpha(0.5)}
                              fill={
                                isDark
                                  ? `hsl(200 80% 55% / 0.8)`
                                  : `hsl(218 80% 40% / 0.8)`
                              }
                              // strokeWidth={2}
                              dot={true}
                              stroke={
                                isDark
                                  ? `hsl(200 80% 55% / 0.8)`
                                  : `hsl(218 80% 40% / 0.8)`
                              } // Border color
                              strokeWidth={2} // Border thickness
                            />
                          ) : (
                            <Radar
                              name={"全日合計"}
                              dataKey={"total"}
                              fill={
                                isDark
                                  ? `hsl(0 80% 55% / 0.8)`
                                  : `hsl(0 80% 40% / 0.8)`
                              }
                              dot={true}
                              stroke={
                                isDark
                                  ? `hsl(0 80% 55% / 0.8)`
                                  : `hsl(0 80% 40% / 0.8)`
                              } // Border color
                              strokeWidth={2} // Border thickness
                              // strokeWidth={2}
                            />
                          )}
                        </RadarChart>
                      </ChartContainer>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>
      <TabsContent value="individual">
        {/* {`oh: ${clonedFetchedStuff.options.map((eachOption) =>
          activeLinesForEachOption[eachOption.ID]["votesChart"].toString()
        )}`} */}
        <div className="px-[20px] md:px-[30px] py-[20px] grid grid-cols-1 gap-4">
          <div className="gap-0">
            <Label className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-pre-line">
              票の種類
            </Label>
            <Select
              onValueChange={setStudentType}
              defaultValue={"ns"}
              value={studentType}
            >
              <SelectTrigger
                className="w-[180px]"
                style={{ marginBottom: "10px" }}
              >
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
          </div>
          {clonedFetchedStuff.categories.map((eachCategory) => (
            <div className="mb-8" key={eachCategory.ID}>
              <div className="mb-4">
                <Label className="text-3xl font-bold">
                  {eachCategory.name}
                </Label>
              </div>
              {clonedFetchedStuff.options
                .filter((eachOption) => eachOption.catID == eachCategory.ID)
                .map((eachOption) => (
                  <Card
                    className={
                      "mb-4 dark:border-gray-700 border-2 " +
                      (fetchedStuff.err.length == 0
                        ? "border-glow-red-pn"
                        : "border-dead-pn")
                    }
                    key={eachOption.ID}
                  >
                    <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                      <div className="flex flex-1 flex-col justify-center gap-1 p-5 md:p-6">
                        <CardTitle className="tracking-normal">
                          {eachOption.name}
                        </CardTitle>
                        <CardDescription>
                          {eachOption.description}
                        </CardDescription>
                      </div>
                      {/* <CardTitle>Line Chart - Multiple</CardTitle>
                <CardDescription>January - June 2024</CardDescription> */}
                      <div className="flex">
                        {new Array(totalDays == 1 ? totalDays : totalDays + 1)
                          .fill(null)
                          .map((empty, dayNo) => {
                            const dayPropertiesThisButtonSets =
                              dayNo == 0
                                ? Object.keys(
                                    arrayed(timeCharts[eachOption.ID])[0]
                                  ).filter(
                                    (eachProperty) => eachProperty != "hour"
                                  )
                                : [
                                    Object.keys(
                                      arrayed(timeCharts[eachOption.ID])[0]
                                    )[dayNo],
                                  ];
                            return (
                              <>
                                <button
                                  key={
                                    eachOption.ID +
                                    dayPropertiesThisButtonSets.toString()
                                  }
                                  data-active={
                                    JSON.stringify(
                                      (
                                        activeLinesForEachOption[
                                          eachOption.ID
                                        ] as {
                                          votesChart: any;
                                        }
                                      )?.votesChart
                                    ) ==
                                    JSON.stringify(dayPropertiesThisButtonSets)
                                  }
                                  className="relative z-30 flex flex-1 flex-col justify-center border-t px-3 py-2 text-left border-l first:border-l-0 sm:first:border-l data-[active=true]:bg-[#d0d0d0] data-[active=true]:dark:bg-[#303030] sm:px-5 sm:py-4 min-w-max"
                                  onClick={() => {
                                    console.log(
                                      JSON.stringify(
                                        (
                                          activeLinesForEachOption[
                                            eachOption.ID
                                          ] as {
                                            votesChart: any;
                                          }
                                        )?.votesChart
                                      ) ==
                                        JSON.stringify(
                                          dayPropertiesThisButtonSets
                                        )
                                    );
                                    // const {
                                    //   [eachOption.ID]: oldActiveLinesForThisOption,
                                    //   ...restActiveLinesForEachOption
                                    // } = activeLinesForEachOption;

                                    // console.log({
                                    //   [eachOption.ID]: dayPropertiesThisButtonSets,
                                    //   ...restActiveLinesForEachOption,
                                    // });
                                    setActiveLinesForEachOption({
                                      ...activeLinesForEachOption, // don't reorder and put this under the new property
                                      [eachOption.ID]: {
                                        ...activeLinesForEachOption[
                                          eachOption.ID
                                        ], // don't reorder and put this under votesChart
                                        votesChart: dayPropertiesThisButtonSets,
                                      },
                                    });
                                  }}
                                >
                                  <span className="text-xs text-muted-foreground">
                                    {dayPropertiesThisButtonSets?.length == 1
                                      ? new Date(
                                          parseInt(
                                            dayPropertiesThisButtonSets[0]
                                          )
                                        ).toLocaleDateString("ja-JP", {
                                          month: "numeric",
                                          day: "numeric",
                                          weekday: "short",
                                        })
                                      : "全日合計"}
                                  </span>
                                  <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {
                                      dayPropertiesThisButtonSets?.length == 1
                                        ? dateOnlyCharts[eachOption.ID][
                                            parseInt(
                                              dayPropertiesThisButtonSets[0]
                                            )
                                          ]
                                        : // ? arrayed(a[eachOption.ID]).reduce(
                                          //     (preliminaryTotalOptionVotes, hourObject) =>
                                          //       (preliminaryTotalOptionVotes +=
                                          //         hourObject[
                                          //           dayPropertiesThisButtonSets[0]
                                          //         ]),
                                          //     0
                                          //   )
                                          Object.values(
                                            dateOnlyCharts[eachOption.ID]
                                          ).reduce((sum, val) => sum + val, 0)
                                      // : arrayed(a[eachOption.ID]).reduce(
                                      //     (preliminaryTotalOptionVotes, hourObject) =>
                                      //       (preliminaryTotalOptionVotes +=
                                      //         Object.keys(hourObject)
                                      //           .filter(
                                      //             (eachPropertyName) =>
                                      //               eachPropertyName != "hour"
                                      //           )
                                      //           .reduce(
                                      //             (
                                      //               totalHourVotes,
                                      //               eachValidPropertyName
                                      //             ) =>
                                      //               (totalHourVotes +=
                                      //                 hourObject[
                                      //                   eachValidPropertyName
                                      //                 ]),
                                      //             0
                                      //           )),
                                      //     0
                                      //   )
                                    }
                                  </span>
                                </button>
                              </>
                            );
                          })}
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 lg:p-6">
                      <div className="lg:flex lg:justify-between">
                        <div className="w-full lg:w-[70%]">
                          <ChartContainer
                            className="mx-auto min-h-[300px] h-[300px] w-full"
                            config={chartConfig}
                          >
                            <LineChart
                              accessibilityLayer
                              data={
                                activeLinesForEachOption[eachOption.ID]
                                  ? arrayed(
                                      (
                                        activeLinesForEachOption[
                                          eachOption.ID
                                        ] as {
                                          votesChart: Object;
                                        }
                                      ).votesChart
                                    ).length == 1
                                    ? arrayed(timeCharts[eachOption.ID])
                                    : combinedTimeCharts[eachOption.ID]
                                  : undefined
                              }
                              margin={{
                                left: 12,
                                right: 12,
                              }}
                              {...{ overflow: "visible" }}
                            >
                              <CartesianGrid vertical={false} />
                              <XAxis
                                dataKey="hour"
                                tickLine={false}
                                axisLine={true}
                                // mirror={true}
                                // tickMargin={0}
                                tickFormatter={(value) => value}
                                interval={0}
                                tick={customizedAxisTick}
                              />
                              <YAxis width={20} allowDecimals={false} />
                              <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent />}
                              />
                              {/* <ChartLegend
                          wrapperStyle={{
                            paddingTop: "16px",
                          }}
                          formatter={renderWeightedLegend}
                        /> */}
                              {/* <CartesianGrid strokeDasharray="3 3" /> */}
                              {activeLinesForEachOption[eachOption.ID] ? (
                                arrayed(
                                  (
                                    activeLinesForEachOption[eachOption.ID] as {
                                      votesChart: Object;
                                    }
                                  ).votesChart
                                ).length == 1 ? (
                                  <Line
                                    name={new Date(
                                      parseInt(
                                        arrayed(
                                          (
                                            activeLinesForEachOption[
                                              eachOption.ID
                                            ] as {
                                              votesChart: Object;
                                            }
                                          ).votesChart
                                        )[0]
                                      )
                                    ).toLocaleDateString("ja-JP", {
                                      month: "numeric",
                                      day: "numeric",
                                      weekday: "short",
                                    })}
                                    dataKey={
                                      arrayed(
                                        (
                                          activeLinesForEachOption[
                                            eachOption.ID
                                          ] as {
                                            votesChart: Object;
                                          }
                                        ).votesChart
                                      )[0]
                                    }
                                    type={curveCatmullRom.alpha(0.5)}
                                    // type={"natural"}
                                    stroke={
                                      isDark
                                        ? `hsl(200 80% 55% / 0.8)`
                                        : `hsl(218 80% 40% / 0.8)`
                                    }
                                    strokeWidth={2}
                                    dot={false}
                                    unit={"票"}
                                  />
                                ) : (
                                  //   Object.values(
                                  //     activeLinesForEachOption[eachOption.ID]
                                  //   )[0].map(
                                  //     // mapped even though only one element can be in it
                                  //     (eachProperty: string, index: number) =>
                                  //       eachProperty == "hour" ? null : (
                                  //         <Line
                                  //           name={new Date(
                                  //             parseInt(eachProperty)
                                  //           ).toLocaleDateString("ja-JP", {
                                  //             month: "numeric",
                                  //             day: "numeric",
                                  //             weekday: "short",
                                  //           })}
                                  //           dataKey={eachProperty}
                                  //           type={curveCatmullRom.alpha(0.5)}
                                  //           stroke={`hsl(${
                                  //             (totalDays - index) *
                                  //               (200 / Math.max(totalDays - 1, 1)) -
                                  //             0
                                  //           } ${isDark ? "85%" : "100%"} ${
                                  //             isDark ? "50%" : "40%"
                                  //           } / ${
                                  //             /*
                                  //       0.4 +
                                  //       (index - 1) * (0.6 / Math.max(totalDays - 1, 1))
                                  //     */ 0.8
                                  //           })`}
                                  //           strokeWidth={2}
                                  //           dot={false}
                                  //           hide={(() => {
                                  //             const linesToShow = (
                                  //               activeLinesForEachOption[eachOption.ID] as {
                                  //                 votesChart: any;
                                  //               }
                                  //             )?.votesChart;

                                  //             // console.log(activeLinesForEachOption);
                                  //             // if (eachOption.name == "i")
                                  //             //   console.log(linesToShow);

                                  //             const whatToReturn =
                                  //               typeof linesToShow == "string" // apparently unnecessary
                                  //                 ? linesToShow != eachProperty
                                  //                 : typeof linesToShow == "undefined"
                                  //                 ? false
                                  //                 : !linesToShow.find(
                                  //                     (eachShownLineName: string) =>
                                  //                       eachShownLineName == eachProperty
                                  //                   );
                                  //             // console.log(
                                  //             //   whatToReturn,
                                  //             //   // typeof linesToShow,
                                  //             //   linesToShow,
                                  //             //   eachOption.name
                                  //             // );
                                  //             return whatToReturn;
                                  //           })()}
                                  //         />
                                  //       )
                                  // )
                                  <Line
                                    name={"全日合計"}
                                    dataKey={"total"}
                                    type={curveCatmullRom.alpha(0.5)}
                                    stroke={
                                      isDark
                                        ? `hsl(0 80% 55% / 0.8)`
                                        : `hsl(0 80% 40% / 0.8)`
                                    }
                                    strokeWidth={2}
                                    dot={false}
                                    hide={false}
                                    unit={"票"}
                                  />
                                )
                              ) : null}
                            </LineChart>
                          </ChartContainer>
                        </div>
                        <div className="w-full mt-4 lg:mt-0 lg:w-1/4 lg:pr-8">
                          <ChartContainer
                            config={chartConfig}
                            className="min-h-[260px] h-[260px] lg:min-h-[300px] lg:h-[300px] w-full"
                          >
                            <RadarChart
                              accessibilityLayer
                              data={
                                activeLinesForEachOption[eachOption.ID]
                                  ? arrayed(
                                      (
                                        activeLinesForEachOption[
                                          eachOption.ID
                                        ] as {
                                          votesChart: Object;
                                        }
                                      ).votesChart
                                    ).length == 1
                                    ? arrayed(
                                        dateOnlyPercentQ1Charts[eachOption.ID]
                                      )
                                    : arrayed(
                                        combinedPercentQ1Charts[eachOption.ID]
                                      )
                                  : undefined
                              }
                              {...{ overflow: "visible" }}
                            >
                              <ChartTooltip
                                cursor={false}
                                content={
                                  <ChartTooltipContent indicator="line" />
                                }
                                labelFormatter={(value) => `${value} (%)`}
                              />
                              <PolarAngleAxis dataKey="head" />
                              <PolarRadiusAxis
                                angle={90 - 360 / q1ExtraOptions.length}
                                domain={[0, 40]}
                              />
                              <PolarGrid />
                              {/* <Radar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      fillOpacity={0.6}
                    /> */}
                              {
                                arrayed(
                                  (
                                    activeLinesForEachOption[eachOption.ID] as {
                                      votesChart: Object;
                                    }
                                  )?.votesChart
                                ).length == 1 ? (
                                  <Radar
                                    name={new Date(
                                      parseInt(
                                        arrayed(
                                          (
                                            activeLinesForEachOption[
                                              eachOption.ID
                                            ] as {
                                              votesChart: Object;
                                            }
                                          ).votesChart
                                        )[0]
                                      )
                                    ).toLocaleDateString("ja-JP", {
                                      month: "numeric",
                                      day: "numeric",
                                      weekday: "short",
                                    })}
                                    dataKey={
                                      arrayed(
                                        (
                                          activeLinesForEachOption[
                                            eachOption.ID
                                          ] as {
                                            votesChart: Object;
                                          }
                                        ).votesChart
                                      )[0]
                                    }
                                    // type={curveCatmullRom.alpha(0.5)}
                                    fill={
                                      isDark
                                        ? `hsl(200 80% 55% / 0.8)`
                                        : `hsl(218 80% 40% / 0.8)`
                                    }
                                    // strokeWidth={2}
                                    dot={true}
                                    stroke={
                                      isDark
                                        ? `hsl(200 80% 55% / 0.8)`
                                        : `hsl(218 80% 40% / 0.8)`
                                    } // Border color
                                    strokeWidth={2} // Border thickness
                                  />
                                ) : (
                                  <Radar
                                    name={"全日合計"}
                                    dataKey={"total"}
                                    fill={
                                      isDark
                                        ? `hsl(0 80% 55% / 0.8)`
                                        : `hsl(0 80% 40% / 0.8)`
                                    }
                                    dot={true}
                                    stroke={
                                      isDark
                                        ? `hsl(0 80% 55% / 0.8)`
                                        : `hsl(0 80% 40% / 0.8)`
                                    } // Border color
                                    strokeWidth={2} // Border thickness
                                    // strokeWidth={2}
                                  />
                                )
                                // <Radar
                                //   name={new Date(
                                //     parseInt(eachProperty)
                                //   ).toLocaleDateString("ja-JP", {
                                //     month: "numeric",
                                //     day: "numeric",
                                //     weekday: "short",
                                //   })}
                                //   dataKey={eachProperty}
                                //   // type={curveCatmullRom.alpha(0.5)}
                                //   fill={`hsl(${
                                //     (totalDays - index) *
                                //       (200 / Math.max(totalDays - 1, 1)) -
                                //     0
                                //   } ${isDark ? "85%" : "100%"} ${
                                //     isDark ? "50%" : "40%"
                                //   } / ${
                                //     /*
                                //   0.4 +
                                //   (index - 1) * (0.6 / Math.max(totalDays - 1, 1))
                                // */ 0.8
                                //   })`}
                                //   // strokeWidth={2}
                                //   dot={false}
                                //   hide={(() => {
                                //     const linesToShow = (
                                //       activeLinesForEachOption[eachOption.ID] as {
                                //         votesChart: any;
                                //       }
                                //     )?.votesChart;
                                //     const whatToReturn =
                                //       typeof linesToShow == "string" // apparently unnecessary
                                //         ? linesToShow != eachProperty
                                //         : typeof linesToShow == "undefined"
                                //         ? false
                                //         : !linesToShow.find(
                                //             (eachShownLineName: string) =>
                                //               eachShownLineName == eachProperty
                                //           );
                                //     return whatToReturn;
                                //   })()}
                                // />
                              }
                            </RadarChart>
                          </ChartContainer>
                        </div>
                      </div>
                    </CardContent>
                    {/* <CardFooter>
                      <div className="flex w-full items-start gap-2 text-sm">
                        <div className="grid gap-2">
                          <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month
                          </div>
                          <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Showing total visitors for the last 6 months
                          </div>
                        </div>
                      </div>
                    </CardFooter> */}
                  </Card>
                ))}
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
