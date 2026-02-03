"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
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
      .then((data) => setUser(data))
      .catch(() => router.push("/login"));
  }, [router]);

  if (!user) return <p>Carregando...</p>;

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="mb-4 text-3xl font-bold">Bem-vindo, {user.name}!</h1>
      <p className="mb-6">Seu papel: {user.role}</p>
      {(user.role === "ADMIN" || user.role === "GERENTE") && (
        <Button onClick={() => router.push("/register")}>
          Ir para tela de registro
        </Button>
      )}
    </div>
  );
}
