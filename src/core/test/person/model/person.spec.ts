import { PersonDataBuilderProps } from '../data-builder';
import { Person } from '@core/person/model';

describe('Person [entity]', (): void => {
  const personProps = PersonDataBuilderProps.aPerson().build();
  const person = Person.create(personProps);

  /*  beforeEach(() => {
    jest.clearAllMocks();
  }); */

  /*   it('should register a Company', (): void => {
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

  it('should update a company email', (): void => {
    const updatedCompany = CompanyDataBuilderProps.aCompany()
      .withUpdatedEmail()
      .build();
    company.update(updatedCompany);

    expect(company.id).toBeDefined();
    expect(company.getEmail).toBe(updatedCompany.email);
    expect(company.getCreatedAt).not.toEqual(company.getUpdatedAt);
  });

  it('should update a company profile photo path', (): void => {
    const profilePhotoPath = 'https://www.test.com/updatedPhoto.jpg';
    company.updateProfilePhotoPath(profilePhotoPath);

    expect(company.id).toBeDefined();
    expect(company.getProfilePhotoPath).toBe(profilePhotoPath);
    expect(company.getCreatedAt).not.toEqual(company.getUpdatedAt);
  }); */
});
