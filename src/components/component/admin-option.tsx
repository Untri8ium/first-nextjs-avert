import React, { JSX, SVGProps, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { BsSliders, BsTrash3 } from "react-icons/bs";

import Image from "next/image";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buttonVariants } from "../ui/button";
import { is } from "date-fns/locale";

export function AdminOption(props: {
  id: string;
  catid: string;
  name: string;
  desc: string;
  order: number;

  theOptions: any; // yes, yes, blame me; i know these suck
  theCats: any;
  optionSetter: any;
  catSetter: any;

  /*IndivOption: any;
  IndivCat: any;*/
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

  // not sure catid and order are even necessary

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

  const [newItemName, setNewItemName] = useState<string>(); // these names are WRRRROOONG

  const [newItemDesc, setNewItemDesc] = useState<string>();

  const [newItemCatSelection, setNewItemCatSelection] = useState<string>();

  const [newItemNewCatName, setNewItemNewCatName] = useState<string>();

  const [newItemPlaceSelection, setNewItemPlaceSelection] = useState<string>();

  const [newItemError, setNewItemError] = useState<string>();

  const [newItemOpenOne, setNewItemOpenOne] = useState<string>();

  const [removeItemOpenOne, setRemoveItemOpenOne] = useState<string>();

  const resetNewItem = (defaultCatToSet?: string) => {
    setNewItemName(undefined || props.name);
    setNewItemDesc(undefined || props.desc);
    setNewItemCatSelection(defaultCatToSet || "createNew");
    setNewItemNewCatName(undefined);
    setNewItemPlaceSelection(
      props.theOptions
        .toReversed()
        .find((eachOption: IndivOption) => eachOption.catID == props.catid)
        .ID == props.id
        ? "firstPlace"
        : props.theOptions
            .filter(
              (eachOption: IndivOption) => eachOption.catID == props.catid
            )
            .find(
              (eachOption: IndivOption) =>
                props.theOptions
                  .filter(
                    (eachOption: IndivOption) => eachOption.catID == props.catid
                  )
                  .indexOf(eachOption) ==
                props.theOptions
                  .filter(
                    (eachOption: IndivOption) => eachOption.catID == props.catid
                  )
                  .indexOf(
                    props.theOptions.find(
                      (eachOption: IndivOption) => eachOption.ID == props.id
                    )
                  ) +
                  1
            ).ID
    );
    setNewItemError(undefined);
  };

  const cat = props.theCats.find(
    (eachCat: { ID: string }) => eachCat.ID == props.catid
  );
  console.log(props.theCats);
  console.log(props.catid);
  console.log(cat);
  console.log(props.theOptions);

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

      const newOptionsArray = renumberOptions(
        sortOptions([
          ...props.theOptions.filter(function (eachOption: IndivOption) {
            return eachOption.ID != props.id;
          }),
          {
            ...props.theOptions.find(
              (eachOption: IndivOption) => eachOption.ID == props.id
            ),
            name: newItemName,
            description: newItemDesc,
            catID:
              newItemCatSelection == "createNew"
                ? catUUIDforUseIfNecessary
                : newItemCatSelection || "アイテムカテゴリ異常",
            orderNo:
              newItemPlaceSelection == "firstPlace"
                ? 99999
                : props.theOptions.indexOf(
                    props.theOptions.find(
                      (eachOption: IndivOption) =>
                        eachOption.ID == newItemPlaceSelection
                    ) || new IndivOption("", "", "", "", 0)
                  ) - 0.5,
          },
        ])
      );
      props.optionSetter(newOptionsArray);
      setNewItemError(undefined);
      setNewItemOpenOne(undefined);

      props.catSetter(
        renumberCats(
          sortCats(
            newItemCatSelection == "createNew"
              ? [
                  ...props.theCats,
                  new IndivCat(
                    catUUIDforUseIfNecessary,
                    newItemNewCatName || "カテゴリ命名異常",
                    props.theCats.length
                  ),
                ].filter((eachCat: IndivCat) =>
                  newOptionsArray
                    .toReversed()
                    .find(
                      (eachOption: IndivOption) =>
                        eachOption.catID == eachCat.ID
                    )
                )
              : props.theCats.filter((eachCat: IndivCat) =>
                  newOptionsArray
                    .toReversed()
                    .find(
                      (eachOption: IndivOption) =>
                        eachOption.catID == eachCat.ID
                    )
                )
          )
        )
      );
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

  return (
    <section className="container">
      <div className="grid">
        <label
          key={props.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow w-full border border-gray-200 dark:border-gray-700"
        >
          <div className="p-3 flex flex-col items-center justify-center space-y-2">
            <h3 className="text-sm font-semibold">{props.name}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center text-xs">
              {props.desc}
            </p>
          </div>

          <Dialog
            onOpenChange={(e) => {
              resetNewItem(props.catid);
              setNewItemOpenOne(newItemOpenOne ? undefined : props.id);
            }}
            open={newItemOpenOne == props.id}
          >
            <DialogTrigger onClick={() => setNewItemOpenOne(props.id)} asChild>
              <Button
                className="float-left"
                variant={"ghost"}
                type={"button"}
                size={"sm"}
              >
                <BsSliders size={18} />
              </Button>
            </DialogTrigger>
            <DialogContent
              onInteractOutside={(e) => {
                e.preventDefault();
              }}
            >
              <DialogHeader className="">
                <DialogTitle>選択肢を編集</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <Separator />
              <form className="" onSubmit={handleNewItemSubmit}>
                <Label>名前</Label>
                <Input
                  id="itemName"
                  placeholder="3-B「Mission Possible」..."
                  defaultValue={props.name}
                  style={{ marginBottom: "10px" }}
                  onChange={handleNewNameChange}
                />
                <Label>説明</Label>
                <Input
                  id="itemDesc"
                  placeholder="筑駒を舞台にしたスパイコメディ..."
                  defaultValue={props.desc}
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
                    <SelectValue placeholder="選択..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="createNew" key="createNew">
                        新規作成
                      </SelectItem>
                      {props.theCats.map((catItem: any) => (
                        <SelectItem value={catItem.ID} key={catItem.ID}>
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

                {props.theOptions.indexOf(
                  props.theOptions.find(
                    (eachOption: IndivOption) =>
                      eachOption.catID == newItemCatSelection
                  ) || new IndivOption("", "", "", "", 0)
                ) == -1 ||
                props.theOptions.filter(
                  (eachOption: IndivOption) => eachOption.catID == props.catid
                ).length == 1 ? null : (
                  <>
                    <Label>カテゴリ内位置</Label>
                    <Label
                      className="text-xs text-gray-500"
                      style={{ marginLeft: "5px" }}
                    >
                      どの選択肢の前に移動しますか？
                    </Label>
                    <Select
                      onValueChange={setNewItemPlaceSelection}
                      defaultValue={
                        props.theOptions
                          .toReversed()
                          .find(
                            (eachOption: IndivOption) =>
                              eachOption.catID == props.catid
                          ).ID == props.id
                          ? "firstPlace"
                          : props.theOptions
                              .filter(
                                (eachOption: IndivOption) =>
                                  eachOption.catID == props.catid
                              )
                              .find(
                                (eachOption: IndivOption) =>
                                  props.theOptions
                                    .filter(
                                      (eachOption: IndivOption) =>
                                        eachOption.catID == props.catid
                                    )
                                    .indexOf(eachOption) ==
                                  props.theOptions
                                    .filter(
                                      (eachOption: IndivOption) =>
                                        eachOption.catID == props.catid
                                    )
                                    .indexOf(
                                      props.theOptions.find(
                                        (eachOption: IndivOption) =>
                                          eachOption.ID == props.id
                                      )
                                    ) +
                                    1
                              ).ID
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
                          {props.theOptions.map((optionItem: any) =>
                            optionItem.catID == newItemCatSelection &&
                            optionItem.ID != props.id ? (
                              <SelectItem
                                value={optionItem.ID}
                                key={optionItem.ID}
                              >
                                {optionItem.name}
                              </SelectItem>
                            ) : null
                          )}
                          <SelectItem value="firstPlace" key="firstPlace">
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

          <AlertDialog
            open={removeItemOpenOne == props.id}
            onOpenChange={(e) => {
              setRemoveItemOpenOne(removeItemOpenOne ? undefined : props.id);
            }}
          >
            <AlertDialogTrigger asChild>
              <Button
                className="float-right"
                variant={"ghost"}
                type={"button"}
                size={"sm"}
              >
                <BsTrash3 color={"#CC6666"} size={18} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>危険！</AlertDialogTitle>
                <AlertDialogDescription>
                  この選択肢の全データが削除されます。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    const newOptionsArray = props.theOptions.filter(function (
                      eachOption: IndivOption
                    ) {
                      return eachOption.ID != props.id;
                    });

                    props.optionSetter(newOptionsArray);

                    props.catSetter(
                      renumberCats(
                        sortCats(
                          props.theCats.filter((eachCat: IndivCat) =>
                            newOptionsArray.find(
                              (eachOption: IndivOption) =>
                                eachOption.catID == eachCat.ID
                            )
                          )
                        )
                      )
                    );
                  }}
                >
                  削除
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </label>
      </div>
    </section>
  );
}
