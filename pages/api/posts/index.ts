import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { question, latitude, longitude },
    session: { user },
  } = req;

  if (req.method === "POST") {
    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    console.log(post);

    return res.json({ ok: true, post });
  }
  if (req.method === "GET") {
    const {
      query: { latitude, longitude },
    } = req;
    const ParsedLatitude = parseFloat(latitude.toString());
    const ParsedLongitude = parseFloat(longitude.toString());
    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            wondering: true,
            answers: true,
          },
        },
      },
      where: {
        latitude: {
          gte: ParsedLatitude - 0.01,
          lte: ParsedLatitude + 0.01,
        },
        longitude: {
          gte: ParsedLongitude - 0.01,
          lte: ParsedLongitude + 0.01,
        },
      },
    });
    return res.json({ ok: true, posts });
  }
}

//먼저 함수를 어떻게 쓸지 적고, 함수를 세부적으로 구현
export default withApiSession(
  withHandler({
    method: ["GET", "POST"],
    handler,
  })
);
