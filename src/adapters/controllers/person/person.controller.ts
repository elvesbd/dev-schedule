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
  SearchAdvancedPersonUseCase,
  EditPersonUseCase,
  DeletePersonUseCase,
  EditProfilePhotoUseCase,
  RegisterPersonUseCase,
} from '@core/person/usecases';
import {
  PersonPaginationVMResponse,
  PersonPaginationViewModel,
  PersonVMResponse,
  PersonViewModel,
} from '@adapters/controllers/person/view-model';
import {
  PersonApiPath,
  PersonApiTag,
} from '@adapters/controllers/shared/constants';
import {
  RegisterPersonDto,
  EditPersonDto,
} from '@adapters/controllers/person/dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from '@adapters/controllers/shared/dto';

@ApiTags(PersonApiTag)
@Controller(PersonApiPath)
export class PersonController {
  constructor(
    private readonly searchAdvancedPersonUseCase: SearchAdvancedPersonUseCase,
    private readonly registerPersonUseCase: RegisterPersonUseCase,
    private readonly editPersonUseCase: EditPersonUseCase,
    private readonly editProfilePhotoUseCase: EditProfilePhotoUseCase,
    private readonly deletePersonUseCase: DeletePersonUseCase,
  ) {}

  @ApiOperation({ summary: 'search advanced person' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Pesquise por nome, profissão ou cidade',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limite de registros por página',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página' })
  @ApiOkResponse({ type: [PersonPaginationVMResponse] })
  @Get()
  async searchAdvanced(
    @Query('search') search: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
  ): Promise<PersonPaginationVMResponse> {
    const persons = await this.searchAdvancedPersonUseCase.handle({
      search,
      limit,
      page,
    });
    return PersonPaginationViewModel.toHTTP(persons);
  }

  @ApiOperation({ summary: 'register person' })
  @ApiOkResponse({ type: PersonVMResponse })
  @ApiBody({ type: RegisterPersonDto })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async registerPerson(
    @Body('dto') dto: RegisterPersonDto,
    @UploadedFile() file: FileDto,
  ): Promise<PersonVMResponse> {
    const person = await this.registerPersonUseCase.handle(dto, file);
    return PersonViewModel.toHTTP(person);
  }

  @ApiOperation({ summary: 'edit person' })
  @ApiOkResponse({ type: PersonVMResponse })
  @ApiParam({ type: Number, name: 'id', description: 'ID do usuário' })
  @ApiBody({ type: EditPersonDto })
  @Put(':id')
  async editPerson(
    @Param('id') id: string,
    @Body() dto: EditPersonDto,
  ): Promise<PersonVMResponse> {
    const person = await this.editPersonUseCase.handle(id, dto);
    return PersonViewModel.toHTTP(person);
  }

  @ApiOperation({ summary: 'update profile photo' })
  @ApiNoContentResponse({ description: 'Foto alterada com sucesso' })
  @ApiParam({ type: Number, name: 'id', description: 'ID do usuário' })
  @ApiBody({ type: FileDto })
  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id/photo')
  async editProfilePhoto(
    @Param('id') id: string,
    @UploadedFile() dto: FileDto,
  ): Promise<void> {
    await this.editProfilePhotoUseCase.handle(id, dto);
  }

  @ApiOperation({ summary: 'delete person' })
  @ApiParam({ type: Number, name: 'id', description: 'ID do usuário' })
  @HttpCode(204)
  @Delete(':id')
  async deletePerson(@Param('id') id: string): Promise<void> {
    await this.deletePersonUseCase.handle(id);
  }
}
