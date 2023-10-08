import { Gender } from '@core/person/enum';
import { ContactNumbers, Address } from '@core/shared/types';

export type RegisterPerson = {
  name: string;
  email: string;
  dateOfBirth: Date;
  gender: Gender;
  profession: string;
  contactNumbers: ContactNumbers;
  address: Address;
  employer?: string;
};
