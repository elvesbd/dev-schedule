import { Company } from '@core/company/model';
import { TypeORMCompanyEntity } from '@external/database/typeorm/entities';

export class CompanyMapper {
  static toPersistent(company: Company): TypeORMCompanyEntity {
    const persistentEntity: TypeORMCompanyEntity = {
      id: company.id.getValue,
      name: company.getName,
      tradeName: company.getTradeName,
      email: company.getEmail,
      cnpj: company.getCnpj,
      contactPerson: company.getContactPerson,
      whatsAppNumber: company.getContactNumbers.whatsAppNumber,
      mobileNumber: company.getContactNumbers.mobileNumber,
      landlinePhone: company.getContactNumbers.landlinePhone,
      street: company.getAddress.street,
      number: company.getAddress.number,
      city: company.getAddress.city,
      state: company.getAddress.state,
      postalCode: company.getAddress.postalCode,
      country: company.getAddress.country,
      lng: company.getAddress.coordinates.lat,
      lat: company.getAddress.coordinates.lat,
      profilePhotoPath: company.getProfilePhotoPath,
      createdAt: company.getCreatedAt,
      updatedAt: company.getUpdatedAt,
    };

    if (
      company.getAddress.coordinates?.lng !== undefined &&
      company.getAddress.coordinates?.lat !== undefined
    ) {
      persistentEntity.lng = company.getAddress.coordinates.lng;
      persistentEntity.lat = company.getAddress.coordinates.lat;
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
