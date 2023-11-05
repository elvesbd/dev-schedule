import { Address } from '@core/shared/values-objects';
import { AddressDataBuilder } from '../data-builders';

describe('Address [value object]', (): void => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return error if street required property is missing', (): void => {
    const props = AddressDataBuilder.aAddress().withEmptyStreet().build();

    expect(() => new Address(props)).toThrow(
      'Todas as propriedades de endereço são obrigatórias.',
    );
  });

  it('should return error if number required property is missing', (): void => {
    const props = AddressDataBuilder.aAddress().withEmptyNumber().build();

    expect(() => new Address(props)).toThrow(
      'Todas as propriedades de endereço são obrigatórias.',
    );
  });

  it('should return error if city required property is missing', (): void => {
    const props = AddressDataBuilder.aAddress().withEmptyCity().build();

    expect(() => new Address(props)).toThrow(
      'Todas as propriedades de endereço são obrigatórias.',
    );
  });

  it('should return error if state required property is missing', (): void => {
    const props = AddressDataBuilder.aAddress().withEmptyState().build();

    expect(() => new Address(props)).toThrow(
      'Todas as propriedades de endereço são obrigatórias.',
    );
  });

  it('should return error if postal code required property is missing', (): void => {
    const props = AddressDataBuilder.aAddress().withEmptyPostalCode().build();

    expect(() => new Address(props)).toThrow(
      'Todas as propriedades de endereço são obrigatórias.',
    );
  });

  it('should return error if country required property is missing', (): void => {
    const props = AddressDataBuilder.aAddress().withEmptyCountry().build();

    expect(() => new Address(props)).toThrow(
      'Todas as propriedades de endereço são obrigatórias.',
    );
  });

  it('should return error if street has less than 2 characters', (): void => {
    const props = AddressDataBuilder.aAddress()
      .withStreetLessThanTwoCharacters()
      .build();

    expect(() => new Address(props)).toThrow(
      'A rua (street) deve ter entre 2 e 50 caracteres.',
    );
  });

  it('should return error if street has more than 50 characters', (): void => {
    const props = AddressDataBuilder.aAddress()
      .withStreetMoreThanFiftyCharacters()
      .build();

    expect(() => new Address(props)).toThrow(
      'A rua (street) deve ter entre 2 e 50 caracteres.',
    );
  });

  it('should return error if the number has more than 8 digits', (): void => {
    const props = AddressDataBuilder.aAddress()
      .withNumberMoreThanEightDigits()
      .build();

    expect(() => new Address(props)).toThrow(
      'O número (number) deve ter entre 1 e 8 caracteres e ser um número válido.',
    );
  });

  it('should return error if number is not of type numeric', (): void => {
    const props = AddressDataBuilder.aAddress().withNumberNotNumeric().build();

    expect(() => new Address(props)).toThrow(
      'O número (number) deve ter entre 1 e 8 caracteres e ser um número válido.',
    );
  });

  it('should return error if the city has less than 3 characters', (): void => {
    const props = AddressDataBuilder.aAddress()
      .withCityLessThanThreeCharacters()
      .build();

    expect(() => new Address(props)).toThrow(
      'A cidade (city) deve ter entre 3 e 35 caracteres.',
    );
  });

  it('should return error if the city has more than 35 characters', (): void => {
    const props = AddressDataBuilder.aAddress()
      .withCityMoreThanThirtyFiveCharacters()
      .build();

    expect(() => new Address(props)).toThrow(
      'A cidade (city) deve ter entre 3 e 35 caracteres.',
    );
  });

  it('should return error if the postal code has more than 8 characters', (): void => {
    const props = AddressDataBuilder.aAddress()
      .withPostalCodeMoreThanEightCharacters()
      .build();

    expect(() => new Address(props)).toThrow(
      'O código postal (postalCode) deve ter exatamente 8 caracteres.',
    );
  });

  it('should return error if the postal code is not of type numeric', (): void => {
    const props = AddressDataBuilder.aAddress()
      .withPostalCodeNotNumeric()
      .build();

    expect(() => new Address(props)).toThrow(
      'O código postal (postalCode) deve ser um número válido.',
    );
  });

  it('should return error if the country has less than 3 characters', (): void => {
    const props = AddressDataBuilder.aAddress()
      .withCountryLessThanThreeCharacters()
      .build();

    expect(() => new Address(props)).toThrow(
      'O país (country) deve ter entre 3 e 50 caracteres.',
    );
  });

  it('should return error if the country has more than 50 characters', (): void => {
    const props = AddressDataBuilder.aAddress()
      .withCountryMoreThanFiftyCharacters()
      .build();

    expect(() => new Address(props)).toThrow(
      'O país (country) deve ter entre 3 e 50 caracteres.',
    );
  });

  it('should return false if the address is not changed', (): void => {
    const initialAddress = AddressDataBuilder.aAddress().build();
    const props = AddressDataBuilder.aAddress().withSameAddress().build();

    const address = new Address(initialAddress);
    const isEqual = address.changedAddress(props);

    expect(isEqual).toBeFalsy();
  });

  it('should return true if the address changed', (): void => {
    const initialAddress = AddressDataBuilder.aAddress().build();
    const props = AddressDataBuilder.aAddress().withChangedAddress().build();

    const address = new Address(initialAddress);
    const changedAddress = address.changedAddress(props);

    expect(changedAddress).toBeTruthy();
  });

  it('should be create an address with success', (): void => {
    const props = AddressDataBuilder.aAddress().build();

    const address = new Address(props);

    expect(address).toBeInstanceOf(Address);
    expect(address.street).toBe(props.street);
    expect(address.number).toBe(props.number);
    expect(address.city).toBe(props.city);
    expect(address.state).toBe(props.state);
    expect(address.postalCode).toBe(props.postalCode);
    expect(address.country).toBe(props.country);
    expect(address.coordinates).toEqual(props.coordinates);
  });
});
