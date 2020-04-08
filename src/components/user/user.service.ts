import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

import { User } from "./user";

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
  const user = await User.query().findOne({ id: parseInt(req.params.id) });

  if (!user) {
    next(createError(404));
  } else {
    req.queriedUser = user;
    next();
  }
};

export const toggleAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.query().findOne({ id: parseInt(req.params.id) });

  if (!user) {
    next(createError(404));
  } else {
    await User.query().patch({ admin: !user.admin }).where({ id: user.id });
    next();
  }
};

export const createUser = async (user: OAuthUser) => {
  return await User.transaction(async (trx) => {
    return await User.query(trx).insert({
      name: user.displayName,
      email: user.mail,
      authSchId: user.internal_id,
      admin: false,
    });
  });
};
