import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    body: { name, price, description },
    query,
  } = req;
  if (req.method === "POST") {
    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    return res.json({ ok: true, stream });
  }
  if (req.method === "GET") {
    const streams = await client.stream.findMany({ take: 10 });

    if (!streams) {
      return res.status(404).json({ ok: false, message: "Not Found" });
    }
    return res.json({ ok: true, streams });
  }
}

//먼저 함수를 어떻게 쓸지 적고, 함수를 세부적으로 구현
export default withApiSession(
  withHandler({
    method: ["GET", "POST"],
    handler,
  })
);
