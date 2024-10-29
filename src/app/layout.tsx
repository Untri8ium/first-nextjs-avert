import type { Metadata } from "next";
// import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

import { interFont, notoFont } from "./fonts";

// const notoSansJP = Noto_Sans_JP({ weight: "variable", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VOX | 電子投票",
  description: "登録不要・超シンプルな、電子投票システム。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={interFont.className}
        style={{
          fontFamily: `${interFont.style.fontFamily}, ${notoFont.style.fontFamily}`,
          // fontFamily:
          // "'__Inter_36bd41', '__Inter_Fallback_36bd41', '__Noto_Sans_JP_4ec2c1', '__Noto_Sans_JP_Fallback_4ec2c1'",
        }}
      >
        {children}
      </body>
    </html>
  );
}
