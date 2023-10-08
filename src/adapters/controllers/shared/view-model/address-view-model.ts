import { ApiProperty } from '@nestjs/swagger';

class CoordinatesVMResponse {
  @ApiProperty({ type: Number, description: 'Longitude' })
  lng: number;

  @ApiProperty({ type: Number, description: 'Latitude' })
  lat: number;
}

export class AddressVMResponse {
  @ApiProperty({ type: String, description: 'Nome da rua' })
  street: string;

  @ApiProperty({ type: String, description: 'Número da rua' })
  number: string;

  @ApiProperty({ type: String, description: 'Cidade' })
  city: string;

  @ApiProperty({ type: String, description: 'Estado' })
  state: string;

  @ApiProperty({ type: String, description: 'Cep' })
  postalCode: string;

  @ApiProperty({ type: String, description: 'País' })
  country: string;

  @ApiProperty({
    type: CoordinatesVMResponse,
    description: 'Coordenadas do endereço',
  })
  coordinates: CoordinatesVMResponse;
}
