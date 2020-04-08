import { Router } from "express";

import { getAllUser, getUser, isAuthenticated } from "./user.service";

const router = Router();

router.get("/:id", isAuthenticated, getUser, (req, res) =>
  res.json(req.queriedUser)
);

router.get("/", isAuthenticated, getAllUser, (req, res) =>
  res.json(req.queriedUsers)
);

export default router;
