import { ApiProperty } from '@nestjs/swagger';

export class ContactNumbersPersonVMResponse {
  @ApiProperty({ type: String, description: 'Número do whatsApp' })
  whatsAppNumber: string;

  @ApiProperty({ type: String, description: 'Número do celular' })
  mobileNumber: string;
}

export class ContactNumbersCompanyVMResponse extends ContactNumbersPersonVMResponse {
  @ApiProperty({ type: String, description: 'Número fixo' })
  landlinePhone: string;
}
