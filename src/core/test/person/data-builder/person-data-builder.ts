import { Gender } from '@core/person/enum';
import { PersonProps } from '@core/person/model/person';
import { AddressDataBuilderProps } from '@core/test/shared/data-builders';

const updatedAddress = AddressDataBuilderProps.aAddress().build();

export class PersonDataBuilderProps {
  private props: PersonProps = {
    name: 'Yasmin Manuela Farias Lima',
    email: 'yasminmanuelafarias@capgemini.com',
    dateOfBirth: new Date(1983, 1, 13),
    gender: Gender.Female,
    profession: 'Médica',
    contactNumbers: {
      whatsAppNumber: '85997381067',
      mobileNumber: '85997381068',
    },
    address: {
      street: 'Travessa dos Economiários',
      number: '442',
      city: 'Campo Grande',
      state: 'MS',
      postalCode: '79043024',
      country: 'Brasil',
      coordinates: {
        lng: -28.1737325,
        lat: -10.790115,
      },
    },
    employer: '',
    profilePhotoPath: 'https://test.com/photo.jpg',
  };

  public static aPerson(): PersonDataBuilderProps {
    return new PersonDataBuilderProps();
  }

  public withUpdatedName(): this {
    this.props.name = 'Bia Pizzaria Delivery ME';
    return this;
  }

  public withUpdatedEmail(): this {
    this.props.email = 'maria@mail.com';
    return this;
  }

  public withUpdatedGender(): this {
    this.props.gender = Gender.Other;
    return this;
  }

  public withUpdatedDateOfBirth(): this {
    this.props.dateOfBirth = new Date(2023, 2, 13);
    return this;
  }

  public withUpdatedProfession(): this {
    this.props.profession = 'Professor';
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

  public withUpdatedAddress(): this {
    this.props.address = updatedAddress;
    return this;
  }

  public withUpdatedEmployer(): this {
    this.props.employer = 'Professor';
    return this;
  }

  public build(): PersonProps {
    return this.props;
  }
}
