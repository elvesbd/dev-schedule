import { BadRequestException } from '@nestjs/common';

export class FileStorageUploadException extends BadRequestException {
  constructor() {
    super('Não foi possível realizar o upload do arquivo enviado!');
    this.name = 'FileStorageUploadException';
  }
}
