export interface DbError extends Error {
  code?: string;
  detail?: string;
  table?: string;
  constraint?: string;
}
