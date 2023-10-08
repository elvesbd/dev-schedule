import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { Person } from '@core/person/model';
import { Paginate } from '@external/utils/pagination.service';
import { dataSource } from '@external/database/typeorm/config';
import { PersonRepository } from '@core/person/ports/repository';
import { PersonMapper } from '@external/database/typeorm/mappers';
import { FiltersInput, PaginationResult } from '@core/shared/types';
import { TypeORMPersonEntity } from '@external/database/typeorm/entities';

@Injectable()
export class TypeORMPersonRepository implements PersonRepository {
  private repository: Repository<TypeORMPersonEntity>;

  constructor() {
    this.repository = dataSource.getRepository(TypeORMPersonEntity);
  }

  private logger = new Logger(TypeORMPersonRepository.name);

  async searchById(id: string): Promise<Person> {
    try {
      const person = await this.repository.findOne({ where: { id } });
      return PersonMapper.toDomain(person);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async searchByEmail(email: string): Promise<Person> {
    try {
      const person = await this.repository.findOne({ where: { email } });
      return PersonMapper.toDomain(person);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async searchAdvanced(
    filters: FiltersInput,
  ): Promise<PaginationResult<Person>> {
    try {
      const { search, limit = 10, page = 1 } = filters;
      const options: FindManyOptions<TypeORMPersonEntity> = {
        where: [],
        order: { name: 'ASC' },
        skip: (page - 1) * limit,
        take: limit,
      };

      if (search) {
        const searchLower = `%${search.toLowerCase()}%`;
        options.where = [
          { name: ILike(searchLower) },
          { profession: ILike(searchLower) },
          { city: ILike(searchLower) },
        ];
      }

      const [data, total] = await this.repository.findAndCount(options);
      const { totalPages, currentPage, hasNextPage } = await Paginate({
        total,
        page,
        limit,
      });

      return {
        data: PersonMapper.toDomainList(data),
        total,
        totalPages,
        currentPage,
        hasNextPage,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async register(person: Person): Promise<void> {
    try {
      const data = PersonMapper.toPersistent(person);
      await this.repository.save(data);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async update(person: Person): Promise<void> {
    try {
      const { id, ...data } = PersonMapper.toPersistent(person);
      await this.repository.update(id, data);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async updatePhotoProfile(
    id: string,
    profilePhotoPath: string,
  ): Promise<void> {
    try {
      await this.repository.update(id, { profilePhotoPath });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }
}
