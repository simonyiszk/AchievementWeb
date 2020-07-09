import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { User } from '../components/user/user';
import { Achievement } from '../components/achievement/achievement';
import { Completion } from '../components/completion/completion';

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
    await User.relatedQuery('leader').for((req.user as User)?.id)
  ).map((group) => group.id);
  console.log(groups);
  if (groups.indexOf(parseInt(req.params.groupid)) > -1) {
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
    await User.relatedQuery('leader').for((req.user as User)?.id)
  ).map((group) => group.id);
  console.log(groups);
  if (
    groups.indexOf(parseInt(req.params.groupid)) > -1 ||
    (req.user as User)?.admin
  ) {
    next();
  } else {
    next(createError(403));
  }
};

export const checkGroupByAchiid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const achievement = await Achievement.query().findOne({
    id: parseInt(req.params.achiid),
  });
  if (!achievement) {
    next(createError(404));
  } else if (achievement.groupId != parseInt(req.params.groupid)) {
    next(createError(403));
  } else {
    next();
  }
};

export const checkGroupByUserAchiid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const completion = await Completion.query().findOne({
    id: parseInt(req.params.userachiid),
  });
  if (!completion) {
    next(createError(404));
  } else {
    const achievement = await Achievement.query().findOne({
      id: completion.achievementId,
    });
    if (!achievement) {
      next(createError(404));
    } else if (achievement.groupId != parseInt(req.params.groupid)) {
      next(createError(403));
    }
    next();
  }
};
