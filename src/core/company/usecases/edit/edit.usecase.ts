import { Injectable } from '@nestjs/common';
import { Company } from '@core/company/model';
import { MapsService } from '@core/shared/ports/maps';
import { EditCompany } from '@core/company/usecases/edit/types';
import { CompanyRepository } from '@core/company/ports/repository';
import { CompanyNotFoundException } from '@core/company/exceptions';

@Injectable()
export class EditCompanyUseCase {
  constructor(
    private readonly mapsService: MapsService,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async handle(id: string, input: EditCompany): Promise<Company> {
    const company = await this.companyRepository.searchById(id);
    if (!company) throw new CompanyNotFoundException(id);

    let coordinates: { lng: number; lat: number };
    const { address } = input;

    if (company.address.addressChanged(address)) {
      coordinates = await this.mapsService.getCoordinates(address);
    }
    address.coordinates = coordinates ?? address.coordinates;

    const updatedCompany = company.update({
      id,
      ...input,
      createdAt: company.createdAt,
    });
    await this.companyRepository.update(updatedCompany);

    return updatedCompany;
  }
}