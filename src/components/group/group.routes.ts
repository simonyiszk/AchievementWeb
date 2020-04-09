import { Router } from "express";

import { getAllGroup, getGroup, updateGroup } from "./group.service";
import {
  isAuthenticated,
  isAdmin,
  isAdminOrGroupLead,
} from "../../util/authentication";

const router = Router();

router.get("/:id", isAuthenticated, isAdminOrGroupLead, getGroup, (req, res) =>
  res.json(req.queriedGroup)
);

router.get("/", isAuthenticated, getAllGroup, (req, res) =>
  res.json(req.queriedGroups)
);

router.put("/:id", isAuthenticated, isAdmin, updateGroup, (req, res) => {
  res.json("Success");
});

export default router;
