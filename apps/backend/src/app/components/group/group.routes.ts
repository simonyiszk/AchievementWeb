import { Router } from 'express';

import {
  getAllGroup,
  getGroup,
  manageGroup,
  updateGroup,
} from './group.service';
import {
  isAuthenticated,
  isAdmin,
  isAdminOrGroupLead,
} from '../../util/authentication';

const router = Router();

// Get a group with achievements id="GroupID"
router.get('/:groupid', isAuthenticated, getGroup, (req, res) =>
  res.json({
    groupName: req.queriedGroup.name,
    allAchievements: req.queriedAchievements,
    userAchievementLevels: req.queriedUserAchievements,
  })
);

// Get a group with achievements id="GroupID"
router.get(
  '/:groupid/manage',
  isAuthenticated,
  //isAdminOrGroupLead, //TODO: remove comments
  manageGroup,
  (req, res) => res.json(req.queriedUsers)
);

// List all groups
router.get('/', getAllGroup, (req, res) => {
  const response = req.queriedGroups.map(({ id, name, ...rest }) => ({
    id,
    name,
  }));
  return res.json(response);
});

// Update group id=GroupID
router.put('/:groupid', isAuthenticated, isAdmin, updateGroup, (req, res) => {
  res.json(req.queriedGroup);
});

export default router;
