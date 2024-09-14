"use server";
import { Button } from "@/components/ui/button";

import { QueryResult, QueryResultRow, sql } from "@vercel/postgres";
//import * as Switch from '@radix-ui/react-switch';

//"use server"

import { JSX, SVGProps } from "react";
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

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

const startCal = today(getLocalTimeZone());

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

import Marquee from "react-fast-marquee";

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
import { AdminConfirm } from "./admin-confirm";
import { NewAdminConfirm } from "./new-admin-confirm";

export async function StatsHeader(props: { refresher: string }) {
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
    orderNo: number;

    constructor(ID: string, name: string, orderNo: number) {
      this.ID = ID;
      this.name = name;
      this.orderNo = orderNo;
    }
  }

  const id = useId();

  //console.log(categories);

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

  return <p>props.refresher</p>;
}
