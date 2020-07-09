import { Router } from 'express';

import {
  getAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  requestUpgrade,
  acceptDeclineUpgrade,
} from './achievement.service';
import { isAuthenticated, isAdminOrGroupLead } from '../../util/authentication';

const router = Router();

// Request upgrade id=AchievementID
router.post('/:achiid/request', isAuthenticated, requestUpgrade, (req, res) =>
  res.json('Success')
);

// View details of an achievement id=AchievementID
router.get('/:achiid', isAuthenticated, getAchievement, (req, res) =>
  res.json(req.queriedAchievement)
);

// Create new achievement id=GroupID
router.post(
  '/:groupid',
  isAuthenticated,
  isAdminOrGroupLead,
  createAchievement,
  (req, res) => {
    res.json(req.queriedAchievement);
  }
);

// Accept upgrade request id=GroupID id2=userachiID
router.post(
  '/:groupid/:userachiid/accept',
  isAuthenticated,
  isAdminOrGroupLead,
  acceptDeclineUpgrade('completed'),
  (req, res) => {
    res.json(req.queriedAchievements);
  }
);

// reject upgrade request id=GroupID id2=userachiID
router.post(
  '/:groupid/:userachiid/reject',
  isAuthenticated,
  isAdminOrGroupLead,
  acceptDeclineUpgrade('rejected'),
  (req, res) => {
    res.json(req.queriedAchievements);
  }
);

// Update achievement id=AchievementID
router.put(
  '/:groupid/:achiid',
  isAuthenticated,
  isAdminOrGroupLead,
  updateAchievement,
  (req, res) => {
    res.json(req.queriedAchievement);
  }
);

// Delete achievement id=AchievementID
router.delete(
  '/:groupid/:achiid',
  isAuthenticated,
  isAdminOrGroupLead,
  deleteAchievement,
  (req, res) => {
    res.json('Success');
  }
);

export default router;
