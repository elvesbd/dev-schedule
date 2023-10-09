import { Module } from '@nestjs/common';
import { MapsService } from '@core/shared/ports/maps';
import { ExternalModule } from '@external/external.module';
import { PersonController } from '@adapters/controllers/person';
import { FileStorageService } from '@core/shared/ports/storage';
import { PersonRepository } from '@core/person/ports/repository';
import { CompanyController } from '@adapters/controllers/company';
import { CompanyRepository } from '@core/company/ports/repository';
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
import { ProfilePhotoService } from '@core/services';
import { AddressService } from '@core/services/address.service';

@Module({
  imports: [ExternalModule],
  controllers: [PersonController, CompanyController],
  providers: [
    // person
    {
      provide: AddressService,
      useFactory: (mapsService: MapsService): AddressService =>
        new AddressService(mapsService),
      inject: [MapsService],
    },
    {
      provide: ProfilePhotoService,
      useFactory: (
        fileStorageService: FileStorageService,
      ): ProfilePhotoService => new ProfilePhotoService(fileStorageService),
      inject: [FileStorageService],
    },
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
        addressService: AddressService,
        personRepository: PersonRepository,
      ): EditPersonUseCase =>
        new EditPersonUseCase(addressService, personRepository),
      inject: [AddressService, PersonRepository],
    },
    {
      provide: EditProfilePhotoUseCase,
      useFactory: (
        personRepository: PersonRepository,
        fileStorageService: FileStorageService,
        profilePhotoService: ProfilePhotoService,
      ): EditProfilePhotoUseCase =>
        new EditProfilePhotoUseCase(
          personRepository,
          fileStorageService,
          profilePhotoService,
        ),
      inject: [PersonRepository, FileStorageService, ProfilePhotoService],
    },
    {
      provide: RegisterPersonUseCase,
      useFactory: (
        personRepository: PersonRepository,
        mapsService: MapsService,
        profilePhotoService: ProfilePhotoService,
      ): RegisterPersonUseCase =>
        new RegisterPersonUseCase(
          mapsService,
          personRepository,
          profilePhotoService,
        ),
      inject: [PersonRepository, MapsService, ProfilePhotoService],
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
        addressService: AddressService,
        companyRepository: CompanyRepository,
      ): EditCompanyUseCase =>
        new EditCompanyUseCase(addressService, companyRepository),
      inject: [AddressService, CompanyRepository],
    },
    {
      provide: EditLogoPhotoUseCase,
      useFactory: (
        companyRepository: CompanyRepository,
        fileStorageService: FileStorageService,
        profilePhotoService: ProfilePhotoService,
      ): EditLogoPhotoUseCase =>
        new EditLogoPhotoUseCase(
          companyRepository,
          fileStorageService,
          profilePhotoService,
        ),
      inject: [CompanyRepository, FileStorageService, ProfilePhotoService],
    },
    {
      provide: RegisterCompanyUseCase,
      useFactory: (
        mapService: MapsService,
        companyRepository: CompanyRepository,
        profilePhotoService: ProfilePhotoService,
      ): RegisterCompanyUseCase =>
        new RegisterCompanyUseCase(
          mapService,
          companyRepository,
          profilePhotoService,
        ),
      inject: [MapsService, CompanyRepository, ProfilePhotoService],
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
