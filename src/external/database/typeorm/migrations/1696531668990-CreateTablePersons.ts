import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateTablePersons1696531668990 implements MigrationInterface {
  private readonly logger = new Logger(CreateTablePersons1696531668990.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Up migrations');
    await queryRunner.createTable(
      new Table({
        name: 'persons',
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
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'dateOfBirth',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'gender',
            type: 'enum',
            enum: ['Male', 'Female', 'Other'],
            isNullable: false,
          },
          {
            name: 'profession',
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
            name: 'employer',
            type: 'varchar',
            length: '255',
            isNullable: true,
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
      'persons',
      new TableIndex({
        name: 'IDX_EMAIL',
        columnNames: ['email'],
      }),
    );

    await queryRunner.createIndex(
      'persons',
      new TableIndex({
        name: 'IDX_NAME',
        columnNames: ['name'],
      }),
    );

    await queryRunner.createIndex(
      'persons',
      new TableIndex({
        name: 'IDX_PROFESSION',
        columnNames: ['profession'],
      }),
    );

    await queryRunner.createIndex(
      'persons',
      new TableIndex({
        name: 'IDX_CITY',
        columnNames: ['city'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Down migrations');
    await queryRunner.dropTable('persons');
  }
}
