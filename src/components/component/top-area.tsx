//'use client'
import { Button } from "@/components/ui/button";
import { JSX, SVGProps, useState } from "react";

type Props = {
  title: string;
  description: string;
  colorFrom: string;
  colorTo: string;
};

export function TopArea(props: Props) {
  const sectionClassName = `bg-gradient-to-r ${props.colorFrom} ${props.colorTo} w-full py-12 md:py-16 lg:py-20`;
  //console.log("hey, " + sectionClassName)
  return (
    <section className={sectionClassName}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {props.title}
          </h1>
          <p className="max-w-[600px] text-gray-200 md:text-lg">
            {props.description}
          </p>
        </div>
      </div>
    </section>
  );
}
