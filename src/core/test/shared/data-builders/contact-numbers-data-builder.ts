import { ContactNumbersProps } from '@core/shared/values-objects';

export class ContactNumbersDataBuilderProps {
  private contactNumbers: ContactNumbersProps = {
    whatsAppNumber: '85999491515',
    mobileNumber: '85999000100',
    landlinePhone: undefined,
  };

  public static aContactNumbers(): ContactNumbersDataBuilderProps {
    return new ContactNumbersDataBuilderProps();
  }

  public build(): ContactNumbersProps {
    return this.contactNumbers;
  }
}
