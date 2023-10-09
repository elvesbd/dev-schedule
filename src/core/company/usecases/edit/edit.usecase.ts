import { Injectable } from '@nestjs/common';
import { Company } from '@core/company/model';
import { EditCompany } from '@core/company/usecases/edit/types';
import { CompanyRepository } from '@core/company/ports/repository';
import { CompanyNotFoundException } from '@core/company/exceptions';
import { AddressService } from '@core/services/address.service';

@Injectable()
export class EditCompanyUseCase {
  constructor(
    private readonly addressService: AddressService,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async handle(id: string, input: EditCompany): Promise<Company> {
    const company = await this.companyRepository.searchById(id);
    if (!company) throw new CompanyNotFoundException(id);

    const { address } = input;
    const updatedAddress = await this.addressService.updateCoordinatesIfChanged(
      company,
      address,
      (entity: Company) => entity.getAddress,
    );
    if (updatedAddress) {
      input.address = updatedAddress;
    }

    company.update(input);
    await this.companyRepository.update(company);
    return company;
  }
}
