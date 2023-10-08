import { INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from '@extensions/filters';

export const configureApp = (app: INestApplication): INestApplication => {
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: '*',
  });

  return app;
};
