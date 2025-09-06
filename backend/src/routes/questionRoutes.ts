import express from "express";
import * as questionController from "../controllers/questionController";

const router = express.Router();

router.get("/:questionId", questionController.getQuestion);
router.get("/:questionId/answers", questionController.getAnswers);
router.get("/games/:gameId/questions", questionController.getGameQuestions);


export default router;
