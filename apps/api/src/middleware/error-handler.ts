import { NextFunction, Request, Response } from "express";
import{ logger} from '../config/logger.js'

export function errroHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  logger.error({ error });

  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
}
