import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as jwt from "jsonwebtoken";
import * as password from "password-hash-and-salt";
import { JWT_SECRET } from "../../assets/constants";

@ApiTags("Auth")
@Controller("login")
export class AuthController {
  constructor(@InjectModel("User") private userModel: Model<any>) {
  }

  @Post()
  async login(@Body("email") email: string, @Body("password") plainTextPassword: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      console.log("UserType does not exist on the database.");
      throw new UnauthorizedException();
    }
    return new Promise((resolve, reject) => {
      password(plainTextPassword).verifyAgainst(
        user.passwordHash,
        (err: any, verified: any) => {
          if (!verified) {
            reject(new UnauthorizedException());
          }
          const authJwtToken = jwt.sign({ email, roles: user.roles }, JWT_SECRET);
          resolve({ authJwtToken });
        }
      );
    });
  }

}


