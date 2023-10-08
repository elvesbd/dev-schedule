import { BaseEntity } from '@core/shared/model';
import {
  Name,
  Email,
  Address,
  Document,
  AddressProps,
  ContactNumbers,
  PhotoProfilePath,
  ContactNumbersProps,
} from '@core/shared/values-objects';

type CompanyProps = {
  id?: string;
  name: string;
  tradeName: string;
  email: string;
  cnpj: string;
  contactPerson: string;
  contactNumbers: ContactNumbersProps;
  address: AddressProps;
  profilePhotoPath: string;
  createdAt?: Date;
};

export class Company extends BaseEntity {
  readonly name: Name;
  readonly tradeName: string;
  readonly email: Email;
  readonly cnpj: Document;
  readonly contactPerson: string;
  readonly contactNumbers: ContactNumbers;
  readonly address: Address;
  readonly profilePhotoPath: PhotoProfilePath;
  readonly createdAt?: Date;
  private updatedAt?: Date;

  constructor(props: CompanyProps) {
    super(props.id);

    this.name = new Name(props.name);
    this.tradeName = props.tradeName;
    this.email = new Email(props.email);
    this.cnpj = new Document(props.cnpj);
    this.contactPerson = props.contactPerson;
    this.contactNumbers = new ContactNumbers(props.contactNumbers);
    this.address = new Address(props.address, props.address.coordinates);
    this.profilePhotoPath = new PhotoProfilePath(props.profilePhotoPath);
    this.createdAt = props.createdAt || new Date();
  }

  static create(personData: CompanyProps) {
    const person = new Company(personData);
    return person;
  }

  public update(company: CompanyProps): Company {
    const updatedCompany = new Company(company);
    updatedCompany.updatedAt = new Date();
    return updatedCompany;
  }

  get getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }
}
