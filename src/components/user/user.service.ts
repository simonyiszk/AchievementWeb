import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

import { User } from "./user";

interface OAuthUser {
  displayName: string;
  internal_id: string;
  mail: string;
}

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = findUserById((req.user as User).id);

  if (!user) {
    next(createError(404))
  } else {
    req.queriedUser = user;
    next();
  }
};

export const findUserById = async (id: Number) => {
  return await User.query().findOne({ id });
};

export const findUserByAuthschId = async (authSchId: String) => {
  return await User.query().findOne({ authSchId });
};

export const createUser = async (user: OAuthUser) => {
  return await User.transaction(async (trx) => {
    return await User.query(trx).insert({
      name: user.displayName,
      email: user.mail,
      authSchId: user.internal_id,
    });
  });
};

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(createError(401))
  }
};
