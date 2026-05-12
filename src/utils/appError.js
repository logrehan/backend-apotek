export class AppError extends Error {
  constructor(message, statusCode = 500, code = "SERVER_ERROR") {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.status =
      statusCode >= 400 && statusCode < 500 ? "fail" : "error";

    Error.captureStackTrace(this, this.constructor);
  }
}