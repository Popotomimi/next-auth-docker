"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } else {
      toast.error("Credenciais inválidas");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-indigo-900 to-neutral-800">
      <Card className="w-full max-w-md shadow-xl border-none bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-extrabold text-gray-800">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-center text-gray-600 mb-6">
            Entre com suas credenciais para acessar o sistema.
          </p>

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-3 focus:ring-2 focus:ring-indigo-400"
          />
          <Input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-3 focus:ring-2 focus:ring-indigo-400"
          />

          <Button
            onClick={handleLogin}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
            Entrar
          </Button>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            🚀 Sistema de autenticação com Next.js + Tailwind + shadcn/ui
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
