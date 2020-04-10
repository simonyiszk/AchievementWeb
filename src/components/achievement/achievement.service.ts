import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

import { Achievement } from "./achievement";
import { Group } from "../group/group";

interface OAuthUser {
  displayName: string;
  internal_id: string;
  mail: string;
}

export const getAchievement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const achievement = await Achievement.query().findOne({
    id: parseInt(req.params.id),
  });

  if (!achievement) {
    next(createError(404));
  } else {
    req.queriedAchievement = achievement;
    next();
  }
};

export const createAchievement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const group = await Group.query().findOne({ id: parseInt(req.params.id) });

  if (!group) {
    next(createError(404));
  } else {
    const achievement = req.body.achievement;
    const newAchievement = await Achievement.transaction(async (trx) => {
      return await group.$relatedQuery("achievements", trx).insert({
        ...achievement,
        id: undefined,
      });
    });
    req.queriedAchievement = newAchievement;
    next();
  }
};
export const updateAchievement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const achievement = await Achievement.query().findOne({
    id: parseInt(req.params.id),
  });

  if (!achievement) {
    next(createError(404));
  } else {
    const achievement = req.body.achievement;
    const newAchievement = await Achievement.transaction(async (trx) => {
      return await Achievement.query(trx).patchAndFetchById(
        parseInt(req.params.id),
        {
          ...achievement,
          id: parseInt(req.params.id),
        }
      );
    });
    req.queriedAchievement = newAchievement;
    next();
  }
};
export const deleteAchievement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const achievement = await Achievement.query().findOne({
    id: parseInt(req.params.id),
  });

  if (!achievement) {
    next(createError(404));
  } else {
    await Achievement.transaction(async (trx) => {
      return await Achievement.query(trx)
        .findOne({ id: parseInt(req.params.id) })
        .delete();
    });
    next();
  }
};
