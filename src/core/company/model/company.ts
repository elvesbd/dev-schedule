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

export type CompanyProps = {
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
  updatedAt?: Date;
};

export class Company extends BaseEntity {
  private _name: Name;
  private _tradeName: string;
  private _email: Email;
  private _cnpj: Document;
  private _contactPerson: string;
  private _contactNumbers: ContactNumbers;
  private _address: Address;
  private _profilePhotoPath: PhotoProfilePath;
  private _createdAt?: Date;
  private _updatedAt?: Date;

  constructor(props: CompanyProps) {
    super(props.id);

    this._name = new Name(props.name);
    this._tradeName = props.tradeName;
    this._email = new Email(props.email);
    this._cnpj = new Document(props.cnpj);
    this._contactPerson = props.contactPerson;
    this._contactNumbers = new ContactNumbers(props.contactNumbers);
    this._address = new Address(props.address);
    this._profilePhotoPath = new PhotoProfilePath(props.profilePhotoPath);
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = null;
  }

  static create(personData: CompanyProps) {
    const person = new Company(personData);
    return person;
  }

  public update(input: Partial<CompanyProps>): void {
    this._name = new Name(input.name);
    this._tradeName = input.tradeName;
    this._email = new Email(input.email);
    this._cnpj = new Document(input.cnpj);
    this._contactPerson = input.contactPerson;
    this._contactNumbers = new ContactNumbers(input.contactNumbers);
    this._address = new Address(input.address);
    this._updatedAt = new Date();
  }

  public updateProfilePhotoPath(newProfilePhotoPath: string): void {
    this._profilePhotoPath = new PhotoProfilePath(newProfilePhotoPath);
    this._updatedAt = new Date();
  }

  public get getName(): string {
    return this._name.value;
  }

  public get getTradeName(): string {
    return this._tradeName;
  }

  public get getEmail(): string {
    return this._email.value;
  }

  public get getCnpj(): string {
    return this._cnpj.value;
  }

  public get getContactPerson(): string {
    return this._contactPerson;
  }

  public get getContactNumbers(): ContactNumbers {
    return this._contactNumbers;
  }

  public get getAddress(): Address {
    return this._address;
  }

  public get getProfilePhotoPath(): string {
    return this._profilePhotoPath.value;
  }

  public get getCreatedAt(): Date {
    return this._createdAt;
  }

  public get getUpdatedAt(): Date | undefined {
    return this._updatedAt;
  }
}
