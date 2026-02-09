"use client";

import { useState, useEffect } from "react";
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

type Role = "ADMIN" | "GERENTE" | "SUPERVISOR" | "ANALISTA";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("ANALISTA");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!(data.role === "ADMIN" || data.role === "GERENTE")) {
          router.push("/dashboard");
        }
      })
      .catch(() => router.push("/login"));
  }, [router]);

  async function handleRegister() {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (res.ok) {
      toast.success("Usuário criado com sucesso!");
      router.push("/dashboard");
    } else {
      toast.error("Erro ao criar usuário");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-indigo-900 to-neutral-800">
      <Card className="w-full max-w-md shadow-xl border-none bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-extrabold text-gray-800">
            Registrar Usuário
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-center text-gray-600 mb-6">
            Apenas administradores e gerentes podem criar novos usuários.
          </p>

          <Input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-3 focus:ring-2 focus:ring-indigo-400"
          />
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

          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="mb-3 w-full rounded border p-2 focus:ring-2 focus:ring-indigo-400">
            <option value="ADMIN">ADMIN</option>
            <option value="GERENTE">GERENTE</option>
            <option value="SUPERVISOR">SUPERVISOR</option>
            <option value="ANALISTA">ANALISTA</option>
          </select>

          <Button
            onClick={handleRegister}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
            Registrar
          </Button>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Voltar ao Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
