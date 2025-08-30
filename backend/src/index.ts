import { initDB, pool } from "./db";
import express, { Application, Request, Response } from 'express';
import authRoutes from './routes/authRoutes';
import errorHandler from './middlewares/errorHandler';


 /*async function main() {
  await initDB();

  const res = await pool.query(
    "SELECT id, username, password_hash, created_at FROM users"
  );
  console.log("Użytkownicy w bazie:", res.rows);

  await pool.end(); 
}
main();*/

const app: Application = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});
app.use('/api', authRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`xServer is running on http://localhost:${port}`);
});