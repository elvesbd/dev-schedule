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
            lng: Number(person.address.coordinates.lng),
            lat: Number(person.address.coordinates.lat),
          },
        },
        employer: person.employer,
        profilePhotoPath: person.profilePhotoPath.value,
      })),
      total: persons.total,
      totalPages: persons.totalPages,
      currentPage: persons.currentPage,
      hasNextPage: persons.hasNextPage,
    };
  }
}
