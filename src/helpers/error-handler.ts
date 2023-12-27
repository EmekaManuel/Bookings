import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import Respond from "./respond";

const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;
  const genericMessage =
    "Something went wrong, The team has been notified and are working on fixing it.";
  const errorMessage =
    req.app.get("env") === "development"
      ? err.message || genericMessage
      : genericMessage;
  return Respond.error(res, errorMessage, statusCode);
};

export default errorHandler;
