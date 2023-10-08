import { BadRequestException } from '@nestjs/common';

export class FileStorageGetUrlException extends BadRequestException {
  constructor() {
    super('Não foi possível obter a url da imagem!');
    this.name = 'FileStorageGetUrlException';
  }
}
