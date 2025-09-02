import { Request, Response} from "express";
import { getErrorMessage } from "../utils/errorsUtil";
import * as paymentService from "../services/paymentService";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../middlewares/auth";

export const paymentHistory = async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    if (!customReq.token || !(customReq.token as any).id) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    const userId = (customReq.token as any).id;
    const paymentHistory = await paymentService.getHistory(userId);
  
    res.status(200).json(paymentHistory);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const walletBalance = async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const userId = (customReq.token as any).id;
    const wallet = await paymentService.getWallet(userId);

    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    res.status(200).json(wallet);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
