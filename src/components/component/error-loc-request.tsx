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
import { Toaster } from "../ui/toaster";
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
      router.replace("/error-location-disallowed");
    }
  }

  // 取得に失敗した場合の処理
  function errorCallback(error: any) {
    setIsLoadingStatus(false);
    toast({
      title: "位置情報取得に失敗しました",
      description: "不具合と思われる場合、再読み込みしてください。",
      variant: "destructive",
    });
  }

  function getLoc() {
    setIsLoadingStatus(true);
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }

  // const miniOl = ({
  //   node,
  //   children,
  // }: ClassAttributes<HTMLHeadingElement> &
  //   HTMLAttributes<HTMLHeadingElement> &
  //   ExtraProps) => {
  //   return (
  //     <ol class="">
  //         {children}
  //     </ol>
  //   )
  // }

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        {/* <ScrollArea className="h-dvh"> */}
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
                位置情報取得
                <br />
                <span className="text-red-500 text-3xl">に失敗しました</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-lg text-gray-600 text-center mb-4 break-keep"
              >
                以下の点をご確認の上&#8203;お試しください。&#8203;難しい場合、&#8203;投票所でご投票ください。
              </motion.p>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-iphone">
                  <AccordionTrigger className="pt-0 pb-2 [&>svg]:text-black">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="text-lg text-gray-700"
                    >
                      iPhoneをお使いの場合
                    </motion.p>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    <ScrollArea className="h-[160px] rounded-md">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mb-0 whitespace-pre-wrap prose w-[95%]"
                      >
                        {/* <div className="prose"> */}
                        <ReactMarkdown className={"text-sm"}>
                          {`
**Safari自体の位置情報が無効になっていませんか？**
①「設定」アプリを開きます。
②「プライバシーとセキュリティ」に入り、
③「位置情報サービス」に入り、
④「位置情報サービス」を有効にします。
⑤下にスクロールして「SafariのWebサイト」に入り、
⑥「このAppの使⽤中のみ許可」をタップします。
⑦「正確な位置情報」を有効にします。
　
**このサイトの位置情報が無効になっていませんか？**
①Safari内のアドレスバー左部のアイコンをタップし、Safariのメニューを開きます。
②Webサイトの設定に入り、「位置情報」を「許可」にします。
                      `}
                        </ReactMarkdown>
                      </motion.div>
                    </ScrollArea>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-android">
                  <AccordionTrigger className="py-2 [&>svg]:text-black">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="text-lg text-gray-700"
                    >
                      Androidをお使いの場合
                    </motion.p>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    <ScrollArea className="h-[160px] rounded-md">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mb-0 whitespace-pre-wrap prose w-[95%]"
                      >
                        <ReactMarkdown className={"text-sm"}>
                          {`
**Chrome自体の位置情報が無効になっていませんか？**
①「設定」アプリを開きます。
②「アプリ管理」に入ります（名称は機種により異なります）。
③「Chrome」に入ります。
④「権限」に入り、「位置情報」を「アプリの使⽤中のみ許可」にします。
　
**このサイトの位置情報が無効になっていませんか？**
①Chrome内のアドレスバー左部の南京錠アイコンをタップして、Chromeのメニューを開きます。
②「権限」に入り、「位置情報」を「許可」にします。
                      `}
                        </ReactMarkdown>
                      </motion.div>
                    </ScrollArea>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex justify-center"
              >
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <button className="bg-red-600 hover:bg-red-700 mt-3 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                      位置情報を認証する
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
              <span className="text-sm text-gray-600">BE-LO-R</span>
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
        {/* </ScrollArea> */}
      </div>
    </>
  );
}
