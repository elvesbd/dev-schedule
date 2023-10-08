import { Injectable } from '@nestjs/common';
import { COMPANY_FOLDER } from '../constants';
import { Company } from '@core/company/model';
import { FileInput } from '@core/shared/types';
import { MapsService } from '@core/shared/ports/maps';
import { FileStorageService } from '@core/shared/ports/storage';
import { CompanyRepository } from '@core/company/ports/repository';
import { RegisterCompany } from '@core/company/usecases/register/types';
import { CompanyAlreadyRegisterException } from '@core/company/exceptions';

@Injectable()
export class RegisterCompanyUseCase {
  constructor(
    private readonly mapService: MapsService,
    private readonly companyRepository: CompanyRepository,
    private readonly fileStorageService: FileStorageService,
  ) {}

  async handle(input: RegisterCompany, fileInput: FileInput): Promise<Company> {
    const foundCompany = await this.companyRepository.searchByCnpj(input.cnpj);
    if (foundCompany) throw new CompanyAlreadyRegisterException(input.cnpj);

    const path = await this.fileStorageService.upload(
      fileInput,
      COMPANY_FOLDER,
    );
    const profilePhotoPath = await this.fileStorageService.getUrl(path);

    const coordinates = await this.mapService.getCoordinates(input.address);
    const addressWithCoordinates = {
      ...input.address,
      coordinates,
    };

    const company = Company.create({
      profilePhotoPath,
      ...input,
      address: addressWithCoordinates,
    });
    await this.companyRepository.register(company);
    return company;
  }
}
