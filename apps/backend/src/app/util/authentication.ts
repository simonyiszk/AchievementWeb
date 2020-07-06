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

export const isGroupLead = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const groups = (
    await User.relatedQuery("leader").for((req.user as User)?.id)
  ).map((group) => group.id);
  console.log(groups);
  if (groups.indexOf(parseInt(req.params.id)) > -1) {
    next();
  } else {
    next(createError(403));
  }
};

export const isAdminOrGroupLead = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const groups = (
    await User.relatedQuery("leader").for((req.user as User)?.id)
  ).map((group) => group.id);
  console.log(groups);
  if (
    groups.indexOf(parseInt(req.params.id)) > -1 ||
    (req.user as User)?.admin
  ) {
    next();
  } else {
    next(createError(403));
  }
};
