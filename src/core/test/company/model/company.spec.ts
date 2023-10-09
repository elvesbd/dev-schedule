import { Company } from '@core/company/model';
import { CompanyDataBuilderProps } from '../data-builder';

describe('Company [entity]', (): void => {
  let company: Company;

  beforeEach(() => {
    const companyProps = CompanyDataBuilderProps.aCompany().build();
    company = new Company(companyProps);
  });

  /* it('should register a Company', (): void => {
    expect(company.id).toBeDefined();
    expect(company.name.value).toBe(company.name);
    expect(company.tradeName).toBe(company.tradeName);
    expect(company.email.value).toBe(company.email);
    expect(company.cnpj.value).toBe(company.cnpj);
    expect(company.contactPerson).toBe(company.contactPerson);
    expect(company.contactNumbers).toEqual(company.contactNumbers);
    expect(company.address).toEqual(company.address);
    expect(company.profilePhotoPath.value).toBe(company.profilePhotoPath);
  }); */

  it('should update a Company', (): void => {
    expect(company.id).toBeDefined();
    expect(company.name).toBe('John Doe');
    expect(company.email).toBe('johndoe@gmail.com');
  });

  it('should return updatedAt when defined', (): void => {
    const expectedDate = new Date('2023-10-09T12:00:00Z');
    company['updatedAt'] = expectedDate;

    expect(company.getUpdatedAt).toBeDefined();
    expect(company.getUpdatedAt).toBe(expectedDate);
  });
});
