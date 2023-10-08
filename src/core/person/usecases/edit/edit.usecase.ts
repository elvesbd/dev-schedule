import { Injectable } from '@nestjs/common';
import { Person } from '@core/person/model';
import { MapsService } from '@core/shared/ports/maps';
import { PersonRepository } from '@core/person/ports/repository';
import { PersonNotFoundException } from '@core/person/exceptions';
import { EditPersonInput } from '@core/person/usecases/edit/types';

@Injectable()
export class EditPersonUseCase {
  constructor(
    private readonly mapsService: MapsService,
    private readonly personRepository: PersonRepository,
  ) {}

  async handle(id: string, input: EditPersonInput): Promise<Person> {
    const person = await this.personRepository.searchById(id);
    if (!person) throw new PersonNotFoundException(id);

    let coordinates: { lng: number; lat: number };
    const { address } = input;
    if (person.address.addressChanged(address)) {
      coordinates = await this.mapsService.getCoordinates(address);
    }
    address.coordinates = coordinates ?? address.coordinates;

    const updatedPerson = person.update({
      id,
      ...input,
      createdAt: person.createdAt,
    });
    await this.personRepository.update(updatedPerson);
    return updatedPerson;
  }
}
