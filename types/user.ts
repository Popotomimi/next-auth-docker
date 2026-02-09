export type User = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "GERENTE" | "SUPERVISOR" | "ANALISTA";
};
