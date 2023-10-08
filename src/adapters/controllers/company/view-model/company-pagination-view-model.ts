import { ApiProperty } from '@nestjs/swagger';
import { Company } from '@core/company/model';
import { PaginationResult } from '@core/shared/types';
import { CompanyVMResponse } from '@adapters/controllers/company/view-model';

export class CompanyPaginationVMResponse {
  @ApiProperty({ type: [CompanyVMResponse], description: 'Dados das empresas' })
  data: CompanyVMResponse[];

  @ApiProperty({ type: Number, description: 'Total de registros' })
  total: number;

  @ApiProperty({ type: Number, description: 'Total de páginas' })
  totalPages: number;

  @ApiProperty({ type: Number, description: 'Página atual' })
  currentPage: number;

  @ApiProperty({ type: Number, description: 'Próxima página' })
  hasNextPage: boolean;
}

export class CompanyPaginationViewModel {
  public static toHTTP(
    companies: PaginationResult<Company>,
  ): CompanyPaginationVMResponse {
    return {
      data: companies.data.map((company) => ({
        id: company.id.value,
        name: company.name.value,
        tradeName: company.tradeName,
        email: company.email.value,
        cnpj: company.cnpj.value,
        contactPerson: company.contactPerson,
        contactNumbers: {
          whatsAppNumber: company.contactNumbers.whatsAppNumber,
          mobileNumber: company.contactNumbers.mobileNumber,
          landlinePhone: company.contactNumbers.landlinePhone,
        },
        address: {
          street: company.address.street,
          number: company.address.number,
          city: company.address.city,
          state: company.address.state,
          postalCode: company.address.postalCode,
          country: company.address.country,
          coordinates: {
            lng: Number(company.address.coordinates.lng),
            lat: Number(company.address.coordinates.lat),
          },
        },
        profilePhotoPath: company.profilePhotoPath.value,
      })),
      total: companies.total,
      totalPages: companies.totalPages,
      currentPage: companies.currentPage,
      hasNextPage: companies.hasNextPage,
    };
  }
}
