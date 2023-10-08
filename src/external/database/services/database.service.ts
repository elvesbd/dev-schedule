import { Injectable } from '@nestjs/common';
import { dataSource } from '@external/database/typeorm/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return dataSource.options;
  }
}
