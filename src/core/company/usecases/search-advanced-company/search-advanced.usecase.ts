import { Injectable } from '@nestjs/common';
import { Company } from '@core/company/model';
import { CompanyRepository } from '@core/company/ports/repository';
import { FiltersInput, PaginationResult } from '@core/shared/types';

@Injectable()
export class SearchAdvancedCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async handle(filters: FiltersInput): Promise<PaginationResult<Company>> {
    return await this.companyRepository.searchAdvanced(filters);
  }
}
