import { Request, Response } from "express";
import * as gameService from "../services/gameService";

export const startGame = async (req: Request, res: Response) => {
  try {
    const { lobbyId } = req.body;
    if (!lobbyId) {
      return res.status(400).json({ message: "lobbyId is required" });
    }

    const gameId = await gameService.startGame(lobbyId);
    const questions = await gameService.getGameQuestions(gameId);

    res.status(201).json({ gameId, questions });
  } catch (error) {
    console.error("Error starting game", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getGameQuestions = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const questions = await gameService.getGameQuestions(Number(gameId));
    res.status(200).json({ gameId, questions });
  } catch (error) {
    console.error("Error fetching game questions", error);
    res.status(500).json({ message: "Server error" });
  }
};
