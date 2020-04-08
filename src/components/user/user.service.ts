import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

import { User } from "./user";
import { findUserById } from "../../util/authentication";

interface OAuthUser {
  displayName: string;
  internal_id: string;
  mail: string;
}

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await User.query();
  req.queriedUsers = users;
  next();
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = findUserById((req.user as User).id);

  if (!user) {
    next(createError(404));
  } else {
    req.queriedUser = user;
    next();
  }
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
