import { CompanyProps } from '@core/company/model';
import { AddressDataBuilder } from '@core/test/shared/data-builders';

const updatedAddress = AddressDataBuilder.aAddress().build();

export class CompanyDataBuilder {
  private props: CompanyProps = {
    name: 'Vitor e Helena Pizzaria Delivery ME',
    tradeName: 'Pizzaria Premiata',
    email: 'financeiro@vitorehelenapizzariadeliveryme.com.br',
    cnpj: '24184079000116',
    contactPerson: 'Helena',
    contactNumbers: {
      whatsAppNumber: '88985166973',
      mobileNumber: '88985166973',
      landlinePhone: '8825570589',
    },
    address: {
      street: 'Rua do Algodão',
      number: '525',
      city: 'Salto',
      state: 'sp',
      postalCode: '13329650',
      country: 'Brasil',
      coordinates: {
        lng: -48.1737514,
        lat: -21.7901505,
      },
    },
    profilePhotoPath: 'https://www.test.com/photo.jpg',
  };

  public static aCompany(): CompanyDataBuilder {
    return new CompanyDataBuilder();
  }

  public withUpdatedName(): this {
    this.props.name = 'Bia Pizzaria Delivery ME';
    return this;
  }

  public withUpdatedTradeName(): this {
    this.props.tradeName = 'Pizzaria Los Hermano';
    return this;
  }

  public withUpdatedEmail(): this {
    this.props.email = 'pizzaria@pizzaria.com';
    return this;
  }

  public withUpdatedCnpj(): this {
    this.props.cnpj = '26118933000171';
    return this;
  }

  public withUpdatedContactPerson(): this {
    this.props.contactPerson = 'João Farias';
    return this;
  }

  public withUpdatedWhatsAppNumber(): this {
    this.props.contactNumbers.whatsAppNumber = '85997380551';
    return this;
  }

  public withUpdatedMobileNumber(): this {
    this.props.contactNumbers.mobileNumber = '85997386661';
    return this;
  }

  public withUpdatedLandLinePhone(): this {
    this.props.contactNumbers.landlinePhone = '8825570299';
    return this;
  }

  public withUpdatedAddress(): this {
    this.props.address = updatedAddress;
    return this;
  }

  public build(): CompanyProps {
    return this.props;
  }
}
