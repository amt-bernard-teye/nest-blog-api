import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors();
  app.useStaticAssets(join(__dirname, "../", "public"));

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("Blog Api")
    .setVersion("1.0.0")
    .setDescription("A simple blog api to allow users manage list of blog post")
    .addTag("Auth")
    .addTag("Users")
    .addTag("Categories")
    .addTag("Posts")
    .addTag("Comments")
    .build();

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api-docs", app, document);

  await app.listen(3000);
}
bootstrap();
