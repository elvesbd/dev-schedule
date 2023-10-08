import { Person } from '@core/person/model';
import { FiltersInput, PaginationResult } from '@core/shared/types';

export abstract class PersonRepository {
  abstract searchById(id: string): Promise<Person | null>;
  abstract searchByEmail(email: string): Promise<Person | null>;
  abstract searchAdvanced(
    input: FiltersInput,
  ): Promise<PaginationResult<Person>>;
  abstract register(person: Person): Promise<void>;
  abstract update(person: Person): Promise<void>;
  abstract updatePhotoProfile(
    id: string,
    profilePhotoPath: string,
  ): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
