import { Noto_Sans_JP } from "next/font/google";
const myfont = Noto_Sans_JP({
  subsets: ["latin"],
  weight: "variable",
});

import { Lexend_Tera } from "next/font/google";
const animFont = Lexend_Tera({
  subsets: ["latin"],
  weight: "variable",
});

export { myfont, animFont };
