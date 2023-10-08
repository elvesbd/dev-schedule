import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExternalModule } from '@external/external.module';
import { AdaptersModule } from '@adapters/adapters.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ExternalModule,
    AdaptersModule,
  ],
})
export class AppModule {}
