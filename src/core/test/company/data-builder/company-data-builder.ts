import { CompanyProps } from '@core/company/model';

export class CompanyDataBuilderProps {
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
        lng: -47.2782814,
        lat: -23.1584898,
      },
    },
    profilePhotoPath: 'https://www.test.com',
  };

  public static aCompany(): CompanyDataBuilderProps {
    return new CompanyDataBuilderProps();
  }

  public build(): CompanyProps {
    return this.props;
  }
}
