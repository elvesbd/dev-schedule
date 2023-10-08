import { Injectable } from '@nestjs/common';
import { FileStorageService } from '@core/shared/ports/storage';
import { PersonRepository } from '@core/person/ports/repository';
import { PersonNotFoundException } from '@core/person/exceptions';

@Injectable()
export class DeletePersonUseCase {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly fileStorageService: FileStorageService,
  ) {}

  async handle(id: string): Promise<void> {
    const person = await this.personRepository.searchById(id);
    if (!person) throw new PersonNotFoundException(id);

    await this.fileStorageService.remove(person.profilePhotoPath.value);
    await this.personRepository.delete(id);
  }
}
