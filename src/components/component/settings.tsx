"use client";

import { Button } from "@/components/ui/button";
//import * as Switch from '@radix-ui/react-switch';

//"use server"

import { JSX, SVGProps, useState } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { getLocalTimeZone, today } from "@internationalized/date";
import { Calendar } from "@/components/ui/calendar";
import { ja } from "date-fns/locale";

const startCal = today(getLocalTimeZone());

/*type Setting0 = {
  id: string;
  name: string;
  description: string;
};

type Props = {
  settings0: Setting0[];
};*/

export function Settings() {
  const [dateS, setDateS] = useState<Date | undefined>(new Date());
  return (
    <form>
      <div
        className="flex items-center"
        style={{ marginTop: "40px", marginLeft: "40px" }}
      >
        <div className="flex items-center space-x-2">
          <Switch id="voteawake" />
          <Label htmlFor="voteawake" style={{ marginLeft: "20px" }}>
            投票
          </Label>
        </div>
        <label
          style={{ marginLeft: "20px" }}
          className="text-black dark:text-white text-[15px] leading-none pr-[15px] font-regular text-xs"
        >
          無効にすると、設定にかかわらず票を受け付けません。
        </label>
      </div>

      <div>
        <Calendar
          mode="single"
          selected={dateS}
          onSelect={setDateS}
          fromYear={2024}
          toYear={2099}
          locale={ja}
          className="rounded-md"
          title=""
        />
      </div>
    </form>
  );
}
