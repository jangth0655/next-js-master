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
  const { token } = req.body;
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
  });

  if (!exists) return res.status(404).end();

  req.session.user = {
    id: exists.userId,
  };
  await req.session.save();
  res.status(200).json({ ok: true });
}

//먼저 함수를 어떻게 쓸지 적고, 함수를 세부적으로 구현
export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "carrotsession",
  password: "10293832094809890102039495868694303021939394959838302",
});
