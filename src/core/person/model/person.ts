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
  readonly name: Name;
  readonly email: Email;
  readonly dateOfBirth: Date;
  readonly gender: Gender;
  readonly profession: string;
  readonly contactNumbers: ContactNumbers;
  readonly address: Address;
  readonly profilePhotoPath: PhotoProfilePath;
  readonly employer?: string;
  readonly createdAt: Date;
  private updatedAt?: Date;

  constructor(props: PersonProps) {
    super(props.id);

    this.name = new Name(props.name);
    this.email = new Email(props.email);
    this.dateOfBirth = props.dateOfBirth;
    this.gender = props.gender;
    this.profession = props.profession;
    this.contactNumbers = new ContactNumbers(props.contactNumbers);
    this.address = new Address(props.address, props.address.coordinates);
    this.profilePhotoPath = new PhotoProfilePath(props.profilePhotoPath);
    this.employer = props.employer;
    this.createdAt = props.createdAt || new Date();
  }

  static create(personData: PersonProps) {
    const person = new Person(personData);
    return person;
  }

  public update(person: PersonProps): Person {
    const updatedPerson = new Person(person);
    updatedPerson.updatedAt = new Date();
    return updatedPerson;
  }

  get getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }
}
