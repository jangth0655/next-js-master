import { NextApiRequest } from "next";
import { NextFetchEvent } from "next/server";

export function middleware(req: NextApiRequest, ev: NextFetchEvent) {
  console.log("chat only middleware");
}
