import { initDB, pool } from "./db";
import express, { Application, Request, Response } from 'express';
import userRoutes from './routes/authRoutes';
import errorHandler from './middlewares/errorHandler';
import cors from 'cors';


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

app.use(cors())
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});
app.use('/api', userRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});