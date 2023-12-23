import { ErrorRequestHandler } from "express";
import { TErrorSource } from "../errors/error.interface";

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  let statusCode = 500;
  let message = error?.message || "Something went wrong";

  const errorSource: TErrorSource = [
    { path: "", message: "Something went wrong" },
  ];

  return res.status(statusCode).json({
    success: false,
    message,
    error: error,
  });
};
