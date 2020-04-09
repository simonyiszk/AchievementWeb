import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

import { User } from "./user";
import { Group } from "../group/group";

import groupnames from "../../util/groupnames.json";

interface OAuthUserGroups {
  id: number;
  name: string;
  status: string;
  title?: string[];
  start: Date;
  end: Date | null;
}
interface OAuthUser {
  displayName: string;
  internal_id: string;
  mail: string;
  eduPersonEntitlement: OAuthUserGroups[];
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

export const updateLeader = async (user: User, groups: OAuthUserGroups[]) => {
  const ledGroupNames = groups
    .filter((group) => groupnames.names.indexOf(group.name) > -1)
    .filter((group) => group.end === null)
    .map((group) => group.name);
  if (ledGroupNames.length > 0) {
    await Group.query().whereIn("name", ledGroupNames).patch({ leaderId: user.id });
  }
};
