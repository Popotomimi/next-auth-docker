"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import type { User } from "@/types/user";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
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
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data: User) => setUser(data))
      .catch(() => router.push("/login"));
  }, [router]);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-indigo-900 to-neutral-800">
        <p className="text-white text-lg">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-indigo-900 to-neutral-800">
      <Card className="w-full max-w-md shadow-xl border-none bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-extrabold text-gray-800">
            Dashboard
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-700">
            Bem-vindo, {user.name}!
          </h1>
          <p className="mb-6 text-gray-600">Seu papel: {user.role}</p>

          {(user.role === "ADMIN" || user.role === "GERENTE") && (
            <Button
              onClick={() => router.push("/register")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
              Ir para tela de registro
            </Button>
          )}
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}>
            Sair
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
