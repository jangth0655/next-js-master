import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (req.ua?.isBot) {
    return new Response("Plz dont be a bot. Be human.", { status: 403 });
  }
  console.log(req.url);

  if (!req.url.includes("/api")) {
    if (!req.url.includes("/enter") && !req.cookies.carrotsession) {
      return NextResponse.redirect(`${req.nextUrl.origin}/enter`);
    }
  }
  //console.log(req.geo);
  //return NextResponse.json({ ok: true });
}

// 미들웨어가 실행 되면 각 페이지 요청 뿐만 아니라 api요청에도 실행된다.
