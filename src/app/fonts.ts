import { Inter, Noto_Sans_JP } from "next/font/google";
import { Zen_Kaku_Gothic_New } from "next/font/google";

const interFont = Inter({
  subsets: ["latin"],
  weight: "variable",
});
const notoFont = Noto_Sans_JP({
  subsets: ["latin"],
  weight: "variable",
});
// const notoFont = Zen_Kaku_Gothic_New({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "700", "900"],
// });

import { Lexend_Tera } from "next/font/google";
const animFont = Lexend_Tera({
  subsets: ["latin"],
  weight: "variable",
});

export { interFont, notoFont, animFont };
