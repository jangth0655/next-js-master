import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);

  return res.status(200).end();
}

//먼저 함수를 어떻게 쓸지 적고, 함수를 세부적으로 구현
export default withHandler("POST", handler);
