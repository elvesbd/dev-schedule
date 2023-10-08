import { Company } from '@core/company/model';
import { TypeORMCompanyEntity } from '@external/database/typeorm/entities';

export class CompanyMapper {
  static toPersistent(company: Company): TypeORMCompanyEntity {
    const persistentEntity: TypeORMCompanyEntity = {
      id: company.id.value,
      name: company.name.value,
      tradeName: company.tradeName,
      email: company.email.value,
      cnpj: company.cnpj.value,
      contactPerson: company.contactPerson,
      whatsAppNumber: company.contactNumbers.whatsAppNumber,
      mobileNumber: company.contactNumbers.mobileNumber,
      landlinePhone: company.contactNumbers.landlinePhone,
      street: company.address.street,
      number: company.address.number,
      city: company.address.city,
      state: company.address.state,
      postalCode: company.address.postalCode,
      country: company.address.country,
      lng: company.address.coordinates.lat,
      lat: company.address.coordinates.lat,
      profilePhotoPath: company.profilePhotoPath.value,
      createdAt: company.createdAt,
      updatedAt: company.getUpdatedAt,
    };

    if (
      company.address.coordinates?.lng !== undefined &&
      company.address.coordinates?.lat !== undefined
    ) {
      persistentEntity.lng = company.address.coordinates.lng;
      persistentEntity.lat = company.address.coordinates.lat;
    }
    return persistentEntity;
  }

  static toDomain(persistentData: TypeORMCompanyEntity): Company | null {
    if (!persistentData) return null;

    return new Company({
      id: persistentData.id,
      name: persistentData.name,
      tradeName: persistentData.tradeName,
      email: persistentData.email,
      cnpj: persistentData.cnpj,
      contactPerson: persistentData.contactPerson,
      contactNumbers: {
        whatsAppNumber: persistentData.whatsAppNumber,
        mobileNumber: persistentData.mobileNumber,
        landlinePhone: persistentData.landlinePhone,
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
      createdAt: persistentData.createdAt,
    });
  }

  static toDomainList(persistentDataList: TypeORMCompanyEntity[]): Company[] {
    if (!persistentDataList) return null;

    return persistentDataList.map((persistentData) =>
      this.toDomain(persistentData),
    );
  }
}
