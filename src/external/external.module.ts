import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { MapsService } from '@core/shared/ports/maps';
import { DatabaseService } from '@external/database/services';
import { dataSource } from '@external/database/typeorm/config';
import { FileStorageService } from '@core/shared/ports/storage';
import { PersonRepository } from '@core/person/ports/repository';
import { GoogleMapsService } from '@external/maps/google/services';
import { CompanyRepository } from '@core/company/ports/repository';

import {
  SupaBaseClientService,
  SupaBaseFileStorageService,
} from '@external/storage/supabase';
import {
  TypeORMPersonRepository,
  TypeORMCompanyRepository,
} from '@external/database/typeorm/repositories';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
      dataSourceFactory: async (
        options?: DataSourceOptions,
      ): Promise<DataSource> => {
        if (!options) {
          throw new Error('No DataSource options were provided!');
        }
        return dataSource.initialize();
      },
    }),
  ],
  providers: [
    SupaBaseClientService,
    SupaBaseFileStorageService,
    {
      provide: MapsService,
      useClass: GoogleMapsService,
    },
    {
      provide: PersonRepository,
      useClass: TypeORMPersonRepository,
    },
    {
      provide: CompanyRepository,
      useClass: TypeORMCompanyRepository,
    },
    {
      provide: FileStorageService,
      useClass: SupaBaseFileStorageService,
    },
  ],
  exports: [
    MapsService,
    PersonRepository,
    CompanyRepository,
    FileStorageService,
    SupaBaseClientService,
    SupaBaseFileStorageService,
  ],
})
export class ExternalModule {}
