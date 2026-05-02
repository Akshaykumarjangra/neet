// @ts-nocheck
import { Router } from "express";
import { requireAdmin } from "./auth";

const router = Router();

router.get("/", async (req, res) => {
  res.json({ announcements: [], isPremium: false, disabled: true });
});

router.get("/admin", requireAdmin, async (_req, res) => {
  res.status(503).json({ error: "Announcements are disabled on this environment." });
});

router.post("/", requireAdmin, async (req, res) => {
  res.status(503).json({ error: "Announcements are disabled on this environment." });
});

router.put("/:id", requireAdmin, async (req, res) => {
  res.status(503).json({ error: "Announcements are disabled on this environment." });
});

router.delete("/:id", requireAdmin, async (req, res) => {
  res.status(503).json({ error: "Announcements are disabled on this environment." });
});

export default router;
