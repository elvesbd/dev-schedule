import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  DeleteCompanyUseCase,
  EditLogoPhotoUseCase,
  EditCompanyUseCase,
  RegisterCompanyUseCase,
  SearchAdvancedCompanyUseCase,
} from '@core/company/usecases';
import {
  CompanyPaginationVMResponse,
  CompanyPaginationViewModel,
  CompanyVMResponse,
  CompanyViewModel,
} from '@adapters/controllers/company/view-model';
import {
  RegisterCompanyDto,
  EditCompanyDto,
} from '@adapters/controllers/company/dto';
import {
  CompanyApiPath,
  CompanyApiTag,
} from '@adapters/controllers/shared/constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from '@adapters/controllers/shared/dto';

@ApiTags(CompanyApiTag)
@Controller(CompanyApiPath)
export class CompanyController {
  constructor(
    private readonly searchAdvancedCompanyUseCase: SearchAdvancedCompanyUseCase,
    private readonly registerCompanyUseCase: RegisterCompanyUseCase,
    private readonly editCompanyUseCase: EditCompanyUseCase,
    private readonly editLogoPhotoUseCase: EditLogoPhotoUseCase,
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase,
  ) {}

  @ApiOperation({ summary: 'search advanced company' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Pesquise por razão social, nome fantasia ou CNPJ',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limite de registros por página',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página' })
  @ApiOkResponse({ type: [CompanyPaginationVMResponse] })
  @Get()
  async searchAdvanced(
    @Query('search') search: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
  ): Promise<CompanyPaginationVMResponse> {
    const companies = await this.searchAdvancedCompanyUseCase.handle({
      search,
      limit,
      page,
    });
    return CompanyPaginationViewModel.toHTTP(companies);
  }

  @ApiOperation({ summary: 'register company' })
  @ApiOkResponse({ type: CompanyVMResponse })
  @ApiBody({ type: RegisterCompanyDto })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async registerCompany(
    @Body() registerCompanyDto: RegisterCompanyDto,
    @UploadedFile() file: FileDto,
  ): Promise<CompanyVMResponse> {
    const company = await this.registerCompanyUseCase.handle(
      registerCompanyDto,
      file,
    );
    return CompanyViewModel.toHTTP(company);
  }

  @ApiOperation({ summary: 'edit company' })
  @ApiOkResponse({ type: CompanyVMResponse })
  @ApiParam({ type: String, name: 'id', description: 'ID da empresa' })
  @ApiBody({ type: EditCompanyDto })
  @Put(':id')
  async editCompany(
    @Param('id') id: string,
    @Body() editCompanyDto: EditCompanyDto,
  ): Promise<CompanyVMResponse> {
    const company = await this.editCompanyUseCase.handle(id, editCompanyDto);
    return CompanyViewModel.toHTTP(company);
  }

  @ApiOperation({ summary: 'update profile photo' })
  @ApiNoContentResponse({ description: 'Foto atualizada com sucesso' })
  @ApiParam({ type: String, name: 'id', description: 'ID da empresa' })
  @ApiBody({ type: FileDto })
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(204)
  @Patch(':id/photo')
  async editProfilePhoto(
    @Param('id') id: string,
    @UploadedFile() fileDto: FileDto,
  ): Promise<void> {
    return await this.editLogoPhotoUseCase.handle(id, fileDto);
  }

  @ApiOperation({ summary: 'delete company' })
  @ApiParam({ type: String, name: 'id', description: 'ID da empresa' })
  @ApiNoContentResponse({ description: 'Empresa deletada com sucesso' })
  @HttpCode(204)
  @Delete(':id')
  async deleteCompany(@Param('id') id: string): Promise<void> {
    return await this.deleteCompanyUseCase.handle(id);
  }
}
