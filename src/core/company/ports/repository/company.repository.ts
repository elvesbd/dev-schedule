import { Company } from '@core/company/model';
import { FiltersInput, PaginationResult } from '@core/shared/types';

export abstract class CompanyRepository {
  abstract searchById(id: string): Promise<Company | null>;
  abstract searchByCnpj(cnpj: string): Promise<Company | null>;
  abstract searchAdvanced(
    input: FiltersInput,
  ): Promise<PaginationResult<Company>>;
  abstract register(company: Company): Promise<void>;
  abstract update(company: Company): Promise<void>;
  abstract updatePhotoProfile(
    id: string,
    profilePhotoPath: string,
  ): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
