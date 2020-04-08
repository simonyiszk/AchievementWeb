import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

import { Group } from "./group";

interface OAuthUser {
  displayName: string;
  internal_id: string;
  mail: string;
}

export const getAllGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const groups = await Group.query();
  req.queriedGroups = groups;
  next();
};

export const getGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const group = await Group.query().findOne({ id: parseInt(req.params.id) });

  if (!group) {
    next(createError(404));
  } else {
    req.queriedGroup = group;
    next();
  }
};

export const updateGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Group.transaction(async (trx) => {
    return await Group.query(trx)
      .findOne({ id: parseInt(req.params.id) })
      .patch({
        ...req.body.group,
        id: parseInt(req.params.id),
      });
  });
  next();
};
