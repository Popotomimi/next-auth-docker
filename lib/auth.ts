import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecret";

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export function generateToken(user: { id: number; role: string }) {
  return jwt.sign(user, SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}
