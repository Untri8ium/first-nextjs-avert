import AnimatedBackground from "@/components/component/animated-background";
import ErrorLocDisallowed from "@/components/component/error-loc-disallowed";
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
      <ErrorLocDisallowed />
    </>
  );
}
