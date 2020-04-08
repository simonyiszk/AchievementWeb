import { Router } from "express";

import { getAllUser, getUser } from "./user.service";
import { isAuthenticated } from "../../util/authentication";

const router = Router();

router.get("/:id", isAuthenticated, getUser, (req, res) =>
  res.json(req.queriedUser)
);

router.get("/", isAuthenticated, getAllUser, (req, res) =>
  res.json(req.queriedUsers)
);

export default router;
