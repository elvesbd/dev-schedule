import { BadRequestException } from '@nestjs/common';

export class FileStorageRemoveException extends BadRequestException {
  constructor() {
    super('Não foi possível remover o arquivo da imagem!');
    this.name = 'FileStorageRemoveException';
  }
}
