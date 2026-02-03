import { Pool } from "pg";

const poolConfig = {
  host: process.env.PG_HOST || "127.0.0.1",
  port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5433,
  user: process.env.PG_USER || "admin",
  password: process.env.PG_PASSWORD || "admin123",
  database: process.env.PG_DATABASE || "authdb",
  // optional: increase connection timeout for slow dev machines
  connectionTimeoutMillis: 5000,
};

console.log("Connecting to Postgres with", {
  host: poolConfig.host,
  port: poolConfig.port,
  user: poolConfig.user,
  database: poolConfig.database,
});
const pool = new Pool(poolConfig);

(async () => {
  try {
    const res = await pool.query("SELECT 1 AS ok");
    console.log("OK", res.rows);
  } catch (err) {
    console.error("ERROR", err);
  } finally {
    await pool.end();
  }
})();
