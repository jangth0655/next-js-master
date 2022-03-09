import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

type Method = "GET" | "POST" | "DELETE";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

interface ConfigType {
  method: Method;
  handler: (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
  ) => Promise<any>;
  isPrivate?: boolean;
}

// NextJS가 실행해야 할 것을 return 해야한다.
export default function withHandler({
  method,
  isPrivate = true,
  handler,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
  ): Promise<any> {
    if (req.method !== method) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).send({ ok: false, message: "Plz Log in." });
    }
    try {
      return await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false, error });
    }
  };
}
