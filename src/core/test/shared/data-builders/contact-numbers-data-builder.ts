import { ContactNumbersProps } from '@core/shared/values-objects';

export class ContactNumbersDataBuilder {
  private contactNumbers: ContactNumbersProps = {
    whatsAppNumber: '85999491515',
    mobileNumber: '85999000100',
    landlinePhone: undefined,
  };

  public static aContactNumbers(): ContactNumbersDataBuilder {
    return new ContactNumbersDataBuilder();
  }

  public build(): ContactNumbersProps {
    return this.contactNumbers;
  }
}
