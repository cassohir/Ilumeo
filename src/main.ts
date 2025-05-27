import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { VersioningType } from '@nestjs/common';
import {
  DOCUMENT_DESCRIPTION,
  DOCUMENT_TITLE,
  PATH,
  VERSION,
} from './infrastructure/config/environment/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle(DOCUMENT_TITLE)
    .setDescription(DOCUMENT_DESCRIPTION)
    .setVersion(VERSION)
    .addBearerAuth()
    .build();

  app.useGlobalFilters();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(PATH, app, document);

  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
