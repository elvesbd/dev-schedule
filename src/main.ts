import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureApp, configureDocs } from './extensions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureApp(app);
  configureDocs(app);

  await app.listen(3000);
}
bootstrap();
