import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { FallbackExceptionFilter } from "./filters/fallback-exception.filter";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { ValidationFilter } from "./filters/validation.filter";
import { ValidationException } from "./filters/validation.exception";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix("api");
  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter());
  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: true,
    exceptionFactory: (errors: Array<ValidationError>) => {
      const messages = errors.map(error => ({ [error.property]: Object.values(error.constraints as {}).join(", ") }));
      return new ValidationException(messages);
    }
  }));

  //Swagger
  const config = new DocumentBuilder()
    .setTitle("E-Learning API")
    .setDescription("E-Learning API documentation")
    .setVersion("1.0")
    .setContact(
      "Md. Juyel Rana",
      "https://mjuyelrana.com/",
      "mjuyelrana@gmail.com"
    )
    .addTag("Home")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("documentation", app, document);
  //Swagger
  await app.listen(3009);
}

bootstrap();
