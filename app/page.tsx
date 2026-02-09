"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-indigo-900 to-neutral-800">
      <Card className="w-full max-w-md shadow-xl border-none bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-extrabold text-gray-800">
            Bem-vindo!
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-center text-gray-600 mb-6">
            Explore o sistema de autenticação com Next.js, Tailwind e shadcn/ui.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
              onClick={() => router.push("/login")}>
              Ir para Login
            </Button>

            <Button
              variant="outline"
              className="w-full font-semibold"
              onClick={() => router.push("/info")}>
              Ir para Informações
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">Feito com ❤️ por Roberto.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
