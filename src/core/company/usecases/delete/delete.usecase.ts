import { Injectable } from '@nestjs/common';
import { FileStorageService } from '@core/shared/ports/storage';
import { CompanyRepository } from '@core/company/ports/repository';
import { CompanyNotFoundException } from '@core/company/exceptions';

@Injectable()
export class DeleteCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly fileStorageService: FileStorageService,
  ) {}

  async handle(id: string): Promise<void> {
    const company = await this.companyRepository.searchById(id);
    if (!company) throw new CompanyNotFoundException(id);

    await this.fileStorageService.remove(company.getProfilePhotoPath);
    await this.companyRepository.delete(id);
  }
}
