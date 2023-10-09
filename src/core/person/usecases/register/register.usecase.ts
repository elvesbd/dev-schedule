import { Injectable } from '@nestjs/common';
import { PERSON_FOLDER } from '../constants';
import { Person } from '@core/person/model';
import { FileInput } from '@core/shared/types';
import { MapsService } from '@core/shared/ports/maps';
import { PersonRepository } from '@core/person/ports/repository';
import { RegisterPerson } from '@core/person/usecases/register/types';
import { PersonAlreadyRegisterException } from '@core/person/exceptions';
import { ProfilePhotoService } from '@core/services';

@Injectable()
export class RegisterPersonUseCase {
  constructor(
    private readonly mapService: MapsService,
    private readonly personRepository: PersonRepository,
    private readonly profilePhotoService: ProfilePhotoService,
  ) {}

  async handle(input: RegisterPerson, fileInput: FileInput): Promise<any> {
    const foundPerson = await this.personRepository.searchByEmail(input.email);
    if (foundPerson) throw new PersonAlreadyRegisterException(input.email);

    const profilePhotoPath = await this.profilePhotoService.getUrl(
      fileInput,
      PERSON_FOLDER,
    );

    const coordinates = await this.mapService.getCoordinates(input.address);
    const addressWithCoordinates = {
      ...input.address,
      coordinates,
    };

    const person = Person.create({
      profilePhotoPath,
      ...input,
      address: addressWithCoordinates,
    });
    await this.personRepository.register(person);
    return person;
  }
}
