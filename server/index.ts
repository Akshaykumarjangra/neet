import express from "express";
const app = express();
const port = process.env.PORT || 5001;
app.get("/api/health", (req, res) => {
  console.log("Health check hit");
  res.json({ status: "ok", time: new Date().toISOString() });
});
app.get("*", (req, res) => {
  res.send("Minimal Debug Server is Running");
});
app.listen(port, "0.0.0.0", () => {
  console.log(`Minimal server listening on port ${port}`);
});
