import { pool } from "../db";

export async function  getHistory (userId: number) {
  try {
    console.log(userId);
    const res = await pool.query(
      "SELECT wt.* FROM wallet_transactions wt JOIN wallets w ON wt.wallet_id = w.id WHERE w.user_id = $1;",
      [userId]

    );
    console.log(45435435);
    

    if (res.rows.length === 0) {
        console.log(0);
      return ;
    }
    else{
        const transactionHistory = res.rows;
        return {
            transactionHistory
        };
    }
  } catch (error) {
    console.log("database error");
    throw error;
  }
}

export async function getWallet(userId: number) {
  try {
    const res = await pool.query(
      "SELECT id, balance FROM wallets WHERE user_id = $1",
      [userId]
    );

    if (res.rows.length === 0) return null;
    return res.rows[0];
  } catch (error) {
    console.log("Database error", error);
    throw error;
  }
}