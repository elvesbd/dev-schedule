import { Address, ContactNumbers } from '@core/shared/types';

export type RegisterCompany = {
  name: string;
  tradeName: string;
  email: string;
  cnpj: string;
  contactPerson: string;
  contactNumbers: CompanyContactNumbers;
  address: Address;
};

type CompanyContactNumbers = ContactNumbers & {
  landLinePhone: string;
};
