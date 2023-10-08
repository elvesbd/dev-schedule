import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@core/person/enum';
import {
  ContactNumbersPersonDto,
  EditAddressDto,
} from '@adapters/controllers/shared/dto';

export class EditPersonDto {
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
  address: EditAddressDto;

  @ApiProperty()
  employer?: string;

  @ApiProperty()
  profilePhotoPath: string;
}
