import { ConflictException } from '@nestjs/common';

export class PersonAlreadyRegisterException extends ConflictException {
  constructor(email: string) {
    super(`Já existe uma pessoa registrada com o email ${email}`);
    this.name = 'PersonAlreadyRegisterException';
  }
}
