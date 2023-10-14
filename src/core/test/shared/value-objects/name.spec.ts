import { Name } from '@core/shared/values-objects';
import { NameDataBuilder } from '../data-builders';

describe('Name [value object]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if name is empty', () => {
    const value = NameDataBuilder.aName().withEmptyName().build();

    expect(() => new Name(value)).toThrow('O nome não pode ser vazio.');
  });

  it('should throw an error if name with numbers', () => {
    const value = NameDataBuilder.aName().nameWithNumbers().build();

    expect(() => new Name(value)).toThrow(
      'O nome deve conter apenas letras, sem números ou caracteres especiais.',
    );
  });

  it('should throw an error if name with special characters', () => {
    const value = NameDataBuilder.aName().nameWithCharacters().build();

    expect(() => new Name(value)).toThrow(
      'O nome deve conter apenas letras, sem números ou caracteres especiais.',
    );
  });

  it('should be create an valid name', () => {
    const value = NameDataBuilder.aName().build();
    const name = new Name(value);

    expect(name).toBeInstanceOf(Name);
    expect(name.value).toBe(value);
  });
});
