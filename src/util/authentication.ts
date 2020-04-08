import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

import { User } from "../components/user/user";

export const findUserById = async (id: Number) => {
  return await User.query().findOne({ id });
};

export const findUserByAuthschId = async (authSchId: String) => {
  return await User.query().findOne({ authSchId });
};

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(createError(401));
  }
};
