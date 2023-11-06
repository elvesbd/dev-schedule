import { Test, TestingModule } from '@nestjs/testing';
import { Company } from '@core/company/model';
import { CompanyDataBuilder } from '../../data-builder';
import { EditCompanyUseCase } from '@core/company/usecases';
import { CompanyRepository } from '@core/company/ports/repository';
import { AddressService } from '@core/services';
import { EditAddress } from '@core/shared/types';
import { EditCompany } from '@core/company/usecases/edit/types';
import { CompanyNotFoundException } from '@core/company/exceptions';

describe('EditCompanyUseCase', () => {
  let sut: EditCompanyUseCase;
  let addressService: AddressService;
  let companyRepository: CompanyRepository;

  const companyData = CompanyDataBuilder.aCompany().build();
  const company = new Company(companyData);
  const updatedAddress: EditAddress = {
    street: 'Travessa do Rio',
    number: '600',
    city: 'Salto',
    state: 'sp',
    postalCode: '13329420',
    country: 'Brasil',
    coordinates: {
      lng: -48.1737145,
      lat: -21.7901101,
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const CompanyRepositoryProvider = {
      provide: CompanyRepository,
      useValue: {
        searchById: jest.fn().mockResolvedValue(company),
        update: jest.fn().mockResolvedValue(void 0),
      },
    };

    const AddressServiceProvider = {
      provide: AddressService,
      useValue: {
        updateCoordinatesIfChanged: jest.fn().mockResolvedValue(updatedAddress),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        EditCompanyUseCase,
        AddressServiceProvider,
        CompanyRepositoryProvider,
      ],
    }).compile();

    sut = app.get<EditCompanyUseCase>(EditCompanyUseCase);
    addressService = app.get<AddressService>(AddressService);
    companyRepository = app.get<CompanyRepository>(CompanyRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(addressService).toBeDefined();
    expect(companyRepository).toBeDefined();
  });

  describe('handle()', () => {
    const id = 'df89b9ce-fd57-4e5b-b69c-2c5a62cc59cf';
    const input: EditCompany = {
      name: 'Vitor e Helena Pizzaria Delivery ME',
      tradeName: 'Pizzaria Premiata',
      email: 'financeiro@vitorehelenapizzariadeliveryme.com.br',
      cnpj: '24184079000116',
      contactPerson: 'Helena',
      contactNumbers: {
        whatsAppNumber: '88985166973',
        mobileNumber: '88985166973',
        landLinePhone: '8825570589',
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
    };

    it('should be called companyRepository.searchById with correct values', async () => {
      await sut.handle(id, input);
      expect(companyRepository.searchById).toHaveBeenCalledTimes(1);
      expect(companyRepository.searchById).toHaveBeenCalledWith(id);
    });

    it('should be return an exception if company not found', async () => {
      jest.spyOn(companyRepository, 'searchById').mockResolvedValueOnce(null);

      await expect(sut.handle(id, input)).rejects.toThrow(
        new CompanyNotFoundException(id),
      );
    });

    it('should be called addressService.updateCoordinatesIfChanged with correct values', async () => {
      await sut.handle(id, input);
      expect(addressService.updateCoordinatesIfChanged).toHaveBeenCalledTimes(
        1,
      );
      expect(addressService.updateCoordinatesIfChanged).toHaveBeenCalledWith(
        company,
        input.address,
        expect.any(Function),
      );
    });

    it('should be called companyRepository.update with correct values when the address is updated', async () => {
      await sut.handle(id, input);
      input.address = updatedAddress;
      company.update(input);

      expect(companyRepository.update).toHaveBeenCalledTimes(1);
      expect(companyRepository.update).toHaveBeenCalledWith(company);
    });
  });
});
