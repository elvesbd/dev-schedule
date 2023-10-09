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
        id: company.id.getValue,
        name: company.getName,
        tradeName: company.getTradeName,
        email: company.getEmail,
        cnpj: company.getCnpj,
        contactPerson: company.getContactPerson,
        contactNumbers: {
          whatsAppNumber: company.getContactNumbers.whatsAppNumber,
          mobileNumber: company.getContactNumbers.mobileNumber,
          landlinePhone: company.getContactNumbers.landlinePhone,
        },
        address: {
          street: company.getAddress.street,
          number: company.getAddress.number,
          city: company.getAddress.city,
          state: company.getAddress.state,
          postalCode: company.getAddress.postalCode,
          country: company.getAddress.country,
          coordinates: {
            lng: Number(company.getAddress.coordinates.lng),
            lat: Number(company.getAddress.coordinates.lat),
          },
        },
        profilePhotoPath: company.getProfilePhotoPath,
      })),
      total: companies.total,
      totalPages: companies.totalPages,
      currentPage: companies.currentPage,
      hasNextPage: companies.hasNextPage,
    };
  }
}
