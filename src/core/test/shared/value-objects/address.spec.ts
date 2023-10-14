import { Address, AddressProps } from '@core/shared/values-objects';
import { AddressDataBuilderProps } from '../data-builders';

describe('Address [value object]', (): void => {
  let props: AddressProps;

  beforeEach(() => {
    jest.clearAllMocks();
    props = AddressDataBuilderProps.aAddress().build();
  });

  it('should return error if street required property is missing', (): void => {
    props.street = '';
    expect(() => new Address(props)).toThrow(
      'Todas as propriedades de endereço são obrigatórias.',
    );
  });

  it('should return error if number required property is missing', (): void => {
    props.number = '';
    expect(() => new Address(props)).toThrow(
      'Todas as propriedades de endereço são obrigatórias.',
    );
  });

  it('should return error if city required property is missing', (): void => {
    props.city = '';
    expect(() => new Address(props)).toThrow(
      'Todas as propriedades de endereço são obrigatórias.',
    );
  });

  it('should return error if state required property is missing', (): void => {
    props.state = '';
    expect(() => new Address(props)).toThrow(
      'Todas as propriedades de endereço são obrigatórias.',
    );
  });

  it('should return error if postal code required property is missing', (): void => {
    props.postalCode = '';
    expect(() => new Address(props)).toThrow(
      'Todas as propriedades de endereço são obrigatórias.',
    );
  });

  it('should return error if country required property is missing', (): void => {
    props.country = '';
    expect(() => new Address(props)).toThrow(
      'Todas as propriedades de endereço são obrigatórias.',
    );
  });

  it('should return error if street has less than 2 characters', (): void => {
    props.street = 'a';
    expect(() => new Address(props)).toThrow(
      'A rua (street) deve ter entre 2 e 50 caracteres.',
    );
  });

  it('should return error if street has more than 50 characters', (): void => {
    props.street =
      'Esta rua possui mais que 50 caracteres o que leva a gerar um erro';
    expect(() => new Address(props)).toThrow(
      'A rua (street) deve ter entre 2 e 50 caracteres.',
    );
  });

  it('should return error if the number has more than 8 digits', (): void => {
    props.number = '123456789';
    expect(() => new Address(props)).toThrow(
      'O número (number) deve ter entre 1 e 8 caracteres e ser um número válido.',
    );
  });

  it('should return error if number is not of type numeric', (): void => {
    props.number = 'abc';
    expect(() => new Address(props)).toThrow(
      'O número (number) deve ter entre 1 e 8 caracteres e ser um número válido.',
    );
  });

  it('should return error if the city has less than 3 characters', (): void => {
    props.city = 'ab';
    expect(() => new Address(props)).toThrow(
      'A cidade (city) deve ter entre 3 e 35 caracteres.',
    );
  });

  it('should return error if the city has more than 35 characters', (): void => {
    props.city = 'Cidade com o nome superior a 35 caracteres';
    expect(() => new Address(props)).toThrow(
      'A cidade (city) deve ter entre 3 e 35 caracteres.',
    );
  });

  it('should return error if the postal code has more than 8 characters', (): void => {
    props.postalCode = '123456789';
    expect(() => new Address(props)).toThrow(
      'O código postal (postalCode) deve ter exatamente 8 caracteres.',
    );
  });

  it('should return error if the postal code is not of type numeric', (): void => {
    props.postalCode = 'invalid_';
    expect(() => new Address(props)).toThrow(
      'O código postal (postalCode) deve ser um número válido.',
    );
  });

  it('should return error if the country has less than 3 characters', (): void => {
    props.country = 'ab';
    expect(() => new Address(props)).toThrow(
      'O país (country) deve ter entre 3 e 50 caracteres.',
    );
  });

  it('should return error if the country has more than 50 characters', (): void => {
    props.country = 'Pais com o nome superior a 50 caracteres mão é permitido';
    expect(() => new Address(props)).toThrow(
      'O país (country) deve ter entre 3 e 50 caracteres.',
    );
  });

  it('should return false if the address is not changed', (): void => {
    const newAddress = {
      street: 'Travessa dos Economiários',
      number: '442',
      city: 'Campo Grande',
      state: 'MS',
      postalCode: '79043024',
      country: 'Brasil',
    };

    const address = new Address(props);
    const isEqual = address.changedAddress(newAddress);

    expect(isEqual).toBeFalsy();
  });

  it('should return true if the address changed', (): void => {
    const newAddress = {
      street: 'Travessa dos Paulistas',
      number: '100',
      city: 'Campo Grande',
      state: 'MS',
      postalCode: '60841090',
      country: 'Brasil',
    };

    const address = new Address(props);
    const isEqual = address.changedAddress(newAddress);

    expect(isEqual).toBeTruthy();
  });

  it('should be create an address with success', (): void => {
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
