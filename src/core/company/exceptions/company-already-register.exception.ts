import { ConflictException } from '@nestjs/common';

export class CompanyAlreadyRegisterException extends ConflictException {
  constructor(cnpj: string) {
    super(`Já existe uma empresa registrada com o cnpj ${cnpj}`);
    this.name = 'CompanyAlreadyRegisterException';
  }
}
