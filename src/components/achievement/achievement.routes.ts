import { Router } from "express";

import {
  getAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  requestUpgrade,
} from "./achievement.service";
import { isAuthenticated, isAdmin } from "../../util/authentication";

const router = Router();

// Request upgrade id=AchievementID
router.post("/:id/request", requestUpgrade, (req, res) => res.json("Success"));

// View details of an achievement id=AchievementID
router.get("/:id", getAchievement, (req, res) =>
  res.json(req.queriedAchievement)
);

// Create new achievement id=GroupID
router.post("/:id", createAchievement, (req, res) => {
  res.json(req.queriedAchievement);
});

// Update achievement id=AchievementID
router.put("/:id", updateAchievement, (req, res) => {
  res.json(req.queriedAchievement);
});

// Delete achievement id=AchievementID
router.delete("/:id", deleteAchievement, (req, res) => {
  res.json("Success");
});

export default router;
