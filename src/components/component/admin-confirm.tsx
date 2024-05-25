"use client";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps, useState } from "react";
import { AdminSubmit } from "./admin-submit";

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

export function AdminConfirm(props: Props) {
  const [submissionError, setSubmissionError] = useState<string>();
  const [submissionFlag, setSubmissionFlag] = useState<boolean>();

  const handleSubmission = () => {
    if (!props.votingSet) {
    } else {
      setSubmissionFlag(true);
      setSubmissionError(undefined);
    }
  };

  return (
    <section className="px-4 md:px-6 py-8 pb-12 md:pb-16 lg:pb-20">
      <div className="flex justify-center">
        <Button
          className="px-6 py-3 rounded-full text-lg font-semibold bg-gradient-to-r from-[#F18643] to-[#F64C6B] text-white dark:text-white hover:from-[#F64C6B] hover:to-[#F18643] transition-colors"
          variant="default"
          type="button"
          onClick={handleSubmission}
        >
          適用
        </Button>

        {submissionFlag &&
          (() => {
            console.log("good so far");
            return <AdminSubmit />;
          })()}
      </div>
    </section>
  );
}
