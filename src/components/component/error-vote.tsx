"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EyeOff } from "lucide-react";

import { useRouter } from "next/navigation";

import { detectIncognito } from "detectincognitojs";
import { userAgent } from "next/server";
import { ClientJS } from "clientjs";

import { useSearchParams } from "next/navigation";
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import Link from "next/link";

export default function ErrorVote(props: { receivedVGI: any }) {
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) return null;

  const votingDateS = props.receivedVGI[0].votingstart;
  const votingDateE = props.receivedVGI[0].votingend;
  const dayStartTime = props.receivedVGI[0].daystarttime;
  const dayEndTime = props.receivedVGI[0].dayendtime;

  const router = useRouter();

  const client = new ClientJS();
  // const cjsfp = client.getFingerprint();

  const sParams = useSearchParams();
  const e = sParams.get("e");

  var needToGetFp = false;

  // const [hitCjsfp, setHitCjsfp] = useState("");

  // if(e == "ed"){

  // const cjsfp = data ? data.visitorId : "NO DATA";
  // console.log(cjsfp);}

  // var headline = "エラーが";
  // var subline = "発生しました";
  // var desc =
  //   "お手数ですが\u200B再投票をお願いします。\u200B再発の場合はこの画面を見せて\u200B投票所までお問合せください。";
  // var ecode = "BE-V-0V";
  // var showButton = true;

  // var cjsfp: string | undefined = "";

  const { isLoading, error, data, getData } = useVisitorData(
    { extendedResult: true },
    { immediate: false }
  );

  useEffect(() => {
    getData();
    // console.log(data);
  }, [needToGetFp]);

  const CheckIPinDatabase = async () => {
    try {
      // while (isLoading) {}
      // cjsfp = (await getData()).visitorId;
      needToGetFp = true;
      if (!data?.visitorId) {
        console.log(error);
        return true;
      }
      const cjsfp = data.visitorId;
      console.log(cjsfp);
      const response = await fetch("/api/checkifvoted", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cjsfp }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const res = await response.json();
      console.warn(res.found);
      return res.found;
    } catch (err: any) {
      console.error("Error fetching from API:", err);
    }
  };

  async function checkIfReallyVoted() {
    const hit = await CheckIPinDatabase();
    console.log(hit);
    if (!hit) {
      router.replace("/");
    } else {
    }
  }

  var headline = "";
  var subline = "";
  var desc = "";
  var ecode = "";
  var showButton = false;

  switch (e) {
    case "ed":
      headline = "既に投票済";
      subline = "です";
      desc = `誤検知の場合、\u200Bこの画面を見せて\u200B投票所までお問合せください。`;
      ecode = "BE-ED";
      checkIfReallyVoted();
      break;
    case "mc":
      headline = "エラー";
      subline = "が発生しました";
      desc =
        "お手数ですが\u200B再投票をお願いします。\u200B再発の場合はこの画面を見せて\u200B投票所までお問合せください。";
      ecode = "BE-V-MC";
      showButton = true;
      break;
    case "mv":
      headline = "エラーが";
      subline = "発生しました";
      desc =
        "お手数ですが\u200B再投票をお願いします。\u200B再発の場合はこの画面を見せて\u200B投票所までお問合せください。";
      ecode = "BE-V-MV";
      showButton = true;
      break;
    case "0v":
      headline = "エラーが";
      subline = "発生しました";
      desc =
        "お手数ですが\u200B再投票をお願いします。\u200B再発の場合はこの画面を見せて\u200B投票所までお問合せください。";
      ecode = "BE-V-0V";
      showButton = true;
      break;
    case "ic":
      headline = "エラーが";
      subline = "発生しました";
      desc =
        "お手数ですが\u200B再投票をお願いします。\u200B再発の場合はこの画面を見せて\u200B投票所までお問合せください。";
      ecode = "BE-V-IC";
      showButton = true;
      break;
    case "op":
      showButton = true;
      if (new Date() < new Date(votingDateS)) {
        headline = "投票は未解禁";
        subline = "です";
        desc = `${new Date(votingDateS).toLocaleString("ja-JP", {
          month: "numeric",
          day: "numeric",
          weekday: "short",
          hour: "numeric",
          minute: "numeric",
        })} 以降に\u200Bお試しください。`;
        ecode = "BE-OP-S";
      } else if (new Date() >= new Date(votingDateE)) {
        headline = "投票は締切";
        subline = "です";
        desc = `${new Date(votingDateE).toLocaleString("ja-JP", {
          month: "numeric",
          day: "numeric",
          weekday: "short",
          hour: "numeric",
          minute: "numeric",
        })} をもって\u200B締切りました。`;
        ecode = "BE-OP-E";
      } else {
        headline = "投票時間外";
        subline = "です";
        desc = `${new Date(dayStartTime).toLocaleTimeString("ja-JP", {
          hour: "2-digit",
          minute: "numeric",
        })} 以降に\u200Bお試しください。`;
        ecode = "BE-OP-H";
      }
      break;
    case "pr":
      headline = "縦画面";
      subline = "をお使いください";
      desc =
        "誤検知の場合、\u200Bこの画面を見せて\u200B投票所までお問合せください。";
      ecode = "BE-PR";
      showButton = true;
      break;
    case "mb":
      headline = "モバイル端末";
      subline = "をお使いください";
      desc =
        "誤検知の場合、\u200Bこの画面を見せて\u200B投票所までお問合せください。";
      ecode = "BE-MB";
      showButton = true;
      break;
    case "cl":
      headline = "投票所は未開設";
      subline = "です";
      desc = "投票解禁日時が不明です。";
      ecode = "BE-CL";
      showButton = true;
      break;
    default:
      headline = "存在しない";
      subline = "エラーコードです";
      desc = "誤ってURLを編集\u200Bなさりませんでしたか？";
      ecode = "BE-XX";
      showButton = true;
      break;
  }

  // }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-2xl overflow-hidden"
        >
          <div className="p-8 sm:p-12">
            {/* <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <EyeOff className="text-white w-10 h-10" />
            </motion.div> */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-4 break-keep"
            >
              {headline}
              <br />
              <span className="text-red-500 text-3xl">{subline}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg text-gray-600 text-center break-keep"
            >
              {desc}
            </motion.p>
            {e == "ed" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full flex justify-center"
              >
                {/* <div className="w-full flex justify-center"> */}
                <span className="text-lg font-medium text-gray-800">
                  {isLoading ? null : data?.visitorId.substring(0, 3)}
                </span>
                <span className="text-xs text-gray-600 pt-2">
                  {isLoading ? null : data?.visitorId.substring(3)}
                </span>
                {/* </div> */}
              </motion.div>
            ) : null}
            {showButton ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex justify-center"
              >
                <button
                  onClick={() => {
                    router.replace("/");
                  }}
                  className="bg-red-600 hover:bg-red-700 shadow-md shadow-red-300 text-white font-bold py-3 px-6 mt-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  再試行
                </button>
              </motion.div>
            ) : null}
          </div>
          <div className="bg-gray-200 px-8 py-4 flex justify-between items-center">
            <span className="text-sm text-gray-600">{ecode}</span>
            {/* {e == "ed" ? ( */}
            <Link
              href="https://qr1.jp/voxpolicy"
              className="text-sm text-gray-600 hover:text-gray-700 underline"
            >
              プライバシーポリシー
            </Link>
            {/* ) : null} */}
          </div>
        </motion.div>
      </div>
      {/* <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern
          id="pattern"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect
            x="20"
            y="0"
            width="1"
            height="40"
            fill="rgba(255,255,255,0.03)"
          />
          <rect
            x="0"
            y="20"
            width="40"
            height="1"
            fill="rgba(255,255,255,0.03)"
          />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
      </svg> */}
    </div>
  );
}
