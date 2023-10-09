import { ApiProperty } from '@nestjs/swagger';
import { Company } from '@core/company/model';
import {
  AddressVMResponse,
  ContactNumbersCompanyVMResponse,
} from '@adapters/controllers/shared/view-model';

export class CompanyVMResponse {
  @ApiProperty({ type: String, description: 'Id da empresa' })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Razão social da empresa',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Nome fantasia da empresa',
  })
  tradeName: string;

  @ApiProperty({ type: String, description: 'Email da empresa' })
  email: string;

  @ApiProperty({ type: String, description: 'Número do CNPJ da empresa' })
  cnpj: string;

  @ApiProperty({
    type: String,
    description: 'Nome da pessoa de contato na empresa',
  })
  contactPerson: string;

  @ApiProperty({
    type: ContactNumbersCompanyVMResponse,
    description: 'Números de contato da empresa',
  })
  contactNumbers: ContactNumbersCompanyVMResponse;

  @ApiProperty({ type: AddressVMResponse, description: 'Endereço da pessoa' })
  address: AddressVMResponse;

  @ApiProperty({
    type: String,
    description: 'URL da foto do perfil da empresa',
  })
  profilePhotoPath: string;
}

export class CompanyViewModel {
  public static toHTTP(company: Company): CompanyVMResponse {
    return {
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
          lng: company.getAddress.coordinates.lng,
          lat: company.getAddress.coordinates.lat,
        },
      },
      profilePhotoPath: company.getProfilePhotoPath,
    };
  }
}
