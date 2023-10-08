export class Name {
  readonly value: string;

  constructor(value: string) {
    if (value.length === 0) {
      throw new Error('O nome não pode ser vazio.');
    }

    if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s&-]+$/.test(value)) {
      throw new Error(
        'O nome deve conter apenas letras, sem números ou caracteres especiais.',
      );
    }

    this.value = value;
  }
}
