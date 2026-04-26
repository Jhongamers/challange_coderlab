import "dotenv/config";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { NotFoundErrorFilter } from "./common/filters/not-found.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    'origin': 'http://127.0.0.1:5173'
  });
  app.useGlobalFilters(new NotFoundErrorFilter);
  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: 422,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }),
);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
