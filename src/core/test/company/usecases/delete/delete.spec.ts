import { Test, TestingModule } from '@nestjs/testing';
import { DeleteCompanyUseCase } from '@core/company/usecases';
import { CompanyRepository } from '@core/company/ports/repository';
import { FileStorageService } from '@core/shared/ports/storage';
import { CompanyDataBuilder } from '../../data-builder';
import { CompanyNotFoundException } from '@core/company/exceptions';
import { Company } from '@core/company/model';

describe('DeleteCompanyUseCase', () => {
  let sut: DeleteCompanyUseCase;
  let companyRepository: CompanyRepository;
  let fileStorageService: FileStorageService;

  const companyData = CompanyDataBuilder.aCompany().build();
  const company = new Company(companyData)

  beforeEach(async () => {
    jest.clearAllMocks();

    const CompanyRepositoryProvider = {
      provide: CompanyRepository,
      useValue: {
        searchById: jest.fn().mockResolvedValue(company),
        delete: jest.fn().mockResolvedValue(void 0),
      },
    };

    const FileStorageServiceProvider = {
      provide: FileStorageService,
      useValue: {
        remove: jest.fn().mockResolvedValue(void 0),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteCompanyUseCase,
        CompanyRepositoryProvider,
        FileStorageServiceProvider,
      ],
    }).compile();

    sut = app.get<DeleteCompanyUseCase>(DeleteCompanyUseCase);
    companyRepository = app.get<CompanyRepository>(CompanyRepository);
    fileStorageService = app.get<FileStorageService>(FileStorageService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(companyRepository).toBeDefined();
    expect(fileStorageService).toBeDefined();
  });

  describe('handle()', () => {
    const id = 'df89b9ce-fd57-4e5b-b69c-2c5a62cc59cf';

    it('should called companyRepository.searchById with correct value', async () => {
      await sut.handle(id);
      expect(companyRepository.searchById).toHaveBeenCalledTimes(1);
      expect(companyRepository.searchById).toHaveBeenCalledWith(id);
    });

    it('should be return an exception if company not found', async () => {
      jest.spyOn(companyRepository, 'searchById').mockResolvedValueOnce(null);

      await expect(sut.handle(id)).rejects.toThrow(
        new CompanyNotFoundException(id),
      );
    });

    it('should called fileStorageService.remove with correct value', async () => {
      await sut.handle(id);
      expect(fileStorageService.remove).toHaveBeenCalledTimes(1);
      expect(fileStorageService.remove).toHaveBeenCalledWith(
        company.getProfilePhotoPath
      )
    });

    it('should called companyRepository.delete with correct value', async () => {
      await sut.handle(id);
      expect(companyRepository.delete).toHaveBeenCalledTimes(1);
      expect(companyRepository.delete).toHaveBeenCalledWith(id)
    });
  });
});
