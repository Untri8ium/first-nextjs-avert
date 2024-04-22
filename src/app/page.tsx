import Image from "next/image";
import { VotingCore, Tile } from "@/components/component/voting-core";

export default function Home() {

  const tileList: Tile[] = [
    {
      id: "firstone",
      name: "ABC",
      description: "Lorem"
    },
    {
      id: "secondone",
      name: "DEF",
      description: "Dolor"
    }
  ];

  return (
    <main>
      <VotingCore list={tileList} />
    </main>
  );
}
