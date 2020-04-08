import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

import { User } from "../components/user/user";

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

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req.user as User)?.admin) {
    next();
  } else {
    next(createError(403));
  }
};
