import { Company } from '@core/company/model';
import { CompanyDataBuilderProps } from '../data-builder';

describe('Company [model]', (): void => {
  const companyProps = CompanyDataBuilderProps.aCompany().build();
  const company = Company.create(companyProps);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a Company', (): void => {
    expect(company.id).toBeDefined();
    expect(company.getName).toBe(companyProps.name);
    expect(company.getTradeName).toBe(companyProps.tradeName);
    expect(company.getEmail).toBe(companyProps.email);
    expect(company.getCnpj).toBe(companyProps.cnpj);
    expect(company.getContactPerson).toBe(companyProps.contactPerson);
    expect(company.getContactNumbers).toEqual(companyProps.contactNumbers);
    expect(company.getAddress).toEqual(companyProps.address);
    expect(company.getProfilePhotoPath).toBe(companyProps.profilePhotoPath);
  });

  it('should update a company name', (): void => {
    const updatedCompany = CompanyDataBuilderProps.aCompany()
      .withUpdatedName()
      .build();
    company.update(updatedCompany);

    expect(company.id).toBeDefined();
    expect(company.getName).toBe(updatedCompany.name);
    expect(company.getCreatedAt).not.toEqual(company.getUpdatedAt);
  });

  it('should update a company trade name', (): void => {
    const updatedCompany = CompanyDataBuilderProps.aCompany()
      .withUpdatedTradeName()
      .build();
    company.update(updatedCompany);

    expect(company.id).toBeDefined();
    expect(company.getTradeName).toBe(updatedCompany.tradeName);
    expect(company.getCreatedAt).not.toEqual(company.getUpdatedAt);
  });

  it('should update a company email', (): void => {
    const updatedCompany = CompanyDataBuilderProps.aCompany()
      .withUpdatedEmail()
      .build();
    company.update(updatedCompany);

    expect(company.id).toBeDefined();
    expect(company.getEmail).toBe(updatedCompany.email);
    expect(company.getCreatedAt).not.toEqual(company.getUpdatedAt);
  });

  it('should update a company cnpj', (): void => {
    const updatedCompany = CompanyDataBuilderProps.aCompany()
      .withUpdatedCnpj()
      .build();
    company.update(updatedCompany);

    expect(company.id).toBeDefined();
    expect(company.getCnpj).toBe(updatedCompany.cnpj);
    expect(company.getCreatedAt).not.toEqual(company.getUpdatedAt);
  });

  it('should update a company contact person', (): void => {
    const updatedCompany = CompanyDataBuilderProps.aCompany()
      .withUpdatedContactPerson()
      .build();
    company.update(updatedCompany);

    expect(company.id).toBeDefined();
    expect(company.getContactPerson).toBe(updatedCompany.contactPerson);
    expect(company.getCreatedAt).not.toEqual(company.getUpdatedAt);
  });

  it('should update a company contact whatsApp number', (): void => {
    const updatedCompany = CompanyDataBuilderProps.aCompany()
      .withUpdatedWhatsAppNumber()
      .build();
    company.update(updatedCompany);

    expect(company.id).toBeDefined();
    expect(company.getContactNumbers.whatsAppNumber).toBe(
      updatedCompany.contactNumbers.whatsAppNumber,
    );
    expect(company.getCreatedAt).not.toEqual(company.getUpdatedAt);
  });

  it('should update a company contact mobile number', (): void => {
    const updatedCompany = CompanyDataBuilderProps.aCompany()
      .withUpdatedMobileNumber()
      .build();
    company.update(updatedCompany);

    expect(company.id).toBeDefined();
    expect(company.getContactNumbers.mobileNumber).toBe(
      updatedCompany.contactNumbers.mobileNumber,
    );
    expect(company.getCreatedAt).not.toEqual(company.getUpdatedAt);
  });

  it('should update a company contact land line phone number', (): void => {
    const updatedCompany = CompanyDataBuilderProps.aCompany()
      .withUpdatedLandLinePhone()
      .build();
    company.update(updatedCompany);

    expect(company.id).toBeDefined();
    expect(company.getContactNumbers.landlinePhone).toBe(
      updatedCompany.contactNumbers.landlinePhone,
    );
    expect(company.getCreatedAt).not.toEqual(company.getUpdatedAt);
  });

  it('should update a company address', (): void => {
    const updatedCompany = CompanyDataBuilderProps.aCompany()
      .withUpdatedAddress()
      .build();
    company.update(updatedCompany);

    expect(company.id).toBeDefined();
    expect(company.getAddress).toEqual(updatedCompany.address);
    expect(company.getCreatedAt).not.toEqual(company.getUpdatedAt);
  });

  it('should update a company profile photo path', (): void => {
    const profilePhotoPath = 'https://www.test.com/updatedPhoto.jpg';
    company.updateProfilePhotoPath(profilePhotoPath);

    expect(company.id).toBeDefined();
    expect(company.getProfilePhotoPath).toBe(profilePhotoPath);
    expect(company.getCreatedAt).not.toEqual(company.getUpdatedAt);
  });
});
