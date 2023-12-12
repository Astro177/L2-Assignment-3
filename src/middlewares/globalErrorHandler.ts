import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = error?.message || "Something went wrong";
  return res.status(statusCode).json({
    success: false,
    message,
    error: error,
  });
};
