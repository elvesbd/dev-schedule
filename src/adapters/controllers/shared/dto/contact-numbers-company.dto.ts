import { ApiProperty } from '@nestjs/swagger';

export class ContactNumbersCompanyDto {
  @ApiProperty()
  whatsAppNumber: string;

  @ApiProperty()
  mobileNumber: string;

  @ApiProperty()
  landLinePhone: string;
}
