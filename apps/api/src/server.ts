import app from './app.js'
import { env } from "./config/env.js";
import {logger} from './config/logger.js'
import { connectRedis } from './infrastructure/redis/client.js';


async function startServer() {
  await connectRedis();

  app.listen(env.PORT, () => {
    logger.info({ port: env.PORT }, "API server started");
  });
}

startServer()
