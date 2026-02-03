// middleware/auth.ts
import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../lib/auth";

interface DecodedToken {
  id: number;
  role: string;
}

type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  decoded: DecodedToken,
) => Promise<void> | void;

export function withAuth(handler: ApiHandler, roles: string[]) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Token ausente" });
    }

    try {
      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token) as DecodedToken;

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Acesso negado" });
      }

      return handler(req, res, decoded);
    } catch {
      return res.status(401).json({ error: "Token inválido" });
    }
  };
}
