import { Injectable } from '@nestjs/common';
import { Person } from '@core/person/model';
import { PersonRepository } from '@core/person/ports/repository';
import { FiltersInput, PaginationResult } from '@core/shared/types';

@Injectable()
export class SearchAdvancedPersonUseCase {
  constructor(private readonly personRepository: PersonRepository) {}

  async handle(input: FiltersInput): Promise<PaginationResult<Person>> {
    return await this.personRepository.searchAdvanced(input);
  }
}
