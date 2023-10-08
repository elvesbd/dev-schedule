import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument, customOptions } from '@extensions/docs/swagger';

export const configureDocs = (app: INestApplication): void => {
  SwaggerModule.setup('api/v1', app, createDocument(app), customOptions);
};
