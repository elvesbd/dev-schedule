import { ApiProperty } from '@nestjs/swagger';
import { Person } from '@core/person/model';
import {
  AddressVMResponse,
  ContactNumbersPersonVMResponse,
} from '@adapters/controllers/shared/view-model';

export class PersonVMResponse {
  @ApiProperty({ type: Number, description: 'Identificador único' })
  id: string;

  @ApiProperty({ type: String, description: 'Nome completo' })
  name: string;

  @ApiProperty({ type: String, description: 'Email' })
  email: string;

  @ApiProperty({ type: Date, description: 'Data de nascimento' })
  dateOfBirth: Date;

  @ApiProperty({ type: String, description: 'Gênero' })
  gender: string;

  @ApiProperty({ type: String, description: 'Profissão' })
  profession: string;

  @ApiProperty({
    type: ContactNumbersPersonVMResponse,
    description: 'Números de contato',
  })
  contactNumbers: ContactNumbersPersonVMResponse;

  @ApiProperty({ type: AddressVMResponse, description: 'Endereço' })
  address: AddressVMResponse;

  @ApiProperty({ type: String, description: 'URL da foto do perfil' })
  profilePhotoPath: string;

  @ApiProperty({
    type: String,
    description: 'Empresa em que a pessoa trabalha',
  })
  employer?: string;
}

export class PersonViewModel {
  public static toHTTP(person: Person): PersonVMResponse {
    return {
      id: person.id.value,
      name: person.name.value,
      email: person.email.value,
      dateOfBirth: person.dateOfBirth,
      gender: person.gender,
      profession: person.profession,
      contactNumbers: {
        whatsAppNumber: person.contactNumbers.whatsAppNumber,
        mobileNumber: person.contactNumbers.mobileNumber,
      },
      address: {
        street: person.address.street,
        number: person.address.number,
        city: person.address.city,
        state: person.address.state,
        postalCode: person.address.postalCode,
        country: person.address.country,
        coordinates: {
          lng: person.address.coordinates.lng,
          lat: person.address.coordinates.lat,
        },
      },
      employer: person.employer,
      profilePhotoPath: person.profilePhotoPath.value,
    };
  }
}
