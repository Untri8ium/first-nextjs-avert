// "use client";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps, useState } from "react";
import { animFont } from "@/app/fonts";

type Props = {
  title: string;
  description: string;
  colorFrom: string;
  colorTo: string;
  envFrom: string;
  envTo: string;
};

export function TopArea(props: Props) {
  // const sectionClassName = `bg-gradient-to-r ${props.colorFrom} ${props.colorTo} w-full py-12 md:py-16 lg:py-20`;
  // console.log("hey, " + sectionClassName);
  console.log(props);
  return (
    <section
      className={
        props.title == "管理者パネル" || props.title == "集計パネル"
          ? `bg-gradient-to-r ${props.colorFrom} ${props.colorTo} w-full py-12 md:py-16 lg:py-20`
          : `w-full py-12 md:py-16 lg:py-20`
      }
      style={{
        backgroundImage: `linear-gradient(to right, ${props.envFrom}, ${props.envTo})`,
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {props.title == "管理者パネル" || props.title == "集計パネル" ? (
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              {props.title}
            </h1>
          ) : process.env.NEXT_PUBLIC_CUSTOM_HEADER == "true" ? (
            <>
              <svg
                id="_レイヤー_2"
                data-name="レイヤー_2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 467.23 64.68"
                width="85%"
                height="64.68"
              >
                <defs>
                  <style>
                    {`.cls-1 {
        fill: #fff;
        stroke: #fff;
        stroke-width: 1;
      }`}
                  </style>
                </defs>
                <g id="_レイヤー_1-2" data-name="レイヤー_1">
                  <g>
                    <path
                      className="cls-1 svg-elem-1"
                      d="M77.23,12.87H12.87v12.87h64.36v12.87H12.87v25.74H0V0h64.36c7.08,0,12.87,5.79,12.87,12.87ZM77.23,12.87h12.87v12.87h-12.87v-12.87ZM77.23,38.61c7.08,0,12.87,5.79,12.87,12.87v12.87h-12.87v-25.74Z"
                    />
                    <path
                      className="cls-1 svg-elem-2"
                      d="M98.96,41.18c0-4.31,3.53-7.83,7.83-7.83v7.83h47v7.83h-47v7.83c-4.31,0-7.83-3.53-7.83-7.83v-7.83ZM106.8,33.34v-7.83h47v7.83h-47ZM106.8,56.85h47v7.83h-47v-7.83Z"
                    />
                    <path
                      className="cls-1 svg-elem-3"
                      d="M241.71,0v12.87h-64.36v12.87h64.36v-12.87c7.08,0,12.87,5.79,12.87,12.87v12.87c0,7.08-5.79,12.87-12.87,12.87v-12.87h-64.36v12.87h64.36v12.87h-77.23V0h77.23Z"
                    />
                    <path
                      className="cls-1 svg-elem-4"
                      d="M263.75,39.22c0-4.62,3.78-8.4,8.4-8.4v25.19c-4.62,0-8.4-3.78-8.4-8.4v-8.4ZM272.14,30.82v-8.4h41.98v8.4h-41.98ZM272.14,56.01h41.98v8.4h-41.98v-8.4ZM314.12,30.82c4.62,0,8.4,3.78,8.4,8.4v8.4c0,4.62-3.78,8.4-8.4,8.4v-25.19Z"
                    />
                    <path
                      className="cls-1 svg-elem-5"
                      d="M330.97,38.1c0-4.78,3.91-8.69,8.69-8.69v26.08c-4.78,0-8.69-3.91-8.69-8.69v-8.69ZM339.66,29.41v-8.69h43.46v8.69h-43.46ZM339.66,55.49h43.46v8.69h-43.46v-8.69ZM383.12,29.41c4.78,0,8.69,3.91,8.69,8.69v8.69c0,4.78-3.91,8.69-8.69,8.69v-26.08Z"
                    />
                    <path
                      className="cls-1 svg-elem-6"
                      d="M377.13.26h25.74c7.08,0,12.87,5.79,12.87,12.87h-38.61V.26ZM428.62,64.62h-12.87V13.13h12.87v51.49ZM441.49.26h25.74v12.87h-38.61c0-7.08,5.79-12.87,12.87-12.87Z"
                    />
                  </g>
                </g>
              </svg>
            </>
          ) : (
            <svg className="animtext text-5xl md:text-7xl font-bold text-white h-[3.5rem] md:h-[4.5rem]">
              <text
                x="50%"
                y="50%"
                dy=".35em"
                textAnchor="middle"
                className={animFont.className}
              >
                {props.title}
              </text>
            </svg>
          )}
          {/* <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {props.title}
          </h1> */}
          <p className="max-w-[600px] text-gray-200 text-md md:text-lg">
            {props.description}
          </p>
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
