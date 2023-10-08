import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@core/person/enum';
import {
  AddressDto,
  ContactNumbersPersonDto,
  FileDto,
} from '@adapters/controllers/shared/dto';

export class RegisterPersonDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  gender: Gender;

  @ApiProperty()
  profession: string;

  @ApiProperty()
  contactNumbers: ContactNumbersPersonDto;

  @ApiProperty()
  address: AddressDto;

  @ApiProperty()
  employer: string;

  @ApiProperty({ type: FileDto })
  file: FileDto;
}
