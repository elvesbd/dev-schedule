import { Injectable } from '@nestjs/common';
import { Person } from '@core/person/model';
import { PersonRepository } from '@core/person/ports/repository';
import { PersonNotFoundException } from '@core/person/exceptions';
import { EditPersonInput } from '@core/person/usecases/edit/types';
import { AddressService } from '@core/services/address.service';

@Injectable()
export class EditPersonUseCase {
  constructor(
    private readonly addressService: AddressService,
    private readonly personRepository: PersonRepository,
  ) {}

  async handle(id: string, input: EditPersonInput): Promise<Person> {
    const person = await this.personRepository.searchById(id);
    if (!person) throw new PersonNotFoundException(id);

    const { address } = input;
    const updatedAddress = await this.addressService.updateCoordinatesIfChanged(
      person,
      address,
      (entity: Person) => entity.getAddress,
    );
    if (updatedAddress) {
      input.address = updatedAddress;
    }

    person.update(input);
    await this.personRepository.update(person);
    return person;
  }
}
