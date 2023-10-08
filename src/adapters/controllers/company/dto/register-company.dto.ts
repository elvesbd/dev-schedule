import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from '@adapters/controllers/shared/dto/address.dto';
import {
  ContactNumbersCompanyDto,
  FileDto,
} from '@adapters/controllers/shared/dto';

export class RegisterCompanyDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  tradeName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  contactPerson: string;

  @ApiProperty()
  contactNumbers: ContactNumbersCompanyDto;

  @ApiProperty()
  address: AddressDto;

  @ApiProperty({ type: FileDto })
  file: FileDto;
}
