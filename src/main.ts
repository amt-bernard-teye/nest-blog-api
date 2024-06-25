import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

  const config = new DocumentBuilder()
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
