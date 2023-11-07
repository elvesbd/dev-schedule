import { CompanyRepository } from '@core/company/ports/repository';
import { EditLogoPhotoUseCase } from '@core/company/usecases';
import { ProfilePhotoService } from '@core/services';
import { FileStorageService } from '@core/shared/ports/storage';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyDataBuilder } from '../../data-builder';
import { Company } from '@core/company/model';
import { FileInput } from '@core/shared/types';
import { CompanyNotFoundException } from '@core/company/exceptions';
import { COMPANY_FOLDER } from '@core/company/usecases/constants';

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
        update: jest.fn().mockResolvedValue(undefined),
      },
    };

    const FileStorageServiceProvider = {
      provide: FileStorageService,
      useValue: {
        remove: jest.fn().mockResolvedValue(undefined),
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
    const id = 'df89b9ce-fd57-4e5b-b69c-2c5a62cc59cf';
    const input: FileInput = {
      fieldname: 'file',
      originalname: 'image.png',
      mimetype: 'image/png',
      buffer: Buffer.from([0x01, 0x02, 0x03]),
      size: 3,
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

    it('should be called fileStorageService.remove with correct value', async () => {
      await sut.handle(id, input);

      expect(fileStorageService.remove).toHaveBeenCalledTimes(1);
      expect(fileStorageService.remove).toHaveBeenCalledWith(
        company.getProfilePhotoPath,
      );
    });

    it('should be called profilePhotoService.getUrl with correct values', async () => {
      await sut.handle(id, input);

      expect(profilePhotoService.getUrl).toHaveBeenCalledTimes(1);
      expect(profilePhotoService.getUrl).toHaveBeenCalledWith(
        input,
        COMPANY_FOLDER,
      );
    });

    it('should be return profilePhotPath updated', async () => {
      await sut.handle(id, input);
      expect(company.getProfilePhotoPath).toBe(profilePhotoPath);
    });

    it('should be return called companyRepository.update with correct value', async () => {
      await sut.handle(id, input);
      expect(companyRepository.update).toHaveBeenCalledTimes(1);
      expect(companyRepository.update).toHaveBeenCalledWith(company);
    });
  });
});
