import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoursesModule } from "./courses/courses.module";
import { MongooseModule } from "@nestjs/mongoose";
import { MONGO_URI } from "../assets/constants";
import { LessonsModule } from "./lessons/lessons.module";
import { AuthModule } from "./auth/auth.module";
import { GetUserMiddleware } from "./middleware/get-user.middleware";
import { CoursesController } from "./courses/courses.controller";
import { LessonsController } from "./lessons/lessons.controller";

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI),
    CoursesModule,
    LessonsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(GetUserMiddleware).forRoutes(
      CoursesController,
      LessonsController
    );
  }
}
