//'use client'
import { Button } from "@/components/ui/button";
import { JSX, SVGProps, useState } from "react";
import { animFont } from "@/app/fonts";
import Image from "next/image";

export function BottomArea() {
  const sectionClassName = `bg-gray-300 dark:bg-neutral-800 w-full py-8 md:py-10`;
  //console.log("hey, " + sectionClassName)
  return (
    <section className={sectionClassName}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="max-w-[600px]">
            <div className="flex justify-center pb-2">
              <Image
                src="/vox-ailogomono-ol.svg"
                alt="VOX"
                width={80}
                height={80}
              />
            </div>
            <p className="text-gray-700 dark:text-neutral-400 text-sm md:text-md whitespace-pre-line">
              {`© 筑波大学附属駒場高等学校・\u200BUntrioctium`}
              <br />
              <a href="https://qr1.jp/voxpolicy" className="underline">
                プライバシーポリシー
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

{
  /* <svg className="animtext text-5xl md:text-7xl font-bold text-white h-[3.5rem] md:h-[4.5rem]">
<text
  x="50%"
  y="50%"
  dy=".35em"
  textAnchor="middle"
  className={animFont.className}
>
  {props.title}
</text>
</svg> */
}
