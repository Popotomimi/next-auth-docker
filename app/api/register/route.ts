import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const hashed = await hashPassword(password);

    const result = await query(
      "INSERT INTO users(name, email, password, role) VALUES($1,$2,$3,$4) RETURNING *",
      [name, email, hashed, role],
    );

    const user = result.rows[0];
    return NextResponse.json(user);
  } catch (err: any) {
    // Unique violation code for Postgres
    if (err?.code === "23505") {
      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 409 },
      );
    }
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
