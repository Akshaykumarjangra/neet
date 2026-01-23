import { Router } from "express";
import { requireOwner } from "./auth";
import { listJobs, queueJob, resetJobForRetry, markJobCancelled, processJob, getJobById, JobType } from "./job-service";

const router = Router();

router.get("/", requireOwner, async (_req, res) => {
  const jobs = await listJobs();
  res.json({ jobs });
});

router.post("/", requireOwner, async (req, res) => {
  const { jobType } = req.body as { jobType?: JobType };
  if (!jobType) {
    return res.status(400).json({ error: "jobType is required" });
  }
  if (!["question_generation", "auto_submit_mock_attempts", "purge_mock_exam_attempts"].includes(jobType)) {
    return res.status(400).json({ error: "Invalid jobType" });
  }
  const job = await queueJob(jobType, { name: jobType.replace(/_/g, " ") });
  res.status(201).json({ job });
});

router.post("/:id/retry", requireOwner, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Invalid job id" });
  }
  const job = await resetJobForRetry(id);
  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }
  res.json({ job });
});

router.post("/:id/cancel", requireOwner, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Invalid job id" });
  }
  const job = await markJobCancelled(id);
  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }
  res.json({ job });
});

router.post("/:id/restart", requireOwner, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Invalid job id" });
  }
  const job = await processJob(id);
  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }
  res.json({ job });
});

export default router;
