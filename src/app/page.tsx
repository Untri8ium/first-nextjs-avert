import Image from "next/image";
import { VotingCore, Tile } from "@/components/component/voting-core";
import { TopArea } from "@/components/component/top-area";
import { headers } from "next/headers";
import { sql } from "@vercel/postgres";

export default function Home() {

  const header = headers()
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]

  const tileList: Tile[] = [
    {
      id: "0",
      name: ip,
      description: "Lorem"
    },
    {
      id: "1",
      name: "DEF",
      description: "Dolor"
    }
  ];

  return (
    <main>
      <TopArea title="鯛獲るタイトル" description="学生の本文は勉強なり。" colorFrom="from-[#6386F1]" colorTo="to-[#A05CF6]"/>
      <VotingCore list={tileList} />
    </main>
  );
}
