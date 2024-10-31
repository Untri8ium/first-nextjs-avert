"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EyeOff, Loader2 } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { useRouter } from "next/navigation";

import { detectIncognito } from "detectincognitojs";
import { userAgent } from "next/server";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ReactMarkdown from "react-markdown";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { title } from "process";
import { twoPointsDistance } from "@/twopointsdistance";

export default function ErrorLocRequest() {
  const router = useRouter();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState<any>(false);

  const [isEligibilityChecked, setIsEligibilityChecked] = useState<any>(false);

  const [isLoadingStatus, setIsLoadingStatus] = useState(false);

  function successCallback(position: {
    coords: { latitude: any; longitude: any };
  }) {
    setIsLoadingStatus(false);

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    if (
      twoPointsDistance(
        latitude,
        longitude,
        Number(process.env.NEXT_PUBLIC_TARGET_LAT),
        Number(process.env.NEXT_PUBLIC_TARGET_LON)
      ) <= Number(process.env.NEXT_PUBLIC_TARGET_RAD)
    ) {
      const setLocKey = async (): Promise<void> => {
        await fetch(`/api/setlockey`, {
          method: "POST",
        });
      };
      setLocKey()
        .then((empty) => {
          router.replace("/");
        })
        .catch((error) => {
          toast({
            title: "接続できませんでした",
            description:
              "インターネット接続を確認するか、再読み込みしてください。",
            variant: "destructive",
          });
        });
    } else {
      toast({
        title: "認証に失敗しました",
        description: `本校から${
          Math.floor(
            twoPointsDistance(
              latitude,
              longitude,
              Number(process.env.NEXT_PUBLIC_TARGET_LAT),
              Number(process.env.NEXT_PUBLIC_TARGET_LON)
            ) / 100
          ) / 10
        }kmも離れています。`,
        variant: "destructive",
      });
      // router.refresh();
    }
  }

  // 取得に失敗した場合の処理
  function errorCallback(error: any) {
    setIsLoadingStatus(false);
    router.replace("/error-location-request");
    // alert("位置情報が取得できませんでした");
  }

  function getLoc() {
    setIsLoadingStatus(true);
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }

  return (
    <>
      <Toaster />
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
                本校から
                <br />
                <span className="text-red-500 text-3xl">位置が遠すぎます</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-lg text-gray-600 text-center break-keep"
              >
                恐れ入りますが、&#8203;本校から離れた場所からは&#8203;ご投票いただけません。
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex justify-center"
              >
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <button className="bg-red-600 hover:bg-red-700 mt-3 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                      位置情報を再認証する
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>ご確認ください</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="eligibility"
                          checked={isEligibilityChecked}
                          onCheckedChange={setIsEligibilityChecked}
                        />
                        <Label
                          htmlFor="eligibility"
                          className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-pre-line"
                        >
                          <a
                            href="https://qr1.jp/voxpolicy"
                            className="underline"
                          >
                            プライバシーポリシー
                          </a>
                          に同意する
                        </Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        disabled={!isEligibilityChecked || isLoadingStatus}
                        className="text-lg font-bold"
                        onClick={getLoc}
                      >
                        {isLoadingStatus ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        位置情報を取得する
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </motion.div>
            </div>
            <div className="bg-gray-200 px-8 py-4 flex justify-between items-center">
              {/* {e == "ed" ? ( */}
              <span className="text-sm text-gray-600">BE-LO-D</span>
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
      </div>
    </>
  );
}
