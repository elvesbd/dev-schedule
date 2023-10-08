import { Address } from '@core/shared/types';

export abstract class MapsService {
  abstract getCoordinates(
    address: AddressWithoutCountry,
  ): Promise<{ lng: number; lat: number }>;
}

type AddressWithoutCountry = Omit<Address, 'country'>;
