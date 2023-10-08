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
          lng: company.address.coordinates.lng,
          lat: company.address.coordinates.lat,
        },
      },
      profilePhotoPath: company.profilePhotoPath.value,
    };
  }
}
