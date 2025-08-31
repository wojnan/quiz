import express from "express";
import * as userController from '../controllers/userController';

const router = express.Router();

router.post('/login', userController.loginOne);
router.post('/register', userController.registerOne);

export default router;