import { withIronSessionApiRoute } from "iron-session/next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });

  return res.json({ ok: true, profile });
}

//먼저 함수를 어떻게 쓸지 적고, 함수를 세부적으로 구현
export default withIronSessionApiRoute(withHandler("GET", handler), {
  cookieName: "carrotsession",
  password: "10293832094809890102039495868694303021939394959838302",
});
