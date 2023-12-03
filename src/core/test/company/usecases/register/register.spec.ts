import { CompanyRepository } from '@core/company/ports/repository';
import { RegisterCompanyUseCase } from '@core/company/usecases';
import { ProfilePhotoService } from '@core/services';
import { MapsService } from '@core/shared/ports/maps';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyDataBuilder } from '../../data-builder';
import { Company } from '@core/company/model';

describe('RegisterCompanyUseCase', () => {
  let sut: RegisterCompanyUseCase;
  let mapsService: MapsService;
  let companyRepository: CompanyRepository;
  let profilePhotoService: ProfilePhotoService;

  const coordinates = {
    lng: -48.1737514,
    lat: -21.7901505,
  };
  const companyData = CompanyDataBuilder.aCompany().build();
  const company = new Company(companyData);
  const profilePhotoPath =
    'https://yfmxdasnbtcwuvnxwuww.supabase.co/storage/v1/object/public/dev-schedule/profile-photo/person/plugin_dotnet.png';

  beforeEach(async () => {
    jest.clearAllMocks();

    const MapsServiceProvider = {
      provide: MapsService,
      useValue: {
        getCoordinates: jest.fn().mockResolvedValue(coordinates),
      },
    };

    const CompanyRepositoryProvider = {
      provide: CompanyRepository,
      useValue: {
        searchByCnpj: jest.fn().mockResolvedValue(company),
        register: jest.fn().mockResolvedValue(0),
      },
    };

    const ProfilePhotoServiceProvider = {
      provide: ProfilePhotoService,
      useValue: {
        getUrl: jest.fn().mockResolvedValue(profilePhotoPath),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterCompanyUseCase,
        MapsServiceProvider,
        CompanyRepositoryProvider,
        ProfilePhotoServiceProvider,
      ],
    }).compile();

    sut = app.get<RegisterCompanyUseCase>(RegisterCompanyUseCase);
    mapsService = app.get<MapsService>(MapsService);
    companyRepository = app.get<CompanyRepository>(CompanyRepository);
    profilePhotoService = app.get<ProfilePhotoService>(ProfilePhotoService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(mapsService).toBeDefined();
    expect(companyRepository).toBeDefined();
    expect(profilePhotoService).toBeDefined();
  });
});
