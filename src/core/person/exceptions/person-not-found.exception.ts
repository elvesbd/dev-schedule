import { NotFoundException } from '@nestjs/common';

export class PersonNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Pessoa com o ID ${id} não encontrada.`);
    this.name = 'PersonNotFoundException';
  }
}
