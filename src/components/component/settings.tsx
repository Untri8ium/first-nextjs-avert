"use client";

import { Button } from "@/components/ui/button";
//import * as Switch from '@radix-ui/react-switch';

//"use server"

import { JSX, SVGProps, useState } from "react";
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
import { AdminConfirm } from "./admin-confirm";

export function Settings(props: {
  receivedVGI: any;
  receivedOPTS: any;
  receivedCATS: any;
}) {
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
      arrayToReturn.push(new IndivCat(cat.ID, cat.name, index))
    );
    return arrayToReturn;
  }

  const [votingSet, setVotingSet] = useState<boolean>(
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
    sortOptions(props.receivedOPTS)
  );
  const [categories, setCategories] = useState<IndivCat[]>(
    sortCats(props.receivedCATS)
  );

  const [newItemName, setNewItemName] = useState<string>();

  const [newItemDesc, setNewItemDesc] = useState<string>();

  const [newItemCatSelection, setNewItemCatSelection] = useState<string>();

  const [newItemPlaceSelection, setNewItemPlaceSelection] = useState<string>();

  const [newItemNewCatName, setNewItemNewCatName] = useState<string>();

  const [newItemError, setNewItemError] = useState<string>();

  const [newItemOpenOne, setNewItemOpenOne] = useState<string>();

  const [editCatName, setEditCatName] = useState<string>();

  const [editCatPlaceSelection, setEditCatPlaceSelection] = useState<string>();

  const [editCatError, setEditCatError] = useState<string>();

  const [editCatOpenOne, setEditCatOpenOne] = useState<string>();

  /*const [optionsID, setOptionsID] = useState<string[]>(
    props.receivedOPTS.map((option: any) => option.id || undefined)
  );
  const [optionsCategoryID, setOptionsCategoryID] = useState<number[]>(
    props.receivedOPTS.map((option: any) => option.categoryid)
  );
  const [optionsName, setOptionsName] = useState<string[]>(
    props.receivedOPTS.map((option: any) => option.name)
  );
  const [optionsDescription, setOptionsDescriptions] = useState<string[]>(
    props.receivedOPTS.map((option: any) => option.description)
  );
  const [optionsOrderNo, setOptionsOrderNo] = useState<number[]>(
    props.receivedOPTS.map((option: any) => option.orderno)
  );

  const [categoriesID, setCategoriesID] = useState<string[]>(
    props.receivedCATS.map((category: any) => category.id)
  );
  const [categoriesName, setCategoriesName] = useState<string[]>(
    props.receivedCATS.map((category: any) => category.name)
  );
  const [categoriesOrderNo, setCategoriesOrderNo] = useState<number[]>(
    props.receivedCATS.map((category: any) => category.orderno)
  );*/

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  /*console.log(props.receivedVGI);
  console.log(props.receivedOPTS);
  console.log(props.receivedCATS);*/

  const id = useId();

  const handleNewItemSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !newItemName ||
      !newItemDesc ||
      (newItemCatSelection == "createNew" && !newItemNewCatName)
    ) {
      setNewItemError("空欄の項目があります！");
    } else {
      const catUUIDforUseIfNecessary = crypto.randomUUID();
      if (newItemCatSelection == "createNew") {
        setCategories([
          ...categories,
          new IndivCat(
            catUUIDforUseIfNecessary,
            newItemNewCatName || "カテゴリ命名異常",
            categories.length
          ),
        ]);
      }
      console.log(categories);

      const newOptionsArray = renumberOptions(
        sortOptions([
          ...options,
          new IndivOption(
            crypto.randomUUID(),
            newItemCatSelection == "createNew"
              ? catUUIDforUseIfNecessary
              : newItemCatSelection || "アイテムカテゴリ異常",
            newItemName,
            newItemDesc,
            newItemPlaceSelection == "firstPlace"
              ? 99999
              : options.indexOf(
                  options.find(
                    (eachOption) => eachOption.ID == newItemPlaceSelection
                  ) || new IndivOption("", "", "", "", 0)
                ) - 0.5
          ),
        ])
      );

      setOptions(newOptionsArray);
      setNewItemError(undefined);
      setNewItemOpenOne(undefined);
      console.log(options);
    }
    console.log(
      newItemName +
        ", " +
        newItemDesc +
        ", " +
        newItemCatSelection +
        ", " +
        newItemNewCatName
    );
  };

  const handleEditCatSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editCatName) {
      setEditCatError("空欄の項目があります！");
    } else {
      console.log(categories);

      const unrelatedCategories = categories.filter(function (
        eachCat: IndivCat
      ) {
        return eachCat.ID != editCatOpenOne;
      });

      setCategories(
        renumberCats(
          sortCats([
            ...categories.filter(function (eachCat: IndivCat) {
              return eachCat.ID != editCatOpenOne;
            }),
            {
              ...categories.find(
                (eachCat: IndivCat) => eachCat.ID == editCatOpenOne
              ),
              ID: editCatOpenOne || "",
              name: editCatName,
              orderNo:
                editCatPlaceSelection == "firstPlace"
                  ? 99999
                  : categories.indexOf(
                      categories.find(
                        (eachCat: IndivCat) =>
                          eachCat.ID == editCatPlaceSelection
                      ) || new IndivCat("", "", 0)
                    ) - 0.5,
            },
          ])
        )
      );
      setEditCatError(undefined);
      setEditCatOpenOne(undefined);
      console.log(options);
    }
    console.log(
      newItemName +
        ", " +
        newItemDesc +
        ", " +
        newItemCatSelection +
        ", " +
        newItemNewCatName
    );
  };

  const handleNewNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemName(event.target.value);
  };

  const handleNewDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemDesc(event.target.value);
  };

  const handleNewNewCatChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewItemNewCatName(event.target.value);
  };

  const handleVotingNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVotingName(event.target.value);
  };

  const handleVotingDescChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVotingDescription(event.target.value);
  };

  const handleVotingDateSChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVotingDateS(event.target.value);
  };

  const handleVotingDateEChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVotingDateE(event.target.value);
  };

  const resetNewItem = (defaultCatToSet?: string) => {
    setNewItemName(undefined);
    setNewItemDesc(undefined);
    setNewItemCatSelection(defaultCatToSet || "createNew");
    setNewItemPlaceSelection("firstPlace");
    setNewItemNewCatName(undefined);
    setNewItemError(undefined);
  };

  const resetEditCat = (
    defaultNameToSet?: string,
    defaultPlaceToSet?: string
  ) => {
    setEditCatName(defaultNameToSet || undefined);
    setEditCatPlaceSelection(defaultPlaceToSet || "firstPlace");
    setEditCatError(undefined);
  };

  const handleEditCatNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditCatName(event.target.value);
  };

  //console.log(categories);

  return (
    <form>
      <div
        className="flex items-center"
        style={{ marginTop: "40px", marginLeft: "30px" }}
      >
        <div className="flex items-center space-x-2">
          <Switch
            id="votingSetButton"
            className="data-[state=unchecked]:bg-gray-300"
            checked={votingSet}
            onCheckedChange={setVotingSet}
          />
          <Label htmlFor="votingSetButton" style={{ marginLeft: "30px" }}>
            投票
          </Label>
        </div>
        <label
          style={{ marginLeft: "20px" }}
          className="text-black dark:text-white text-[15px] leading-none pr-[15px] font-regular text-xs"
        >
          無効である限り、票を決して受け付けません。
        </label>
      </div>

      <div
        style={{ marginTop: "20px", marginLeft: "30px", marginRight: "30px" }}
      >
        <Label style={{ marginRight: "20px" }}>投票のタイトル</Label>

        <div>
          <Input
            defaultValue={votingName}
            onChange={handleVotingNameChange}
            className="dark:border dark:border-[#FFFFFF]"
          />
        </div>
      </div>

      <div
        style={{ marginTop: "20px", marginLeft: "30px", marginRight: "30px" }}
      >
        <Label style={{ marginRight: "20px" }}>投票の説明</Label>

        <div>
          <Input
            defaultValue={votingDescription}
            onChange={handleVotingDescChange}
            className="dark:border dark:border-[#FFFFFF]"
          />
        </div>
      </div>

      <div
        style={{ marginTop: "20px", marginLeft: "30px", marginRight: "30px" }}
      >
        <Label style={{ marginRight: "20px" }}>投票の開始日時</Label>

        <div>
          <DateTimePicker
            granularity="second"
            hourCycle={24}
            label="開始日時"
            onJsDateChange={(newValue) =>
              setVotingDateS(newValue.toISOString())
            }
            showClearButton={false}
            defaultValue={
              votingDateS // making sure this is not null or smth
                ? toCalendarDateTime(
                    parseAbsoluteToLocal(votingDateS.replace(" ", "T"))
                  )
                : null
            }
          />
        </div>
      </div>

      <div
        style={{ marginTop: "20px", marginLeft: "30px", marginRight: "30px" }}
      >
        <Label style={{ marginRight: "20px" }}>投票の終了日時</Label>

        <div>
          <DateTimePicker
            granularity="second"
            hourCycle={24}
            label="終了日時"
            onJsDateChange={(newValue) =>
              setVotingDateE(newValue.toISOString())
            }
            showClearButton={false}
            defaultValue={
              votingDateE
                ? toCalendarDateTime(
                    parseAbsoluteToLocal(votingDateE.replace(" ", "T"))
                  ) // not quite sure if this works
                : null
            }
          />
        </div>
      </div>

      <p>{"received vDS is " + props.receivedVGI[0].votingstart}</p>
      <p>{"votingDateE is " + votingDateE}</p>

      <div
        style={{ marginTop: "20px", marginLeft: "30px", marginRight: "30px" }}
      >
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>投票先（選択肢・カテゴリ）</AccordionTrigger>
            <AccordionContent>
              <ScrollArea className="h-[600px] rounded-md border border-[#888888] dark:border-[#FFFFFF]">
                {categories.length > 0 ? null : (
                  <label className="flex grid justify-center items-center bg-[#DDDDDD] dark:bg-[#222222] rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow w-full">
                    <Dialog
                      onOpenChange={() => {
                        resetNewItem();
                        setNewItemOpenOne(
                          newItemOpenOne ? undefined : "whenNoCatsPresent"
                        );
                      }}
                      open={newItemOpenOne == "whenNoCatsPresent"}
                    >
                      <DialogTrigger
                        onClick={() => setNewItemOpenOne("whenNoCatsPresent")}
                        className="" // focus-outline was once used but removed for accessibility
                      >
                        <div className="p-3 flex flex-col items-center justify-center space-y-2" />
                        <BsFillPlusCircleFill
                          size={40}
                          className="float-center"
                        />
                        <h3 className="text-sm font-semibold invisible">lol</h3>
                      </DialogTrigger>
                      <DialogContent
                        onInteractOutside={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <DialogHeader className="">
                          <DialogTitle>選択肢を作成</DialogTitle>
                          <DialogDescription>
                            内容は随時変更可能です。
                          </DialogDescription>
                        </DialogHeader>
                        <Separator />
                        <form className="" onSubmit={handleNewItemSubmit}>
                          <Label>名前</Label>
                          <Input
                            id="itemName"
                            placeholder="3-B「Mission Possible」..."
                            style={{ marginBottom: "10px" }}
                            onChange={handleNewNameChange}
                          />
                          <Label>説明</Label>
                          <Input
                            id="itemDesc"
                            placeholder="筑駒を舞台にしたスパイコメディ..."
                            style={{ marginBottom: "10px" }}
                            onChange={handleNewDescChange}
                          />
                          <Label>カテゴリ</Label>
                          <Select
                            onValueChange={setNewItemCatSelection}
                            defaultValue={"createNew"}
                          >
                            <SelectTrigger
                              className="w-[180px]"
                              style={{ marginBottom: "10px" }}
                            >
                              <SelectValue placeholder="選択..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="createNew" key="createNew">
                                  新規作成
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <div>
                            {newItemCatSelection == "createNew" ||
                            !newItemCatSelection ? (
                              <>
                                <Label>作成カテゴリ名</Label>
                                <Input
                                  id="itemNewCatName"
                                  placeholder="映画部門..."
                                  style={{ marginBottom: "10px" }}
                                  onChange={handleNewNewCatChange}
                                />
                              </>
                            ) : null}
                          </div>
                          <div className="flex justify-end items-center">
                            {newItemError ? (
                              <Label
                                className="text-[#EE3333] dark:text-[#DD6666]"
                                style={{ marginRight: "10px" }}
                              >
                                {newItemError}
                              </Label>
                            ) : null}
                            <Button>作成</Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </label>
                )}
                {categories.map((cat) => (
                  <section
                    className="container px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4"
                    key={cat.ID}
                  >
                    <div>
                      <Label className="text-xl font-bold">{cat.name}</Label>
                      <Dialog
                        onOpenChange={(e) => {
                          const initialCatPlace =
                            cat.orderNo == categories.length - 1
                              ? "firstPlace"
                              : categories.find(
                                  (eachCat: IndivCat) =>
                                    eachCat.orderNo == cat.orderNo + 1
                                )?.ID;
                          resetEditCat(cat.name, initialCatPlace);
                          setEditCatOpenOne(
                            editCatOpenOne ? undefined : cat.ID
                          );
                        }}
                        open={editCatOpenOne == cat.ID}
                      >
                        <DialogTrigger
                          onClick={() => setEditCatOpenOne(cat.ID)}
                          className="focus:outline-none"
                        >
                          <Button
                            variant={"ghost"}
                            type={"button"}
                            size={"icon"}
                          >
                            <BsSliders
                              size={18}
                              style={{ marginLeft: "5px", marginRight: "5px" }}
                            />
                          </Button>
                        </DialogTrigger>
                        <DialogContent
                          onInteractOutside={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <DialogHeader className="">
                            <DialogTitle>カテゴリを編集</DialogTitle>
                            <DialogDescription></DialogDescription>
                          </DialogHeader>
                          <Separator />
                          <form className="" onSubmit={handleEditCatSubmit}>
                            <Label>名前</Label>
                            <Input
                              id="itemName"
                              placeholder="映画部門..."
                              defaultValue={cat.name}
                              style={{ marginBottom: "10px" }}
                              onChange={handleEditCatNameChange}
                            />
                            {categories.length == 1 ? null : (
                              <>
                                <Label>位置</Label>
                                <Label
                                  className="text-xs text-gray-500"
                                  style={{ marginLeft: "5px" }}
                                >
                                  どのカテゴリの前に移動しますか？
                                </Label>
                                <Select
                                  onValueChange={setEditCatPlaceSelection}
                                  defaultValue={
                                    cat.orderNo == categories.length - 1
                                      ? "firstPlace"
                                      : categories.find(
                                          (eachCat: IndivCat) =>
                                            eachCat.orderNo == cat.orderNo + 1
                                        )?.ID
                                  }
                                >
                                  <SelectTrigger
                                    className="w-[180px]"
                                    style={{ marginBottom: "10px" }}
                                  >
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {categories.map((categoryItem: any) =>
                                        categoryItem.ID != cat.ID ? (
                                          <SelectItem
                                            value={categoryItem.ID}
                                            key={categoryItem.ID}
                                          >
                                            {categoryItem.name}
                                          </SelectItem>
                                        ) : null
                                      )}
                                      <SelectItem
                                        value="firstPlace"
                                        key="firstPlace"
                                      >
                                        末尾
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </>
                            )}
                            <div className="flex justify-end items-center">
                              {newItemError ? (
                                <Label
                                  className="text-[#EE3333] dark:text-[#DD6666]"
                                  style={{ marginRight: "10px" }}
                                >
                                  {newItemError}
                                </Label>
                              ) : null}
                              <Button>更新</Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {options.map((option) =>
                        option.catID == cat.ID ? (
                          <AdminOption
                            id={option.ID}
                            catid={option.catID}
                            name={option.name}
                            desc={option.description}
                            order={option.orderNo}
                            theOptions={options}
                            theCats={categories}
                            optionSetter={setOptions}
                            catSetter={setCategories}
                            key={option.ID}
                          />
                        ) : null
                      )}
                      <label className="flex grid justify-center items-center bg-[#DDDDDD] dark:bg-[#222222] rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow w-full">
                        <Dialog
                          onOpenChange={(e) => {
                            resetNewItem(cat.ID);
                            setNewItemOpenOne(
                              newItemOpenOne ? undefined : cat.ID
                            );
                          }}
                          open={newItemOpenOne == cat.ID}
                        >
                          <DialogTrigger
                            onClick={() => setNewItemOpenOne(cat.ID)}
                            className="focus:outline-none"
                          >
                            <div className="p-3 flex flex-col items-center justify-center space-y-2" />
                            <BsFillPlusCircleFill
                              size={40}
                              className="float-center"
                            />
                            <h3 className="text-sm font-semibold invisible">
                              lol
                            </h3>
                          </DialogTrigger>
                          <DialogContent
                            onInteractOutside={(e) => {
                              e.preventDefault();
                            }}
                          >
                            <DialogHeader className="">
                              <DialogTitle>選択肢を作成</DialogTitle>
                              <DialogDescription>
                                内容は随時変更可能です。
                              </DialogDescription>
                            </DialogHeader>
                            <Separator />
                            <form className="" onSubmit={handleNewItemSubmit}>
                              <Label>名前</Label>
                              <Input
                                id="itemName"
                                placeholder="3-B「Mission Possible」..."
                                style={{ marginBottom: "10px" }}
                                onChange={handleNewNameChange}
                              />
                              <Label>説明</Label>
                              <Input
                                id="itemDesc"
                                placeholder="筑駒を舞台にしたスパイコメディ..."
                                style={{ marginBottom: "10px" }}
                                onChange={handleNewDescChange}
                              />
                              <Label>カテゴリ</Label>
                              <Select
                                onValueChange={setNewItemCatSelection}
                                defaultValue={cat.ID || "createNew"}
                              >
                                <SelectTrigger
                                  className="w-[180px]"
                                  style={{ marginBottom: "10px" }}
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem
                                      value="createNew"
                                      key="createNew"
                                    >
                                      新規作成
                                    </SelectItem>
                                    {categories.map((catItem) => (
                                      <SelectItem
                                        value={catItem.ID}
                                        key={catItem.ID}
                                      >
                                        {catItem.name}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <div>
                                {newItemCatSelection == "createNew" ||
                                !newItemCatSelection ? (
                                  <>
                                    <Label>作成カテゴリ名</Label>
                                    <Input
                                      id="itemNewCatName"
                                      placeholder="映画部門..."
                                      style={{ marginBottom: "10px" }}
                                      onChange={handleNewNewCatChange}
                                    />
                                  </>
                                ) : null}
                              </div>
                              {options.indexOf(
                                options.find(
                                  (eachOption) =>
                                    eachOption.catID == newItemCatSelection
                                ) || new IndivOption("", "", "", "", 0)
                              ) == -1 ? null : (
                                <>
                                  <Label>カテゴリ内位置</Label>
                                  <Label
                                    className="text-xs text-gray-500"
                                    style={{ marginLeft: "5px" }}
                                  >
                                    どの選択肢の前に挿入しますか？
                                  </Label>
                                  <Select
                                    onValueChange={setNewItemPlaceSelection}
                                    defaultValue={"firstPlace"}
                                  >
                                    <SelectTrigger
                                      className="w-[180px]"
                                      style={{ marginBottom: "10px" }}
                                    >
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {options.map((optionItem: any) =>
                                          optionItem.catID ==
                                          newItemCatSelection ? (
                                            <SelectItem
                                              value={optionItem.ID}
                                              key={optionItem.ID}
                                            >
                                              {optionItem.name}
                                            </SelectItem>
                                          ) : null
                                        )}
                                        <SelectItem
                                          value="firstPlace"
                                          key="firstPlace"
                                        >
                                          末尾
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </>
                              )}
                              <div className="flex justify-end items-center">
                                {newItemError ? (
                                  <Label
                                    className="text-[#EE3333] dark:text-[#DD6666]"
                                    style={{ marginRight: "10px" }}
                                  >
                                    {newItemError}
                                  </Label>
                                ) : null}
                                <Button>作成</Button>
                              </div>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </label>
                    </div>
                  </section>
                ))}
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <AdminConfirm
          votingSet={votingSet}
          votingDateS={votingDateS}
          votingDateE={votingDateE}
          votingName={votingName}
          votingDescription={votingDescription}
          options={options}
          categories={categories}
        />
      </div>
    </form>
  );
}
