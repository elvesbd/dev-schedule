import { Email } from '@core/shared/values-objects';
import { EmailDataBuilder } from '../data-builders';

describe('Email [value object]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if email value is not a valid', () => {
    const value = EmailDataBuilder.aEmail().withInvalidEmail().build();

    expect(() => new Email(value)).toThrow(
      'O endereço de e-mail fornecido não é válido.',
    );
  });

  it('should throw an error if email does not have a domain', () => {
    const value = EmailDataBuilder.aEmail().withNotDomain().build();

    expect(() => new Email(value)).toThrow(
      'O endereço de e-mail fornecido não é válido.',
    );
  });

  it('should throw an error if email does not have a user', () => {
    const value = EmailDataBuilder.aEmail().withNotUser().build();

    expect(() => new Email(value)).toThrow(
      'O endereço de e-mail fornecido não é válido.',
    );
  });

  it('should throw an error if email has blank spaces', () => {
    const value = EmailDataBuilder.aEmail().withSpaces().build();

    expect(() => new Email(value)).toThrow(
      'O endereço de e-mail fornecido não é válido.',
    );
  });

  it('should throw an error if email point incorrectly', () => {
    const value = EmailDataBuilder.aEmail().withPointIncorrectly().build();

    expect(() => new Email(value)).toThrow(
      'O endereço de e-mail fornecido não é válido.',
    );
  });

  it('should throw an error if email have multiple @', () => {
    const value = EmailDataBuilder.aEmail().withMultipleAt().build();

    expect(() => new Email(value)).toThrow(
      'O endereço de e-mail fornecido não é válido.',
    );
  });

  it('should be create an email with success', () => {
    const value = EmailDataBuilder.aEmail().build();
    const email = new Email(value);

    expect(email).toBeInstanceOf(Email);
    expect(email.value).toBe('john@mail.com');
  });
});
