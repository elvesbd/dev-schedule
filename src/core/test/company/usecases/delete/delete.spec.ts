import { Test, TestingModule } from '@nestjs/testing';
import { DeleteCompanyUseCase } from '@core/company/usecases';
import { CompanyRepository } from '@core/company/ports/repository';
import { FileStorageService } from '@core/shared/ports/storage';
import { CompanyDataBuilder } from '../../data-builder';
import { CompanyNotFoundException } from '@core/company/exceptions';

describe('DeleteCompanyUseCase', () => {
  let sut: DeleteCompanyUseCase;
  let companyRepository: CompanyRepository;
  let fileStorageService: FileStorageService;

  const company = CompanyDataBuilder.aCompany().build();

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

    it('should return an exception if company not found', async () => {
      jest.spyOn(companyRepository, 'searchById').mockResolvedValueOnce(null);

      await expect(sut.handle(id)).rejects.toThrow(
        new CompanyNotFoundException(id),
      );
    });
  });
});
