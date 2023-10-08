import { ApiProperty } from '@nestjs/swagger';

export class ContactNumbersPersonDto {
  @ApiProperty()
  whatsAppNumber: string;

  @ApiProperty()
  mobileNumber: string;
}
