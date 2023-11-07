import { CompanyRepository } from '@core/company/ports/repository';
import { EditLogoPhotoUseCase } from '@core/company/usecases';
import { ProfilePhotoService } from '@core/services';
import { FileStorageService } from '@core/shared/ports/storage';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyDataBuilder } from '../../data-builder';
import { Company } from '@core/company/model';

describe('EditLogoPhotoUseCase', () => {
  let sut: EditLogoPhotoUseCase;
  let companyRepository: CompanyRepository;
  let fileStorageService: FileStorageService;
  let profilePhotoService: ProfilePhotoService;

  const companyData = CompanyDataBuilder.aCompany().build();
  const company = new Company(companyData);
  const profilePhotoPath =
    'https://yfmxdasnbtcwuvnxwuww.supabase.co/storage/v1/object/public/dev-schedule/profile-photo/person/plugin_dotnet.png';

  beforeEach(async () => {
    jest.clearAllMocks();

    const CompanyRepositoryProvider = {
      provide: CompanyRepository,
      useValue: {
        searchById: jest.fn().mockResolvedValue(company),
        update: jest.fn().mockResolvedValue(void 0),
      },
    };

    const FileStorageServiceProvider = {
      provide: FileStorageService,
      useValue: {
        remove: jest.fn().mockResolvedValue(void 0),
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
        EditLogoPhotoUseCase,
        CompanyRepositoryProvider,
        FileStorageServiceProvider,
        ProfilePhotoServiceProvider,
      ],
    }).compile();

    sut = app.get<EditLogoPhotoUseCase>(EditLogoPhotoUseCase);
    companyRepository = app.get<CompanyRepository>(CompanyRepository);
    fileStorageService = app.get<FileStorageService>(FileStorageService);
    profilePhotoService = app.get<ProfilePhotoService>(ProfilePhotoService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(companyRepository).toBeDefined();
    expect(fileStorageService).toBeDefined();
    expect(profilePhotoService).toBeDefined();
  });

  describe('handle()', () => {
    it('should ', () => {});
  });
});
