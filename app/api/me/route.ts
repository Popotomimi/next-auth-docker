import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { queryOne } from "@/lib/db";
import type { JwtPayload } from "@/types/auth";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Token ausente" }, { status: 401 });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded: JwtPayload = verifyToken(token);

    const user = await queryOne(
      `SELECT id, name, email, role FROM users WHERE id = $1`,
      [decoded.id],
    );

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
