"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ANALISTA");
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
      alert("Usuário criado com sucesso!");
      router.push("/dashboard");
    } else {
      alert("Erro ao criar usuário");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-bold">Registrar Usuário</h1>
        <Input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-3"
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3"
        />
        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mb-3 w-full rounded border p-2">
          <option value="ADMIN">ADMIN</option>
          <option value="GERENTE">GERENTE</option>
          <option value="SUPERVISOR">SUPERVISOR</option>
          <option value="ANALISTA">ANALISTA</option>
        </select>
        <Button onClick={handleRegister} className="w-full">
          Registrar
        </Button>
      </div>
    </div>
  );
}
