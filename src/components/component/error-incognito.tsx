"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EyeOff } from "lucide-react";

import { useRouter } from "next/navigation";

import { detectIncognito } from "detectincognitojs";
import { userAgent } from "next/server";
import Link from "next/link";

export default function ErrorIncognito() {
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) return null;

  const router = useRouter();

  detectIncognito().then((result) => {
    if (!result.isPrivate) {
      router.replace("/");
    }
  });

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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <EyeOff className="text-white w-10 h-10" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-4 break-keep"
            >
              プライベート&#8203;モード
              <br />
              <span className="text-red-500 text-3xl">を検知しました</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg text-gray-600 text-center mb-8 break-keep"
            >
              重複投票防止のため、&#8203;お手数ですが通常モードに&#8203;切替をお願いします。
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex justify-center"
            >
              {/* <button
                onClick={() => {
                  const router = useRouter();
                  router.replace("/");
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Exit Private Mode
              </button> */}
            </motion.div>
          </div>
          <div className="bg-gray-200 px-8 py-4 flex justify-between items-center">
            {/* {e == "ed" ? ( */}
            <span className="text-sm text-gray-600">BE-IN</span>
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
