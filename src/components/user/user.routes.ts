import { Router } from "express";

import { getAllUser, getUser, toggleAdmin } from "./user.service";
import { isAuthenticated, isAdmin } from "../../util/authentication";

const router = Router();

router.get("/:id", isAuthenticated, getUser, (req, res) =>
  res.json(req.queriedUser)
);

router.post("/:id/admin", isAdmin, toggleAdmin, (req, res) =>
  res.json("Success!")
);

router.get("/", isAuthenticated, getAllUser, (req, res) =>
  res.json(req.queriedUsers)
);

export default router;
