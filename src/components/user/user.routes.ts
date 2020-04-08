import { Router } from "express";

import { getUser, isAuthenticated } from "./user.service";

const router = Router();

router.get("/:id", isAuthenticated, getUser, (req, res) =>
  res.json(req.queriedUser)
);

export default router;
