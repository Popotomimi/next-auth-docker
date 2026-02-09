import { NextResponse } from "next/server";
import { queryOne } from "@/lib/db";
import { comparePassword, generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const user = await queryOne("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (!user || !(await comparePassword(password, user.password))) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 },
      );
    }

    const token = generateToken({ id: user.id, role: user.role });
    return NextResponse.json({ token });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
