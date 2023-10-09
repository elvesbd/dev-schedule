import { Injectable } from '@nestjs/common';
import { COMPANY_FOLDER } from '../constants';
import { FileInput } from '@core/shared/types';
import { ProfilePhotoService } from '@core/services';
import { FileStorageService } from '@core/shared/ports/storage';
import { CompanyRepository } from '@core/company/ports/repository';
import { CompanyNotFoundException } from '@core/company/exceptions';

@Injectable()
export class EditLogoPhotoUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly fileStorageService: FileStorageService,
    private readonly profilePhotoService: ProfilePhotoService,
  ) {}

  async handle(id: string, input: FileInput): Promise<void> {
    const company = await this.companyRepository.searchById(id);
    if (!company) throw new CompanyNotFoundException(id);

    await this.fileStorageService.remove(company.getProfilePhotoPath);
    const profilePhotoPath = await this.profilePhotoService.getUrl(
      input,
      COMPANY_FOLDER,
    );

    company.updateProfilePhotoPath(profilePhotoPath);
    await this.companyRepository.update(company);
  }
}
