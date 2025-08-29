import { Pool } from "pg";
import bcrypt from "bcrypt";

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10", 10);

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "QuizDB",
  password: "slon",
  port: 5432,
});

export async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE,
        password_hash TEXT,
        google_id TEXT UNIQUE,
        display_name TEXT,
        email TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    console.log("Tabela 'users' jest gotowa");

    const res = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      ["user"]
    );

    if (res.rows.length === 0) {
      const hashedPassword = bcrypt.hashSync("password", SALT_ROUNDS);
      await pool.query(
        "INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3)",
        ["user", hashedPassword, "user@example.com"]
      );
      console.log(
        "Dodano przykładowego użytkownika: username=user, password=password (hashed)"
      );
    }
  } catch (err) {
    console.error("Błąd przy inicjalizacji bazy:", err);
  }
}
