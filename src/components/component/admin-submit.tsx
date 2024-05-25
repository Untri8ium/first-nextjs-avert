"use client";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps, useState } from "react";

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

type Props = {
  votingSet: boolean;
  votingDateS: string;
  votingDateE: string;
  votingName: string;
  votingDescription: string;
  options: IndivOption[];
  categories: IndivCat[];
};

export function AdminSubmit() {
  console.log("RECEIVED HERE");
  return <p>ho ho ho</p>;
}
