import { NotFoundException } from '@nestjs/common';

export class CompanyNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`A empresa com o ID ${id} não foi encontrada.`);
    this.name = 'CompanyNotFoundException';
  }
}
