import { Module } from '@nestjs/common';
import { ExternalModule } from '@external/external.module';
import { PersonController } from '@adapters/controllers/person';
import { CompanyController } from '@adapters/controllers/company';
import {
  DeleteCompanyUseCase,
  EditCompanyUseCase,
  EditLogoPhotoUseCase,
  RegisterCompanyUseCase,
  SearchAdvancedCompanyUseCase,
} from '@core/company/usecases';
import {
  DeletePersonUseCase,
  EditProfilePhotoUseCase,
  EditPersonUseCase,
  RegisterPersonUseCase,
  SearchAdvancedPersonUseCase,
} from '@core/person/usecases';
import { PersonRepository } from '@core/person/ports/repository';
import { FileStorageService } from '@core/shared/ports/storage';
import { MapsService } from '@core/shared/ports/maps';
import { CompanyRepository } from '@core/company/ports/repository';

@Module({
  imports: [ExternalModule],
  controllers: [PersonController, CompanyController],
  providers: [
    // person
    {
      provide: DeletePersonUseCase,
      useFactory: (
        personRepository: PersonRepository,
        fileStorageService: FileStorageService,
      ): DeletePersonUseCase =>
        new DeletePersonUseCase(personRepository, fileStorageService),
      inject: [PersonRepository, FileStorageService],
    },
    {
      provide: EditPersonUseCase,
      useFactory: (
        mapsService: MapsService,
        personRepository: PersonRepository,
      ): EditPersonUseCase =>
        new EditPersonUseCase(mapsService, personRepository),
      inject: [PersonRepository, MapsService],
    },
    {
      provide: EditProfilePhotoUseCase,
      useFactory: (
        personRepository: PersonRepository,
        fileStorageService: FileStorageService,
      ): EditProfilePhotoUseCase =>
        new EditProfilePhotoUseCase(personRepository, fileStorageService),
      inject: [PersonRepository, FileStorageService],
    },
    {
      provide: RegisterPersonUseCase,
      useFactory: (
        personRepository: PersonRepository,
        mapsService: MapsService,
        fileStorageService: FileStorageService,
      ): RegisterPersonUseCase =>
        new RegisterPersonUseCase(
          mapsService,
          personRepository,
          fileStorageService,
        ),
      inject: [PersonRepository, MapsService, FileStorageService],
    },
    {
      provide: SearchAdvancedPersonUseCase,
      useFactory: (
        personRepository: PersonRepository,
      ): SearchAdvancedPersonUseCase =>
        new SearchAdvancedPersonUseCase(personRepository),
      inject: [PersonRepository],
    },
    // company
    {
      provide: DeleteCompanyUseCase,
      useFactory: (
        companyRepository: CompanyRepository,
        fileStorageService: FileStorageService,
      ): DeleteCompanyUseCase =>
        new DeleteCompanyUseCase(companyRepository, fileStorageService),
      inject: [CompanyRepository, FileStorageService],
    },
    {
      provide: EditCompanyUseCase,
      useFactory: (
        mapsService: MapsService,
        companyRepository: CompanyRepository,
      ): EditCompanyUseCase =>
        new EditCompanyUseCase(mapsService, companyRepository),
      inject: [CompanyRepository, MapsService],
    },
    {
      provide: EditLogoPhotoUseCase,
      useFactory: (
        companyRepository: CompanyRepository,
        fileStorageService: FileStorageService,
      ): EditLogoPhotoUseCase =>
        new EditLogoPhotoUseCase(companyRepository, fileStorageService),
      inject: [CompanyRepository, FileStorageService],
    },
    {
      provide: RegisterCompanyUseCase,
      useFactory: (
        mapService: MapsService,
        companyRepository: CompanyRepository,
        fileStorageService: FileStorageService,
      ): RegisterCompanyUseCase =>
        new RegisterCompanyUseCase(
          mapService,
          companyRepository,
          fileStorageService,
        ),
      inject: [CompanyRepository, MapsService, FileStorageService],
    },
    {
      provide: SearchAdvancedCompanyUseCase,
      useFactory: (
        companyRepository: CompanyRepository,
      ): SearchAdvancedCompanyUseCase =>
        new SearchAdvancedCompanyUseCase(companyRepository),
      inject: [CompanyRepository],
    },
  ],
})
export class AdaptersModule {}
