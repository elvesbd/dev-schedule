export type ContactNumbers = {
  whatsAppNumber: string;
  mobileNumber: string;
};

export type EditCompanyContactNumbers = ContactNumbers & {
  landLinePhone: string;
};
