import express from "express";
import * as paymentController from "../controllers/paymentController"
import { auth } from "../middlewares/auth";

const router = express.Router();

router.get('/whistory', auth, paymentController.paymentHistory);
router.get("/wallet", auth, paymentController.walletBalance); 

export default router;