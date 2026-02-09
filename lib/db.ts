import { Pool } from "pg";

type QueryParam = string | number | boolean | null;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function queryAll(text: string, params?: QueryParam[]) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res.rows;
  } finally {
    client.release();
  }
}

export async function queryOne(text: string, params?: QueryParam[]) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res.rows[0] || null;
  } finally {
    client.release();
  }
}
