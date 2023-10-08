import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateTableCompanies1696449354918 implements MigrationInterface {
  private readonly logger = new Logger(CreateTableCompanies1696449354918.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'companies',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'tradeName',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'cnpj',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'contactPerson',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'whatsAppNumber',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'mobileNumber',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'landlinePhone',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'street',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'number',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'state',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'postalCode',
            type: 'varchar',
            length: '10',
            isNullable: false,
          },
          {
            name: 'country',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'lng',
            type: 'double precision',
            isNullable: false,
          },
          {
            name: 'lat',
            type: 'double precision',
            isNullable: false,
          },
          {
            name: 'profilePhotoPath',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'companies',
      new TableIndex({
        name: 'IDX_COMPANY_NAME',
        columnNames: ['name'],
      }),
    );

    await queryRunner.createIndex(
      'companies',
      new TableIndex({
        name: 'IDX_TRADE_NAME',
        columnNames: ['tradeName'],
      }),
    );

    await queryRunner.createIndex(
      'companies',
      new TableIndex({
        name: 'IDX_CNPJ',
        columnNames: ['cnpj'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Down migrations');
    await queryRunner.dropTable('companies');
  }
}
