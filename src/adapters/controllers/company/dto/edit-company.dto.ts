import { ApiProperty } from '@nestjs/swagger';
import {
  ContactNumbersCompanyDto,
  EditAddressDto,
} from '@adapters/controllers/shared/dto';

export class EditCompanyDto {
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
  address: EditAddressDto;

  @ApiProperty()
  profilePhotoPath: string;
}
