import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DatabaseService } from '@external/database/services';
import { dataSource } from '@external/database/typeorm/config';
import { GoogleMapsService } from '@external/maps/google/services';
import {
  SupaBaseClientService,
  SupaBaseFileStorageService,
} from '@external/storage/supabase';
import { FileStorageService } from '@core/shared/ports/storage';
import { PersonRepository } from '@core/person/ports/repository';
import { CompanyRepository } from '@core/company/ports/repository';
import {
  TypeORMPersonRepository,
  TypeORMCompanyRepository,
} from '@external/database/typeorm/repositories';
import { MapsService } from '@core/shared/ports/maps';

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
    SupaBaseFileStorageService,
    SupaBaseClientService,
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
    {
      provide: MapsService,
      useClass: GoogleMapsService,
    },
  ],
  exports: [
    PersonRepository,
    CompanyRepository,
    FileStorageService,
    MapsService,
    SupaBaseFileStorageService,
    SupaBaseClientService,
  ],
})
export class ExternalModule {}
