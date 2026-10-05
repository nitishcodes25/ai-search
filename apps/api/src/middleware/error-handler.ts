import { NextFunction, Request, Response } from "express";
import{ logger} from '../config/logger.js'
import { ZodError } from "zod";

export function errroHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  logger.error({ error });

  if (error instanceof ZodError) {
    res.status(400).json({
      status: "error",
      message: "Invalid request",
      details: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
    })),

    });

    return;
  }

  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
}
