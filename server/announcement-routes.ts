// @ts-nocheck
import { Router } from "express";
import { requireOwner } from "./auth";

const router = Router();

router.get("/", async (req, res) => {
  res.json({ announcements: [], isPremium: false, disabled: true });
});

router.get("/admin", requireOwner, async (_req, res) => {
  res.status(503).json({ error: "Announcements are disabled on this environment." });
});

router.post("/", requireOwner, async (req, res) => {
  res.status(503).json({ error: "Announcements are disabled on this environment." });
});

router.put("/:id", requireOwner, async (req, res) => {
  res.status(503).json({ error: "Announcements are disabled on this environment." });
});

router.delete("/:id", requireOwner, async (req, res) => {
  res.status(503).json({ error: "Announcements are disabled on this environment." });
});

export default router;
