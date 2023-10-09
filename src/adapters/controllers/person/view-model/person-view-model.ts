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
      id: person.id.getValue,
      name: person.getName,
      email: person.getEmail,
      dateOfBirth: person.getDateOfBirth,
      gender: person.getGender,
      profession: person.getProfession,
      contactNumbers: {
        whatsAppNumber: person.getContactNumbers.whatsAppNumber,
        mobileNumber: person.getContactNumbers.mobileNumber,
      },
      address: {
        street: person.getAddress.street,
        number: person.getAddress.number,
        city: person.getAddress.city,
        state: person.getAddress.state,
        postalCode: person.getAddress.postalCode,
        country: person.getAddress.country,
        coordinates: {
          lng: person.getAddress.coordinates.lng,
          lat: person.getAddress.coordinates.lat,
        },
      },
      employer: person.getEmployer,
      profilePhotoPath: person.getProfilePhotoPath,
    };
  }
}
