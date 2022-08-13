import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ValidationException } from "./validation.exception";
import { Response } from "express";

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): Response {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    return response.status(statusCode).json({
      statusCode,
      createdBy: "ValidationFilter",
      validationErrors: exception.validationErrors
    });
  }
}