import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

import { Group } from "./group";
import { User } from "../user/user";

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
  const user = await User.query().findOne({ id: 1 /*(req.user as User)?.id*/ });

  if (!group || !user) {
    next(createError(404));
  } else {
    const groupAchievements = await Group.relatedQuery("achievements").for(
      group.id
    );
    const userAchievements = await User.relatedQuery("achievements")
      .for(user.id)
      .where({ groupId: group.id, status: "completed" })
      .select("achievements.id")
      .count("* as level")
      .groupBy("achievements.id");
    req.queriedAchievements = groupAchievements;
    req.queriedUserAchievements = userAchievements;
    next();
  }
};

export const manageGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const group = await Group.query().findOne({ id: parseInt(req.params.id) });

  if (!group) {
    next(createError(404));
  } else {
    const pendingUsers = await User.query()
      .joinRelated("achievements")
      .select(
        "achievements_join.id",
        "users.name",
        "achievements.title",
        "dateRequested"
      )
      .where({ groupId: group.id, status: "pending" });
    req.queriedUsers = pendingUsers;
    next();
  }
};

export const updateGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const group = await Group.query().findOne({
    id: parseInt(req.params.id),
  });

  if (!group) {
    next(createError(404));
  } else {
    const groupData = req.body.group;
    const newGroup = await Group.transaction(async (trx) => {
      return await Group.query(trx).patchAndFetchById(parseInt(req.params.id), {
        //TODO: handle wrong keys in request, and validation errors
        ...groupData,
        id: parseInt(req.params.id),
      });
    });
    req.queriedGroup = newGroup;
    next();
  }
};
