import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/admin", "/stats"],
};

export function middleware(req: NextRequest) {
  const isLocalDevelopment = process.env.NODE_ENV === "development";
  //   console.log(process.env);
  if (
    !process.env.ADMIN_ID ||
    !process.env.ADMIN_PWD ||
    !process.env.STATS_ID ||
    !process.env.STATS_PWD
  ) {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get("authorization");
  //   console.log(basicAuth);

  if (!basicAuth) {
    return new Response("認証が必要です。", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  try {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");
    if (
      (req.nextUrl.pathname == "/admin" &&
        user === process.env.ADMIN_ID &&
        pwd === process.env.ADMIN_PWD) ||
      (req.nextUrl.pathname == "/stats" &&
        user === process.env.STATS_ID &&
        pwd === process.env.STATS_PWD)
    ) {
      return NextResponse.next();
    }

    if (
      (req.nextUrl.pathname == "/stats" &&
        user === process.env.ADMIN_ID &&
        pwd === process.env.ADMIN_PWD) ||
      (req.nextUrl.pathname == "/admin" &&
        user === process.env.STATS_ID &&
        pwd === process.env.STATS_PWD)
    ) {
      return new Response("認証が必要です。", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Secure Area"',
        },
      });
    }

    return new Response("認証情報に誤りがあります。", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  } catch (e) {
    return new Response("Invalid Authentication", {
      status: 400,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  }
}
