import { NextResponse } from "next/server";
import { queryOne } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import type { DbError } from "@/types/db";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const hashed = await hashPassword(password);

    const user = await queryOne(
      `INSERT INTO users(name, email, password, role)
       VALUES($1, $2, $3, $4)
       RETURNING id, name, email, role`,
      [name, email, hashed, role],
    );

    return NextResponse.json(user);
  } catch (err) {
    const error = err as DbError;

    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 409 },
      );
    }

    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
