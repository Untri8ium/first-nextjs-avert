import AnimatedBackground from "@/components/component/animated-background";
import ErrorLocRequest from "@/components/component/error-loc-request";
import { validateLocKey } from "@/validatelockey";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
// import ErrorIncognito from "@/components/component/error-incognito";

export default async function Home() {
  const cookieStore = await cookies();
  const locKey = cookieStore.get("locKey");

  if (await validateLocKey()) {
    redirect("/");
  }

  return (
    <>
      <AnimatedBackground />
      <ErrorLocRequest />
    </>
  );
}
