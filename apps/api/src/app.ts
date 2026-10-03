import express from "express";
import {pinoHttp} from "pino-http";

import { checkDatabaseConnection } from "./infrastructure/db/health.js";
import { checkRedisConnection } from "./infrastructure/redis/health.js";
import { errroHandler } from "./middleware/error-handler.js";
import { logger } from "./config/logger.js";

const app = express();

app.use(pinoHttp({ logger }));

app.use(express.json());


app.get("/health", async (_req, res) => {
  try {
    await checkDatabaseConnection();

    await checkRedisConnection()

    res.json({
      status: "OK",
      dependencies: {
        database: "up",
        redis: "up"
      },
    });
  } catch (error) {
    res.status(503).json({
      status: "degraded",
      dependencies: {
        database: "unknown",
        redis: "unknown"
      },
    });
  }
});

app.get("/test-error", (_req, _res) => {
  throw new Error("This is a test error");
});

// Global error handler — must be after routes
app.use(errroHandler);

export default app;
