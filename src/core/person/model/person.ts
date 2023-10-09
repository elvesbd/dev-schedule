import { BaseEntity } from '@core/shared/model';
import { Gender } from '@core/person/enum';
import {
  AddressProps,
  Name,
  Email,
  Address,
  ContactNumbers,
  PhotoProfilePath,
  ContactNumbersProps,
} from '@core/shared/values-objects';

type PersonProps = {
  id?: string;
  name: string;
  email: string;
  dateOfBirth: Date;
  gender: Gender;
  profession: string;
  contactNumbers: ContactNumbersProps;
  address: AddressProps;
  profilePhotoPath: string;
  employer?: string;
  createdAt?: Date;
};
export class Person extends BaseEntity {
  private _name: Name;
  private _email: Email;
  private _dateOfBirth: Date;
  private _gender: Gender;
  private _profession: string;
  private _contactNumbers: ContactNumbers;
  private _address: Address;
  private _profilePhotoPath: PhotoProfilePath;
  private _employer?: string;
  private _createdAt: Date;
  private _updatedAt?: Date;

  constructor(props: PersonProps) {
    super(props.id);

    this._name = new Name(props.name);
    this._email = new Email(props.email);
    this._dateOfBirth = props.dateOfBirth;
    this._gender = props.gender;
    this._profession = props.profession;
    this._contactNumbers = new ContactNumbers(props.contactNumbers);
    this._address = new Address(props.address, props.address.coordinates);
    this._profilePhotoPath = new PhotoProfilePath(props.profilePhotoPath);
    this._employer = props.employer;
    this._createdAt = props.createdAt || new Date();
  }

  static create(personData: PersonProps) {
    const person = new Person(personData);
    return person;
  }

  public update(input: Partial<PersonProps>): void {
    this._name = new Name(input.name);
    this._email = new Email(input.email);
    this._dateOfBirth = input.dateOfBirth;
    this._gender = input.gender;
    this._profession = input.profession;
    this._contactNumbers = new ContactNumbers(input.contactNumbers);
    this._address = new Address(input.address, input.address.coordinates);
    this._updatedAt = new Date();
  }

  public updateProfilePhotoPath(newProfilePhotoPath: string): void {
    this._profilePhotoPath = new PhotoProfilePath(newProfilePhotoPath);
    this._updatedAt = new Date();
  }

  public get getName(): string {
    return this._name.value;
  }

  public get getEmail(): string {
    return this._email.value;
  }

  public get getDateOfBirth(): Date {
    return this._dateOfBirth;
  }

  public get getGender(): Gender {
    return this._gender;
  }

  public get getProfession(): string {
    return this._profession;
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

  public get getEmployer(): string {
    return this._employer;
  }

  public get getCreatedAt(): Date {
    return this._createdAt;
  }

  public get getUpdatedAt(): Date | undefined {
    return this._updatedAt;
  }
}
