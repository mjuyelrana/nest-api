import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const host = context.switchToHttp();
    const request = host.getRequest<Request>();
    const user = request.body.user;
    if (!user) {
      console.log("User not authenticated, denying access.");
      throw new UnauthorizedException();
    }
    console.log("User is authenticated, allowing access.");
    return true;
  }
}