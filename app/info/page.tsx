"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function InfoPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-indigo-900 to-neutral-800">
      <Card className="w-full max-w-lg shadow-xl border-none bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-extrabold text-gray-800">
            ℹ️ Informações
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            Este sistema foi desenvolvido para demonstrar autenticação com
            Next.js, Tailwind e shadcn/ui. Ele inclui telas de login, dashboard
            e registro com controle de acesso baseado em papéis de usuário.
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed">
            O objetivo é fornecer uma base sólida para projetos que precisem de
            autenticação moderna, segura e estilizada. Explore, teste e adapte
            conforme suas necessidades!
          </p>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            🚀 Criado para estudos e prática.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
