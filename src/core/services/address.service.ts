import { EditAddress } from '@core/shared/types';
import { MapsService } from '@core/shared/ports/maps';
import { Address } from '@core/shared/values-objects';

export class AddressService {
  constructor(private mapsService: MapsService) {}

  async updateCoordinatesIfChanged<T>(
    entity: T,
    address: EditAddress,
    getAddressFunction: (entity: T) => Address,
  ): Promise<EditAddress | null> {
    let coordinates: { lng: number; lat: number };

    const entityAddress = getAddressFunction(entity);

    if (entityAddress.changedAddress(address)) {
      console.log('entrou no IF');
      coordinates = await this.mapsService.getCoordinates(address);
      address.coordinates = coordinates;
      return address;
    }

    return null;
  }
}
