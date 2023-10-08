/* // adapters.module/adapters.swagger.ts

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIG } from './swagger.config';

export function createAdaptersDocument(app: INestApplication): OpenAPIObject {
  const builder = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.title)
    .setDescription(SWAGGER_CONFIG.description)
    .setVersion(SWAGGER_CONFIG.version);

  const options = builder.build();
  return SwaggerModule.createDocument(app, options);
}

export const ADAPTERS_CUSTOM_OPTIONS = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customSiteTitle: SWAGGER_CONFIG.title,
  customfavIcon: SWAGGER_CONFIG.favIcon,
  customCss: SWAGGER_CONFIG.customCss,
};
 */
