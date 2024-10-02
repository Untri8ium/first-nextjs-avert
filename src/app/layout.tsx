import type { Metadata } from "next";
// import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

import { interFont, notoFont } from "./fonts";

// const notoSansJP = Noto_Sans_JP({ weight: "variable", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VOX | 電子投票",
  description: "登録不要・超シンプルな、電子投票システム。",
  icons: {
    icon: "/icon.svg", // /public path
  },
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
        }}
      >
        {children}
      </body>
    </html>
  );
}
