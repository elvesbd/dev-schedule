import { Person } from '@core/person/model';
import { TypeORMPersonEntity } from '@external/database/typeorm/entities';

export class PersonMapper {
  static toPersistent(person: Person): TypeORMPersonEntity {
    const persistentEntity: TypeORMPersonEntity = {
      id: person.id.getValue,
      name: person.getName,
      email: person.getEmail,
      dateOfBirth: person.getDateOfBirth,
      gender: person.getGender,
      profession: person.getProfession,
      whatsAppNumber: person.getContactNumbers.whatsAppNumber,
      mobileNumber: person.getContactNumbers.mobileNumber,
      street: person.getAddress.street,
      number: person.getAddress.number,
      city: person.getAddress.city,
      state: person.getAddress.state,
      postalCode: person.getAddress.postalCode,
      country: person.getAddress.country,
      profilePhotoPath: person.getProfilePhotoPath,
      employer: person.getEmployer,
      createdAt: person.getCreatedAt,
      updatedAt: person.getUpdatedAt,
    };

    if (
      person.getAddress.coordinates?.lng !== undefined &&
      person.getAddress.coordinates?.lat !== undefined
    ) {
      persistentEntity.lng = person.getAddress.coordinates.lng;
      persistentEntity.lat = person.getAddress.coordinates.lat;
    }
    return persistentEntity;
  }

  static toDomain(persistentData: TypeORMPersonEntity): Person | null {
    if (!persistentData) return null;

    return new Person({
      id: persistentData.id,
      name: persistentData.name,
      email: persistentData.email,
      dateOfBirth: persistentData.dateOfBirth,
      gender: persistentData.gender,
      profession: persistentData.profession,
      contactNumbers: {
        whatsAppNumber: persistentData.whatsAppNumber,
        mobileNumber: persistentData.mobileNumber,
      },
      address: {
        street: persistentData.street,
        number: persistentData.number,
        city: persistentData.city,
        state: persistentData.state,
        postalCode: persistentData.postalCode,
        country: persistentData.country,
        coordinates: {
          lng: persistentData.lng,
          lat: persistentData.lat,
        },
      },

      profilePhotoPath: persistentData.profilePhotoPath,
      employer: persistentData.employer,
      createdAt: persistentData.createdAt,
    });
  }

  static toDomainList(persistentDataList: TypeORMPersonEntity[]): Person[] {
    if (!persistentDataList) return null;

    return persistentDataList.map((persistentData) =>
      this.toDomain(persistentData),
    );
  }
}
