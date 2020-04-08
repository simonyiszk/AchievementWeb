import { Router } from "express";

import { getAllGroup, getGroup, updateGroup } from "./group.service";
import { isAuthenticated, isAdmin } from "../../util/authentication";

const router = Router();

router.get("/:id", isAuthenticated, getGroup, (req, res) =>
  res.json(req.queriedUser)
);

router.get("/", isAuthenticated, getAllGroup, (req, res) =>
  res.json(req.queriedUsers)
);

router.put("/:id", isAdmin, updateGroup, (req, res) => {
    res.json("Success");
});

export default router;
