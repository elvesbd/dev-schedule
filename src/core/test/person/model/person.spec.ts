import { PersonDataBuilderProps } from '../data-builder';
import { Person } from '@core/person/model';

describe('Person [model]', (): void => {
  const personProps = PersonDataBuilderProps.aPerson().build();
  const person = Person.create(personProps);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a person', (): void => {
    expect(person.id).toBeDefined();
    expect(person.getName).toBe(personProps.name);
    expect(person.getEmail).toBe(personProps.email);
    expect(person.getGender).toBe(personProps.gender);
    expect(person.getDateOfBirth).toBe(personProps.dateOfBirth);
    expect(person.getProfession).toBe(personProps.profession);
    expect(person.getContactNumbers).toEqual(personProps.contactNumbers);
    expect(person.getAddress).toEqual(personProps.address);
    expect(person.getProfilePhotoPath).toBe(personProps.profilePhotoPath);
  });

  it('should update a person name', (): void => {
    const updatedPerson = PersonDataBuilderProps.aPerson()
      .withUpdatedName()
      .build();
    person.update(updatedPerson);

    expect(person.id).toBeDefined();
    expect(person.getName).toBe(updatedPerson.name);
    expect(person.getCreatedAt).not.toEqual(person.getUpdatedAt);
  });

  it('should update a person email', (): void => {
    const updatedPerson = PersonDataBuilderProps.aPerson()
      .withUpdatedEmail()
      .build();
    person.update(updatedPerson);

    expect(person.id).toBeDefined();
    expect(person.getEmail).toBe(updatedPerson.email);
    expect(person.getCreatedAt).not.toEqual(person.getUpdatedAt);
  });

  it('should update a person gender', (): void => {
    const updatedPerson = PersonDataBuilderProps.aPerson()
      .withUpdatedGender()
      .build();
    person.update(updatedPerson);

    expect(person.id).toBeDefined();
    expect(person.getEmail).toBe(updatedPerson.email);
    expect(person.getCreatedAt).not.toEqual(person.getUpdatedAt);
  });

  it('should update a person date of birth', (): void => {
    const updatedPerson = PersonDataBuilderProps.aPerson()
      .withUpdatedDateOfBirth()
      .build();
    person.update(updatedPerson);

    expect(person.id).toBeDefined();
    expect(person.getEmail).toBe(updatedPerson.email);
    expect(person.getCreatedAt).not.toEqual(person.getUpdatedAt);
  });

  it('should update a person profession', (): void => {
    const updatedPerson = PersonDataBuilderProps.aPerson()
      .withUpdatedProfession()
      .build();
    person.update(updatedPerson);

    expect(person.id).toBeDefined();
    expect(person.getEmail).toBe(updatedPerson.email);
    expect(person.getCreatedAt).not.toEqual(person.getUpdatedAt);
  });

  it('should update a person whatsApp number', (): void => {
    const updatedPerson = PersonDataBuilderProps.aPerson()
      .withUpdatedWhatsAppNumber()
      .build();
    person.update(updatedPerson);

    expect(person.id).toBeDefined();
    expect(person.getContactNumbers.whatsAppNumber).toBe(
      updatedPerson.contactNumbers.whatsAppNumber,
    );
    expect(person.getCreatedAt).not.toEqual(person.getUpdatedAt);
  });

  it('should update a person mobile number', (): void => {
    const updatedPerson = PersonDataBuilderProps.aPerson()
      .withUpdatedMobileNumber()
      .build();
    person.update(updatedPerson);

    expect(person.id).toBeDefined();
    expect(person.getContactNumbers.mobileNumber).toBe(
      updatedPerson.contactNumbers.mobileNumber,
    );
    expect(person.getCreatedAt).not.toEqual(person.getUpdatedAt);
  });

  it('should update a person address', (): void => {
    const updatedPerson = PersonDataBuilderProps.aPerson()
      .withUpdatedAddress()
      .build();
    person.update(updatedPerson);

    expect(person.id).toBeDefined();
    expect(person.getAddress).toEqual(updatedPerson.address);
    expect(person.getCreatedAt).not.toEqual(person.getUpdatedAt);
  });

  it('should update a person profile photo path', (): void => {
    const profilePhotoPath = 'https://www.test.com/updatedPhoto.jpg';
    person.updateProfilePhotoPath(profilePhotoPath);

    expect(person.id).toBeDefined();
    expect(person.getProfilePhotoPath).toBe(profilePhotoPath);
    expect(person.getCreatedAt).not.toEqual(person.getUpdatedAt);
  });

  it('should update a person employer', (): void => {
    const updatedPerson = PersonDataBuilderProps.aPerson()
      .withUpdatedEmployer()
      .build();
    person.update(updatedPerson);

    expect(person.id).toBeDefined();
    expect(person.getEmployer).toBe(updatedPerson.employer);
    expect(person.getCreatedAt).not.toEqual(person.getUpdatedAt);
  });
});
