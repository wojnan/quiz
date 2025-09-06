// src/services/gameService.ts
import { pool } from "../db";

export async function startGame(lobbyId: number) {
  // create game
  const gameRes = await pool.query(
    "INSERT INTO games (lobby_id, started_at) VALUES ($1, NOW()) RETURNING id",
    [lobbyId]
  );
  const gameId = gameRes.rows[0].id;

  // pick 3 random questions
  const questionsRes = await pool.query(
    "SELECT id FROM questions ORDER BY RANDOM() LIMIT 3"
  );
  const questions = questionsRes.rows;

  // save them in game_questions
  for (let i = 0; i < questions.length; i++) {
    await pool.query(
      "INSERT INTO game_questions (game_id, question_id, question_order) VALUES ($1, $2, $3)",
      [gameId, questions[i].id, i + 1]
    );
  }

  return gameId;
}

export async function getGameQuestions(gameId: number) {
  const res = await pool.query(
    `SELECT q.id AS question_id, q.content, a.id AS answer_id, a.content AS answer, a.is_correct
     FROM game_questions gq
     JOIN questions q ON gq.question_id = q.id
     JOIN answers a ON q.id = a.question_id
     WHERE gq.game_id = $1
     ORDER BY gq.question_order, a.id`,
    [gameId]
  );

  const grouped: any = {};
  res.rows.forEach((row) => {
    if (!grouped[row.question_id]) {
      grouped[row.question_id] = {
        question_id: row.question_id,
        content: row.content,
        answers: [],
      };
    }
    grouped[row.question_id].answers.push({
      answer_id: row.answer_id,
      answer: row.answer,
      is_correct: row.is_correct,
    });
  });

  return Object.values(grouped);
}
