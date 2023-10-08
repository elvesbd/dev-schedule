import { Person } from '@core/person/model';
import { TypeORMPersonEntity } from '@external/database/typeorm/entities';

export class PersonMapper {
  static toPersistent(person: Person): TypeORMPersonEntity {
    const persistentEntity: TypeORMPersonEntity = {
      id: person.id.value,
      name: person.name.value,
      email: person.email.value,
      dateOfBirth: person.dateOfBirth,
      gender: person.gender,
      profession: person.profession,
      whatsAppNumber: person.contactNumbers.whatsAppNumber,
      mobileNumber: person.contactNumbers.mobileNumber,
      street: person.address.street,
      number: person.address.number,
      city: person.address.city,
      state: person.address.state,
      postalCode: person.address.postalCode,
      country: person.address.country,
      profilePhotoPath: person.profilePhotoPath.value,
      employer: person.employer,
      createdAt: person.createdAt,
      updatedAt: person.getUpdatedAt,
    };

    if (
      person.address.coordinates?.lng !== undefined &&
      person.address.coordinates?.lat !== undefined
    ) {
      persistentEntity.lng = person.address.coordinates.lng;
      persistentEntity.lat = person.address.coordinates.lat;
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
