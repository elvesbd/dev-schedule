import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { Company } from '@core/company/model';
import { Paginate } from '@external/utils/pagination.service';
import { dataSource } from '@external/database/typeorm/config';
import { CompanyMapper } from '@external/database/typeorm/mappers';
import { CompanyRepository } from '@core/company/ports/repository';
import { FiltersInput, PaginationResult } from '@core/shared/types';
import { TypeORMCompanyEntity } from '@external/database/typeorm/entities';

@Injectable()
export class TypeORMCompanyRepository implements CompanyRepository {
  private repository: Repository<TypeORMCompanyEntity>;

  constructor() {
    this.repository = dataSource.getRepository(TypeORMCompanyEntity);
  }

  private logger = new Logger(TypeORMCompanyRepository.name);

  async searchById(id: string): Promise<Company> {
    try {
      const company = await this.repository.findOne({ where: { id } });
      return CompanyMapper.toDomain(company);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async searchByCnpj(cnpj: string): Promise<Company> {
    try {
      const person = await this.repository.findOne({ where: { cnpj } });
      return CompanyMapper.toDomain(person);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async searchAdvanced(
    filters: FiltersInput,
  ): Promise<PaginationResult<Company>> {
    try {
      const { search, limit = 10, page = 1 } = filters;
      const options: FindManyOptions<TypeORMCompanyEntity> = {
        where: [],
        order: { name: 'ASC' },
        skip: (page - 1) * limit,
        take: limit,
      };

      if (search) {
        const searchLower = `%${search.toLowerCase()}%`;
        options.where = [
          { name: ILike(searchLower) },
          { tradeName: ILike(searchLower) },
          { cnpj: ILike(searchLower) },
        ];
      }

      const [data, total] = await this.repository.findAndCount(options);
      const { totalPages, currentPage, hasNextPage } = await Paginate({
        total,
        page,
        limit,
      });

      return {
        data: CompanyMapper.toDomainList(data),
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

  async register(company: Company): Promise<void> {
    try {
      const data = CompanyMapper.toPersistent(company);
      await this.repository.save(data);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async update(company: Company): Promise<void> {
    try {
      const { id, ...data } = CompanyMapper.toPersistent(company);
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
