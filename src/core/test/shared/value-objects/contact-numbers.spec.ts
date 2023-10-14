import {
  ContactNumbers,
  ContactNumbersProps,
} from '@core/shared/values-objects';
import { ContactNumbersDataBuilder } from '../data-builders';

describe('Contact Numbers [value object]', () => {
  let props: ContactNumbersProps;

  beforeEach(() => {
    jest.clearAllMocks();
    props = ContactNumbersDataBuilder.aContactNumbers().build();
  });

  it('should throw an error if the WhatsApp number is different than 11 digits', (): void => {
    props.whatsAppNumber = '8599949151';
    expect(() => new ContactNumbers(props)).toThrow(
      'O número do WhatsApp deve ter exatamente 11 caracteres e deve conter apenas números.',
    );
  });

  it('should throw an error if the WhatsApp number is not numeric', (): void => {
    props.whatsAppNumber = 'abcdefghijk';
    expect(() => new ContactNumbers(props)).toThrow(
      'O número do WhatsApp deve ter exatamente 11 caracteres e deve conter apenas números.',
    );
  });

  it('should throw an error if the mobile number is different than 11 digits', (): void => {
    props.mobileNumber = '8599949151';
    expect(() => new ContactNumbers(props)).toThrow(
      'O número do celular deve ter exatamente 11 caracteres e deve conter apenas números.',
    );
  });

  it('should throw an error if the mobile number is not numeric', (): void => {
    props.mobileNumber = 'abcdefghijk';
    expect(() => new ContactNumbers(props)).toThrow(
      'O número do celular deve ter exatamente 11 caracteres e deve conter apenas números.',
    );
  });

  it('should throw an error if the landlinePhone number is different than 11 digits', (): void => {
    props.landlinePhone = '853476863';
    expect(() => new ContactNumbers(props)).toThrow(
      'O número de telefone fixo deve ter exatamente 10 caracteres e deve conter apenas números.',
    );
  });

  it('should throw an error if the landlinePhone number is not numeric', (): void => {
    props.landlinePhone = 'abcdefghijk';
    expect(() => new ContactNumbers(props)).toThrow(
      'O número de telefone fixo deve ter exatamente 10 caracteres e deve conter apenas números.',
    );
  });

  it('should be create an contact numbers with success', (): void => {
    const contactNumbers = new ContactNumbers(props);

    expect(contactNumbers).toBeInstanceOf(ContactNumbers);
    expect(contactNumbers.whatsAppNumber).toBe(props.whatsAppNumber);
    expect(contactNumbers.mobileNumber).toBe(props.mobileNumber);
  });
});
