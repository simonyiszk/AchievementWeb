import { Router } from "express";

import { getAllGroup, getGroup, updateGroup } from "./group.service";
import {
  isAuthenticated,
  isAdmin,
  isAdminOrGroupLead,
} from "../../util/authentication";

const router = Router();

// Get a group with achievements id="GroupID"
router.get("/:id", getGroup, (req, res) =>
  res.json({
    allAchievements: req.queriedAchievements,
    userAchievements: req.queriedUserAchievements,
  })
);

// List all groups
router.get("/", getAllGroup, (req, res) => res.json(req.queriedGroups));

// Update group id=GroupID
router.put("/:id", updateGroup, (req, res) => {
  res.json(req.queriedGroup);
});

export default router;
