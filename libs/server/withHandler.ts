import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

type Method = "GET" | "POST" | "DELETE";

// NextJS가 실행해야 할 것을 return 해야한다.
export default function withHandler(
  method: Method,
  fn: (
    req: NextApiRequest,
    res: NextApiResponse
  ) => Promise<NextApiResponse<any>>
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      return res.status(405).end();
    }
    try {
      return await fn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
