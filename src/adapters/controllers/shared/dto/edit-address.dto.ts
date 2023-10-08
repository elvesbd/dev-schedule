import { ApiProperty } from '@nestjs/swagger';

class Coordinates {
  @ApiProperty()
  lng: number;

  @ApiProperty()
  lat: number;
}

export class EditAddressDto {
  @ApiProperty()
  street: string;

  @ApiProperty()
  number: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  coordinates: Coordinates;
}
