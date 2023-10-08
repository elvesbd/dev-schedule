import { CoordinateProps, Coordinates } from '@core/shared/values-objects';

export type AddressProps = {
  street: string;
  number: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  coordinates?: CoordinateProps;
};

export class Address {
  readonly street: string;
  readonly number: string;
  readonly city: string;
  readonly state: string;
  readonly postalCode: string;
  readonly country: string;
  readonly coordinates: Coordinates;

  constructor(props: AddressProps, coord: CoordinateProps) {
    if (
      !props.street ||
      !props.number ||
      !props.city ||
      !props.state ||
      !props.postalCode ||
      !props.country
    ) {
      throw new Error('Todas as propriedades de endereço são obrigatórias.');
    }

    if (props.street.length < 2 || props.street.length > 50) {
      throw new Error('A rua (street) deve ter entre 2 e 50 caracteres.');
    }

    if (
      props.number.length < 1 ||
      props.number.length > 8 ||
      isNaN(Number(props.number))
    ) {
      throw new Error(
        'O número (number) deve ter entre 1 e 8 caracteres e ser um número válido.',
      );
    }

    if (props.city.length < 3 || props.city.length > 35) {
      throw new Error('A cidade (city) deve ter entre 3 e 35 caracteres.');
    }

    if (props.postalCode.length !== 8) {
      throw new Error(
        'O código postal (postalCode) deve ter exatamente 8 caracteres.',
      );
    }

    if (isNaN(Number(props.postalCode))) {
      throw new Error(
        'O código postal (postalCode) deve ser um número válido.',
      );
    }

    if (props.country.length < 3 || props.country.length > 50) {
      throw new Error('O país (country) deve ter entre 3 e 50 caracteres.');
    }

    this.street = props.street;
    this.number = props.number;
    this.city = props.city;
    this.state = props.state;
    this.postalCode = props.postalCode;
    this.country = props.country;
    this.coordinates = new Coordinates(coord);
  }

  private isEqual(newAddress: Partial<Address>): boolean {
    return (
      newAddress.street === this.street &&
      newAddress.number === this.number &&
      newAddress.city === this.city &&
      newAddress.state === this.state &&
      newAddress.postalCode === this.postalCode &&
      newAddress.country === this.country
    );
  }

  public addressChanged(newAddress: Partial<Address>): boolean {
    return !this.isEqual(newAddress);
  }
}
