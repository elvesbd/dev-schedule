import { AddressProps } from '@core/shared/values-objects';

export class AddressDataBuilder {
  private address: AddressProps = {
    street: 'Travessa dos Economiários',
    number: '442',
    city: 'Campo Grande',
    state: 'MS',
    postalCode: '79043024',
    country: 'Brasil',
    coordinates: {
      lng: -28.1737325,
      lat: -10.790115,
    },
  };

  public static aAddress(): AddressDataBuilder {
    return new AddressDataBuilder();
  }

  public build(): AddressProps {
    return this.address;
  }
}
