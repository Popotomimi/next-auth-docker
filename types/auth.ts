export interface JwtPayload {
  id: number;
  role: "ADMIN" | "GERENTE" | "SUPERVISOR" | "ANALISTA";
  iat?: number;
  exp?: number;
}
