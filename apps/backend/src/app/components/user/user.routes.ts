import { Router } from 'express';

import { getAllUser, getUser, toggleAdmin } from './user.service';
import { isAuthenticated, isAdmin } from '../../util/authentication';

const router = Router();

router.get('/:userid', isAuthenticated, isAdmin, getUser, (req, res) =>
  res.json(req.queriedUser)
);

router.post(
  '/:userid/admin',
  isAuthenticated,
  isAdmin,
  toggleAdmin,
  (req, res) => res.json('Success!')
);

router.get('/', isAuthenticated, getAllUser, (req, res) =>
  res.json(req.queriedUsers)
);

export default router;
