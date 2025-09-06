import { pool } from "../db";

export async function getQuestion(questionId: number) {
  try {
    const res = await pool.query(
      "SELECT id, content FROM questions WHERE id = $1",
      [questionId]
    );
    return res.rows[0] || null;
  } catch (error) {
    console.log("Database error", error);
    throw error;
  }
}

export async function getAnswers(questionId: number) {
  try {
    const res = await pool.query(
      "SELECT id AS answer_id, content AS answer, is_correct FROM public.answers WHERE question_id = $1 ORDER BY id",
      [questionId]
    );
    return res.rows;
  } catch (error) {
    console.log("Database error", error);
    throw error;
  }
}

export async function getGameQuestions(gameId: number) {
  const res = await pool.query(
    `
    SELECT q.id AS question_id, q.content AS question,
      json_agg(
        json_build_object(
          'answer_id', a.id,
          'answer', a.content,
          'is_correct', a.is_correct
        )
      ) AS answers
    FROM game_questions gq
    JOIN questions q ON q.id = gq.question_id
    JOIN answers a ON a.question_id = q.id
    WHERE gq.game_id = $1
    GROUP BY q.id
    ORDER BY gq.question_order
    `,
    [gameId]
  );

  return res.rows; // returns questions with answers in same order for everyone
}
