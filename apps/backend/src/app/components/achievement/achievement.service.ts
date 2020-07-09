import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { Achievement } from './achievement';
import { Group } from '../group/group';
import { User } from '../user/user';
import { Completion } from '../completion/completion';

export const getAchievement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const achievement = await Achievement.query().findOne({
    id: parseInt(req.params.achiid),
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
  const group = await Group.query().findOne({
    id: parseInt(req.params.groupid),
  });

  if (!group) {
    next(createError(404));
  } else {
    const achievement = req.body.achievement;
    const newAchievement = await Achievement.transaction(async (trx) => {
      return await group.$relatedQuery('achievements', trx).insert({
        ...achievement,
        groupId: parseInt(req.params.groupid),
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
    id: parseInt(req.params.achiid),
  });

  if (!achievement) {
    next(createError(404));
  } else {
    const achievementData = req.body.achievement;
    const newAchievement = await Achievement.transaction(async (trx) => {
      return await Achievement.query(trx).patchAndFetchById(
        parseInt(req.params.achiid),
        {
          ...achievementData,
          id: parseInt(req.params.achiid),
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
    id: parseInt(req.params.achiid),
  });

  if (!achievement) {
    next(createError(404));
  } else {
    await Achievement.transaction(async (trx) => {
      return await Achievement.query(trx)
        .findOne({ id: parseInt(req.params.achiid) })
        .delete();
    });
    next();
  }
};
export const requestUpgrade = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const achievement = await Achievement.query().findOne({
    id: parseInt(req.params.achiid),
  });
  const user = await User.query().findOne({ id: 1 /*(req.user as User)?.id*/ });

  if (!achievement || !user) {
    next(createError(404));
  } else {
    const joined = await Achievement.transaction(async (trx) => {
      return await Achievement.relatedQuery('users', trx)
        .for(achievement.id)
        .relate({
          id: user.id,
          status: 'pending',
          dateRequested: new Date(),
          //TODO: img
        });
    });
    next();
  }
};

export const acceptDeclineUpgrade = (newStatus: 'completed' | 'rejected') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //TODO check if achi is connected with request group
    const user_achievement = await Completion.query().findOne({
      id: parseInt(req.params.userachiid),
    });
    if (!user_achievement) {
      next(createError(404));
    } else if (user_achievement.status !== 'pending') {
      next(createError(400));
    } else {
      const achievement = await Achievement.query().findOne({
        id: user_achievement.achievementId,
      });
      if (achievement.groupId !== parseInt(req.params.groupid)) {
        next(createError(403));
      } else {
        await Completion.transaction(async (trx) => {
          return await user_achievement
            .$query(trx)
            .patch({ status: newStatus, dateClosed: new Date() });
        });
        const all = await Completion.query();
        req.queriedAchievements = all as any;
        next();
      }
    }
  };
};
