export class Email {
  readonly value: string;

  constructor(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      throw new Error('O endereço de e-mail fornecido não é válido.');
    }

    this.value = value;
  }
}
