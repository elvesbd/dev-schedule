import { ApiProperty } from '@nestjs/swagger';

export class FileDto {
  @ApiProperty()
  fieldname: string;

  @ApiProperty()
  originalname: string;

  @ApiProperty()
  mimetype: string;

  @ApiProperty()
  buffer: Buffer;

  @ApiProperty()
  size: number;
}
