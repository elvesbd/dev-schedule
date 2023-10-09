import { ApiProperty } from '@nestjs/swagger';
import { Person } from '@core/person/model';
import { PaginationResult } from '@core/shared/types';
import { PersonVMResponse } from '@adapters/controllers/person/view-model';

export class PersonPaginationVMResponse {
  @ApiProperty({ type: [PersonVMResponse], description: 'Dados das pessoas' })
  data: PersonVMResponse[];

  @ApiProperty({ type: Number, description: 'Total de registros' })
  total: number;

  @ApiProperty({ type: Number, description: 'Total de páginas' })
  totalPages: number;

  @ApiProperty({ type: Number, description: 'Página atual' })
  currentPage: number;

  @ApiProperty({ type: Number, description: 'Próxima página' })
  hasNextPage: boolean;
}

export class PersonPaginationViewModel {
  public static toHTTP(
    persons: PaginationResult<Person>,
  ): PersonPaginationVMResponse {
    return {
      data: persons.data.map((person) => ({
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
            lng: Number(person.getAddress.coordinates.lng),
            lat: Number(person.getAddress.coordinates.lat),
          },
        },
        employer: person.getEmployer,
        profilePhotoPath: person.getProfilePhotoPath,
      })),
      total: persons.total,
      totalPages: persons.totalPages,
      currentPage: persons.currentPage,
      hasNextPage: persons.hasNextPage,
    };
  }
}
