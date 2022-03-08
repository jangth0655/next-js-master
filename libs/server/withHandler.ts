import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

type Method = "GET" | "POST" | "DELETE";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

// NextJS가 실행해야 할 것을 return 해야한다.
export default function withHandler(
  method: Method,
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method !== method) {
      return res.status(405).end();
    }
    try {
      return await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
