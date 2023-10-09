import { EditAddress, EditCompanyContactNumbers } from '@core/shared/types';

export type EditCompany = {
  name: string;
  tradeName: string;
  email: string;
  cnpj: string;
  contactPerson: string;
  contactNumbers: EditCompanyContactNumbers;
  address: EditAddress;
};
