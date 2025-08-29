import { initDB, pool } from "./db";

async function main() {
  await initDB();

  const res = await pool.query(
    "SELECT id, username, password_hash, created_at FROM users"
  );
  console.log("Użytkownicy w bazie:", res.rows);

  await pool.end(); 
}

main();
