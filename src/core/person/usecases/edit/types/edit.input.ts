import { Gender } from '@core/person/enum';
import { ContactNumbers, EditAddress } from '@core/shared/types';

export type EditPersonInput = {
  name: string;
  email: string;
  dateOfBirth: Date;
  gender: Gender;
  profession: string;
  contactNumbers: ContactNumbers;
  address: EditAddress;
  employer?: string;
};
