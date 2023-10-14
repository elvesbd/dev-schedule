import { AddressProps } from '@core/shared/values-objects';

export class AddressDataBuilder {
  private props: AddressProps = {
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

  withEmptyStreet(): this {
    this.props.street = '';
    return this;
  }

  withEmptyNumber(): this {
    this.props.number = '';
    return this;
  }

  withEmptyCity(): this {
    this.props.city = '';
    return this;
  }

  withEmptyState(): this {
    this.props.state = '';
    return this;
  }

  withEmptyPostalCode(): this {
    this.props.state = '';
    return this;
  }

  withEmptyCountry(): this {
    this.props.country = '';
    return this;
  }

  withStreetLessThanTwoCharacters(): this {
    this.props.street = 'a';
    return this;
  }

  withStreetMoreThanFiftyCharacters(): this {
    this.props.street =
      'Esta rua possui mais que 50 caracteres o que leva a gerar um erro';
    return this;
  }

  withNumberMoreThanEightDigits(): this {
    this.props.number = '123456789';
    return this;
  }

  withNumberNotNumeric(): this {
    this.props.number = 'abc';
    return this;
  }

  withCityLessThanThreeCharacters(): this {
    this.props.city = 'ab';
    return this;
  }

  withCityMoreThanThirtyFiveCharacters(): this {
    this.props.city = 'Cidade com o nome superior a 35 caracteres';
    return this;
  }

  withPostalCodeMoreThanEightCharacters(): this {
    this.props.postalCode = '123456789';
    return this;
  }

  withPostalCodeNotNumeric(): this {
    this.props.postalCode = 'invalid_';
    return this;
  }

  withCountryLessThanThreeCharacters(): this {
    this.props.country = 'ab';
    return this;
  }

  withCountryMoreThanFiftyCharacters(): this {
    this.props.country =
      'Pais com o nome superior a 50 caracteres mão é permitido';
    return this;
  }

  withSameAddress(): this {
    this.props.street = 'Travessa dos Economiários';
    this.props.number = '442';
    this.props.city = 'Campo Grande';
    this.props.state = 'MS';
    this.props.postalCode = '79043024';
    this.props.country = 'Brasil';
    return this;
  }

  withChangedAddress(): this {
    this.props.street = 'Travessa dos Paulistas';
    this.props.number = '100';
    this.props.city = 'Campo Grande';
    this.props.state = 'MS';
    this.props.postalCode = '60841090';
    this.props.country = 'Brasil';
    return this;
  }

  public build(): AddressProps {
    return this.props;
  }
}
