import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errorsUtil";
import * as questionService from "../services/questionService";

export const getQuestion = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.params;
    const question = await questionService.getQuestion(Number(questionId));

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const getAnswers = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.params;
    const answers = await questionService.getAnswers(Number(questionId));

    if (!answers || answers.length === 0) {
      return res.status(404).json({ message: "Answers not found" });
    }

    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};


export const getGameQuestions = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const questions = await questionService.getGameQuestions(Number(gameId));

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: "No questions found for this game" });
    }

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


