import express from "express";
import * as gameController from "../controllers/gameController";

const router = express.Router();

console.log("gameRoutes loaded");
router.post("/games/start", gameController.startGame);
router.get("/games/:gameId/questions", gameController.getGameQuestions);

export default router;
