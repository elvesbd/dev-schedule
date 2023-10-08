import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, LatLngLiteral } from '@googlemaps/google-maps-services-js';

type Address = {
  street: string;
  number: string;
  city: string;
  state: string;
  postalCode: string;
};

@Injectable()
export class GoogleMapsService extends Client {
  private readonly accessKey = this.config.get('GOOGLE_MAPS_ACCESS_KEY');

  constructor(private config: ConfigService) {
    super();
  }

  async getCoordinates(address: Address): Promise<LatLngLiteral> {
    const { street, number, city, state, postalCode } = address;

    const googleRes = await this.geocode({
      params: {
        address: `${street}, ${number}, ${city}, ${state}, ${postalCode}`,
        key: this.accessKey,
      },
    });

    const { lng, lat } = googleRes.data.results[0].geometry.location;
    return { lng, lat };
  }
}
