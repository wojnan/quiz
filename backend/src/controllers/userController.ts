import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errorsUtil";
import * as userServices from "../services/userService";
import { CustomRequest } from '../middlewares/auth';


export const loginOne = async (req: Request, res: Response) => {
  try {
    const foundUser = await userServices.login(req.body);
    res.status(200).json(foundUser);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
};

export const registerOne = async (req: Request, res: Response) => {
  try {
    await userServices.register(req.body);
    res.status(200).send("Inserted successfully");
  } catch (error) {
    if(getErrorMessage(error)==="Email already exists"){
      return res.status(409).send("Profile with this email already exists");
    }
    else if(getErrorMessage(error)==="User already exists"){
      return res.status(409).send("Profile with this username already exists");
    }
    else {
      return res.status(500).send(getErrorMessage(error));
    }
    
  }
};
