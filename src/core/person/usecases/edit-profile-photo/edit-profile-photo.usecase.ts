import { Injectable } from '@nestjs/common';
import { PERSON_FOLDER } from '../constants';
import { FileInput } from '@core/shared/types';
import { ProfilePhotoService } from '@core/services';
import { PersonRepository } from '@core/person/ports/repository';
import { PersonNotFoundException } from '@core/person/exceptions';
import { FileStorageService } from '@core/shared/ports/storage';

@Injectable()
export class EditProfilePhotoUseCase {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly fileStorageService: FileStorageService,
    private readonly profilePhotoService: ProfilePhotoService,
  ) {}

  async handle(id: string, input: FileInput): Promise<void> {
    const person = await this.personRepository.searchById(id);
    if (!person) throw new PersonNotFoundException(id);

    await this.fileStorageService.remove(person.getProfilePhotoPath);
    const profilePhotoPath = await this.profilePhotoService.getUrl(
      input,
      PERSON_FOLDER,
    );

    person.updateProfilePhotoPath(profilePhotoPath);
    await this.personRepository.update(person);
  }
}
