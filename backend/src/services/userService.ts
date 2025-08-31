import { pool } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key-here";

export interface UserInput {
  username: string;
  password: string;
  email?: string;
}

export async function register(user: UserInput): Promise<void> {
  try {
    const res = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [user.email]
    );

    const resp = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [user.username]
    );

    if (res.rows.length !== 0) { 
      throw new Error("Email already exists");  
    }
    else if(resp.rows.length !== 0) { 
      throw new Error("User already exists");
    }
    else {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await pool.query(
        "INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3)",
        [user.username, hashedPassword, user.email || null]
      ); 
      
    }
  } catch (error) {
    throw error;
  }
}

export async function login(user: UserInput) {
  console.log("login attempt: ", user.username, user.password);
  try {
    const res = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [user.username]
    );

    if (res.rows.length === 0) {
      throw new Error("Name of user is not correct");
    }

    const foundUser = res.rows[0];
    console.log("found user: ", foundUser);

    const isMatch = await bcrypt.compare(user.password, foundUser.password_hash);

    if (!isMatch) {
      throw new Error("Password is not correct");
    }

    const token = jwt.sign(
      { id: foundUser.id, username: foundUser.username },
      SECRET_KEY,
      { expiresIn: "2 days" }
    );

    return {
      user: { id: foundUser.id, username: foundUser.username, email: foundUser.email },
      token,
    };
  } catch (error) {
    throw error;
  }
}
